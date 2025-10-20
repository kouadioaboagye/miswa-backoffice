import GlobalDataCard from '@/shared/components/molecules/global-data-card';
import { ChartLineMultiple } from '@/shared/components/ui/line-chart';
import { WalletIcon } from 'lucide-react';
import DocIcon from '../../../../public/assets/icons/doc-icon';
import GlobeIcon from '../../../../public/assets/icons/globe-icon';

const DashboardView = () => {
    const dataItems = [
        {
            title: 'Total Biens',
            value: '245',
            percentageChange: +55,
            icon: <WalletIcon className="text-white" />
        },
        {
            title: 'Total Batiment',
            value: '20',
            percentageChange: +5,
            icon: <GlobeIcon className="text-white" />
        },
        {
            title: 'Biens occupés',
            value: '185',
            percentageChange: -14,
            icon: <DocIcon className="text-white" />
        },
        {
            title: 'Total Propriétaire',
            value: '17',
            percentageChange: +55,
            icon: <WalletIcon className="text-white" />
        },
        {
            title: 'Total Locataire',
            value: '185',
            percentageChange: +5,
            icon: <GlobeIcon className="text-white" />
        },
        {
            title: 'Contrats en cours',
            value: '185',
            percentageChange: -14,
            icon: <DocIcon className="text-white" />
        }
    ];

    const buildingData = [
        { month: "January", occupied: 120, vacant: 30 },
        { month: "February", occupied: 140, vacant: 25 },
        { month: "March", occupied: 160, vacant: 20 },
        { month: "April", occupied: 180, vacant: 18 },
        { month: "May", occupied: 190, vacant: 15 },
        { month: "June", occupied: 200, vacant: 14 },
        { month: "July", occupied: 210, vacant: 13 },
        { month: "August", occupied: 215, vacant: 12 },
        { month: "September", occupied: 225, vacant: 10 },
        { month: "October", occupied: 230, vacant: 9 },
        { month: "November", occupied: 240, vacant: 8 },
        { month: "December", occupied: 250, vacant: 7 },
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

export default DashboardView;
