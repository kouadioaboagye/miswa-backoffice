// import { paths } from '@/config/app-route.config';
// import { refreshToken } from '@/features/auth/api/sign-in.api';
import axios from 'axios';
import { getSession } from 'next-auth/react';

const apiClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: { 'Content-Type': 'application/json' },
    timeout: 10000
});

// Intercepteur de requête avec débogage amélioré
apiClient.interceptors.request.use(
    async (config) => {
        try {
            const session = await getSession();
            const accessToken = session?.user?.accessToken;

            if (accessToken && config?.headers) {
                config.headers.Authorization = `Bearer ${accessToken}`;
            }
        } catch (error) {
            console.log('ERROR in request interceptor:', error);
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default apiClient;
