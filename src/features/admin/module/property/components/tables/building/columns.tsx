"use client"

import Illustration from '@/shared/components/atoms/illustration';
import { Badge } from '@/shared/components/ui/badge';
import type { ColumnDef } from '@tanstack/react-table';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import EyeIcon2 from '../../../../../../../../public/assets/icons/eye-icon-2';
import EditIcon from '../../../../../../../../public/assets/icons/edit-icon';
import DeleteIcon2 from '../../../../../../../../public/assets/icons/delete-icon-2';
import ConfirmModal from '@/shared/components/ui/confirm-modal';
import { IBuildingDataModel } from '@/lib/data-service/property/types';
import { toast } from 'sonner';
import { fetchWrapper } from '@/lib/http-client/ fetchWrapper';
import { useDeleteBuildingMutation } from '@/lib/data-service/property/building.queries';

export type Building = IBuildingDataModel;

interface BuildingActionsProps {
  building: Building;
}

const BuildingActions = ({ building }: BuildingActionsProps) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const router = useRouter();
  const deleteBuildingMutation = useDeleteBuildingMutation();

  const handleDetails = () => {
    router.push(`/admin/module/property/building/details/${String(building.id)}`);
  };

  const handleEdit = () => {
    router.push(`/admin/module/property/building/edit/${String(building.id)}`);
  };

  const handleDelete = async () => {
    try {
      await deleteBuildingMutation.mutateAsync(String(building.id));
      toast.success('Bâtiment supprimé avec succès.');
      setIsDeleteModalOpen(false);
    } catch (error: any) {
      setIsDeleteModalOpen(false);
      if (error?.detail?.code === 'BUILDING_HAS_PROPERTIES') {
        toast.error(error.detail.label_fr);
      } else {
        toast.error(error instanceof Error ? error.message : 'Oops, une erreur est survenue lors de la suppression.');
      }
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
        message={`Attention vous souhaitez supprimer le bâtiment ${building.name}, si vous validez, ce bâtiment disparaitra de la liste des bâtiments.`}
        confirmText="Supprimer"
        onConfirm={handleDelete}
        cancelText="Annuler"
        variant="danger"
      />
    </>
  );
};

export const columns: ColumnDef<Building>[] = [
  {
    id: 'cover_url',
    accessorKey: 'cover_url',
    header: () => <span className="text-lg font-semibold" style={{ fontSize: '14px' }}>Immeuble</span>,
    cell: ({ row }) => (
      <Illustration
        src={row.original.cover_url || 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=604&h=550&fit=crop&crop=center'}
        libelle={row.original.name}
      />
    )
  },
  {
    id: 'description',
    accessorKey: 'description',
    header: () => <span className="text-lg font-semibold" style={{ fontSize: '14px' }}>Description</span>,
    cell: ({ row }) => (
      <p className="text-lg font-medium max-w-[200px] truncate" style={{ fontSize: '14px' }}>
        {row.original.description || '-'}
      </p>
    )
  },
  {
    id: 'address',
    accessorKey: 'address',
    header: () => <span className="text-lg font-semibold" style={{ fontSize: '14px' }}>Adresse</span>,
    cell: ({ row }) => (
      <div className="max-w-[250px]">
        <p className="text-lg font-medium" style={{ fontSize: '14px' }}>{row.original.address || '-'}</p>
        <p className="text-sm text-gray-500">{row.original.street || '-'}</p>
      </div>
    )
  },
  {
    id: 'municipality',
    accessorKey: 'municipality',
    header: () => <span className="text-lg font-semibold" style={{ fontSize: '14px' }}>Ville</span>,
    cell: ({ row }) => (
      <div>
        <p className="text-lg font-medium" style={{ fontSize: '14px' }}>{row.original.municipality?.name || '-'}</p>
        <p className="text-sm text-gray-500">{row.original.municipality?.country?.name || '-'}</p>
      </div>
    )
  },
  {
    id: 'business',
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
    id: 'is_public',
    accessorKey: 'is_public',
    header: () => <span className="text-lg font-semibold" style={{ fontSize: '14px' }}>Statut</span>,
    cell: ({ row }) => (
      <Badge
        variant={row.original.is_public ? 'success' : 'default'}
        className="text-lg font-medium"
        style={{ fontSize: '14px' }}
      >
        {row.original.is_public ? 'Public' : 'Privé'}
      </Badge>
    )
  },
  {
    id: 'actions',
    accessorKey: 'actions',
    header: () => <span className="text-lg font-semibold" style={{ fontSize: '14px' }}>Actions</span>,
    cell: ({ row }) => <BuildingActions building={row.original} />
  }
];