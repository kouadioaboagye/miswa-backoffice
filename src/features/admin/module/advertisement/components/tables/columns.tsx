'use client';

import Illustration from '@/shared/components/atoms/illustration';
import type { ColumnDef } from '@tanstack/react-table';
import { formatDate } from 'date-fns';
import EyeIcon2 from '../../../../../../../public/assets/icons/eye-icon-2';
import EditIcon from '../../../../../../../public/assets/icons/edit-icon';
import DeleteIcon2 from '../../../../../../../public/assets/icons/delete-icon-2';
import { Badge } from '@/shared/components/ui/badge';

export type Ad = {
    id: string;
    owner: {
        firstname: string;
        lastname: string;
        cover_url: string;
        email?: string;
    };
    property: {
        id: string;
        name: string;
        cover_url: string;
    };
    building_reference: string;
    posting_date: string;
    visit_count: number;
    status: string;
};

export const fakeAds: Ad[] = Array.from({ length: 10 }).map((_, idx) => ({
    id: `ad-${idx}`,
    owner: {
        firstname: `Jane${idx}`,
        lastname: `Smith${idx}`,
        cover_url: `https://picsum.photos/1024/1024?random=${idx + 10}`,
        email: `jane${idx}@example.com`,
    },
    property: {
        id: `property-${idx}`,
        name: `Building ${idx + 1}`,
        cover_url: `https://picsum.photos/1024/1024?random=${idx + 20}`,
    },
    building_reference: `REF-${String(idx + 1000).padStart(4, '0')}`,
    posting_date: new Date(2025, 0, idx + 1).toISOString(),
    visit_count: Math.floor(Math.random() * 100) + 10,
    status: idx % 3 === 0 ? 'Active' : idx % 3 === 1 ? 'Active' : 'Archived',
}));

export const columns = (
    onDetails: (id: string) => void,
    onEdit: (id: string) => void,
    onDelete: (id: string) => Promise<void>
): ColumnDef<Ad>[] => [
        {
            accessorKey: 'owner',
            header: 'Propriétaires',
            cell: ({ row }) => (
                <Illustration
                    src={row.original.owner.cover_url || ''}
                    libelle={`${row.original.owner.firstname} ${row.original.owner.lastname}`}
                    email={row.original.owner.email}
                />
            ),
        },
        {
            accessorKey: 'property',
            header: 'Biens',
            cell: ({ row }) => (
                <Illustration
                    src={row.original.property.cover_url || ''}
                    libelle={row.original.property.name}
                />
            ),
        },
        {
            accessorKey: 'building_reference',
            header: 'Références de l\'immeuble',
            cell: ({ row }) => (
                <p className="text-[1.1rem] font-medium">{row.original.building_reference}</p>
            ),
        },
        {
            accessorKey: 'posting_date',
            header: 'Date de mise en annonces',
            cell: ({ row }) => {
                const date = row.original.posting_date;
                return date ? formatDate(date, 'dd/MM/yyyy') : '-';
            },
        },
        {
            accessorKey: 'visit_count',
            header: 'Nbre visite',
            cell: ({ row }) => (
                <p className="text-[1.1rem] font-medium">{row.original.visit_count}</p>
            ),
        },
        {
            accessorKey: 'status',
            header: 'Statut',
            cell: ({ row }) => {
                let variant: 'success' | 'failed' | 'default' = 'default'; // Use 'default' for draft styles
                let status = row.original.status;

                if (status === 'Active') {
                    variant = 'success';
                } else if (status === 'Archived') {
                    variant = 'failed';
                    status = "Archivé"
                }

                return (
                    <Badge variant={variant}>
                        {status}
                    </Badge>
                );
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