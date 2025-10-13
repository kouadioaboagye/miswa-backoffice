"use client"

import DataTableLayout from '@/shared/components/layouts/data-table-layout';
import GlobalDataCard from '@/shared/components/molecules/global-data-card';
import { Button } from '@/shared/components/ui/button';
import { Plus, WalletIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { fetchWrapper } from '@/lib/http-client/ fetchWrapper';
import { useListTenantQuery } from '@/lib/data-service/module/tenant/tenant.queries';
import GlobeIcon from '../../../../../../public/assets/icons/globe-icon';
import DocIcon from '../../../../../../public/assets/icons/doc-icon';
import RefreshIcon from '../../../../../../public/assets/icons/refresh-icon';
import TenantTable from '../components/tables/tenant-table';

const ListTenantView = () => {
    const { data: response, isLoading, error, refetch, isRefetching } = useListTenantQuery()
    const { data, total } = response || { data: [], total: 0 }
    const router = useRouter()

    const handleRefresh = async () => {
        try {
            await refetch();
            toast.success('Liste des locataires actualisées avec succès.');
        } catch {
            toast.error('Erreur lors de l’actualisation des données.');
        }
    };

    const handleDetails = (id: string) => {
        router.push(`/admin/module/tenant/details/${id}`);
    };

    const handleEdit = (id: string) => {
        router.push(`/admin/module/tenant/edit/${id}`);
    };

    const handleDelete = async (id: string) => {
        try {
            await fetchWrapper(`tenants/${id}/force/`, {
                method: 'DELETE',
            });
            toast.success('Locataire supprimé avec succès.');
            await refetch();
        } catch (error: any) {
            toast.error(error instanceof Error ? error.message : 'Oops, une erreur est survenue lors de la suppression.');
        }
    }

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
            title="Liste des locataires"
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
                        onClick={() => router.push("/admin/module/tenant/add")}
                    >
                        <Plus />{' '}
                        <span className="text-[1.3rem]">NOUVEAU LOCATAIRE</span>
                    </Button>
                )
            }}
        >
            <TenantTable
                data={data}
                onDetails={handleDetails}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />
        </DataTableLayout>
    </div>
);
};

export default ListTenantView;
