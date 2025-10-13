'use client';

import Illustration from '@/shared/components/atoms/illustration';
import type { ColumnDef } from '@tanstack/react-table';
import { formatDate } from 'date-fns';
import EyeIcon2 from '../../../../../../../../../public/assets/icons/eye-icon-2';
import EditIcon from '../../../../../../../../../public/assets/icons/edit-icon';
import DeleteIcon2 from '../../../../../../../../../public/assets/icons/delete-icon-2';
import { IBuildingDataModel } from '@/lib/data-service/property/types';

export type Building = IBuildingDataModel;

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
          src={row.original.cover_url || " "}
          libelle={row.original.name}
        />
      ),
    },
    {
      accessorKey: 'description',
      header: 'Description',
      cell: ({ row }) => (
        <p className="text-[1.1rem] font-medium max-w-[200px] truncate">
          {row.original.description || '-'}
        </p>
      ),
    },
    {
      accessorKey: 'address',
      header: 'Adresse',
      cell: ({ row }) => (
        <div className="max-w-[250px]">
          <p className="text-[1.1rem] font-medium">{row.original.address || '-'}</p>
          <p className="text-sm text-gray-500">{row.original.street || '-'}</p>
        </div>
      ),
    },
    {
      accessorKey: 'municipality',
      header: 'Ville',
      cell: ({ row }) => (
        <div>
          <p className="text-[1.1rem] font-medium">{row.original.municipality?.name || '-'}</p>
          <p className="text-sm text-gray-500">{row.original.municipality?.country?.name || '-'}</p>
        </div>
      ),
    },
    {
      accessorKey: 'business',
      header: 'Propriétaire',
      cell: ({ row }) => (
        <div>
          <p className="text-[1.1rem] font-medium">{row.original.business?.name || '-'}</p>
          <p className="text-sm text-gray-500">{row.original.business?.owner?.legal_name || '-'}</p>
        </div>
      ),
    },
    {
      accessorKey: 'is_public',
      header: 'Statut',
      cell: ({ row }) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          row.original.is_public 
            ? 'bg-green-100 text-green-800' 
            : 'bg-gray-100 text-gray-800'
        }`}>
          {row.original.is_public ? 'Public' : 'Privé'}
        </span>
      ),
    },
    // {
    //   accessorKey: 'photos',
    //   header: 'Photos',
    //   cell: ({ row }) => (
    //     <span className="text-[1.1rem] font-medium">
    //       {row.original.photos?.length || 0}
    //     </span>
    //   ),
    // },
  {
    id: 'actions',
    accessorKey: 'actions',
    header: 'Actions',
    cell: ({ row }) => (
      <div className="flex items-center gap-6">
        <button
          className="flex size-12 items-center justify-center rounded-full bg-[#1EA64A]/10 hover:bg-[#1EA64A]/20 transition-colors"
          onClick={() => onDetails(row.original.id.toString())}
          title="Voir les détails"
        >
          <EyeIcon2 />
        </button>
        <button
          className="flex size-12 items-center justify-center rounded-full bg-[#5D5FEF]/10 hover:bg-[#5D5FEF]/20 transition-colors"
          onClick={() => onEdit(row.original.id.toString())}
          title="Modifier"
        >
          <EditIcon />
        </button>
        <button
          className="flex size-12 items-center justify-center rounded-full bg-[#FF0000]/10 hover:bg-[#FF0000]/20 transition-colors"
          onClick={() => onDelete(row.original.id.toString())}
          title="Supprimer"
        >
          <DeleteIcon2 />
        </button>
      </div>
    ),
  },
  ];
