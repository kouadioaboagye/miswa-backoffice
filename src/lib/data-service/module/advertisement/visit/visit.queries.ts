'use client';

import { useQuery, useMutation, useQueryClient, UseQueryResult } from '@tanstack/react-query';
import { IVisitDataModel } from './types';
import { APIResponseList } from '@/lib/data-service/types';
import { fetchWrapper } from '@/lib/http-client/ fetchWrapper';

export type Visit = {
    id: string;
    visitor: {
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
    ad_reference: string;
    visit_datetime: string;
    status: string;
};

export const fakeVisits: Visit[] = Array.from({ length: 25 }).map((_, idx) => ({
    id: `visit-${idx + 1}`,
    visitor: {
        firstname: `Visitor${idx + 1}`,
        lastname: `User${idx + 1}`,
        cover_url: `https://picsum.photos/1024/1024?random=${idx + 100}`,
        email: `visitor${idx + 1}@example.com`,
    },
    property: {
        id: `property-${idx + 1}`,
        name: `Appartement ${idx + 1}`,
        cover_url: `https://picsum.photos/1024/1024?random=${idx + 200}`,
    },
    ad_reference: `REF-${String(idx + 2000).padStart(4, '0')}`,
    visit_datetime: new Date(2025, 0, (idx % 28) + 1, 9 + (idx % 8), 0).toISOString(),
    status: ['en-cours', 'annulee', 'en-attente', 'programmee', 'terminee'][idx % 5],
}));

export const useListVisitQuery = (
    page: number = 1,
    limit: number = 10,
    status: string = 'default'
): UseQueryResult<APIResponseList<IVisitDataModel>> => {
    return useQuery({
        queryKey: ['visits', page, limit, status],
        queryFn: async () => {
            const start = (page - 1) * limit;
            const end = start + limit;
            let filteredVisits = fakeVisits;
            if (status !== 'default') {
                filteredVisits = fakeVisits.filter(v => 
                    status === 'en-cours' ? v.status === 'en-cours' :
                    status === 'annulee' ? v.status === 'annulee' :
                    status === 'en-attente' ? v.status === 'en-attente' :
                    status === 'programmee' ? v.status === 'programmee' :
                    status === 'terminee' ? v.status === 'terminee' : true
                );
            }
            const paginatedData = filteredVisits.slice(start, end);
            return {
                data: paginatedData,
                total: filteredVisits.length,
            } as APIResponseList<IVisitDataModel>;
        },
    });
};

export const useGetVisitByIdQuery = (visitId: string): UseQueryResult<IVisitDataModel> => {
    return useQuery({
        queryKey: ['visit', visitId],
        queryFn: async () => {
            return await fetchWrapper<IVisitDataModel>(`visits/${visitId}/`, {
                method: 'GET',
            });
        },
        enabled: !!visitId,
    });
};

export const useDeleteVisitMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (visitId: string) => {
            return await fetchWrapper(`visits/${visitId}/`, {
                method: 'DELETE',
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['visits'] });
        },
    });
};

// export const useUpdateVisitStatusMutation = () => {
//     const queryClient = useQueryClient();

//     return useMutation({
//         mutationFn: async ({ id, status }: { id: string; status: string }) => {
//             return await fetchWrapper(`visits/${id}/status/`, {
//                 method: 'PATCH',
//                 body: JSON.stringify({ status }),
//             });
//         },
//         onSuccess: () => {
//             queryClient.invalidateQueries({ queryKey: ['visits'] });
//         },
//     });
// };