"use client"
import DataTableLayout from '@/shared/components/layouts/data-table-layout';
import GlobalDataCard from '@/shared/components/molecules/global-data-card';
import { Button } from '@/shared/components/ui/button';
import { Plus, WalletIcon } from 'lucide-react';
import RefreshIcon from '../../../../../public/assets/icons/refresh-icon';
import PropertyTable from '../../components/tables/property/property-table';
import { useListPropertiesQuery } from '@/lib/data-service/property/property.queries';
import { columns } from '../../components/tables/property/columns';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const PropertyView = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 10;
    
    const { data: response, isLoading, error, refetch } = useListPropertiesQuery(currentPage, pageSize)
    const {data, total} = response || {data: [], total: 0}

    const router = useRouter();

    const handleRefresh = async () => {
        try {
            await refetch();
        } catch (error) {
            console.error('Erreur lors du rafraîchissement:', error);
        }
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

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
                title="Liste des biens "
                action={{
                    refresh: (
                        <Button
                            variant={'refresh'}
                            size={'add'}
                            className="text-white [&_svg]:size-8"
                            onClick={handleRefresh}
                            disabled={isLoading}
                        >
                            <RefreshIcon />{' '}
                            <span className="text-[1.3rem]">
                                {isLoading ? 'CHARGEMENT...' : 'RAFRAICHIR'}
                            </span>
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
                <PropertyTable 
                    data={data} 
                    columns={columns}
                    totalItems={total}
                    pageSize={pageSize}
                    onPageChange={handlePageChange}
                    currentPage={currentPage}
                    isLoading={isLoading}
                />
            </DataTableLayout>
        </div>
    );
};

export default PropertyView;
