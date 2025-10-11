import GlobalDataCard from '@/shared/components/molecules/global-data-card';
import { GlobeIcon, WalletIcon } from 'lucide-react';
import DocIcon from '../../../../../../public/assets/icons/doc-icon';

const DashboardView = () => {
    const dataItems = [
        {
            title: 'Montant auj',
            value: '53 000 FCFA',
            percentageChange: +55,
            icon: <WalletIcon className="text-white" />
        },
        {
            title: 'Utilisateurs auj',
            value: '2 300',
            percentageChange: +5,
            icon: <GlobeIcon className="text-white" />
        },
        {
            title: 'Nouveaux clients',
            value: '3 052',
            percentageChange: -14,
            icon: <DocIcon className="text-white" />
        },
        {
            title: 'Montant auj',
            value: '53 000 FCFA',
            percentageChange: +55,
            icon: <WalletIcon className="text-white" />
        },
        {
            title: 'Utilisateurs auj',
            value: '2 300',
            percentageChange: +5,
            icon: <GlobeIcon className="text-white" />
        },
        {
            title: 'Nouveaux clients',
            value: '3 052',
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

export default DashboardView;
