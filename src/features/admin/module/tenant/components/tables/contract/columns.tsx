'use client';

import Illustration from '@/shared/components/atoms/illustration';
import { Badge } from '@/shared/components/ui/badge';
import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import ConfirmModal from '@/shared/components/ui/confirm-modal';
import { useDeleteContractMutation } from '@/lib/data-service/contract/contract.queries';
import EyeIcon2 from '../../../../../../../../public/assets/icons/eye-icon-2';
import EditIcon from '../../../../../../../../public/assets/icons/edit-icon';
import DeleteIcon2 from '../../../../../../../../public/assets/icons/delete-icon-2';

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

// Mock data for 20 contracts
export const fakeContracts: Contract[] = Array.from({ length: 20 }).map((_, idx) => ({
    id: `contract-${idx + 1}`,
    reference: `CONTRACT-${1000 + idx + 1}`,
    type: "Bail de location",
    property: {
        name: `Appartement Cité AGC ${idx + 1}`,
        cover_url: `https://picsum.photos/1024/1024?random=${idx + 1}`
    },
    start_date: new Date(Date.now() - idx * 24 * 60 * 60 * 1000).toISOString(),
    status: idx % 3 === 0 ? 'En cours' : idx % 3 === 1 ? 'Terminé' : 'En attente'
}));

const ContractActions = ({ contract }: { contract: Contract }) => {
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const router = useRouter();
    const deleteContractMutation = useDeleteContractMutation();

    const handleDetails = () => {
        router.push(`/admin/module/tenant/contracts/details/${String(contract.id)}`);
    };

    const handleEdit = () => {
        router.push(`/admin/module/tenant/contracts/edit/${String(contract.id)}`);
    };

    const handleDelete = async () => {
        try {
            await deleteContractMutation.mutateAsync(String(contract.id));
            toast.success(`Le contrat "${contract.reference}" a été supprimé avec succès`);
            setIsDeleteModalOpen(false);
        } catch {
            toast.error('Erreur lors de la suppression du contrat. Veuillez réessayer.');
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
                message={`Attention, vous souhaitez supprimer le contrat ${contract.reference}, si vous validez, ce contrat disparaîtra de la liste des contrats.`}
                confirmText="Supprimer"
                onConfirm={handleDelete}
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
                    'secondary'
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
        accessorKey: 'actions',
        header: () => <span className="text-lg font-semibold" style={{ fontSize: '14px' }}>Actions</span>,
        cell: ({ row }) => <ContractActions contract={row.original} />,
    },
];