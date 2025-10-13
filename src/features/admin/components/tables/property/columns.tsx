'use client';

import Illustration from '@/shared/components/atoms/illustration';
import { Badge } from '@/shared/components/ui/badge';
import type { ColumnDef } from '@tanstack/react-table';
import { formatDate } from 'date-fns';
import DeleteIcon2 from '../../../../../../public/assets/icons/delete-icon-2';
import EditIcon from '../../../../../../public/assets/icons/edit-icon';
import EyeIcon2 from '../../../../../../public/assets/icons/eye-icon-2';
import { IPropertyDataModel } from '@/lib/data-service/property/types';
import { DeletePropertyModal } from '../../modals/delete-property-modal';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Property = Partial<IPropertyDataModel> & {
    id: string | number;
    name: string;
    cover_url?: string;
    is_busy: boolean;
    business?: {
        name: string;
    };
    created_at: string;
};

// Composant pour les actions avec modal de suppression
const PropertyActions = ({ property }: { property: Property }) => {
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const router = useRouter();

    const handleEdit = () => {
        router.push(`/admin/property/edit/${String(property.id)}`);
    };

    return (
        <>
            <div className="flex items-center gap-6">
                <button className="flex size-12 items-center justify-center rounded-full bg-[#1EA64A]/10">
                    <EyeIcon2 />
                </button>
                <button 
                    className="flex size-12 items-center justify-center rounded-full bg-[#5D5FEF]/10 hover:bg-[#5D5FEF]/20 transition-colors"
                    onClick={handleEdit}
                >
                    <EditIcon />
                </button>
                <button 
                    className="flex size-12 items-center justify-center rounded-full bg-[#FF0000]/10 hover:bg-[#FF0000]/20 transition-colors"
                    onClick={() => setIsDeleteModalOpen(true)}
                >
                    <DeleteIcon2 />
                </button>
            </div>
            
            <DeletePropertyModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                propertyId={String(property.id)}
                propertyName={property.name}
            />
        </>
    );
};

export const columns: ColumnDef<Property>[] = [
    {
        id: 'cover_url',
        accessorKey: 'cover_url',
        header: () => <span className="text-lg font-semibold" style={{ fontSize: '14px' }}>Biens</span>,
        cell: ({ row }) => (
            <Illustration
                // src={row.original.cover_url ?? ""}
                src='https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=604&h=550&fit=crop&crop=center'
                libelle={""}
            />
        )
    },
    {
        id: 'name',
        accessorKey: 'name',
        header: () => <span className="text-lg font-semibold" style={{ fontSize: '14px' }}>Nom</span>,
        cell: ({ row }) => (
            <span className="text-lg font-medium" style={{ fontSize: '14px' }}>{row.original.name}</span>
        )
    },
    {
        id: 'createdAt',
        accessorKey: 'createdAt',
        header: () => <span className="text-lg font-semibold" style={{ fontSize: '14px' }}>Ajouté le</span>,
        cell: ({ row }) => (
            <span className="text-lg" style={{ fontSize: '14px' }}>{formatDate(row.original.created_at, 'dd/MM/yyyy')}</span>
        )
    },
    {
        id: 'status',
        accessorKey: 'status',
        header: () => <span className="text-lg font-semibold" style={{ fontSize: '14px' }}>Statut</span>,
        cell: ({ row }) => (
            <Badge
                variant={
                    row.original.is_busy === true ? 'default' : 'success'
                }
                className="text-lg font-medium"
                style={{ fontSize: '14px' }}
            >
                {row.original.is_busy === true ? 'Occupé' : 'Libre'}
            </Badge>
        )
    },
    {
        id: 'actions',
        accessorKey: '',
        header: () => <span className="text-lg font-semibold" style={{ fontSize: '14px' }}>Actions</span>,
        cell: ({ row }) => {
            return <PropertyActions property={row.original} />;
        }
    }
];
