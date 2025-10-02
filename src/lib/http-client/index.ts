import axios from 'axios';
import { getAuthSession } from '../auth/utils';

const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
        'Content-Type': 'application/json',
        'x-platform': 'api',
        'x-platform-token': 'api'
    },
});

export const httpClient = axiosInstance;
export const httpAuthClient = () => {
    const session = getAuthSession()
    if(session) {
        axiosInstance.defaults.headers.common['Authorization'] = session?.token;
    }
    return axiosInstance
}