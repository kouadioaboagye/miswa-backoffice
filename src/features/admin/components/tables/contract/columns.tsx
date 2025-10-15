'use client';

import Illustration from '@/shared/components/atoms/illustration';
import { Badge } from '@/shared/components/ui/badge';
import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import DeleteIcon2 from '../../../../../../public/assets/icons/delete-icon-2';
import EditIcon from '../../../../../../public/assets/icons/edit-icon';
import EyeIcon2 from '../../../../../../public/assets/icons/eye-icon-2';
import { IContractDataModel } from '@/lib/data-service/contract/types';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { fetchWrapper } from '@/lib/http-client/ fetchWrapper';
import ConfirmModal from '@/shared/components/ui/confirm-modal';

export type Contract = {
    id: string | number;
    reference: string;
    type: string;
    property?: {
        name: string;
        cover_url?: string;
    };
    start_date: string;
    status: 'En cours' | 'Terminé' | 'En attente';
};


const ContractActions = ({ contract }: { contract: Contract }) => {
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const router = useRouter();

    const handleDetails = () => {
        router.push(`/admin/module/tenant/contracts/details/${String(contract.id)}`);
    };

    const handleEdit = () => {
        router.push(`/admin/module/tenant/contracts/edit/${String(contract.id)}`);
    };

    const handleDelete = async () => {
        try {
            await fetchWrapper(`contracts/${contract.id}/force/`, {
                method: 'DELETE',
            });
            toast.success('Contrat supprimé avec succès.');
            setIsDeleteModalOpen(false);
        } catch (error: any) {
            toast.error(error instanceof Error ? error.message : 'Erreur lors de la suppression du contrat.');
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
                message={`Attention vous souhaitez supprimer le contrat [Nom_de_l’annonces], si vous validez, ce contrat disparaitra de la liste des contrats.`}
                confirmText="Supprimer"
                onConfirm={() => handleDelete}
                cancelText="Annuler"
                variant="danger"
            />
        </>
    );
};

export const columns: ColumnDef<Contract>[] = [
        {
        id: 'reference',
        accessorKey: 'reference',
        header: () => <span className="text-lg font-semibold" style={{ fontSize: '14px' }}>Référence</span>,
        cell: ({ row }) => (
            <span className="text-lg font-medium text-[#0088FF] underline" style={{ fontSize: '14px' }}>{row.original.reference}</span>
        ),
    },
            {
        id: 'type',
        accessorKey: 'type',
        header: () => <span className="text-lg font-semibold" style={{ fontSize: '14px' }}>Type</span>,
        cell: ({ row }) => (
            <span className="text-lg font-medium" style={{ fontSize: '14px' }}>{row.original.type}</span>
        ),
    },
    {
        id: 'property_cover',
        accessorKey: 'property.cover_url',
        header: () => <span className="text-lg font-semibold" style={{ fontSize: '14px' }}>Bien</span>,
        cell: ({ row }) => (
            <Illustration
                src={row.original.property?.cover_url ?? 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=604&h=550&fit=crop&crop=center'}
                libelle={row.original.property?.name || ""}
            />
        ),
    },
    {
        id: 'start_date',
        accessorKey: 'start_date',
        header: () => <span className="text-lg font-semibold" style={{ fontSize: '14px' }}>Date de début</span>,
        cell: ({ row }) => (
            <span className="text-lg" style={{ fontSize: '14px' }}>
                {format(new Date(row.original.start_date), 'dd/MM/yyyy')}
            </span>
        ),
    },
    {
        id: 'status',
        accessorKey: 'status',
        header: () => <span className="text-lg font-semibold" style={{ fontSize: '14px' }}>Statut</span>,
        cell: ({ row }) => (
            <Badge
                variant={
                    row.original.status === 'En cours' ? 'success' :
                        row.original.status === 'Terminé' ? 'failed' :
                            'pending'
                }
                className="text-lg font-medium"
                style={{ fontSize: '14px' }}
            >
                {row.original.status}
            </Badge>
        ),
    },
    {
        id: 'actions',
        accessorKey: '',
        header: () => <span className="text-lg font-semibold" style={{ fontSize: '14px' }}>Actions</span>,
        cell: ({ row }) => <ContractActions contract={row.original} />,
    },
];