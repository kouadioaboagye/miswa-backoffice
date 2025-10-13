import DataTableLayout from '@/shared/components/layouts/data-table-layout';
import GlobalDataCard from '@/shared/components/molecules/global-data-card';
import { Button } from '@/shared/components/ui/button';
import { WalletIcon, CreditCardIcon, CheckCircleIcon, ClockIcon, DollarSignIcon, TrendingUpIcon } from 'lucide-react';
import RefreshIcon from '../../../../public/assets/icons/refresh-icon';
import PaymentTable from '../components/tables/payment/payment-table';

const PaymentView = () => {
    const dataItems = [
        {
            title: 'Total Paiements',
            value: '1,247',
            percentageChange: +12.5,
            icon: <WalletIcon className="text-white" />
        },
        {
            title: 'Paiements Réussis',
            value: '1,156',
            percentageChange: +8.2,
            icon: <CheckCircleIcon className="text-white" />
        },
        {
            title: 'Paiements En Attente',
            value: '67',
            percentageChange: -3.1,
            icon: <ClockIcon className="text-white" />
        },
        {
            title: 'Montant Total',
            value: '2,450,000 FCFA',
            percentageChange: +15.8,
            icon: <DollarSignIcon className="text-white" />
        },
        {
            title: 'Taux de Réussite',
            value: '92.7%',
            percentageChange: +2.1,
            icon: <TrendingUpIcon className="text-white" />
        },
        {
            title: 'Paiements Échoués',
            value: '24',
            percentageChange: -5.2,
            icon: <CreditCardIcon className="text-white" />
        }
    ];

    return (
        <div className="flex flex-col gap-16">
            <GlobalDataCard data={dataItems} />
            <DataTableLayout
                title="Listes des paiements et statut"
                action={{
                    refresh: (
                        <Button
                            variant={'refresh'}
                            size={'add'}
                            className="text-white [&_svg]:size-8"
                        >
                            <RefreshIcon />{' '}
                            <span className="text-[1.3rem]">RAFRAICHIR</span>
                        </Button>
                    )
                }}
            >
                <PaymentTable />
            </DataTableLayout>
        </div>
    );
};

export default PaymentView;
