'use client';

import { Button } from '@/shared/components/ui/button';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/shared/components/ui/alert-dialog';
import { useDeletePropertyMutation } from '@/lib/data-service/property/property.queries';
import { useState } from 'react';
import { toast } from 'sonner';

interface DeletePropertyModalProps {
    isOpen: boolean;
    onClose: () => void;
    propertyId: string;
    propertyName: string;
}

export const DeletePropertyModal = ({ 
    isOpen, 
    onClose, 
    propertyId, 
    propertyName 
}: DeletePropertyModalProps) => {
    const [isDeleting, setIsDeleting] = useState(false);
    const deletePropertyMutation = useDeletePropertyMutation();

    const handleDelete = async () => {
        try {
            setIsDeleting(true);
            await deletePropertyMutation.mutateAsync(propertyId);
            toast.success(`Le bien "${propertyName}" a été supprimé avec succès`);
            onClose();
        } catch (error) {
            console.error('Erreur lors de la suppression:', error);
            toast.error('Erreur lors de la suppression du bien. Veuillez réessayer.');
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
                            Êtes-vous sûr de vouloir supprimer le bien <strong>"{propertyName}"</strong> ?
                            <br />
                            <br />
                            Cette action est irréversible et supprimera définitivement toutes les données associées à ce bien.
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
