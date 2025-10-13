"use client"

import DataTableLayout from '@/shared/components/layouts/data-table-layout';
import GlobalDataCard from '@/shared/components/molecules/global-data-card';
import { Button } from '@/shared/components/ui/button';
import { Plus, WalletIcon } from 'lucide-react';
import RefreshIcon from '../../../../../../../public/assets/icons/refresh-icon';
import { useRouter } from 'next/navigation';
import GlobeIcon from '../../../../../../../public/assets/icons/globe-icon';
import DocIcon from '../../../../../../../public/assets/icons/doc-icon';
import ContentModal from '@/shared/components/ui/content-modal';
import AddPaymentView from './add-payment-view';
import { useState } from 'react';
import SuccessModal from '@/shared/components/ui/success-modal';
import Loading from '@/app/loading';
import PaymentTable from '@/features/admin/components/tables/payment/payment-table';

const ListPaymentView = () => {
    const [addPaymentModalOpen, setAddPaymentModalOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false);
    const [successModalOpen, setSuccessModalOpen] = useState(false);
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
            <ContentModal
                isOpen={addPaymentModalOpen}
                onClose={() => setAddPaymentModalOpen(false)}
            >
                <AddPaymentView
                    onClose={() => setAddPaymentModalOpen(false)}
                    setLoading={(value) => setIsLoading(value)}
                    setSuccessModalOpen={(value) => setSuccessModalOpen(value)}
                />
            </ContentModal>
            {isLoading && <Loading/>}
            <SuccessModal
                isOpen={successModalOpen}
                title='Paiment #id_propriétaire initié avec succès'
                description='Le paiement #ref__du_paiement à été intié avec succès, un mail de confirmation à été envoyé au propriétaire afin de procéder au paiement de la facture'
                confirmText='Liste des paiements'
                onClose={() => setSuccessModalOpen(false)}
                onConfirm={() => console.log("liste")}
            />
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
                            onClick={() => setAddPaymentModalOpen(true)}
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
