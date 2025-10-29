import apiClient from '@/shared/lib/axios';
import { endpoints } from '../endpoints';

export const Login = async (data: {
    username: string;
    password: string;
    login_role: string;
}) => {
    const response = await apiClient.post(endpoints.auth.login, data);
    return response.data;
};

export const getCurrentUser = async () => {
    const response = await apiClient.get(endpoints.auth.current_user);
    console.log('response', response);
    return response;
};
