'use client';

import Illustration from '@/shared/components/atoms/illustration';
import { Badge } from '@/shared/components/ui/badge';
import type { ColumnDef } from '@tanstack/react-table';
import { formatDate } from 'date-fns';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import EyeIcon2 from '../../../../../../public/assets/icons/eye-icon-2';
import EditIcon from '../../../../../../public/assets/icons/edit-icon';
import DeleteIcon2 from '../../../../../../public/assets/icons/delete-icon-2';
import ConfirmModal from '@/shared/components/ui/confirm-modal';
import { toast } from 'sonner';
import { useDeletePaymentMutation } from '@/lib/data-service/payment/payment.queries';

export type Payment = {
    id: string;
    user: {
        fullName: string;
        email: string;
        img: string;
    };
    motif: string;
    property: {
        libelle: string;
        img: string;
    };
    createdAt: string;
    status: string;
    amount?: string;
};

export const fakePayments: Payment[] = Array.from({ length: 20 }).map((_, idx) => ({
    id: `payment-${idx + 1}`,
    user: {
        fullName: `Utilisateur ${idx + 1}`,
        email: `user-${idx + 1}@example.com`,
        img: `https://picsum.photos/1024/1024?random=${idx + 1}`
    },
    motif: `Paiement loyer ${idx + 1}`,
    property: {
        libelle: `Appartement cité AGC ${idx + 1}`,
        img: `https://picsum.photos/1024/1024?random=${idx + 2}`
    },
    createdAt: new Date(2025, 0, idx + 1).toISOString(),
    status: idx % 3 === 0 ? 'En attente' : idx % 3 === 1 ? 'Terminé' : 'Échouée',
    amount: `${(Math.random() * 1000 + 500).toFixed(0)} FCFA`
}));

const PaymentActions = ({ payment }: { payment: Payment }) => {
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const router = useRouter();
    const deletePaymentMutation = useDeletePaymentMutation();

    const handleDetails = () => {
        router.push(`/admin/module/payment/details/${String(payment.id)}`);
    };

    const handleEdit = () => {
        router.push(`/admin/module/payment/edit/${String(payment.id)}`);
    };

    const handleDelete = async () => {
        try {
            await deletePaymentMutation.mutateAsync(String(payment.id));
            toast.success(`Le paiement "${payment.motif}" a été supprimé avec succès`);
        } catch {
            toast.error('Erreur lors de la suppression du paiement. Veuillez réessayer.');
        } finally {
            setIsDeleteModalOpen(false);
        }
    };

    return (
        <>
            <div className="flex items-center gap-6">
                <button
                    className="flex size-12 items-center justify-center rounded-full bg-[#1EA64A]/10 hover:bg-[#1EA64A]/20 transition-colors"
                    onClick={handleDetails}
                >
                    <EyeIcon2 />
                </button>
                <button
                    className="flex size-12 items-center justify-center rounded-full bg-[#5D5FEF]/10 hover:bg-[#5D5FEF]/20 transition-colors"
                    onClick={handleEdit}
                >
                    <EditIcon />
                </button>
                <button
                    className="flex size-12 items-center justify-center rounded-full bg-[#FF0000]/10 hover:bg-[#FF0000]/20 transition-colors"
                    onClick={() => setIsDeleteModalOpen(true)}
                >
                    <DeleteIcon2 />
                </button>
            </div>

            <ConfirmModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                title="Attention"
                message={`Attention, vous souhaitez supprimer le paiement ${payment.motif}, si vous validez, ce paiement disparaîtra de la liste des paiements.`}
                confirmText="Supprimer"
                onConfirm={handleDelete}
                cancelText="Annuler"
                variant="danger"
            />
        </>
    );
};

export const columns: ColumnDef<Payment>[] = [
    {
        id: 'user',
        accessorKey: 'user',
        header: () => <span className="text-lg font-semibold" style={{ fontSize: '14px' }}>Utilisateur</span>,
        cell: ({ row }) => (
            <Illustration
                src={row.original.user.img || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=604&h=550&fit=crop&crop=center'}
                libelle={row.original.user.fullName}
                email={row.original.user.email}
            />
        )
    },
    {
        id: 'motif',
        accessorKey: 'motif',
        header: () => <span className="text-lg font-semibold" style={{ fontSize: '14px' }}>Motif</span>,
        cell: ({ row }) => (
            <span className="text-lg font-medium" style={{ fontSize: '14px', color: '#FF8D28' }}>
                {row.original.motif}
            </span>
        )
    },
    {
        id: 'property',
        accessorKey: 'property',
        header: () => <span className="text-lg font-semibold" style={{ fontSize: '14px' }}>Biens</span>,
        cell: ({ row }) => (
            <Illustration
                src={row.original.property.img || 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=604&h=550&fit=crop&crop=center'}
                libelle={row.original.property.libelle}
            />
        )
    },
    {
        id: 'amount',
        accessorKey: 'amount',
        header: () => <span className="text-lg font-semibold" style={{ fontSize: '14px' }}>Montant</span>,
        cell: ({ row }) => (
            <span className="text-lg font-medium" style={{ fontSize: '14px' }}>
                {row.original.amount || 'N/A'}
            </span>
        )
    },
    {
        id: 'createdAt',
        accessorKey: 'createdAt',
        header: () => <span className="text-lg font-semibold" style={{ fontSize: '14px' }}>Ajouté le</span>,
        cell: ({ row }) => (
            <span className="text-lg" style={{ fontSize: '14px' }}>
                {formatDate(row.original.createdAt, 'dd/MM/yyyy')}
            </span>
        )
    },
    {
        id: 'status',
        accessorKey: 'status',
        header: () => <span className="text-lg font-semibold" style={{ fontSize: '14px' }}>Statut</span>,
        cell: ({ row }) => (
            <Badge
                variant={
                    row.original.status === 'Échouée' ? 'failed' : 
                    row.original.status === 'En attente' ? 'secondary' : 'success'
                }
                className="text-lg font-medium"
                style={{ fontSize: '14px' }}
            >
                {row.original.status}
            </Badge>
        )
    },
    {
        id: 'actions',
        accessorKey: 'actions',
        header: () => <span className="text-lg font-semibold" style={{ fontSize: '14px' }}>Actions</span>,
        cell: ({ row }) => <PaymentActions payment={row.original} />,
    }
];