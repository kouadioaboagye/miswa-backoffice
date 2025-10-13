"use client"

import DataTableLayout from '@/shared/components/layouts/data-table-layout'
import GlobalDataCard from '@/shared/components/molecules/global-data-card'
import { Button } from '@/shared/components/ui/button'
import React from 'react'
import RefreshIcon from '../../../../../../../public/assets/icons/refresh-icon'
import { useRouter } from 'next/navigation'
import { Plus, BuildingIcon, MapPinIcon, UsersIcon, GlobeIcon, EyeIcon, PhoneIcon } from 'lucide-react'
import BuildingTable from '../../components/forms/tables/building/building-table'
import { useListBuildingsQuery } from '@/lib/data-service/property/property.queries'
import { toast } from 'sonner'

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

    // Calculer les métriques basées sur les données réelles
    const totalBuildings = total || 0;
    const publicBuildings = buildings.filter(building => building.is_public).length;
    const buildingsWithPhotos = buildings.filter(building => building.photos && building.photos.length > 0).length;
    const buildingsWithLocation = buildings.filter(building => building.latitude && building.longitude).length;
    const buildingsWithBusiness = buildings.filter(building => building.business).length;
    const buildingsInAbidjan = buildings.filter(building => building.municipality?.name === 'Abidjan').length;

    const dataItems = [
        {
            title: 'Total Bâtiments',
            value: totalBuildings.toString(),
            percentageChange: +12.5,
            icon: <BuildingIcon className="text-white" />
        },
        {
            title: 'Bâtiments Publics',
            value: publicBuildings.toString(),
            percentageChange: +8.2,
            icon: <GlobeIcon className="text-white" />
        },
        {
            title: 'Avec Photos',
            value: buildingsWithPhotos.toString(),
            percentageChange: +15.3,
            icon: <EyeIcon className="text-white" />
        },
        {
            title: 'Avec Localisation',
            value: buildingsWithLocation.toString(),
            percentageChange: +6.7,
            icon: <MapPinIcon className="text-white" />
        },
        {
            title: 'Avec Propriétaire',
            value: buildingsWithBusiness.toString(),
            percentageChange: +9.8,
            icon: <UsersIcon className="text-white" />
        },
        {
            title: 'À Abidjan',
            value: buildingsInAbidjan.toString(),
            percentageChange: +4.1,
            icon: <MapPinIcon className="text-white" />
        }
    ];

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
                <BuildingTable data={buildings} />
            </DataTableLayout>
        </div>
    )
}

export default ListBuildingView
