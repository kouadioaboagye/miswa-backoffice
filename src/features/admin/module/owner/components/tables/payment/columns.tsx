'use client';

import Illustration from '@/shared/components/atoms/illustration';
import { Badge } from '@/shared/components/ui/badge';
import type { ColumnDef } from '@tanstack/react-table';
import { formatDate } from 'date-fns';
import EyeIcon2 from '../../../../../../../../public/assets/icons/eye-icon-2';
import EditIcon from '../../../../../../../../public/assets/icons/edit-icon';
import DeleteIcon2 from '../../../../../../../../public/assets/icons/delete-icon-2';

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
    id: string;
    owner: {
        fullName: string;
        email: string;
        img: string;
    };
    motif: string;
    property: {
        libelle: string;
        img: string;
    };
    montant: number;
    createdAt: string;
    status: string;
};

export const fakeProperties: Payment[] = Array.from({ length: 10 }).map(
    (_, idx) => ({
        id: `property-${idx}`,
        owner: {
            fullName: `Utilisateur`,
            email: `user-${idx}@example.com`,
            img: `https://picsum.photos/1024/1024`
        },
        motif: `Paiement loyer`,
        role: {
            libelle: `Manager`,
            description: `Organization`
        },
        property: {
            libelle: `Appartement cité AGC....`,
            img: `https://picsum.photos/1024/1024`
        },
        montant: 450000,
        createdAt: new Date().toISOString(),
        status: idx % 2 === 0 ? 'Terminé' : 'Echouée'
    })
);

export const columns: ColumnDef<Payment>[] = [
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
        accessorKey: 'motif',
        header: 'Motif',
        cell: ({ row }) => (
            <p className="text-[1.2rem] font-semibold">
                {row?.original?.motif}
            </p>
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
        accessorKey: 'montant',
        header: 'Montant',
        cell: ({row}) => (
            row.original.montant.toLocaleString('fr-FR')
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
                    row.original.status === 'Echouée' ? 'failed' : 'success'
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
