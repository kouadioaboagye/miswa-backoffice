'use client';

import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { APIResponseList } from '../../types';
import { IAdvertisementDataModel } from './types';
import { fetchWrapper } from '@/lib/http-client/ fetchWrapper';

export const useListAdvertisementQuery = (): UseQueryResult<APIResponseList<IAdvertisementDataModel>> => {
  return useQuery({
    queryKey: ['advertisements'],
    queryFn: async () => {
      return await fetchWrapper<APIResponseList<IAdvertisementDataModel>>('advertisements/', {
        method: 'GET',
      });
    },
  });
};

export const useGetAdvertisementByIdQuery = (adId: string): UseQueryResult<IAdvertisementDataModel> => {
  return useQuery({
    queryKey: ['advertisement', adId],
    queryFn: async () => {
      return await fetchWrapper<IAdvertisementDataModel>(`advertisements/${adId}/`, {
        method: 'GET',
      });
    },
    enabled: !!adId,
  });
};