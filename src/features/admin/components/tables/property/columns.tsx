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
export type Property = {
    id: string;
    user: {
        fullName: string;
        email: string;
        img: string;
    };
    role: {
        libelle: string;
        description: string;
    };
    property: {
        libelle: string;
        img: string;
    };
    createdAt: string;
    status: string;
};

export const fakeProperties: Property[] = Array.from({ length: 10 }).map(
    (_, idx) => ({
        id: `property-${idx}`,
        user: {
            fullName: `Utilisateur`,
            email: `user-${idx}@example.com`,
            img: `https://picsum.photos/1024/1024`
        },
        role: {
            libelle: `Manager`,
            description: `Organization`
        },
        property: {
            libelle: `Appartement cité AGC....`,
            img: `https://picsum.photos/1024/1024`
        },
        createdAt: new Date().toISOString(),
        status: idx % 2 === 0 ? 'Occupé' : 'Libre'
    })
);

export const columns: ColumnDef<Property>[] = [
    {
        accessorKey: 'user.fullName',
        header: 'Utilisateur',
        cell: ({ row }) => (
            <Illustration
                src={row.original.user.img}
                libelle={row.original.user.fullName}
                email={row.original.user.email}
            />
        )
    },
    {
        accessorKey: 'role',
        header: 'Role',
        cell: ({ row }) => (
            <div className="flex flex-col gap-2">
                <p className="text-[1.2rem] font-semibold">
                    {row.original.role.libelle}
                </p>
                <p className="text-[1.1rem] text-[#718096]">
                    {row.original.role.description}
                </p>
            </div>
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
                    row.original.status === 'Libre' ? 'default' : 'success'
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
