'use client';

import { Badge } from '@/shared/components/ui/badge';
import type { ColumnDef } from '@tanstack/react-table';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import EyeIcon2 from '../../../../../../../../public/assets/icons/eye-icon-2';
import EditIcon from '../../../../../../../../public/assets/icons/edit-icon';
import DeleteIcon2 from '../../../../../../../../public/assets/icons/delete-icon-2';
import { IOwnerDataModel } from '@/lib/data-service/module/owner/types';
import { useDeleteOwnerMutation } from '@/lib/data-service/module/owner/owner.queries';
import { toast } from 'sonner';
import ConfirmModal from '@/shared/components/ui/confirm-modal';

export type Owner = IOwnerDataModel;

const OwnerActions = ({ owner }: { owner: Owner }) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const router = useRouter();
  const deleteOwnerMutation = useDeleteOwnerMutation();

  const handleDetails = () => {
    router.push(`/admin/module/owner/details/${owner.id}`);
  };

  const handleEdit = () => {
    router.push(`/admin/module/owner/edit/${owner.id}`);
  };

const handleDelete = async () => {
  try {
    await deleteOwnerMutation.mutateAsync(owner.id);
    toast.success(`Propriétaire "${owner.name}" supprimé avec succès.`);
  } catch (error: any) {
    const errorMessage = error.detail 
      ? error.detail.label_fr 
      : 'Erreur lors de la suppression du propriétaire.';
    toast.error(errorMessage);
  } finally {
    setIsDeleteModalOpen(false);
  }
};

  return (
    <>
      <div className="flex items-center gap-6">
        <button
          aria-label={`Voir les détails de ${owner.name}`}
          className="flex size-12 items-center justify-center rounded-full bg-[#1EA64A]/10 hover:bg-[#1EA64A]/20 transition-colors"
          onClick={handleDetails}
        >
          <EyeIcon2 />
        </button>
        <button
          aria-label={`Modifier ${owner.name}`}
          className="flex size-12 items-center justify-center rounded-full bg-[#5D5FEF]/10 hover:bg-[#5D5FEF]/20 transition-colors"
          onClick={handleEdit}
        >
          <EditIcon />
        </button>
        <button
          aria-label={`Supprimer ${owner.name}`}
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
        message={`Attention vous souhaitez supprimer le bien ${owner.name}, si vous validez, ce bien disparaitra de la liste des biens.`}
        confirmText="Supprimer"
        onConfirm={handleDelete}
        cancelText="Annuler"
        variant="danger"
      />
    </>
  );
};

export const columns: ColumnDef<Owner>[] = [
  {
    id: 'name',
    accessorKey: 'name',
    header: () => <span className="text-lg font-semibold text-sm">Nom</span>,
    cell: ({ row }) => (
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
          <span className="text-sm font-medium text-gray-600">
            {row.original.name.charAt(0).toUpperCase()}
          </span>
        </div>
        <div>
          <p className="text-lg font-medium text-sm">{row.original.name}</p>
          <p className="text-sm text-gray-500">{row.original.description || '-'}</p>
        </div>
      </div>
    ),
  },
  {
    id: 'legal_name',
    accessorKey: 'owner.legal_name',
    header: () => <span className="text-lg font-semibold text-sm">Nom Légal</span>,
    cell: ({ row }) => (
      <span className="text-lg font-medium text-sm">{row.original.owner?.legal_name || '-'}</span>
    ),
  },
  {
    id: 'legal_form',
    accessorKey: 'owner.legal_form',
    header: () => <span className="text-lg font-semibold text-sm">Type</span>,
    cell: ({ row }) => {
      const legalForm = row.original.owner?.legal_form;
      const isIndividual = legalForm === 'individuals';
      return (
        <Badge
          variant={isIndividual ? 'default' : 'secondary'}
          className={isIndividual ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}
        >
          {isIndividual ? 'Particulier' : 'Entreprise'}
        </Badge>
      );
    },
  },
  {
    id: 'phonenumber',
    accessorKey: 'owner.phonenumber',
    header: () => <span className="text-lg font-semibold text-sm">Téléphone</span>,
    cell: ({ row }) => (
      <span className="text-lg font-medium text-sm">{row.original.owner?.phonenumber || '-'}</span>
    ),
  },
  {
    id: 'email',
    accessorKey: 'owner.email',
    header: () => <span className="text-lg font-semibold text-sm">Email</span>,
    cell: ({ row }) => (
      <span className="text-lg font-medium text-sm">{row.original.owner?.email || '-'}</span>
    ),
  },
  {
    id: 'profession',
    accessorKey: 'owner.profession',
    header: () => <span className="text-lg font-semibold text-sm">Profession</span>,
    cell: ({ row }) => (
      <span className="text-lg font-medium text-sm">{row.original.owner?.profession || '-'}</span>
    ),
  },
  {
    id: 'actions',
    accessorKey: 'actions',
    header: () => <span className="text-lg font-semibold text-sm">Actions</span>,
    cell: ({ row }) => <OwnerActions owner={row.original} />,
  },
];