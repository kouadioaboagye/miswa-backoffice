"use client"

import DataTableLayout from '@/shared/components/layouts/data-table-layout';
import GlobalDataCard from '@/shared/components/molecules/global-data-card';
import { Button } from '@/shared/components/ui/button';
import { Plus, WalletIcon } from 'lucide-react';
import RefreshIcon from '../../../../../../../public/assets/icons/refresh-icon';
import PaymentTable from '../../components/tables/payment/payment-table';
import { useRouter } from 'next/navigation';
import GlobeIcon from '../../../../../../../public/assets/icons/globe-icon';
import DocIcon from '../../../../../../../public/assets/icons/doc-icon';

const ListPaymentView = () => {
    const router = useRouter();
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
        }
    ];

    return (
        <div className="flex flex-col gap-16">
            <GlobalDataCard data={dataItems} />
            <DataTableLayout
                title="Listes des paiements pour et par propriétaire"
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
                    ),
                    add: (
                        <Button
                            variant={'add'}
                            size={'add'}
                            className="text-white [&_svg]:size-8"
                            onClick={() => router.push("/admin/module/payment/add")}
                        >
                            <Plus />{' '}
                            <span className="text-[1.3rem]">NOUVEAU PAIEMENT</span>
                        </Button>
                    )
                }}
            >
                <PaymentTable />
            </DataTableLayout>
        </div>
    );
};

export default ListPaymentView;
