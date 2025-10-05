"use client"

import DataTableLayout from '@/shared/components/layouts/data-table-layout'
import { Button } from '@/shared/components/ui/button'
import React from 'react'
import RefreshIcon from '../../../../../../../public/assets/icons/refresh-icon'
import { useRouter } from 'next/navigation'
import { Plus } from 'lucide-react'
import BuildingTable from '../../components/forms/tables/building/building-table'
import { useListBuildingsQuery } from '@/lib/data-service/property/property.queries'

function ListBuildingView() {
    const { data: buildingsResponse, isLoading, error } = useListBuildingsQuery()
    const { data: buildings, total } = buildingsResponse || { data: [], total: 0 }
    const router = useRouter();
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
                <BuildingTable data={buildings}/>
            </DataTableLayout>
        </div>
    )
}

export default ListBuildingView
