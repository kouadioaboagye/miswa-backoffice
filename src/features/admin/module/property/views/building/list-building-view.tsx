"use client"

import DataTableLayout from '@/shared/components/layouts/data-table-layout'
import GlobalDataCard from '@/shared/components/molecules/global-data-card'
import { Button } from '@/shared/components/ui/button'
import React from 'react'
import RefreshIcon from '../../../../../../../public/assets/icons/refresh-icon'
import { useRouter } from 'next/navigation'
import { Plus, BuildingIcon, MapPinIcon, UsersIcon, GlobeIcon, EyeIcon, PhoneIcon } from 'lucide-react'
import BuildingTable from '../../components/forms/tables/building/building-table'
import { toast } from 'sonner'
import { useListBuildingsQuery } from '@/lib/data-service/property/building.queries'
import { fetchWrapper } from '@/lib/http-client/ fetchWrapper'

function ListBuildingView() {
    const { data: buildingsResponse, isLoading, error, refetch, isRefetching } = useListBuildingsQuery()
    const { data: buildings, total } = buildingsResponse || { data: [], total: 0 }
    const router = useRouter();

    const handleRefresh = async () => {
        try {
            await refetch();
            toast.success('Liste des bâtiments actualisée avec succès.');
        } catch {
            toast.error('Erreur lors de l\'actualisation des données.');
        }
    };

    const handleDetails = (id: string) => {
        router.push(`/admin/module/property/building/details/${id}`);
    };

    const handleEdit = (id: string) => {
        router.push(`/admin/module/property/building/edit/${id}`);
    };

    const handleDelete = async (id: string) => {
        try {
            await fetchWrapper(`buildings/${id}/force/`, {
                method: 'DELETE',
            });
            toast.success('Bâtiment supprimé avec succès.');
            await refetch();
        } catch (error: any) {
            if (error?.detail?.code === 'BUILDING_HAS_PROPERTIES') {
                toast.error(error.detail.label_fr);
            } else {
                toast.error(error instanceof Error ? error.message : 'Oops, une erreur est survenue lors de la suppression.');
            }
        }
    };

    return (
        <div className="flex flex-col gap-16">
            <GlobalDataCard data={dataItems} />
            <DataTableLayout
                title="Liste des immeubles/bâtiments"
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
                            onClick={() => router.push("/admin/module/property/building/add")}
                        >
                            <Plus />{' '}
                            <span className="text-[1.3rem]">NOUVEL IMMEUBLE</span>
                        </Button>
                    )
                }}
            >
                <BuildingTable
                    data={buildings}
                    onDetails={handleDetails}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
            </DataTableLayout>
        </div>
    )
}

export default ListBuildingView
