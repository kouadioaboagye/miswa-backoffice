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
export type Intervention = {
    id: string;
    article: {
        txt: string;
        img: string;
    };
    createdBy: string;
    createdAt: string;
    views: number;
    status: string;
};

export const fakeProperties: Intervention[] = Array.from({ length: 10 }).map(
    (_, idx) => ({
        id: `property-${idx}`,
        article: {
            txt: `Texte de l'article ${idx + 1}`,
            img: `https://picsum.photos/seed/${idx}/1024/1024`
        },
        createdBy: `Utilisateur ${idx + 1}`,
        createdAt: new Date().toISOString(),
        views: Math.floor(Math.random() * 1000),
        status: idx % 2 === 0 ? 'Active' : 'Inactive'
    })
);

export const columns: ColumnDef<Intervention>[] = [
    {
        accessorKey: 'article',
        header: 'Articles',
        cell: ({ row }) => (
            <Illustration
                src={row.original.article.img}
                libelle={row.original.article.txt}
            />
        )
    },
    {
        accessorKey: 'createdBy',
        header: 'Créer par',
        cell: ({ row }) => (
            <p className="text-[1.3rem] font-semibold">
                {row.original.createdBy}
            </p>
        )
    },
    {
        accessorKey: 'createdAt',
        header: 'Ajouté le',
        cell: ({ row }) => formatDate(row.original.createdAt, 'dd/MM/yyyy')
    },
    {
        accessorKey: 'views',
        header: 'Vues'
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
