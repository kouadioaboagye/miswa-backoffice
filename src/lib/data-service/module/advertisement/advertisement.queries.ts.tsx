'use client';

import { useQuery, useMutation, useQueryClient, UseQueryResult } from '@tanstack/react-query';
import { APIResponseList } from '../../types';
import { IAdvertisementDataModel } from './types';
import { fetchWrapper } from '@/lib/http-client/ fetchWrapper';

export type Ad = {
    id: string;
    owner: {
        firstname: string;
        lastname: string;
        cover_url: string;
        email?: string;
    };
    property: {
        id: string;
        name: string;
        cover_url: string;
    };
    building_reference: string;
    posting_date: string;
    visit_count: number;
    status: string;
};

export const fakeAds: Ad[] = Array.from({ length: 20 }).map((_, idx) => ({
    id: `ad-${idx + 1}`,
    owner: {
        firstname: `Jane${idx + 1}`,
        lastname: `Smith${idx + 1}`,
        cover_url: `https://picsum.photos/1024/1024?random=${idx + 10}`,
        email: `jane${idx + 1}@example.com`,
    },
    property: {
        id: `property-${idx + 1}`,
        name: `Building ${idx + 1}`,
        cover_url: `https://picsum.photos/1024/1024?random=${idx + 20}`,
    },
    building_reference: `REF-${String(idx + 1000).padStart(4, '0')}`,
    posting_date: new Date(2025, 0, idx + 1).toISOString(),
    visit_count: Math.floor(Math.random() * 100) + 10,
    status: idx % 3 === 0 ? 'Active' : idx % 3 === 1 ? 'Draft' : 'Archived',
}));

export const useListAdvertisementQuery = (
    page: number = 1,
    limit: number = 10,
    status: string = 'default'
): UseQueryResult<APIResponseList<IAdvertisementDataModel>> => {
    return useQuery({
        queryKey: ['advertisements', page, limit, status],
        queryFn: async () => {
            // Mock data for 20 ads, filtered by status
            const start = (page - 1) * limit;
            const end = start + limit;
            let filteredAds = fakeAds;
            if (status !== 'default') {
                filteredAds = fakeAds.filter(ad => 
                    status === 'active' ? ad.status === 'Active' :
                    status === 'archived' ? ad.status === 'Archived' :
                    status === 'draft' ? ad.status === 'Draft' : true
                );
            }
            const paginatedData = filteredAds.slice(start, end);
            return {
                data: paginatedData,
                total: filteredAds.length,
            } as APIResponseList<IAdvertisementDataModel>;
            // Uncomment for actual API call
            // const query = status === 'default' ? `page=${page}&limit=${limit}` : `page=${page}&limit=${limit}&status=${status}`;
            // return await fetchWrapper<APIResponseList<IAdvertisementDataModel>>(`advertisements/?${query}`, {
            //     method: 'GET',
            // });
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

export const useDeleteAdvertisementMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (adId: string) => {
            return await fetchWrapper(`advertisements/${adId}/`, {
                method: 'DELETE',
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['advertisements'] });
        },
    });
};