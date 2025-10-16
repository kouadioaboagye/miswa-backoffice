"use client"

import DataTableLayout from '@/shared/components/layouts/data-table-layout';
import GlobalDataCard from '@/shared/components/molecules/global-data-card';
import { Button } from '@/shared/components/ui/button';
import { Plus, WalletIcon } from 'lucide-react';
import RefreshIcon from '../../../../../public/assets/icons/refresh-icon';
import ContractTable from '../../components/tables/contract/contract-table';
import { useListContractsQuery } from '@/lib/data-service/contract/contract.queries'; // Assuming this exists
import { columns, Contract } from '../../components/tables/contract/columns';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

const ContractView = ({status="default"}: {status?: string}) => {
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 10;

    const fakeContracts: Contract[] = Array.from({ length: 11 }).map((_, idx) => ({
    id: `contract-${idx}`,
    reference: `CONTRACT-${1000 + idx}`,
    type:"Bail de location",
    property: {
        name: `Appartement Cité AGC ${idx + 1}`,
        cover_url: `https://picsum.photos/1024/1024?random=${idx}`
    },
    start_date: new Date(Date.now() - idx * 24 * 60 * 60 * 1000).toISOString(),
    status: status !== "default" ? status as 'En cours' | 'Terminé' | 'En attente' : idx % 3 === 0 ? 'En cours' : idx % 3 === 1 ? 'Terminé' : 'En attente'
}));
    
    // const { data: response, isLoading, error, refetch } = useListContractsQuery(currentPage, pageSize);
    // const { data = [], total = 0 } = response || {};

    const router = useRouter();

    const handleRefresh = async () => {
        try {
            //await refetch();
            toast.success('Liste des contrats actualisée avec succès.');
        } catch {
            toast.error('Erreur lors de l’actualisation des données.');
        }
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const dataItems = [
        {
            title: 'Total Contrats',
            value: Number(fakeContracts.length),
            percentageChange: 0,
            icon: <WalletIcon className="text-white" />
        },
        {
            title: 'Contrats terminés',
            value: '20',
            percentageChange: 0,
            icon: <WalletIcon className="text-white" />
        },
        {
            title: 'Contrats Actifs',
            value: '30',
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
                            //disabled={isLoading}
                        >
                            <RefreshIcon />{' '}
                            <span className="text-[1.3rem]">
                                {/* {isLoading ? 'CHARGEMENT...' : 'RAFRAICHIR'} */}
                                RAFRAICHIR
                            </span>
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
                    data={fakeContracts}
                    columns={columns}
                    totalItems={Number(fakeContracts.length)}
                    pageSize={pageSize}
                    onPageChange={handlePageChange}
                    currentPage={currentPage}
                    //isLoading={isLoading}
                />
            </DataTableLayout>
        </div>
    );
};

export default ContractView;