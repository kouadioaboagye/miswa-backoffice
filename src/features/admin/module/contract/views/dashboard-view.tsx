import GlobalDataCard from '@/shared/components/molecules/global-data-card';
import { GlobeIcon, WalletIcon } from 'lucide-react';
import DocIcon from '../../../../../../public/assets/icons/doc-icon';

const DashboardContractView = () => {
const dataItems = [
    {
        title: 'Total contrats',
        value: '125',
        percentageChange: +55,
        icon: <WalletIcon className="text-white" />
    },
    {
        title: 'Contrats en cours',
        value: '8',
        percentageChange: +5,
        icon: <GlobeIcon className="text-white" />
    },
    {
        title: 'Contrats terminés',
        value: '28',
        percentageChange: -14,
        icon: <DocIcon className="text-white" />
    }
];

    return (
        <div className="flex flex-col gap-16">
            <GlobalDataCard data={dataItems} />
        </div>
    );
};

export default DashboardContractView;
