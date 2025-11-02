// store/useModalStore.ts
import type { ReactNode } from 'react';
import { create } from 'zustand';

type OpenAlertProps = {
    title: string;
    description: string | ReactNode;
    onConfirm: () => void;
    onClose: () => void;
    className?: string;
    variant?: 'default' | 'error' | 'warning';
    cancelButtonTitle?: string;
    approveButtonTitle?: string;
};

export interface AlertSlice {
    title: string;
    isOpen: boolean;
    description: string | ReactNode;
    onConfirm: () => void;
    onClose: () => void;
    className?: string;
    variant: 'default' | 'error' | 'warning';
    cancelButtonTitle: string;
    approveButtonTitle: string;
    openAlert: (data: OpenAlertProps) => void;
    closeAlert: () => void;
}

export const useAlertStore = create<AlertSlice>((set) => ({
    isOpen: false,
    title: '',
    variant: 'default',
    description: '',
    onConfirm: () => {},
    onClose: () => {},
    className: '',
    cancelButtonTitle: 'Non, fermer',
    approveButtonTitle: 'Oui, Continuer',

    openAlert: ({
        title,
        description,
        onConfirm,
        onClose,
        variant,
        className,
        cancelButtonTitle,
        approveButtonTitle
    }) =>
        set(() => ({
            isOpen: true,
            title: title ?? '',
            description: description ?? '',
            onConfirm: onConfirm ?? (() => {}),
            onClose: onClose ?? (() => {}),
            variant: variant ?? 'default',
            className: className ?? '',
            cancelButtonTitle: cancelButtonTitle ?? 'Non, fermer',
            approveButtonTitle: approveButtonTitle ?? 'Oui, créer la fiche'
        })),

    closeAlert: () =>
        set(() => ({
            isOpen: false,
            title: '',
            description: '',
            onConfirm: () => {},
            onClose: () => {}
        }))
}));
