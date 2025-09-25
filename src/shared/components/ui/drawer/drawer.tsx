// import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle
} from '../sheet';
import React from 'react';

type DrawerProps = {
    children?: React.ReactNode;
    open: boolean;
    onClose: () => void;
    title?: string;
    description?: string; // Description optionnelle
    trigger?: React.ReactNode; // Icône ou bouton pour ouvrir le Drawer
    triggerClassName?: string; // Classes CSS pour personnaliser le trigger
};

export function Drawer({
    children,
    open,
    onClose,
    title = 'Drawer Title',
    description,
    trigger,
    triggerClassName
}: DrawerProps) {
    return (
        <>
            {/* Rendu du trigger */}
            {trigger && (
                <div
                    onClick={onClose}
                    className={`cursor-pointer ${triggerClassName || ''} `}
                >
                    {trigger}
                </div>
            )}

            {/* Le contenu du Drawer */}
            <Sheet open={open} onOpenChange={onClose}>
                <SheetContent className="h-full w-[40rem] overflow-y-scroll bg-white p-6">
                    <SheetHeader className="mb-6 gap-4">
                        <SheetTitle className="text-center text-[2rem] font-bold">
                            {title}
                        </SheetTitle>
                        {/* <Separator /> */}
                        {description && (
                            <SheetDescription className="mt-2 text-center text-2xl font-normal text-[#A1A4A5]">
                                {description}
                            </SheetDescription>
                        )}
                    </SheetHeader>
                    <div className="mt-4">{children}</div>
                </SheetContent>
            </Sheet>
        </>
    );
}
