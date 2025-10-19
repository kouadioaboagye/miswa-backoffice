'use client';

import Illustration from '@/shared/components/atoms/illustration';
import type { ColumnDef } from '@tanstack/react-table';
import { formatDate } from 'date-fns';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import EyeIcon2 from '../../../../../../../public/assets/icons/eye-icon-2';
import EditIcon from '../../../../../../../public/assets/icons/edit-icon';
import DeleteIcon2 from '../../../../../../../public/assets/icons/delete-icon-2';
import { Badge } from '@/shared/components/ui/badge';
import ConfirmModal from '@/shared/components/ui/confirm-modal';
import { useDeleteAdvertisementMutation } from '@/lib/data-service/module/advertisement/advertisement.queries.ts';

export type Ad = {
    id: string;
    owner: {
        firstname: string;
        lastname: string;
        cover_url: string;
        email?: string;
    };
    property: {
        id: string;
        name: string;
        cover_url: string;
    };
    building_reference: string;
    posting_date: string;
    visit_count: number;
    status: string;
};

const AdActions = ({ ad }: { ad: Ad }) => {
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const router = useRouter();
    const deleteAdMutation = useDeleteAdvertisementMutation();

    const handleDetails = () => {
        router.push(`/admin/module/advertisement/details/${String(ad.id)}`);
    };

    const handleEdit = () => {
        router.push(`/admin/module/advertisement/edit/${String(ad.id)}`);
    };

    const handleDelete = async () => {
        try {
            await deleteAdMutation.mutateAsync(String(ad.id));
            toast.success(`L'annonce "${ad.building_reference}" a été supprimée avec succès`);
            setIsDeleteModalOpen(false);
        } catch {
            toast.error('Erreur lors de la suppression de l’annonce. Veuillez réessayer.');
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
                message={`Attention, vous souhaitez supprimer l'annonce ${ad.building_reference}, si vous validez, cette annonce disparaîtra de la liste des annonces.`}
                confirmText="Supprimer"
                onConfirm={handleDelete}
                cancelText="Annuler"
                variant="danger"
            />
        </>
    );
};

export const columns: ColumnDef<Ad>[] = [
    {
        id: 'owner',
        accessorKey: 'owner',
        header: () => <span className="text-lg font-semibold" style={{ fontSize: '14px' }}>Propriétaires</span>,
        cell: ({ row }) => (
            <Illustration
                src={row.original.owner.cover_url || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=604&h=550&fit=crop&crop=center'}
                libelle={`${row.original.owner.firstname} ${row.original.owner.lastname}`}
                email={row.original.owner.email}
            />
        ),
    },
    {
        id: 'property',
        accessorKey: 'property',
        header: () => <span className="text-lg font-semibold" style={{ fontSize: '14px' }}>Biens</span>,
        cell: ({ row }) => (
            <Illustration
                src={row.original.property.cover_url || 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=604&h=550&fit=crop&crop=center'}
                libelle={row.original.property.name}
            />
        ),
    },
    {
        id: 'building_reference',
        accessorKey: 'building_reference',
        header: () => <span className="text-lg font-semibold" style={{ fontSize: '14px' }}>Références de l'immeuble</span>,
        cell: ({ row }) => (
            <span className="text-lg font-medium" style={{ fontSize: '14px' }}>{row.original.building_reference}</span>
        ),
    },
    {
        id: 'posting_date',
        accessorKey: 'posting_date',
        header: () => <span className="text-lg font-semibold" style={{ fontSize: '14px' }}>Date de mise en annonces</span>,
        cell: ({ row }) => (
            <span className="text-lg" style={{ fontSize: '14px' }}>
                {row.original.posting_date ? formatDate(row.original.posting_date, 'dd/MM/yyyy') : '-'}
            </span>
        ),
    },
    {
        id: 'visit_count',
        accessorKey: 'visit_count',
        header: () => <span className="text-lg font-semibold" style={{ fontSize: '14px' }}>Nbre visite</span>,
        cell: ({ row }) => (
            <span className="text-lg font-medium" style={{ fontSize: '14px' }}>{row.original.visit_count}</span>
        ),
    },
    {
        id: 'status',
        accessorKey: 'status',
        header: () => <span className="text-lg font-semibold" style={{ fontSize: '14px' }}>Statut</span>,
        cell: ({ row }) => {
            let variant: 'success' | 'failed' | 'secondary' = 'secondary';
            let status = row.original.status;

            if (status === 'Active') {
                variant = 'success';
                status = 'En cours';
            } else if (status === 'Archived') {
                variant = 'failed';
                status = 'Archivé';
            } else if (status === 'Draft') {
                variant = 'secondary';
                status = 'Brouillon';
            }

            return (
                <Badge variant={variant} className="text-lg font-medium" style={{ fontSize: '14px' }}>
                    {status}
                </Badge>
            );
        },
    },
    {
        id: 'actions',
        accessorKey: 'actions',
        header: () => <span className="text-lg font-semibold" style={{ fontSize: '14px' }}>Actions</span>,
        cell: ({ row }) => <AdActions ad={row.original} />,
    },
];