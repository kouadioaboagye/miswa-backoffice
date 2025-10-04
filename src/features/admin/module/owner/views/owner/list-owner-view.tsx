"use client"

import DataTableLayout from '@/shared/components/layouts/data-table-layout';
import GlobalDataCard from '@/shared/components/molecules/global-data-card';
import { Button } from '@/shared/components/ui/button';
import { Plus, WalletIcon } from 'lucide-react';
import RefreshIcon from '../../../../../../../public/assets/icons/refresh-icon';
import GlobeIcon from '../../../../../../../public/assets/icons/globe-icon';
import DocIcon from '../../../../../../../public/assets/icons/doc-icon';
import { useRouter } from 'next/navigation';
import OwnerTable from '../../components/tables/owner/owner-table';
import { useListOwnersQuery } from '@/lib/data-service/module/owner/owner.query';

const ListOwnerView = () => {
    const { data: response, isLoading, error } = useListOwnersQuery()
    console.log(response, error, "test")
    const router = useRouter()
    const dataItems = [
        {
            title: 'Total Biens',
            value: '125',
            percentageChange: +55,
            icon: <WalletIcon className="text-white" />
        },
        {
            title: 'Biens occupés',
            value: '70',
            percentageChange: +5,
            icon: <GlobeIcon className="text-white" />
        },
        {
            title: 'Biens non occupés',
            value: '50',
            percentageChange: -14,
            icon: <DocIcon className="text-white" />
        }
    ];

    return (
        <div className="flex flex-col gap-16">
            <GlobalDataCard data={dataItems} />
            <DataTableLayout
                title="Liste des propriétaires"
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
                            onClick={() => router.push("/admin/module/owner/add")}
                        >
                            <Plus />{' '}
                            <span className="text-[1.3rem]">NOUVEAU PROPRIÉTAIRE</span>
                        </Button>
                    )
                }}
            >
                <OwnerTable />
            </DataTableLayout>
        </div>
    );
};

export default ListOwnerView;
