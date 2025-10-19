import { useQuery, useMutation, useQueryClient, UseQueryResult } from "@tanstack/react-query";
import { APIResponseList } from '../types';
import { fakePayments, Payment } from "@/features/admin/components/tables/payment/columns";
import { fetchWrapper } from "@/lib/http-client/ fetchWrapper";

export const useListPaymentsQuery = (page: number = 1, limit: number = 10): UseQueryResult<APIResponseList<Payment>> => {
    return useQuery({
        queryKey: ['payments', page, limit],
        queryFn: async () => {
            const start = (page - 1) * limit;
            const end = start + limit;
            const paginatedData = fakePayments.slice(start, end);
            return {
                data: paginatedData,
                total: fakePayments.length,
            } as APIResponseList<Payment>;
            // Uncomment for actual API call
            // return await fetchWrapper<APIResponseList<Payment>>(`payments/?page=${page}&limit=${limit}`, {
            //     method: 'GET',
            // });
        }
    });
};

export const useDeletePaymentMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (paymentId: string) => {
            return await fetchWrapper(`payments/${paymentId}/`, {
                method: 'DELETE',
            });
        },
        onSuccess: () => {
            // Invalidate and refetch payments list
            queryClient.invalidateQueries({ queryKey: ['payments'] });
        },
    });
};