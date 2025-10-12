"use client";

import DataTableLayout from '@/shared/components/layouts/data-table-layout';
import { Button } from '@/shared/components/ui/button';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import RefreshIcon from '../../../../../../public/assets/icons/refresh-icon';
import { useListAdvertisementQuery } from '@/lib/data-service/module/advertisement/advertisement.queries.ts';
import { fetchWrapper } from '@/lib/http-client/ fetchWrapper';
import { AdTable } from '../components/tables/ad-table';

const ListAdView = ({ status }: { status: string }) => {
    const {
        data: response,
        isLoading,
        error,
        refetch,
        isRefetching,
    } = useListAdvertisementQuery();

    const { data = [], total = 0 } = response ?? {};

    const router = useRouter();

    const handleRefresh = async () => {
        try {
            await refetch();
            toast.success('Liste des annonces actualisée avec succès.');
        } catch {
            toast.error('Erreur lors de l’actualisation des données.');
        }
    };

    const handleDetails = (id: string) =>
        router.push(`/admin/module/advertisement/details/${id}`);

    const handleEdit = (id: string) =>
        router.push(`/admin/module/advertisement/edit/${id}`);

    const handleDelete = async (id: string) => {
        try {
            await fetchWrapper(`advertisement/${id}/force/`, { method: 'DELETE' });
            toast.success('Annonce supprimée avec succès.');
            await refetch();
        } catch (e: any) {
            toast.error(
                e instanceof Error ? e.message : 'Erreur lors de la suppression.'
            );
        }
    };

    const getTitle = () => {
        switch (status) {
            case 'active':
                return 'Liste des annonces en cours';
            case 'archived':
                return 'Liste des annonces archivées';
            case 'draft':
                return 'Liste des annonces en brouillons';
            default:
                return 'Liste des annonces';
        }
    };
    
    return (
        <div className="flex flex-col gap-16">
            <DataTableLayout
                title={getTitle()}
                action={{
                    refresh: (
                        <Button
                            variant="refresh"
                            size="add"
                            className="text-white [&_svg]:size-8"
                            onClick={handleRefresh}
                            disabled={isLoading || isRefetching}
                        >
                            <RefreshIcon />{' '}
                            <span className="text-[1.3rem]">RAFRAÎCHIR</span>
                        </Button>
                    ),
                    add: (
                        <Button
                            variant="add"
                            size="add"
                            className="text-white [&_svg]:size-8"
                            onClick={() => router.push('/admin/module/advertisement/add')}
                        >
                            <Plus />{' '}
                            <span className="text-[1.3rem]">NOUVELLE ANNONCE</span>
                        </Button>
                    ),
                }}
            >
                <AdTable
                    data={data}
                    onDetails={handleDetails}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
            </DataTableLayout>
        </div>
    );
};

export default ListAdView;