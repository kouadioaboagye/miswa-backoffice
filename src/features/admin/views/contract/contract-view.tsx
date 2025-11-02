"use client"

import DataTableLayout from '@/shared/components/layouts/data-table-layout';
import GlobalDataCard from '@/shared/components/molecules/global-data-card';
import { Button } from '@/shared/components/ui/button';
import { Plus, WalletIcon } from 'lucide-react';
import RefreshIcon from '../../../../../public/assets/icons/refresh-icon';
import ContractTable from '../../components/tables/contract/contract-table';
import { useListContractsQuery } from '@/lib/data-service/contract/contract.queries';
import { columns } from '../../components/tables/contract/columns';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

const ContractView = ({ status = "default" }: { status?: string }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 10;

    const { data: response, isLoading, error, refetch, isRefetching } = useListContractsQuery(currentPage, pageSize, status);
    const { data = [], total = 0 } = response || {};

    const router = useRouter();

    const handleRefresh = async () => {
        try {
            await refetch();
            toast.success('Liste des contrats actualisée avec succès.');
        } catch {
            toast.error('Erreur lors de l’actualisation des contrats.');
        }
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const dataItems = [
        {
            title: 'Total Contrats',
            value: total.toString(),
            percentageChange: 0,
            icon: <WalletIcon className="text-white" />
        },
        {
            title: 'Contrats Terminés',
            value: data.filter(contract => contract.status === 'Terminé').length.toString(),
            percentageChange: 0,
            icon: <WalletIcon className="text-white" />
        },
        {
            title: 'Contrats Actifs',
            value: data.filter(contract => contract.status === 'En cours').length.toString(),
            percentageChange: 0,
            icon: <WalletIcon className="text-white" />
        }
    ];

    return (
        <div className="flex flex-col gap-16">
            <GlobalDataCard data={dataItems} />
            <DataTableLayout
                title={status === "default" ? "Liste des contrats" : `Liste des contrats ${status.toLowerCase()}`}
                action={{
                    refresh: (
                        <Button
                            variant={'refresh'}
                            size={'add'}
                            className="text-white [&_svg]:size-8"
                            onClick={handleRefresh}
                            disabled={isLoading || isRefetching}
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
                            onClick={() => router.push('/admin/module/contract/add')}
                        >
                            <Plus />{' '}
                            <span className="text-[1.3rem]">NOUVEAU CONTRAT</span>
                        </Button>
                    )
                }}
            >
                <ContractTable 
                    data={data}
                    columns={columns}
                    totalItems={total}
                    pageSize={pageSize}
                    onPageChange={handlePageChange}
                    currentPage={currentPage}
                    isLoading={isLoading || isRefetching}
                />
            </DataTableLayout>
        </div>
    );
};

export default ContractView;