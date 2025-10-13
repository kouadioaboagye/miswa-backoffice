'use client';

import Illustration from '@/shared/components/atoms/illustration';
import { Badge } from '@/shared/components/ui/badge';
import type { ColumnDef } from '@tanstack/react-table';
import { formatDate } from 'date-fns';
import DeleteIcon2 from '../../../../../../public/assets/icons/delete-icon-2';
import EditIcon from '../../../../../../public/assets/icons/edit-icon';
import EyeIcon2 from '../../../../../../public/assets/icons/eye-icon-2';

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Contrat = {
    id: string;
    ref: string;
    type: string;
    property: {
        libelle: string;
        img: string;
    };
    createdAt: string;
    status: string;
};

export const fakeProperties: Contrat[] = Array.from({ length: 10 }).map(
    (_, idx) => ({
        id: `property-${idx}`,
        ref: `REF-${1000 + idx}`,
        type: idx % 2 === 0 ? 'Bail de Location' : 'Bail de gestion',
        property: {
            libelle: `Appartement cité AGC....`,
            img: `https://picsum.photos/1024/1024`
        },
        createdAt: new Date().toISOString(),
        status: idx % 2 === 0 ? 'En cours' : 'Terminé'
    })
);

export const columns: ColumnDef<Contrat>[] = [
    {
        accessorKey: 'ref',
        header: 'Reference'
    },
    {
        accessorKey: 'type',
        header: 'Type de contrat'
    },
    {
        accessorKey: 'property',
        header: 'Biens',
        cell: ({ row }) => (
            <Illustration
                src={row.original.property.img}
                libelle={row.original.property.libelle}
            />
        )
    },
    {
        accessorKey: 'createdAt',
        header: 'Ajouté le',
        cell: ({ row }) => formatDate(row.original.createdAt, 'dd/MM/yyyy')
    },
    {
        accessorKey: 'status',
        header: 'Statut',
        cell: ({ row }) => (
            <Badge
                variant={
                    row.original.status === 'Terminé' ? 'failed' : 'success'
                }
            >
                {row.original.status}
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