import GlobalDataCard from '@/shared/components/molecules/global-data-card';
import { GlobeIcon, WalletIcon } from 'lucide-react';
import DocIcon from '../../../../../../public/assets/icons/doc-icon';
import { ChartLineMultiple } from '@/shared/components/ui/line-chart';

const DashboardAdvertisementView = () => {
    const dataItems = [
        {
            title: 'Total Annonces',
            value: '36',
            percentageChange: +55,
            icon: <WalletIcon className="text-white" />
        },
        {
            title: 'Annonces en cours',
            value: '8',
            percentageChange: +5,
            icon: <GlobeIcon className="text-white" />
        },
        {
            title: 'Annonces archivées',
            value: '28',
            percentageChange: -14,
            icon: <DocIcon className="text-white" />
        }
    ];

    const adsChartData = [
        { month: "Janvier", ongoing: 35, failed: 5 },
        { month: "Février", ongoing: 50, failed: 8 },
        { month: "Mars", ongoing: 48, failed: 12 },
        { month: "Avril", ongoing: 40, failed: 10 },
        { month: "Mai", ongoing: 60, failed: 15 },
        { month: "Juin", ongoing: 55, failed: 9 },
        { month: "Juillet", ongoing: 70, failed: 11 },
        { month: "Août", ongoing: 65, failed: 14 },
        { month: "Septembre", ongoing: 72, failed: 10 },
        { month: "Octobre", ongoing: 80, failed: 13 },
        { month: "Novembre", ongoing: 78, failed: 9 },
        { month: "Décembre", ongoing: 90, failed: 7 },
    ];

    const adsChartConfig = {
        ongoing: {
            label: "Annonces en cours",
            color:  "var(--chart-1)",
        },
        failed: {
            label: "Annonces échouées",
            color: "var(--chart-2)",
        },
    };
    return (
        <div className="flex flex-col gap-16">
            <GlobalDataCard data={dataItems} />
            <ChartLineMultiple
                title='Évolution des annonces en cours et échouées'
                data={adsChartData}
                xKey='month'
                yKeys={['ongoing', 'failed']}
                config={adsChartConfig}
            />
        </div>
    );
};

export default DashboardAdvertisementView;
