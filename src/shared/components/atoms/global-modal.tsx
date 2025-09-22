// components/global-modal.tsx
'use client';

import { useModalStore } from '@/shared/store/useModalStore';
import { Dialog, DialogContent } from '../ui/dialog';
import { cn } from '@/shared/lib/utils';

const GlobalModal = () => {
    const { isOpen, views, goBackModal, isOverlayCanClosed } = useModalStore();

    return (
        <Dialog
            open={isOpen}
            onOpenChange={isOverlayCanClosed ? goBackModal : undefined}
        >
            {/* Pile de modales */}
            {views.map((view, index) => {
                const isTop = index === views.length - 1;

                return (
                    <DialogContent
                        key={index}
                        className={cn(
                            'min-w-fit transition-all duration-300',
                            !isTop &&
                                'pointer-events-none scale-[0.97] opacity-70 blur-[1px]'
                        )}
                        style={{
                            zIndex: 100 + index
                        }}
                    >
                        {view}
                    </DialogContent>
                );
            })}
        </Dialog>
    );
};

export default GlobalModal;
