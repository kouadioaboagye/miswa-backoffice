"use client"

import DataTableLayout from '@/shared/components/layouts/data-table-layout';
import GlobalDataCard from '@/shared/components/molecules/global-data-card';
import { Button } from '@/shared/components/ui/button';
import { Plus, UsersIcon, UserCheckIcon, UserXIcon, BuildingIcon, PhoneIcon, MailIcon, WalletIcon } from 'lucide-react';
import RefreshIcon from '../../../../../../../public/assets/icons/refresh-icon';
import GlobeIcon from '../../../../../../../public/assets/icons/globe-icon';
import DocIcon from '../../../../../../../public/assets/icons/doc-icon';
import { useRouter } from 'next/navigation';
import OwnerTable from '../../components/tables/owner/owner-table';
import { useListOwnersQuery } from '@/lib/data-service/module/owner/owner.queries';
import { toast } from 'sonner';
import { fetchWrapper } from '@/lib/http-client/ fetchWrapper';

const ListOwnerView = () => {
    const { data: response, isLoading, error, refetch, isRefetching } = useListOwnersQuery()
    const { data, total } = response || { data: [], total: 0 }
    const router = useRouter()

    const handleRefresh = async () => {
        try {
            await refetch();
            toast.success('Liste des propriétaires actualisés avec succès.');
        } catch {
            toast.error('Erreur lors de l’actualisation des données.');
        }
    };

    // Calculer les métriques basées sur les données réelles
    const totalOwners = total || 0;
    const activeOwners = data.filter(owner => owner.owner?.phonenumber).length;
    const ownersWithEmail = data.filter(owner => owner.owner?.email && owner.owner.email !== '').length;
    const individualOwners = data.filter(owner => owner.owner?.legal_form === 'individuals').length;
    const companyOwners = data.filter(owner => owner.owner?.legal_form === 'company').length;
    const whatsappUsers = data.filter(owner => owner.owner?.is_whatsapp).length;

    const dataItems = [
        {
            title: 'Total Propriétaires',
            value: totalOwners.toString(),
            percentageChange: +8.5,
            icon: <UsersIcon className="text-white" />
        },
        {
            title: 'Propriétaires Actifs',
            value: activeOwners.toString(),
            percentageChange: +12.3,
            icon: <UserCheckIcon className="text-white" />
        },
        {
            title: 'Particuliers',
            value: individualOwners.toString(),
            percentageChange: +6.7,
            icon: <BuildingIcon className="text-white" />
        },
        {
            title: 'Entreprises',
            value: companyOwners.toString(),
            percentageChange: +15.2,
            icon: <BuildingIcon className="text-white" />
        },
        {
            title: 'Avec WhatsApp',
            value: whatsappUsers.toString(),
            percentageChange: +9.8,
            icon: <PhoneIcon className="text-white" />
        },
        {
            title: 'Avec Email',
            value: ownersWithEmail.toString(),
            percentageChange: +4.1,
            icon: <MailIcon className="text-white" />
        }
    ];
    const handleDetails = (id: string) => {
        router.push(`/admin/module/owner/details/${id}`);
    };

    const handleEdit = (id: string) => {
        router.push(`/admin/module/owner/edit/${id}`);
    };

    const handleDelete = async (id: string) => {
        try {
            await fetchWrapper(`businesses/${id}/force/`, {
                method: 'DELETE',
            });
            toast.success('Propriétaire supprimé avec succès.');
            await refetch();
        } catch (error: any) {
            toast.error(error instanceof Error ? error.message : 'Oops, une erreur est survenue lors de la suppression.');
        }
    }

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
                        onClick={() => router.push("/admin/module/owner/add")}
                    >
                        <Plus />{' '}
                        <span className="text-[1.3rem]">NOUVEAU PROPRIÉTAIRE</span>
                    </Button>
                )
            }}
        >
            <OwnerTable
                data={data}
                onDetails={handleDetails}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />
        </DataTableLayout>
    </div>
);
};

export default ListOwnerView;
