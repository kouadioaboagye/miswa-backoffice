'use client';
import DataTableLayout from '@/shared/components/layouts/data-table-layout';
import GlobalDataCard from '@/shared/components/molecules/global-data-card';
import { Button } from '@/shared/components/ui/button';
import { useModalStore } from '@/shared/store/useModalStore';
import { Plus, WalletIcon } from 'lucide-react';
import RefreshIcon from '../../../../public/assets/icons/refresh-icon';
import UserForm from '../components/forms/user/user-form';
import UserTable from '../components/tables/users/user-table';

const UserView = () => {
    const { openModal } = useModalStore();

    const dataItems = [
        {
            title: 'Total Biens',
            value: '245',
            percentageChange: +55,
            icon: <WalletIcon className="text-white" />
        },
        {
            title: 'Biens occupés',
            value: '20',
            percentageChange: +5,
            icon: <WalletIcon className="text-white" />
        },
        {
            title: 'Biens non occupés',
            value: '185',
            percentageChange: -14,
            icon: <WalletIcon className="text-white" />
        }
    ];

    const handleOpenUserModal = () => {
        openModal({
            view: <UserForm />,
            isOverlayCanClosed: true
        });
    };

    return (
        <div className="flex flex-col gap-16">
            <GlobalDataCard data={dataItems} />
            <DataTableLayout
                title="Listes des utilisateurs"
                action={{
                    refresh: (
                        <Button
                            variant={'refresh'}
                            size={'add'}
                            className="text-white [&_svg]:size-8"
                        >
                            <RefreshIcon />{' '}
                            <span className="text-[1.3rem]">RAFRAICHIR</span>
                        </Button>
                    ),
                    add: (
                        <Button
                            variant={'add'}
                            size={'add'}
                            className="text-white [&_svg]:size-8"
                            onClick={handleOpenUserModal}
                        >
                            <Plus />{' '}
                            <span className="text-[1.3rem]">
                                CREER UN UTILISATEUR
                            </span>
                        </Button>
                    )
                }}
            >
                <UserTable />
            </DataTableLayout>
        </div>
    );
};

export default UserView;