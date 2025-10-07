'use client';

import UserPill from '@/shared/components/atoms/user-pill';
import InterventionCaroussel from '@/shared/components/molecules/intervention-caroussel';
import { Badge } from '@/shared/components/ui/badge';
import { Button } from '@/shared/components/ui/button';
import { useModalStore } from '@/shared/store/useModalStore';
import Link from 'next/link';
import { BasilArrowRightOutline } from '../../../../../../public/assets/icons/arrow-right';
import RejectRequestInterventionForm from './reject-request-intervention-form';
import SendInterventionSendMessageForm from './send-intervention-send-message-form';
import TreateIntervention from './treate-intervention';

const InterventionViewDetails = () => {
    const { openModal } = useModalStore();

    const handleOpenSendMessageDialog = () => {
        openModal({
            view: <SendInterventionSendMessageForm />,
            isOverlayCanClosed: true
        });
    };

    const handleOpenRejectRequestModal = () => {
        openModal({
            view: <RejectRequestInterventionForm />,
            isOverlayCanClosed: true
        });
    };

    const handleOpenTreateInterventionModal = () => {
        openModal({
            view: <TreateIntervention />,
            isOverlayCanClosed: true
        });
    };

    return (
        <div className="flex flex-col gap-12 px-4">
            <div className="flex items-center justify-between p-2">
                <div className="flex items-center gap-7">
                    <h3>
                        Intervention :{' '}
                        <span className="font-bold text-[#1EA64A]">
                            #id_intervention
                        </span>
                    </h3>
                    <UserPill
                        fullName="Touré Mack"
                        src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
                    />
                    <UserPill
                        fullName="KOUAHO Stephane"
                        src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
                    />
                </div>
                <Button
                    variant={'add'}
                    size={'add'}
                    className="text-white [&_svg]:size-8"
                    onClick={handleOpenTreateInterventionModal}
                >
                    <span className="text-[1.3rem]">MARQUER TRAITER</span>{' '}
                    <BasilArrowRightOutline />
                </Button>
            </div>
            <InterventionCaroussel />
            <div className="flex gap-4">
                <h3>Description De l’intervention</h3>
                <Badge variant={'pending'} className="text-[1.1rem]">
                    En attente
                </Badge>
            </div>
            <p className="text-[#495560]">
                3 AC BEDROOM APARTMENT Full furnished. Stylish Apartment Near
                Bashundhara R/A Entrance! Block i, R:4. Located right by the
                main entrance of Bashundhara R/A from 300ft Road and Madani
                Avenue. Just a 15-minute drive from Dhaka Airport, and only 5
                and 10 minutes from the Cantonment and Airport Train Stations,
                our location is ideal for both business and leisure travelers.
                Why wait? Your ideal stay is just a click away, Don’t miss out,
                book now! Safety Features: CCTV surveillance throughout the
                building and instant generator support. Your Ideal Home in
                Dhaka. Wants to visit this property for rent, just WhatsApp
                (+880 1814 963 028) this property link or call us and share your
                convenient viewing schedule.
            </p>
            <p className="text-[#495560]">
                Whether you’re here for business or leisure, our apartment
                offers elegant living spaces with refreshing airflow and
                abundant natural light. Book your stay today and experience the
                best of Dhaka!{' '}
                <Link className="text-[#11928F] font-semibold" href={'#'}>
                    See More
                </Link>
            </p>
            <div className="flex items-center justify-between mt-4">
                <div className="flex gap-4">
                    <Button className="bg-[#CB30E0] hover:bg-[#CB30E0]/90 [&_svg]:size-10 h-[48px]">
                        <span className="text-[1.3rem]">
                            SIGNALER PROPRIETAIRE
                        </span>{' '}
                        <BasilArrowRightOutline />
                    </Button>
                    <Button
                        onClick={handleOpenRejectRequestModal}
                        className="bg-[#FF5F57] hover:bg-[#FF5F57]/90 [&_svg]:size-10 h-[48px]"
                    >
                        <span className="text-[1.3rem]">REJETER</span>{' '}
                        <BasilArrowRightOutline />
                    </Button>
                </div>
                <Button
                    onClick={handleOpenSendMessageDialog}
                    className="bg-[#0088FF] hover:bg-[#0088FF]/90 [&_svg]:size-10 h-[48px]"
                >
                    <span className="text-[1.3rem]">ENVOYER UN MESSAGE</span>{' '}
                    <BasilArrowRightOutline />
                </Button>
            </div>
        </div>
    );
};

export default InterventionViewDetails;
