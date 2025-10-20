"use client";

import Illustration from '@/shared/components/atoms/illustration';
import { Badge } from '@/shared/components/ui/badge';
import type { ColumnDef } from '@tanstack/react-table';
import { formatDate } from 'date-fns';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import EyeIcon2 from '../../../../../../../../../public/assets/icons/eye-icon-2';
import EditIcon from '../../../../../../../../../public/assets/icons/edit-icon';
import DeleteIcon2 from '../../../../../../../../../public/assets/icons/delete-icon-2';
import ConfirmModal from '@/shared/components/ui/confirm-modal';
import { toast } from 'sonner';
import { IAssetDataModel } from '@/lib/data-service/property/types';
import { fetchWrapper } from '@/lib/http-client/ fetchWrapper';

export type Apartment = Partial<IAssetDataModel> & {
    id: string | number;
    name: string;
    cover_url?: string;
    is_busy: boolean;
    business?: {
        name: string;
        owner?: {
            legal_name: string;
        };
    };
    created_at: string;
};

export const columns: ColumnDef<Apartment>[] = [
    {
        id: 'cover_url',
        accessorKey: 'cover_url',
        header: () => <span className="text-lg font-semibold" style={{ fontSize: '14px' }}>Biens</span>,
        cell: ({ row }) => (
            <Illustration
                src={row.original.cover_url || 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=604&h=550&fit=crop&crop=center'}
                libelle={row.original.name}
            />
        )
    },
    {
        id: 'name',
        accessorKey: 'name',
        header: () => <span className="text-lg font-semibold" style={{ fontSize: '14px' }}>Nom</span>,
        cell: ({ row }) => (
            <span className="text-lg font-medium" style={{ fontSize: '14px' }}>{row.original.name}</span>
        )
    },
    {
        id: 'owner',
        accessorKey: 'business',
        header: () => <span className="text-lg font-semibold" style={{ fontSize: '14px' }}>Propriétaire</span>,
        cell: ({ row }) => (
            <div>
                <p className="text-lg font-medium" style={{ fontSize: '14px' }}>{row.original.business?.name || '-'}</p>
                <p className="text-sm text-gray-500">{row.original.business?.owner?.legal_name || '-'}</p>
            </div>
        )
    },
    {
        id: 'created_at',
        accessorKey: 'created_at',
        header: () => <span className="text-lg font-semibold" style={{ fontSize: '14px' }}>Ajouté le</span>,
        cell: ({ row }) => (
            <span className="text-lg" style={{ fontSize: '14px' }}>{formatDate(row.original.created_at, 'dd/MM/yyyy')}</span>
        )
    },
    {
        id: 'status',
        accessorKey: 'is_busy',
        header: () => <span className="text-lg font-semibold" style={{ fontSize: '14px' }}>Statut</span>,
        cell: ({ row }) => (
            <Badge
                variant={row.original.is_busy ? 'default' : 'success'}
                className="text-lg font-medium"
                style={{ fontSize: '14px' }}
            >
                {row.original.is_busy ? 'Occupé' : 'Libre'}
            </Badge>
        )
    },
    {
        id: 'actions',
        accessorKey: '',
        header: () => <span className="text-lg font-semibold" style={{ fontSize: '14px' }}>Actions</span>,
        cell: ({ row }) => {
            const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
            const router = useRouter();

            const handleDetails = () => {
                router.push(`/admin/module/property/asset/details/${String(row.original.id)}`);
            };

            const handleEdit = () => {
                router.push(`/admin/module/property/asset/edit/${String(row.original.id)}`);
            };

            const handleDelete = async () => {
                try {
                    await fetchWrapper(`properties/${row.original.id}/force/`, {
                        method: 'DELETE',
                    });
                    toast.success('Appartement supprimé avec succès.');
                    setIsDeleteModalOpen(false);
                } catch (error: any) {
                    setIsDeleteModalOpen(false);
                    toast.error(error instanceof Error ? error.message : 'Oops, une erreur est survenue lors de la suppression.');
                }
            };

            return (
                <>
                    <div className="flex items-center gap-6">
                        <button
                            className="flex size-12 items-center justify-center rounded-full bg-[#1EA64A]/10 hover:bg-[#1EA64A]/20 transition-colors"
                            onClick={handleDetails}
                            title="Voir les détails"
                        >
                            <EyeIcon2 />
                        </button>
                        <button
                            className="flex size-12 items-center justify-center rounded-full bg-[#5D5FEF]/10 hover:bg-[#5D5FEF]/20 transition-colors"
                            onClick={handleEdit}
                            title="Modifier"
                        >
                            <EditIcon />
                        </button>
                        <button
                            className="flex size-12 items-center justify-center rounded-full bg-[#FF0000]/10 hover:bg-[#FF0000]/20 transition-colors"
                            onClick={() => setIsDeleteModalOpen(true)}
                            title="Supprimer"
                        >
                            <DeleteIcon2 />
                        </button>
                    </div>
                    <ConfirmModal
                        isOpen={isDeleteModalOpen}
                        onClose={() => setIsDeleteModalOpen(false)}
                        title="Attention"
                        message={`Attention vous souhaitez supprimer l'appartement ${row.original.name}, si vous validez, cet appartement disparaitra de la liste des appartements.`}
                        confirmText="Supprimer"
                        onConfirm={handleDelete}
                        cancelText="Annuler"
                        variant="danger"
                    />
                </>
            );
        }
    }
];