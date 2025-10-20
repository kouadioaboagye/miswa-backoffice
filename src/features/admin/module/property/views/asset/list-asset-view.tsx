"use client"

import DataTableLayout from '@/shared/components/layouts/data-table-layout'
import { Button } from '@/shared/components/ui/button'
import React, { useState } from 'react'
import RefreshIcon from '../../../../../../../public/assets/icons/refresh-icon'
import { useRouter } from 'next/navigation'
import { Plus } from 'lucide-react'
import AssetTable from '../../components/tables/asset/asset-table'
import { useListPropertiesQuery } from '@/lib/data-service/property/property.queries'
import { columns } from '../../components/tables/asset/columns'

function ListAssetView() {
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 10;

    const { data: response, isLoading, error, refetch } = useListPropertiesQuery(currentPage, pageSize)
    const { data, total } = response || { data: [], total: 0 }

    const router = useRouter();

    const handleRefresh = async () => {
        try {
            await refetch();
        } catch (error) {
            console.error('Erreur lors du rafraîchissement:', error);
        }
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };
    return (
        <div className="flex flex-col gap-16">
            <DataTableLayout
                title="Liste des biens"
                action={{
                    refresh: (
                        <Button
                            variant={'refresh'}
                            size={'add'}
                            className="text-white [&_svg]:size-8"
                            onClick={handleRefresh}
                            disabled={isLoading}
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
                            onClick={() => router.push("/admin/module/property/asset/add")}
                        >
                            <Plus />{' '}
                            <span className="text-[1.3rem]">NOUVEAU BIEN</span>
                        </Button>
                    )
                }}
            >
                <AssetTable
                    data={data}
                    columns={columns}
                    totalItems={total}
                    pageSize={pageSize}
                    onPageChange={handlePageChange}
                    currentPage={currentPage}
                    isLoading={isLoading}
                />
            </DataTableLayout>
        </div>
    )
}

export default ListAssetView
