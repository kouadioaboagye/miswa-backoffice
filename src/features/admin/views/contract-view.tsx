'use client';
import { useListContractsQuery } from '@/lib/data-service/contract/contract.hooks';
import DataTableLayout from '@/shared/components/layouts/data-table-layout';
import GlobalDataCard from '@/shared/components/molecules/global-data-card';
import { Button } from '@/shared/components/ui/button';
import { Plus, WalletIcon } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import RefreshIcon from '../../../../public/assets/icons/refresh-icon';
import { columns } from '../components/tables/contract/columns';
import ContractTable from '../components/tables/contract/contract-table';

const ContractView = () => {
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

    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 10;

    const {
        data: contracts,
        isLoading,
        refetch
    } = useListContractsQuery({ page: currentPage, limit: pageSize });
    const { data, total } = contracts || { data: [], total: 0 };

    return (
        <div className="flex flex-col gap-16">
            <GlobalDataCard data={dataItems} />
            <DataTableLayout
                title="Listes des contrats"
                action={{
                    refresh: (
                        <Button
                            variant={'refresh'}
                            size={'add'}
                            className="text-white [&_svg]:size-8"
                            onClick={() => void refetch()}
                        >
                            <RefreshIcon />{' '}
                            <span className="text-[1.3rem]">RAFRAICHIR</span>
                        </Button>
                    ),
                    add: (
                        <Link href={'/admin/contracts/add'}>
                            <Button
                                variant={'add'}
                                size={'add'}
                                className="text-white [&_svg]:size-8"
                            >
                                <Plus />{' '}
                                <span className="text-[1.3rem]">
                                    NOUVEAU CONTRAT
                                </span>
                            </Button>
                        </Link>
                    )
                }}
            >
                <ContractTable
                    columns={columns}
                    data={data}
                    isLoading={isLoading}
                    totalItems={total}
                    pageSize={pageSize}
                    currentPage={currentPage}
                    onPageChange={(page) => setCurrentPage(page)}
                />
            </DataTableLayout>
        </div>
    );
};

export default ContractView;
