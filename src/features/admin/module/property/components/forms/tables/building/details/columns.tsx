'use client';

import Illustration from '@/shared/components/atoms/illustration';
import { Badge } from '@/shared/components/ui/badge';
import type { ColumnDef } from '@tanstack/react-table';
import { formatDate } from 'date-fns';
import EyeIcon2 from '../../../../../../../../../../public/assets/icons/eye-icon-2';
import EditIcon from '../../../../../../../../../../public/assets/icons/edit-icon';
import DeleteIcon2 from '../../../../../../../../../../public/assets/icons/delete-icon-2';

// This type is used to define the shape of our data.
export type Apartment = {
    id: string;
    owner: {
        fullName: string;
        email: string;
        img: string;
    };
    property: {
        libelle: string;
        img: string;
    };
    createdAt: string;
    status: string;
};

export const fakeApartments: Apartment[] = Array.from({ length: 4 }).map(
    (_, idx) => ({
        id: `apartment-${idx}`,
        owner: {
            fullName: `Utilisateur`,
            email: `user-${idx}@example.com`,
            img: `https://picsum.photos/1024/1024`
        },
        property: {
            libelle: `Appartement cité AGC....`,
            img: `https://picsum.photos/1024/1024`
        },
        createdAt: new Date().toISOString(),
        status: idx % 2 === 0 ? 'Occupé' : 'Disponible'
    })
);

export const columns: ColumnDef<Apartment>[] = [
    {
        accessorKey: 'user.fullName',
        header: 'Propriétaire',
        cell: ({ row }) => (
            <Illustration
                src={row.original.owner.img}
                libelle={row.original.owner.fullName}
                email={row.original.owner.email}
            />
        )
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
                    row.original.status === 'Occupé' ? 'success' : 'failed'
                }
            >
                {row.original.status}
            </Badge>
        )
    },
    {
        accessorKey: '',
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
    }
];
