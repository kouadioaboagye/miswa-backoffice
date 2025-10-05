'use client';

import Illustration from '@/shared/components/atoms/illustration';
import { Badge } from '@/shared/components/ui/badge';
import type { ColumnDef } from '@tanstack/react-table';
import { formatDate } from 'date-fns';
import EyeIcon2 from '../../../../../../../../public/assets/icons/eye-icon-2';
import EditIcon from '../../../../../../../../public/assets/icons/edit-icon';
import DeleteIcon2 from '../../../../../../../../public/assets/icons/delete-icon-2';
import { IOwnerDataModel } from '@/lib/data-service/module/owner/types';

// This type is used to define the shape of our data.
export type Owner = Partial<IOwnerDataModel> & {
  id: string;
  name: string;
  cover_url?: string;
  phonenumber?: string;
  created_at?: string;
  legal_form: string;
  email?: string
};


// Table columns based on Owner
export const columns: ColumnDef<Owner>[] = [
  {
    accessorKey: 'owner.fullName',
    header: 'Propriétaire',
    cell: ({ row }) => (
      <Illustration
        src={row.original.cover_url ?? ""}
        libelle={row.original?.name}
        email={row.original?.email}
      />
    ),
  },
  {
    accessorKey: 'createdAt',
    header: 'Ajouté le',
    cell: ({ row }) => {
      const date = row.original.created_at;
      return date ? formatDate(date, 'dd/MM/yyyy') : '-';
    },
  },
  {
    accessorKey: 'telephone',
    header: 'Téléphone',
    cell: ({ row }) => (
      <p>{row.original?.phonenumber || "-"}</p>
    ),
  },
    {
    accessorKey: 'email',
    header: 'Email',
    cell: ({ row }) => (
      <p>{row.original?.email || "-"}</p>
    ),
  },
  {
    accessorKey: 'legal_form',
    header: 'Type de personne',
    cell: ({ row }) => (
      <p>{row.original?.legal_form || "-"}</p>
    ),
  },
  {
    accessorKey: 'actions',
    header: 'Actions',
    cell: () => (
      <div className="flex items-center gap-6">
        <button className="flex size-12 items-center justify-center rounded-full bg-[#1EA64A]/10">
          <EyeIcon2 />
        </button>
        <button className="flex size-12 items-center justify-center rounded-full bg-[#5D5FEF]/10">
          <EditIcon />
        </button>
        <button className="flex size-12 items-center justify-center rounded-full bg-[#FF0000]/10">
          <DeleteIcon2 />
        </button>
      </div>
    ),
  },
];
