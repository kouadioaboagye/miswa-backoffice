"use client"

import DataTableLayout from '@/shared/components/layouts/data-table-layout';
import GlobalDataCard from '@/shared/components/molecules/global-data-card';
import { Button } from '@/shared/components/ui/button';
import { Plus, WalletIcon } from 'lucide-react';
import RefreshIcon from '../../../../../public/assets/icons/refresh-icon';
import ContractTable from '../../components/tables/contract/contract-table';
import { fetchWrapper } from '@/lib/http-client/ fetchWrapper';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

const ContractView = () => {
    const router = useRouter()
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

    const handleRefresh = async () => {
        try {
            //await refetch();
            toast.success('Liste des contrats actualisées avec succès.');
        } catch {
            toast.error('Erreur lors de l’actualisation des données.');
        }
    };

    const handleDetails = (id: string) => {
        router.push(`/admin/module/tenant/contracts/details/${id}`);
    };

    const handleEdit = (id: string) => {
        router.push(`/admin/module/tenant/contracts/edit/${id}`);
    };

    const handleDelete = async (id: string) => {
        try {
            await fetchWrapper(`contracts/${id}/force/`, {
                method: 'DELETE',
            });
            toast.success('Contrat supprimé avec succès.');
            //await refetch();
        } catch (error: any) {
            toast.error(error instanceof Error ? error.message : 'Oops, une erreur est survenue lors de la suppression.');
        }
    }

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
                        >
                            <RefreshIcon />{' '}
                            <span className="text-[1.3rem]">RAFRAICHIR</span>
                        </Button>
                    ),
                    add: (
                        <Link href={'/admin/contracts/contrat-form'}>
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
                    onDetails={handleDetails}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
            </DataTableLayout>
        </div>
    );
};

export default ContractView;