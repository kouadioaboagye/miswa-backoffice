"use client"

import DataTableLayout from '@/shared/components/layouts/data-table-layout'
import { Button } from '@/shared/components/ui/button'
import React from 'react'
import RefreshIcon from '../../../../../../../public/assets/icons/refresh-icon'
import { useRouter } from 'next/navigation'
import { Plus } from 'lucide-react'
import BuildingTable from '../../components/forms/tables/building/building-table'
import { toast } from 'sonner'
import { useListBuildingsQuery } from '@/lib/data-service/property/building.queries'

function ListBuildingView() {
    const { data: buildingsResponse, isLoading, error, refetch, isRefetching } = useListBuildingsQuery()
    const { data: buildings, total } = buildingsResponse || { data: [], total: 0 }
    const router = useRouter();

    const handleRefresh = async () => {
        try {
            await refetch();
            toast.success('Liste des bâtiments actualisée avec succès.');
        } catch {
            toast.error('Erreur lors de l’actualisation des données.');
        }
    };

    return (
        <div className="flex flex-col gap-16">
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
                <BuildingTable data={buildings} />
            </DataTableLayout>
        </div>
    )
}

export default ListBuildingView
