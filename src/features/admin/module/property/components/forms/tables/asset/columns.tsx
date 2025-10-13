'use client';

import Illustration from '@/shared/components/atoms/illustration';
import type { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import EyeIcon2 from '../../../../../../../../../public/assets/icons/eye-icon-2';
import EditIcon from '../../../../../../../../../public/assets/icons/edit-icon';
import DeleteIcon2 from '../../../../../../../../../public/assets/icons/delete-icon-2';

// This type is used to define the shape of our data.
export type Building = {
  id: string;
  appartmentAmount: number,
  reference: string;
  asset: {
    libelle: string;
    img: string;
  };
  ville: string,
  createdAt: string;
};

// Fake data that matches Owner
export const fakeProperties: Building[] = Array.from({ length: 10 }).map(
  (_, idx) => ({
    id: `building-${idx}`,
    appartmentAmount: 10,
    reference: `REF-${1000 + idx}`,
    asset: {
      libelle: `Bien ${idx}`,
      img: `https://picsum.photos/seed/${idx}/400/300`,
    },
    ville: idx % 2 === 0 ? "Abidjan" : "Bouaké",
    createdAt: new Date().toISOString(),
  })
);


// Table columns based on Owner
export const columns: ColumnDef<Building>[] = [
  {
    accessorKey: 'building',
    header: 'Immeuble',
    cell: ({ row }) => (
      <Illustration
        src={row.original.asset.img}
        libelle={row.original.asset.libelle}
      />
    ),
  },
  {
    accessorKey: 'reference',
    header: 'Référence',
    cell: ({ row }) => (
      <p className="text-[1.1rem] font-medium">{row.original.reference}</p>
    ),
  },
  {
    accessorKey: "appartmentAmount",
    header: "Nombre d'appartement",
    cell: ({ row }) => (
      <p className="text-[1.1rem] font-medium">{row.original.appartmentAmount}</p>
    ),
  },
  {
    accessorKey: 'ville',
    header: 'Ville',
    cell: ({ row }) => (
      <p>{row.original.ville}</p>
    ),
  },
  {
    accessorKey: 'createdAt',
    header: 'Ajouté le',
    cell: ({ row }) =>
      format(new Date(row.original.createdAt), 'dd/MM/yyyy'),
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
