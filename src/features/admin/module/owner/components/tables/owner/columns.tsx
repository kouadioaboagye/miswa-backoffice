'use client';

import Illustration from '@/shared/components/atoms/illustration';
import { Badge } from '@/shared/components/ui/badge';
import type { ColumnDef } from '@tanstack/react-table';
import { formatDate } from 'date-fns';
import EyeIcon2 from '../../../../../../../../public/assets/icons/eye-icon-2';
import EditIcon from '../../../../../../../../public/assets/icons/edit-icon';
import DeleteIcon2 from '../../../../../../../../public/assets/icons/delete-icon-2';
import { IOwnerDataModel } from '@/lib/data-service/module/owner/types';
import { DeleteOwnerModal } from '../../modals/delete-owner-modal';
import { useState } from 'react';

// Composant pour les actions avec modal de suppression
const OwnerActions = ({ owner }: { owner: Owner }) => {
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    return (
        <>
            <div className="flex items-center gap-6">
                <button className="flex size-12 items-center justify-center rounded-full bg-[#1EA64A]/10 hover:bg-[#1EA64A]/20 transition-colors">
                    <EyeIcon2 />
                </button>
                <button className="flex size-12 items-center justify-center rounded-full bg-[#5D5FEF]/10 hover:bg-[#5D5FEF]/20 transition-colors">
                    <EditIcon />
                </button>
                <button 
                    className="flex size-12 items-center justify-center rounded-full bg-[#FF0000]/10 hover:bg-[#FF0000]/20 transition-colors"
                    onClick={() => setIsDeleteModalOpen(true)}
                >
                    <DeleteIcon2 />
                </button>
            </div>
            
            <DeleteOwnerModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                ownerId={owner.id}
                ownerName={owner.name}
            />
        </>
    );
};

// This type is used to define the shape of our data based on the API structure
export type Owner = IOwnerDataModel;

// Table columns based on Owner API structure
export const columns = (
  onDetails: (id: string) => void,
  onEdit: (id: string) => void,
  onDelete: (id: string) => Promise<void>
): ColumnDef<Owner>[] => [
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
    id: 'legal_name',
    accessorKey: 'owner.legal_name',
    header: () => <span className="text-lg font-semibold" style={{ fontSize: '14px' }}>Nom Légal</span>,
    cell: ({ row }) => (
      <span className="text-lg font-medium" style={{ fontSize: '14px' }}>
        {row.original.owner?.legal_name || '-'}
      </span>
    ),
  },
  {
    id: 'legal_form',
    accessorKey: 'owner.legal_form',
    header: () => <span className="text-lg font-semibold" style={{ fontSize: '14px' }}>Type</span>,
    cell: ({ row }) => {
      const legalForm = row.original.owner?.legal_form;
      const isIndividual = legalForm === 'individuals';
      return (
        <Badge 
          variant={isIndividual ? "default" : "secondary"}
          className={isIndividual ? "bg-blue-100 text-blue-800" : "bg-green-100 text-green-800"}
        >
          {isIndividual ? 'Particulier' : 'Entreprise'}
        </Badge>
      );
    },
  },
  {
    id: 'phonenumber',
    accessorKey: 'owner.phonenumber',
    header: () => <span className="text-lg font-semibold" style={{ fontSize: '14px' }}>Téléphone</span>,
    cell: ({ row }) => (
      <div className="flex items-center space-x-2">
        <span className="text-lg font-medium" style={{ fontSize: '14px' }}>
          {row.original.owner?.phonenumber || '-'}
        </span>
       
      </div>
    ),
  },
  {
    id: 'email',
    accessorKey: 'owner.email',
    header: () => <span className="text-lg font-semibold" style={{ fontSize: '14px' }}>Email</span>,
    cell: ({ row }) => (
      <span className="text-lg font-medium" style={{ fontSize: '14px' }}>
        {row.original.owner?.email || '-'}
      </span>
    ),
  },
  {
    id: 'profession',
    accessorKey: 'owner.profession',
    header: () => <span className="text-lg font-semibold" style={{ fontSize: '14px' }}>Profession</span>,
    cell: ({ row }) => (
      <span className="text-lg font-medium" style={{ fontSize: '14px' }}>
        {row.original.owner?.profession || '-'}
      </span>
    ),
  },
  {
    id: 'actions',
    accessorKey: 'actions',
    header: () => <span className="text-lg font-semibold" style={{ fontSize: '14px' }}>Actions</span>,
    cell: ({ row }) => <OwnerActions owner={row.original} />,
  },
];
