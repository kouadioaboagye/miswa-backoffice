'use client';

import Illustration from '@/shared/components/atoms/illustration';
import { Badge } from '@/shared/components/ui/badge';
import type { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import EyeIcon2 from '../../../../../../../../public/assets/icons/eye-icon-2';
import EditIcon from '../../../../../../../../public/assets/icons/edit-icon';
import DeleteIcon2 from '../../../../../../../../public/assets/icons/delete-icon-2';

// This type is used to define the shape of our data.
export type Owner = {
  id: string;
  owner: {
    fullName: string;
    email: string;
    img: string;
  };
  typeProperty: string;
  property: {
    libelle: string;
    img: string;
  };
  createdAt: string;
  telephone: string;
};

// Fake data that matches Owner
export const fakeProperties: Owner[] = Array.from({ length: 10 }).map(
  (_, idx) => ({
    id: `owner-${idx}`,
    owner: {
      fullName: `Touré Mack`,
      email: `mack@gmail.com`,
      img: `https://picsum.photos/1024/1024`,
    },
    typeProperty: idx % 2 === 0 ? 'Appartement' : 'Villa',
    property: {
      libelle: `Bien immobilier ${idx}`,
      img: `https://picsum.photos/1024/1024`,
    },
    createdAt: new Date().toISOString(),
    telephone: `+225 0707070${idx}`,
  })
);

// Table columns based on Owner
export const columns: ColumnDef<Owner>[] = [
  {
    accessorKey: 'owner.fullName',
    header: 'Propriétaire',
    cell: ({ row }) => (
      <Illustration
        src={row.original.owner.img}
        libelle={row.original.owner.fullName}
        email={row.original.owner.email}
      />
    ),
  },
  {
    accessorKey: 'typeProperty',
    header: 'Type de bien',
    cell: ({ row }) => (
      <p className="text-[1.1rem] font-medium">{row.original.typeProperty}</p>
    ),
  },
  {
    accessorKey: 'property',
    header: 'Biens',
    cell: ({ row }) => (
      <Illustration
        src={row.original.property.img}
        libelle={row.original.property.libelle}
      />
    ),
  },
  {
    accessorKey: 'createdAt',
    header: 'Ajouté le',
    cell: ({ row }) =>
      format(new Date(row.original.createdAt), 'dd/MM/yyyy'),
  },
  {
    accessorKey: 'telephone',
    header: 'Téléphone',
    cell: ({ row }) => (
      <p>{row.original.telephone}</p>
    ),
  },
  {
    accessorKey: 'actions',
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
  },
];
