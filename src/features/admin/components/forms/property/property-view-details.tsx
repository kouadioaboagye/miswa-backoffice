'use client';

import UserPill from '@/shared/components/atoms/user-pill';
import MapLeftlet from '@/shared/components/leftlet-map/map';
import InterventionCaroussel from '@/shared/components/molecules/intervention-caroussel';
import { Button } from '@/shared/components/ui/button';
import Link from 'next/link';
import CheckCircleIcon from '../../../../../../public/assets/icons/check-circle';
import EditIcon2 from '../../../../../../public/assets/icons/edit-icon2';
import LocationIcon2 from '../../../../../../public/assets/icons/location_2';
import PointLocationIcon from '../../../../../../public/assets/icons/point-loaction';

const PropertyViewDetails = () => {
    // const { openModal } = useModalStore();

    // const handleOpenTreateInterventionModal = () => {
    //     openModal({
    //         view: <TreateIntervention />,
    //         isOverlayCanClosed: true
    //     });
    // };

    const imageTable: { url: string; alt: string }[] = [
        {
            url: '/assets/images/image4.jpg',
            alt: 'Touré Mack'
        },
        {
            url: '/assets/images/image1.jpg',
            alt: 'Touré Mack'
        },
        {
            url: '/assets/images/image2.jpg',
            alt: 'Touré Mack'
        },
        {
            url: '/assets/images/image3.jpg',
            alt: 'Touré Mack'
        },
        {
            url: '/assets/images/image5.jpg',
            alt: 'Touré Mack'
        },
        {
            url: '/assets/images/image6.jpg',
            alt: 'Touré Mack'
        }
    ];

    return (
        <div className="flex flex-col gap-12 px-4">
            <div className="flex items-center justify-between p-2">
                <div className="flex items-center gap-7">
                    <h3>
                        Bien :{' '}
                        <span className="font-bold text-[#1EA64A]">
                            #id_bien
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
                    // onClick={handleOpenTreateInterventionModal}
                >
                    <EditIcon2 />
                    <span className="text-[1.3rem]">MODIFIER</span>{' '}
                </Button>
            </div>
            <InterventionCaroussel images={imageTable} />
            <div className="flex flex-col gap-4">
                <h3>Appartement 4 pièce (Cité AGC Modeste Grand Bassam)</h3>
                <div className="flex gap-32 items-center">
                    <div className="flex gap-2 items-center">
                        <PointLocationIcon />
                        <span className="text-[1.2rem] text-[#778088]">
                            Côte d’Ivoire, Grand Bassam
                        </span>
                    </div>
                    <div className="flex gap-2 items-center">
                        <PointLocationIcon />
                        <span className="text-[1.2rem] text-[#778088]">
                            Côte d’Ivoire, Grand Bassam
                        </span>
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-4">
                <h3>Description</h3>
                <p className="text-[#495560]">
                    3 AC BEDROOM APARTMENT Full furnished. Stylish Apartment
                    Near Bashundhara R/A Entrance! Block i, R:4. Located right
                    by the main entrance of Bashundhara R/A from 300ft Road and
                    Madani Avenue. Just a 15-minute drive from Dhaka Airport,
                    and only 5 and 10 minutes from the Cantonment and Airport
                    Train Stations, our location is ideal for both business and
                    leisure travelers. Why wait? Your ideal stay is just a click
                    away, Don’t miss out, book now! Safety Features: CCTV
                    surveillance throughout the building and instant generator
                    support. Your Ideal Home in Dhaka. Wants to visit this
                    property for rent, just WhatsApp (+880 1814 963 028) this
                    property link or call us and share your convenient viewing
                    schedule.
                </p>
                <p className="text-[#495560]">
                    Whether you’re here for business or leisure, our apartment
                    offers elegant living spaces with refreshing airflow and
                    abundant natural light. Book your stay today and experience
                    the best of Dhaka!{' '}
                    <Link className="text-[#11928F] font-semibold" href={'#'}>
                        See More
                    </Link>
                </p>
            </div>
            <div className="flex flex-col gap-4">
                <h3>Commodités</h3>
                <div className="grid grid-cols-5 gap-6">
                    <div className=" h-fit p-7 border border-[#16527D33] flex gap-4">
                        <CheckCircleIcon />
                        <div className="flex flex-col gap-1">
                            <span className="text-[#1C2B38] font-semibold">
                                Parking
                            </span>
                            <span>12</span>
                        </div>
                    </div>
                    <div className="h-fit p-7 border border-[#16527D33] flex gap-4">
                        <CheckCircleIcon />
                        <div className="flex flex-col gap-1">
                            <span className="text-[#1C2B38] font-semibold">
                                Sécurité
                            </span>
                            <span>Gardien</span>
                        </div>
                    </div>
                    <div className="h-fit p-7 border border-[#16527D33] flex gap-4">
                        <CheckCircleIcon />
                        <div className="flex flex-col gap-1">
                            <span className="text-[#1C2B38] font-semibold">
                                Espace commun
                            </span>
                            <span>Buanderie,terrasse</span>
                        </div>
                    </div>
                    <div className="h-fit p-7 border border-[#16527D33] flex gap-4">
                        <CheckCircleIcon />
                        <div className="flex flex-col gap-1">
                            <span className="text-[#1C2B38] font-semibold">
                                Système eau/électricité
                            </span>
                            <span>raccordé</span>
                        </div>
                    </div>
                    <div className="h-fit p-7 border border-[#16527D33] flex gap-4">
                        <CheckCircleIcon />
                        <div className="flex flex-col gap-1">
                            <span className="text-[#1C2B38] font-semibold">
                                Ascenseur
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-4">
                <div className="flex items-center gap-4">
                    <LocationIcon2 />
                    <h3>Géolocalisation du bien</h3>
                </div>
                <div className="h-[30rem] border border-[#16527D33] rounded-[1.2rem]">
                    <MapLeftlet />
                </div>
            </div>
        </div>
    );
};

export default PropertyViewDetails;
