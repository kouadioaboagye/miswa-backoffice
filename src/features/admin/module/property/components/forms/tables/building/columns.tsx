'use client';

import Illustration from '@/shared/components/atoms/illustration';
import type { ColumnDef } from '@tanstack/react-table';
import { format, formatDate } from 'date-fns';
import EyeIcon2 from '../../../../../../../../../public/assets/icons/eye-icon-2';
import EditIcon from '../../../../../../../../../public/assets/icons/edit-icon';
import DeleteIcon2 from '../../../../../../../../../public/assets/icons/delete-icon-2';
import { IBuildingDataModel } from '@/lib/data-service/property/types';

export type Building = IBuildingDataModel;

export const columns: ColumnDef<Building>[] = [
  {
    id: 'name',
    accessorKey: 'name',
    header: () => <span className="text-lg font-semibold" style={{ fontSize: '14px' }}>Nom</span>,
    cell: ({ row }) => (
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
          <span className="text-sm font-medium text-gray-600">
            {row.original.name.charAt(0).toUpperCase()}
          </span>
        </div>
        <div>
          <p className="text-lg font-medium" style={{ fontSize: '14px' }}>{row.original.name}</p>
          <p className="text-sm text-gray-500">{row.original.description || '-'}</p>
        </div>
      </div>
    ),
  },
  {
    id: 'address',
    accessorKey: 'address',
    header: () => <span className="text-lg font-semibold" style={{ fontSize: '14px' }}>Adresse</span>,
    cell: ({ row }) => (
      <div>
        <p className="text-lg font-medium" style={{ fontSize: '14px' }}>{row.original.street || '-'}</p>
        <p className="text-sm text-gray-500">{row.original.address || '-'}</p>
      </div>
    ),
  },
  {
    id: 'municipality',
    accessorKey: 'municipality.name',
    header: () => <span className="text-lg font-semibold" style={{ fontSize: '14px' }}>Municipalité</span>,
    cell: ({ row }) => (
      <span className="text-lg font-medium" style={{ fontSize: '14px' }}>
        {row.original.municipality?.name || '-'}
      </span>
    ),
  },
  {
    id: 'business',
    accessorKey: 'business.name',
    header: () => <span className="text-lg font-semibold" style={{ fontSize: '14px' }}>Propriétaire</span>,
    cell: ({ row }) => (
      <span className="text-lg font-medium" style={{ fontSize: '14px' }}>
        {row.original.business?.name || '-'}
      </span>
    ),
  },
  {
    id: 'is_public',
    accessorKey: 'is_public',
    header: () => <span className="text-lg font-semibold" style={{ fontSize: '14px' }}>Statut</span>,
    cell: ({ row }) => (
      <span className={`px-2 py-1 rounded text-sm font-medium ${
        row.original.is_public 
          ? 'bg-green-100 text-green-800' 
          : 'bg-gray-100 text-gray-800'
      }`}>
        {row.original.is_public ? 'Public' : 'Privé'}
      </span>
    ),
  },
  {
    id: 'actions',
    accessorKey: 'actions',
    header: () => <span className="text-lg font-semibold" style={{ fontSize: '14px' }}>Actions</span>,
    cell: () => (
      <div className="flex items-center gap-6">
        <button className="flex size-12 items-center justify-center rounded-full bg-[#1EA64A]/10 hover:bg-[#1EA64A]/20 transition-colors">
          <EyeIcon2 />
        </button>
        <button className="flex size-12 items-center justify-center rounded-full bg-[#5D5FEF]/10 hover:bg-[#5D5FEF]/20 transition-colors">
          <EditIcon />
        </button>
        <button className="flex size-12 items-center justify-center rounded-full bg-[#FF0000]/10 hover:bg-[#FF0000]/20 transition-colors">
          <DeleteIcon2 />
        </button>
      </div>
    ),
  },
];
