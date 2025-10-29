// import { paths } from '@/config/app-route.config';
// import { refreshToken } from '@/features/auth/api/sign-in.api';
import axios from 'axios';
import { getSession } from 'next-auth/react';

const apiClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
        'Content-Type': 'application/json',
        'x-platform': 'api',
        'x-platform-token': 'api'
    },
    timeout: 50000
});

// Intercepteur de requête avec débogage amélioré
apiClient.interceptors.request.use(async (request) => {
    if (!request.headers['Authorization']) {
        const session = await getSession();
        const token = session?.user?.access_token;
        console.log('token from interceptor', token);
        if (token) {
            request.headers['Authorization'] = `Bearer ${token}`;
        }
    }

    return request;
});

export default apiClient;
