"use client"
import DataTableLayout from '@/shared/components/layouts/data-table-layout';
import GlobalDataCard from '@/shared/components/molecules/global-data-card';
import { Button } from '@/shared/components/ui/button';
import { Plus, WalletIcon } from 'lucide-react';
import RefreshIcon from '../../../../public/assets/icons/refresh-icon';
import PropertyTable from '../components/tables/property/property-table';
import { useListPropertiesQuery } from '@/lib/data-service/property/property.queries';
import { columns } from '../components/tables/property/columns';
import { useRouter } from 'next/navigation';

const PropertyView = () => {
    const { data: response, isLoading, error } = useListPropertiesQuery()
    const {data, total} = response || {data: [], total: 0}

    const router = useRouter();

    const dataItems = [
        {
            title: 'Total Biens',
            value: total,
            percentageChange: 0,
            icon: <WalletIcon className="text-white" />
        },
        {
            title: 'Total Batiment',
            value: '2',
            percentageChange: 0,
            icon: <WalletIcon className="text-white" />
        },
        {
            title: 'Biens occupés',
            value: '0',
            percentageChange: 0,
            icon: <WalletIcon className="text-white" />
        }
    ];

    return (
        <div className="flex flex-col gap-16">
            <GlobalDataCard data={dataItems} />
            <DataTableLayout
                title="Liste des biens et propriétaires"
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
                            onClick={()=>router.push("/admin/property/add")}
                        >
                            <Plus />{' '}
                            <span className="text-[1.3rem]">NOUVEAU BIEN</span>
                        </Button>
                    )
                }}
            >
                <PropertyTable data={data} columns={columns} />
            </DataTableLayout>
        </div>
    );
};

export default PropertyView;
