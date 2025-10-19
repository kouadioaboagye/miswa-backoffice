'use client';

import Illustration from '@/shared/components/atoms/illustration';
import { Badge } from '@/shared/components/ui/badge';
import type { ColumnDef } from '@tanstack/react-table';
import { formatDate } from 'date-fns';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import EyeIcon2 from '../../../../../../../../public/assets/icons/eye-icon-2';
import EditIcon from '../../../../../../../../public/assets/icons/edit-icon';
import DeleteIcon2 from '../../../../../../../../public/assets/icons/delete-icon-2';
import ConfirmModal from '@/shared/components/ui/confirm-modal';
import { IAssetDataModel } from '@/lib/data-service/property/types';
import { useDeletePropertyMutation } from '@/lib/data-service/property/property.queries';
import { toast } from 'sonner';

export type Asset = Partial<IAssetDataModel> & {
  id: string | number;
  name: string;
  cover_url?: string;
  is_busy: boolean;
  business?: {
    name: string;
  };
  created_at: string;
};

// Composant pour les actions avec modal de suppression
const AssetActions = ({ asset }: { asset: Asset }) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const router = useRouter();
  const deleteAssetMutation = useDeletePropertyMutation();

  const handleEdit = () => {
    router.push(`/admin/module/property/asset/edit/${String(asset.id)}`);
  };

  const handleDetails = () => {
    router.push(`/admin/module/property/asset/details/${String(asset.id)}`);
  };

  const handleDelete = async () => {
    try {
      await deleteAssetMutation.mutateAsync(String(asset.id));
      toast.success(`Le bien "${asset.name}" a été supprimé avec succès`);
    } catch {
      toast.error('Erreur lors de la suppression du bien. Veuillez réessayer.');
    } finally {
      setIsDeleteModalOpen(false);
    }
  };

  return (
    <>
      <div className="flex items-center gap-6">
        <button className="flex size-12 items-center justify-center rounded-full bg-[#1EA64A]/10" onClick={handleDetails}>
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
        message={`Attention vous souhaitez supprimer le bien ${asset.name}, si vous validez, ce bien disparaitra de la liste des biens.`}
        confirmText="Supprimer"
        onConfirm={handleDelete}
        cancelText="Annuler"
        variant="danger"
      />
    </>
  );
};

export const columns: ColumnDef<Asset>[] = [
  {
    id: 'cover_url',
    accessorKey: 'cover_url',
    header: () => <span className="text-lg font-semibold" style={{ fontSize: '14px' }}>Biens</span>,
    cell: ({ row }) => (
      <Illustration
        // src={row.original.cover_url ?? ""}
        src='https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=604&h=550&fit=crop&crop=center'
        libelle={""}
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
    id: 'createdAt',
    accessorKey: 'createdAt',
    header: () => <span className="text-lg font-semibold" style={{ fontSize: '14px' }}>Ajouté le</span>,
    cell: ({ row }) => (
      <span className="text-lg" style={{ fontSize: '14px' }}>{formatDate(row.original.created_at, 'dd/MM/yyyy')}</span>
    )
  },
  {
    id: 'status',
    accessorKey: 'status',
    header: () => <span className="text-lg font-semibold" style={{ fontSize: '14px' }}>Statut</span>,
    cell: ({ row }) => (
      <Badge
        variant={
          row.original.is_busy === true ? 'default' : 'success'
        }
        className="text-lg font-medium"
        style={{ fontSize: '14px' }}
      >
        {row.original.is_busy === true ? 'Occupé' : 'Libre'}
      </Badge>
    )
  },
  {
    id: 'actions',
    accessorKey: '',
    header: () => <span className="text-lg font-semibold" style={{ fontSize: '14px' }}>Actions</span>,
    cell: ({ row }) => {
      return <AssetActions asset={row.original} />;
    }
  }
];
