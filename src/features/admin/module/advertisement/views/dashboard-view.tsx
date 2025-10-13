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

    return (
        <div className="flex flex-col gap-16">
            <GlobalDataCard data={dataItems} />
            <ChartLineMultiple title='Évolution des annonces en cours et échouées'/>
        </div>
    );
};

export default DashboardAdvertisementView;
