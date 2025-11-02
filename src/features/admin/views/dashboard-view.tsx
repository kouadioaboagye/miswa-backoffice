'use client';

import { useGetDashboardQuery } from '@/lib/data-service/dashboard/dashboard.hooks';
import GlobalDataCard from '@/shared/components/molecules/global-data-card';
import { ChartLineMultiple } from '@/shared/components/ui/line-chart';
import { WalletIcon } from 'lucide-react';
import DocIcon from '../../../../public/assets/icons/doc-icon';
import GlobeIcon from '../../../../public/assets/icons/globe-icon';

const DashboardView = () => {
    const { data: stats } = useGetDashboardQuery();

    const statOverview = stats?.overview;

    const dataItems = [
        {
            title: 'Total Biens',
            value: statOverview?.total_properties,
            // percentageChange: +55,
            icon: <WalletIcon className="text-white" />
        },
        {
            title: 'Total Batiment',
            value: statOverview?.total_buildings,
            // percentageChange: +5,
            icon: <GlobeIcon className="text-white" />
        },
        {
            title: 'Biens occupés',
            value: '185',
            // percentageChange: -14,
            icon: <DocIcon className="text-white" />
        },
        {
            title: 'Total Propriétaire',
            value: statOverview?.total_businesses,
            // percentageChange: +55,
            icon: <WalletIcon className="text-white" />
        },
        {
            title: 'Total Locataire',
            value: '185',
            // percentageChange: +5,
            icon: <GlobeIcon className="text-white" />
        },
        {
            title: 'Contrats en cours',
            value: '185',
            // percentageChange: -14,
            icon: <DocIcon className="text-white" />
        }
    ];

    return (
        <div className="flex flex-col gap-16">
            <GlobalDataCard data={dataItems} />
            <ChartLineMultiple />
        </div>
    );
};

export default DashboardView;
