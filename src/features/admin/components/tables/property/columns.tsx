'use client';

import Illustration from '@/shared/components/atoms/illustration';
import { Badge } from '@/shared/components/ui/badge';
import type { ColumnDef } from '@tanstack/react-table';
import { formatDate } from 'date-fns';
import DeleteIcon2 from '../../../../../../public/assets/icons/delete-icon-2';
import EditIcon from '../../../../../../public/assets/icons/edit-icon';
import EyeIcon2 from '../../../../../../public/assets/icons/eye-icon-2';
import { IPropertyDataModel } from '@/lib/data-service/property/types';

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Property = Partial<IPropertyDataModel> & {
    id: string;
    name: string;
    cover_url?: string;
    is_busy: boolean;
    business?: {
        name: string;
    };
    created_at: string;
};

export const columns: ColumnDef<Property>[] = [

    {
        accessorKey: 'cover_url',
        header: 'Biens',
        cell: ({ row }) => (
            <Illustration
                // src={row.original.cover_url ?? ""}
                src='https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=604&h=550&fit=crop&crop=center'
                libelle={""}
            />
        )
    },
    {
        accessorKey: 'name',
        header: 'Nom',
    },
    {
        accessorKey: 'createdAt',
        header: 'Ajouté le',
        cell: ({ row }) => formatDate(row.original.created_at, 'dd/MM/yyyy')
    },
    {
        accessorKey: 'status',
        header: 'Statut',
        cell: ({ row }) => (
            <Badge
                variant={
                    row.original.is_busy === true ? 'default' : 'success'
                }
            >
                {row.original.is_busy === true ? 'Occupé' : 'Libre'}
            </Badge>
        )
    },
    {
        accessorKey: '',
        header: 'Actions',
        cell: ({ row }) => {
            return (
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
            );
        }
    }
];
