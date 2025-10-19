import GlobalDataCard from '@/shared/components/molecules/global-data-card';
import { GlobeIcon, WalletIcon } from 'lucide-react';
import DocIcon from '../../../../../../public/assets/icons/doc-icon';
import { ChartLineMultiple } from '@/shared/components/ui/line-chart';

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

    const tenantData = [
        { month: "January", active: 150, inactive: 25 },
        { month: "February", active: 160, inactive: 23 },
        { month: "March", active: 170, inactive: 22 },
        { month: "April", active: 180, inactive: 20 },
        { month: "May", active: 190, inactive: 19 },
        { month: "June", active: 200, inactive: 18 },
        { month: "July", active: 210, inactive: 17 },
        { month: "August", active: 220, inactive: 15 },
        { month: "September", active: 230, inactive: 14 },
        { month: "October", active: 240, inactive: 12 },
        { month: "November", active: 245, inactive: 10 },
        { month: "December", active: 250, inactive: 9 },
    ];

    const tenantConfig = {
        active: { label: "Locataires actifs", color: "var(--chart-1)" },
        inactive: { label: "Locataires inactifs", color: "var(--chart-2)" },
    };

    return (
        <div className="flex flex-col gap-16">
            <GlobalDataCard data={dataItems} />
            <ChartLineMultiple
                title="Évolution des locataires actifs et inactifs"
                data={tenantData}
                xKey="month"
                yKeys={["active", "inactive"]}
                config={tenantConfig}
            />
        </div>
    );
};

export default DashboardView;
