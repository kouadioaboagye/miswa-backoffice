import apiClient from '@/shared/lib/axios';

export const postLogin = async (data: { email: string; password: string }) => {
    const response = await apiClient.post('/api/auth/sign-in', data);
    return response?.data;
};
