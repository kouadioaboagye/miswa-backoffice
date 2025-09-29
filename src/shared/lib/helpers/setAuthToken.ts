import Axios from '@/shared/lib/axios';

export const setAuthToken = (token: string | null) => {
    if (token) {
        Axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    } else {
        delete Axios.defaults.headers.common.Authorization;
    }
};
