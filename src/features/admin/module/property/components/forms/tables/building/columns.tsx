'use client';

import Illustration from '@/shared/components/atoms/illustration';
import type { ColumnDef } from '@tanstack/react-table';
import { formatDate } from 'date-fns';
import EyeIcon2 from '../../../../../../../../../public/assets/icons/eye-icon-2';
import EditIcon from '../../../../../../../../../public/assets/icons/edit-icon';
import DeleteIcon2 from '../../../../../../../../../public/assets/icons/delete-icon-2';
import { IBuildingDataModel } from '@/lib/data-service/property/types';

export type Building = Partial<IBuildingDataModel> & {
  id: string;
  name: string;
  cover_url: string;
  created_at: string;
  ville: string
};

export const columns = (
  onDetails: (id: string) => void,
  onEdit: (id: string) => void,
  onDelete: (id: string) => Promise<void>
): ColumnDef<Building>[] => [
    {
      accessorKey: 'building',
      header: 'Immeuble',
      cell: ({ row }) => (
        <Illustration
          src={row.original.cover_url}
          libelle={row.original.name}
        />
      ),
    },
    {
      accessorKey: 'reference',
      header: 'Référence',
      cell: ({ row }) => (
        <p className="text-[1.1rem] font-medium">-</p>
      ),
    },
    {
      accessorKey: "appartmentAmount",
      header: "Nombre d'appartement",
      cell: ({ row }) => (
        <p className="text-[1.1rem] font-medium">-</p>
      ),
    },
    {
      accessorKey: 'ville',
      header: 'Ville',
      cell: ({ row }) => (
        <p>-</p>
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
