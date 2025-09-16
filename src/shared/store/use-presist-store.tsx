import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type TokenState = {
    token: string | null;
    setToken: (newToken: string | null) => void;
    clearToken: () => void;
};

const useTokenStore = create<TokenState>()(
    persist(
        (set) => ({
            token: null,
            setToken: (newToken) => set({ token: newToken }),
            clearToken: () => set({ token: null })
        }),
        {
            name: 'token-storage', // nom de la clé dans le localStorage
            partialize: (state) => ({ token: state.token }) // on ne persiste que le token
        }
    )
);

export default useTokenStore;
