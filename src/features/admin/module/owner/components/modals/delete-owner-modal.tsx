'use client';

import { Button } from '@/shared/components/ui/button';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/shared/components/ui/alert-dialog';
import { useDeleteOwnerMutation } from '@/lib/data-service/module/owner/owner.queries';
import { useState } from 'react';
import { toast } from 'sonner';

interface DeleteOwnerModalProps {
    isOpen: boolean;
    onClose: () => void;
    ownerId: number;
    ownerName: string;
}

export const DeleteOwnerModal = ({ 
    isOpen, 
    onClose, 
    ownerId, 
    ownerName 
}: DeleteOwnerModalProps) => {
    const [isDeleting, setIsDeleting] = useState(false);
    const deleteOwnerMutation = useDeleteOwnerMutation();

    const handleDelete = async () => {
        try {
            setIsDeleting(true);
            await deleteOwnerMutation.mutateAsync(ownerId);
            toast.success(`Le propriétaire "${ownerName}" a été supprimé avec succès`);
            onClose();
        } catch (error) {
            console.error('Erreur lors de la suppression:', error);
            toast.error('Erreur lors de la suppression du propriétaire. Veuillez réessayer.');
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <AlertDialog open={isOpen} onOpenChange={onClose}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle className="text-lg font-semibold">
                        <p> Confirmer la suppression</p>
                    </AlertDialogTitle>
                    <AlertDialogDescription className="text-base leading-relaxed">
                        <p>
                            Êtes-vous sûr de vouloir supprimer le propriétaire <strong>"{ownerName}"</strong> ?
                            <br />
                            <br />
                            Cette action est irréversible et supprimera définitivement toutes les données associées à ce propriétaire.
                        </p>
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel disabled={isDeleting}>
                        Annuler
                    </AlertDialogCancel>
                    <AlertDialogAction asChild>
                        <Button 
                            variant="destructive" 
                            onClick={handleDelete}
                            disabled={isDeleting}
                            className="bg-red-600 hover:bg-red-700"
                        >
                            {isDeleting ? 'Suppression...' : 'Supprimer'}
                        </Button>
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};
