'use client';

import { ITenantDataModel } from '@/lib/data-service/module/tenant/types';
import Illustration from '@/shared/components/atoms/illustration';
import type { ColumnDef } from '@tanstack/react-table';
import { formatDate } from 'date-fns';
import EyeIcon2 from '../../../../../../../public/assets/icons/eye-icon-2';
import EditIcon from '../../../../../../../public/assets/icons/edit-icon';
import DeleteIcon2 from '../../../../../../../public/assets/icons/delete-icon-2';
import { IPropertyDataModel } from '@/lib/data-service/property/types';

export type Tenant = Partial<ITenantDataModel> & {
  id: string;
  firstname: string;
  lastname: string;
  cover_url: string;
  property: {
    id: string;
    name: string;
    cover_url: string
  },
  contract_start_date: string;
  country: string;
  profession: string;
  phonenumber: string
};

export const fakeTenants: Tenant[] = Array.from({ length: 10 }).map((_, idx) => ({
  id: `tenant-${idx}`,
  firstname: `John${idx}`,
  lastname: `Doe${idx}`,
  cover_url: `https://picsum.photos/1024/1024?random=${idx}`,
  property: {
    id: `property-${idx}`,
    name: `Apartment ${idx + 1}`,
    cover_url: `https://picsum.photos/1024/1024?random=${idx + 1}`
  },
  contract_start_date: new Date(2025, 0, idx + 1).toISOString(),
  country: `Country${idx % 3 === 0 ? 'A' : idx % 3 === 1 ? 'B' : 'C'}`,
  profession: `Profession${idx + 1}`,
  phonenumber: `+123456789${idx}`,
}));

export const columns = (
  onDetails: (id: string) => void,
  onEdit: (id: string) => void,
  onDelete: (id: string) => Promise<void>
): ColumnDef<Tenant>[] => [
    {
      accessorKey: 'tenant',
      header: 'Locataire',
      cell: ({ row }) => (
        <Illustration
          src={row.original?.cover_url || ""}
          libelle={`${row.original?.firstname} ${row.original?.lastname}`}
          email={row.original?.email}
        />
      ),
    },
    {
      accessorKey: 'property',
      header: 'Biens',
      cell: ({ row }) => (
        <Illustration
          src={row.original?.property.cover_url || ""}
          libelle={row.original?.property.name}
        />
      ),
    },
    {
      accessorKey: 'startDate',
      header: 'Ajouté le',
      cell: ({ row }) => {
        const date = row.original?.contract_start_date;
        return date ? formatDate(date, 'dd/MM/yyyy') : '-';
      },
    },
    {
      accessorKey: 'nationality',
      header: 'Nationalité',
      cell: ({ row }) => (
        <p className="text-[1.1rem] font-medium">{row.original?.country}</p>
      ),
    },
    {
      accessorKey: 'profession',
      header: 'Profession',
      cell: ({ row }) => (
        <p className="text-[1.1rem] font-medium">{row.original?.profession}</p>
      ),
    },
    {
      accessorKey: 'telephone',
      header: 'Téléphone',
      cell: ({ row }) => (
        <p>{row.original?.phonenumber}</p>
      ),
    },
    {
      accessorKey: 'actions',
      header: 'Actions',
      cell: ({ row }) => (
        <div className="flex items-center gap-6">
          <button
            className="flex size-12 items-center justify-center rounded-full bg-[#1EA64A]/10"
            onClick={() => onDetails(row.original.id)}
          >
            <EyeIcon2 />
          </button>
          <button
            className="flex size-12 items-center justify-center rounded-full bg-[#5D5FEF]/10"
            onClick={() => onEdit(row.original.id)}
          >
            <EditIcon />
          </button>
          <button
            className="flex size-12 items-center justify-center rounded-full bg-[#FF0000]/10"
            onClick={() => onDelete(row.original.id)}
          >
            <DeleteIcon2 />
          </button>
        </div>
      ),
    },
  ];
