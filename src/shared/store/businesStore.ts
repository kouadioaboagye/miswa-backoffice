import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type BusinessData = {
    company_name: string;
    commercial_register: string;
    legal_status: string;
    nationality: string;
    password: string;
};

type TData = {
    businessData: BusinessData;
    commercialRegister: File | null;
    dfe: File | null;
};

type BusinessStore = {
    data: TData;
    setBusinessData: (data: BusinessData) => void;
    setCommercialRegister: (file: File) => void;
    setDfe: (file: File) => void;
};

const useBusinessStore = create<BusinessStore>()(
    persist(
        (set) => ({
            data: {
                businessData: {
                    company_name: '',
                    commercial_register: '',
                    password: '',
                    legal_status: '',
                    nationality: ''
                },
                commercialRegister: null,
                dfe: null
            },
            setBusinessData: (businessData) =>
                set((state) => ({
                    data: {
                        ...state.data,
                        businessData
                    }
                })),
            setCommercialRegister: (file) =>
                set((state) => ({
                    data: {
                        ...state.data,
                        commercialRegister: file
                    }
                })),
            setDfe: (file) =>
                set((state) => ({
                    data: {
                        ...state.data,
                        dfe: file
                    }
                }))
        }),
        {
            name: 'business-storage', // clé dans sessionStorage
            storage: createJSONStorage(() => sessionStorage),
            partialize: (state) => ({
                // ⚠️ On ne sauvegarde que businessData (textes),
                // car les objets File ne peuvent pas être sérialisés
                data: {
                    businessData: state.data.businessData
                }
            })
        }
    )
);

export default useBusinessStore;
