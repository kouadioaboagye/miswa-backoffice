'use client';

import { useDeleteUserMutation } from '@/lib/data-service/users/users.hooks';
import Illustration from '@/shared/components/atoms/illustration';
import { Badge } from '@/shared/components/ui/badge';
import { useAlertStore } from '@/shared/store/use-alert-store';
import { useModalStore } from '@/shared/store/useModalStore';
import type { ColumnDef } from '@tanstack/react-table';
import { formatDate } from 'date-fns';
import Link from 'next/link';
import DeleteIcon2 from '../../../../../../public/assets/icons/delete-icon-2';
import EditIcon from '../../../../../../public/assets/icons/edit-icon';
import EyeIcon2 from '../../../../../../public/assets/icons/eye-icon-2';
import { RiUserLine } from '../../../../../../public/assets/icons/userl-icon';
import UserForm from '../../forms/user/user-form';

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type User = {
    id: number;
    id_role: number;
    id_country: number | null;
    username: string;
    email: string | null;
    first_name: string | null;
    last_name: string | null;
    avatar: string | null;
    auth_provider: string;
    is_active: boolean;
    is_valid: boolean;
    living_country_code: string | null;
    living_city_name: string | null;
    last_login: string | null;
    last_request_password_reset_at: string | null;
    last_password_reseted_at: string | null;
    token_password_reset: string | null;
    created_at: string;
    updated_at: string;
    role: {
        id: number;
        name: string;
        description: string;
        is_active: boolean;
        created_at: string;
        updated_at: string;
    };
};

export const columns: ColumnDef<User>[] = [
    {
        accessorKey: 'first_name',
        header: 'Utilisateur',
        cell: ({ row }) => {
            const avatar = row.original.avatar;
            const email = row.original.email;
            const firstName = row.original.first_name;
            const lastName = row.original.last_name;
            return avatar && avatar.trim() !== '' ? (
                <Illustration
                    src={avatar}
                    libelle={
                        firstName && lastName ? `${firstName} ${lastName}` : ''
                    }
                    email={email || ''}
                />
            ) : (
                <div className="flex items-center justify-center size-16 rounded-2xl bg-gray-100 shadow">
                    <RiUserLine className="text-[1.6rem] text-gray-500" />
                </div>
            );
        }
    },
    {
        accessorKey: 'role',
        header: 'Créer par',
        cell: ({ row }) => (
            <p className="text-[1.3rem] font-semibold">
                {row.original.role.name}
            </p>
        )
    },
    {
        accessorKey: 'role',
        header: 'Role(s)',
        cell: ({ row }) => (
            <p className="text-[1.3rem] font-semibold">
                {row.original.role.name}
            </p>
        )
    },
    {
        accessorKey: 'createdAt',
        header: 'Ajouté le',
        cell: ({ row }) => formatDate(row.original.created_at, 'dd/MM/yyyy')
    },
    {
        accessorKey: 'is_active',
        header: 'Statut compte',
        cell: ({ row }) => (
            <Badge variant={row.original.is_active ? 'success' : 'destructive'}>
                {row.original.is_active ? 'Actif' : 'Inactif'}
            </Badge>
        )
    },
    {
        accessorKey: '',
        header: 'Actions',
        cell: ({ row }) => {
            const openModal = useModalStore((state) => state.openModal);
            const openAlert = useAlertStore((state) => state.openAlert);
            const { mutateAsync: deleteUser } = useDeleteUserMutation();

            const handleOpenUserModal = () => {
                openModal({
                    view: <UserForm user={row.original} />,
                    isOverlayCanClosed: true
                });
            };
            const handleOpenAlert = () => {
                openAlert({
                    title: 'Suppression utilisateur',
                    description:
                        'Etes-vous sur de vouloir supprimer cet utilisateur ?',
                    onConfirm: () => {
                        deleteUser(row.original.id);
                    },
                    onClose: () => {}
                });
            };

            return (
                <div className="flex items-center gap-6">
                    <Link
                        href={`/admin/configs/users/${row.original.id}/details`}
                    >
                        <button className="flex size-12 items-center justify-center rounded-full bg-[#1EA64A]/10">
                            <EyeIcon2 />
                        </button>
                    </Link>
                    <button
                        onClick={handleOpenUserModal}
                        className="flex size-12 items-center justify-center rounded-full bg-[#5D5FEF]/10"
                    >
                        <EditIcon />
                    </button>
                    <button
                        onClick={handleOpenAlert}
                        className="flex size-12 items-center justify-center rounded-full bg-[#FF0000]/10"
                    >
                        <DeleteIcon2 />
                    </button>
                </div>
            );
        }
    }
];
