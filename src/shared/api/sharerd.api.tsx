import { useMutation } from '@tanstack/react-query';
import apiClient from '../lib/axios';
import { endpoints } from './endpoints';

export const CheckOtp = async ({
    user_id,
    otpCode
}: {
    user_id: string;
    otpCode: string;
}) => {
    const response = await apiClient.post(endpoints.code_otp, {
        user_id,
        otpCode
    });
    return response.data;
};

export const useCheckOtp = ({
    onSuccess,
    onError
}: { onSuccess?: () => void; onError?: () => void } = {}) => {
    return useMutation({
        mutationFn: (variables: { user_id: string; otpCode: string }) =>
            CheckOtp(variables),
        onSuccess,
        onError
    });
};

export const ResendOtp = async (user_id: string) => {
    const response = await apiClient.post(endpoints.resend_otp, {
        user_id
    });
    return response.data;
};

export const useResendOtp = ({
    onSuccess,
    onError
}: { onSuccess?: () => void; onError?: () => void } = {}) => {
    return useMutation({
        mutationFn: ResendOtp,
        onSuccess,
        onError
    });
};
