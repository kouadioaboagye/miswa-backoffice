"use client"

import GlobalDataCard from '@/shared/components/molecules/global-data-card';
import { GlobeIcon, WalletIcon } from 'lucide-react';
import DocIcon from '../../../../../../public/assets/icons/doc-icon';
import { ChartLineMultiple } from '@/shared/components/ui/line-chart';
import { useDashboardPropertyDataQuery } from '@/lib/data-service/property/property.queries';

const DashboardPropertyView = () => {
    const { data: response, isLoading, error, refetch } = useDashboardPropertyDataQuery()
    const { data, total } = response || { data: [], total: 0 }
    console.log('Dashboard Property Data:', response);
    const dataItems = [
        {
            title: 'Total Biens',
            value: '2',
            percentageChange: 0,
            icon: <WalletIcon className="text-white" />
        },
        {
            title: 'Total Batiment',
            value: '2',
            percentageChange: 0,
            icon: <WalletIcon className="text-white" />
        },
        {
            title: 'Biens occupés',
            value: '0',
            percentageChange: 0,
            icon: <WalletIcon className="text-white" />
        }
    ];

    const buildingData = [
        { month: "January", occupied: 120, vacant: 30 },
        { month: "February", occupied: 140, vacant: 25 },
        { month: "March", occupied: 160, vacant: 20 },
        { month: "April", occupied: 180, vacant: 18 },
        { month: "May", occupied: 190, vacant: 15 },
    ];

    const buildingConfig = {
        occupied: { label: "Occupé", color: "var(--chart-1)" },
        vacant: { label: "Libre", color: "var(--chart-2)" },
    };

    return (
        <div className="flex flex-col gap-16">
            <GlobalDataCard data={dataItems} />
            <ChartLineMultiple
                title='Évolution des biens en cours et occupuations'
                data={buildingData}
                xKey='month'
                yKeys={['occupied', 'vacant']}
                config={buildingConfig}
            />
        </div>
    );
};

export default DashboardPropertyView;
