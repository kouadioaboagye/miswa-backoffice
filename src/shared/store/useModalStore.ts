// store/useModalStore.ts
import type { ReactNode } from 'react';
import { create } from 'zustand';

type OpenModalProps = {
    view: ReactNode;
    isOverlayCanClosed?: boolean;
};

interface ModalSlice {
    isOpen: boolean;
    views: ReactNode[];
    isOverlayCanClosed: boolean;

    openModal: (data: OpenModalProps) => void;
    closeModal: () => void;
    goBackModal: () => void;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createModalSlice = (set: any): ModalSlice => ({
    isOpen: false,
    views: [],
    isOverlayCanClosed: true,

    openModal: ({ view, isOverlayCanClosed }) =>
        set((state: ModalSlice) => ({
            isOpen: true,
            views: [...state.views, view],
            isOverlayCanClosed: isOverlayCanClosed ?? true
        })),

    closeModal: () =>
        set(() => ({
            isOpen: false,
            views: []
        })),

    goBackModal: () =>
        set((state: ModalSlice) => {
            const newViews = [...state.views];
            void newViews.pop();
            return {
                isOpen: newViews.length > 0,
                views: newViews
            };
        })
});

export const useModalStore = create<ModalSlice>((set) => ({
    ...createModalSlice(set)
}));
