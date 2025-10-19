'use client';

import { ITenantDataModel } from '@/lib/data-service/module/tenant/types';
import Illustration from '@/shared/components/atoms/illustration';
import type { ColumnDef } from '@tanstack/react-table';
import { formatDate } from 'date-fns';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import ConfirmModal from '@/shared/components/ui/confirm-modal';
import { toast } from 'sonner';
import EyeIcon2 from '../../../../../../../public/assets/icons/eye-icon-2';
import EditIcon from '../../../../../../../public/assets/icons/edit-icon';
import DeleteIcon2 from '../../../../../../../public/assets/icons/delete-icon-2';
import { useDeleteTenantMutation } from '@/lib/data-service/module/tenant/tenant.queries';

export type Tenant = Partial<ITenantDataModel> & {
  id: string;
  firstname: string;
  lastname: string;
  cover_url: string;
  property: {
    id: string;
    name: string;
    cover_url: string;
  };
  contract_start_date: string;
  country: string;
  profession: string;
  phonenumber: string;
};

// Mock data for 20 tenants
export const fakeTenants: Tenant[] = Array.from({ length: 20 }).map((_, idx) => ({
  id: `tenant-${idx + 1}`,
  firstname: `John${idx + 1}`,
  lastname: `Doe${idx + 1}`,
  cover_url: `https://picsum.photos/1024/1024?random=${idx + 1}`,
  property: {
    id: `property-${idx + 1}`,
    name: `Apartment ${idx + 1}`,
    cover_url: `https://picsum.photos/1024/1024?random=${idx + 2}`
  },
  contract_start_date: new Date(2025, 0, idx + 1).toISOString(),
  country: `Country${idx % 3 === 0 ? 'A' : idx % 3 === 1 ? 'B' : 'C'}`,
  profession: `Profession${idx + 1}`,
  phonenumber: `+123456789${idx}`,
}));

const TenantActions = ({ tenant }: { tenant: Tenant }) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const router = useRouter();
  const deleteTenantMutation = useDeleteTenantMutation();

  const handleDetails = () => {
    router.push(`/admin/module/tenant/details/${String(tenant.id)}`);
  };

  const handleEdit = () => {
    router.push(`/admin/module/tenant/edit/${String(tenant.id)}`);
  };

  const handleDelete = async () => {
    try {
      await deleteTenantMutation.mutateAsync(String(tenant.id));
      toast.success(`Le locataire "${tenant.firstname} ${tenant.lastname}" a été supprimé avec succès`);
    } catch {
      toast.error('Erreur lors de la suppression du locataire. Veuillez réessayer.');
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
        message={`Attention, vous souhaitez supprimer le locataire ${tenant.firstname} ${tenant.lastname}, si vous validez, ce locataire disparaîtra de la liste des locataires.`}
        confirmText="Supprimer"
        onConfirm={handleDelete}
        cancelText="Annuler"
        variant="danger"
      />
    </>
  );
};

export const columns: ColumnDef<Tenant>[] = [
  {
    id: 'tenant',
    accessorKey: 'tenant',
    header: () => <span className="text-lg font-semibold" style={{ fontSize: '14px' }}>Locataire</span>,
    cell: ({ row }) => (
      <Illustration
        src={row.original?.cover_url || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=604&h=550&fit=crop&crop=center'}
        libelle={`${row.original?.firstname} ${row.original?.lastname}`}
        email={row.original?.email}
      />
    ),
  },
  {
    id: 'property',
    accessorKey: 'property',
    header: () => <span className="text-lg font-semibold" style={{ fontSize: '14px' }}>Biens</span>,
    cell: ({ row }) => (
      <Illustration
        src={row.original?.property.cover_url || 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=604&h=550&fit=crop&crop=center'}
        libelle={row.original?.property.name}
      />
    ),
  },
  {
    id: 'startDate',
    accessorKey: 'startDate',
    header: () => <span className="text-lg font-semibold" style={{ fontSize: '14px' }}>Ajouté le</span>,
    cell: ({ row }) => {
      const date = row.original?.contract_start_date;
      return <span className="text-lg" style={{ fontSize: '14px' }}>{date ? formatDate(date, 'dd/MM/yyyy') : '-'}</span>;
    },
  },
  {
    id: 'nationality',
    accessorKey: 'nationality',
    header: () => <span className="text-lg font-semibold" style={{ fontSize: '14px' }}>Nationalité</span>,
    cell: ({ row }) => (
      <span className="text-lg font-medium" style={{ fontSize: '14px' }}>{row.original?.country}</span>
    ),
  },
  {
    id: 'profession',
    accessorKey: 'profession',
    header: () => <span className="text-lg font-semibold" style={{ fontSize: '14px' }}>Profession</span>,
    cell: ({ row }) => (
      <span className="text-lg font-medium" style={{ fontSize: '14px' }}>{row.original?.profession}</span>
    ),
  },
  {
    id: 'telephone',
    accessorKey: 'telephone',
    header: () => <span className="text-lg font-semibold" style={{ fontSize: '14px' }}>Téléphone</span>,
    cell: ({ row }) => (
      <span className="text-lg" style={{ fontSize: '14px' }}>{row.original?.phonenumber}</span>
    ),
  },
  {
    id: 'actions',
    accessorKey: 'actions',
    header: () => <span className="text-lg font-semibold" style={{ fontSize: '14px' }}>Actions</span>,
    cell: ({ row }) => <TenantActions tenant={row.original} />,
  },
];