import { paths } from '@/config/app-route.config';
import DataTableLayout from '@/shared/components/layouts/data-table-layout';
import GlobalDataCard from '@/shared/components/molecules/global-data-card';
import { Button } from '@/shared/components/ui/button';
import { Plus, WalletIcon } from 'lucide-react';
import Link from 'next/link';
import RefreshIcon from '../../../../../public/assets/icons/refresh-icon';
import PropertyTable from '../../components/tables/property/property-table';

const PropertyView = () => {
    const dataItems = [
        {
            title: 'Total Biens',
            value: '245',
            percentageChange: +55,
            icon: <WalletIcon className="text-white" />
        },
        {
            title: 'Total Batiment',
            value: '20',
            percentageChange: +5,
            icon: <WalletIcon className="text-white" />
        },
        {
            title: 'Biens occupés',
            value: '185',
            percentageChange: -14,
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
                        <Link href={paths.admin.property.propertyForm}>
                            <Button
                                variant={'add'}
                                size={'add'}
                                className="text-white [&_svg]:size-8"
                            >
                                <Plus />{' '}
                                <span className="text-[1.3rem]">
                                    NOUVEAU BIEN
                                </span>
                            </Button>
                        </Link>
                    )
                }}
            >
                <PropertyTable />
            </DataTableLayout>
        </div>
    );
};

export default PropertyView;
