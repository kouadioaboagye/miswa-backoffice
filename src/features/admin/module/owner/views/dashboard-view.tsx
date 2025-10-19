"use client"

import GlobalDataCard from '@/shared/components/molecules/global-data-card';
import { GlobeIcon } from 'lucide-react';
import { ChartLineMultiple } from '@/shared/components/ui/line-chart';
import { useDashboardOwnerDataQuery } from '@/lib/data-service/module/owner/owner.queries';

const DashboardOwnerView = () => {
    const { data, isLoading, error, refetch } = useDashboardOwnerDataQuery();
    const overview = data?.overview;
    const dataItems = [
        {
            title: 'Total propriétaires',
            value: overview?.total_businesses.toString() || '0',
            percentageChange: 0,
            icon: <GlobeIcon className="text-white" />
        },
        {
            title: 'Propriétaires actifs',
            value: overview?.active_businesses.toString() || '0',
            percentageChange: 0,
            icon: <GlobeIcon className="text-white" />
        },
        {
            title: 'Propriétaires inactifs',
            value: overview?.default_businesses.toString() || '0',
            percentageChange: 0,
            icon: <GlobeIcon className="text-white" />
        }
    ];

    const ownerData = [
        { month: "January", active: 80, inactive: 20 },
        { month: "February", active: 90, inactive: 18 },
        { month: "March", active: 100, inactive: 15 },
        { month: "April", active: 110, inactive: 14 },
        { month: "May", active: 120, inactive: 12 },
        { month: "June", active: 130, inactive: 11 },
        { month: "July", active: 140, inactive: 10 },
        { month: "August", active: 145, inactive: 9 },
        { month: "September", active: 150, inactive: 9 },
        { month: "October", active: 155, inactive: 8 },
        { month: "November", active: 160, inactive: 7 },
        { month: "December", active: 170, inactive: 6 },
    ];

    const ownerConfig = {
        active: { label: "Propriétaires actifs", color: "var(--chart-1)" },
        inactive: { label: "Propriétaires inactifs", color: "var(--chart-2)"},
    };

    return (
        <div className="flex flex-col gap-16">
            <GlobalDataCard data={dataItems} />
            <ChartLineMultiple
                title="Évolution des propriétaires actifs et inactifs"
                data={ownerData}
                xKey="month"
                yKeys={["active", "inactive"]}
                config={ownerConfig}
            />
        </div>
    );
};

export default DashboardOwnerView;
