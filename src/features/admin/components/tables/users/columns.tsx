'use client';

import Illustration from '@/shared/components/atoms/illustration';
import { Badge } from '@/shared/components/ui/badge';
import type { ColumnDef } from '@tanstack/react-table';
import { formatDate } from 'date-fns';
import Link from 'next/link';
import DeleteIcon2 from '../../../../../../public/assets/icons/delete-icon-2';
import EditIcon from '../../../../../../public/assets/icons/edit-icon';
import EyeIcon2 from '../../../../../../public/assets/icons/eye-icon-2';

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Intervention = {
    id: string;
    user: {
        fullName: string;
        email: string;
        img: string;
    };
    role: string;
    sexe: 'Masculin' | 'Feminin';
    createdAt: string;
    status: 'Active' | 'Inactive';
};

export const fakeProperties: Intervention[] = Array.from({ length: 10 }).map(
    (_, idx) => ({
        id: `property-${idx}`,
        user: {
            fullName: `Utilisateur`,
            email: `user-${idx}@example.com`,
            img: `https://picsum.photos/1024/1024`
        },
        role: `Manager`,
        sexe: idx % 2 === 0 ? 'Masculin' : 'Feminin',
        createdAt: new Date().toISOString(),
        status: idx % 2 === 0 ? 'Active' : 'Inactive'
    })
);

export const columns: ColumnDef<Intervention>[] = [
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
        header: 'Créer par',
        cell: ({ row }) => (
            <p className="text-[1.3rem] font-semibold">{row.original.role}</p>
        )
    },
    {
        accessorKey: 'role',
        header: 'Role(s)',
        cell: ({ row }) => (
            <p className="text-[1.3rem] font-semibold">{row.original.role}</p>
        )
    },
    {
        accessorKey: 'createdAt',
        header: 'Ajouté le',
        cell: ({ row }) => formatDate(row.original.createdAt, 'dd/MM/yyyy')
    },
    {
        accessorKey: 'sexe',
        header: 'Sexe',
        cell: ({ row }) => (
            <p className="text-[1.3rem] font-semibold">{row.original.sexe}</p>
        )
    },
    {
        accessorKey: 'status',
        header: 'Statut compte',
        cell: ({ row }) => (
            <Badge
                variant={
                    row.original.status === 'Active' ? 'success' : 'destructive'
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
                    <Link href={`/admin/configs/users/details`}>
                        <button className="flex size-12 items-center justify-center rounded-full bg-[#1EA64A]/10">
                            <EyeIcon2 />
                        </button>
                    </Link>
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
