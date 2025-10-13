'use client';

import { Button } from '@/shared/components/ui/button';
import { useModalStore } from '@/shared/store/useModalStore';
import Image from 'next/image';
import CadenasIcon from '../../../../public/assets/icons/cadenas';
import DeleteWhiteIcon from '../../../../public/assets/icons/delete-icon';
import EditIcon2 from '../../../../public/assets/icons/edit-icon2';
import MedalIcon from '../../../../public/assets/icons/medal-icon';

const UserDetails = () => {
    const { openModal } = useModalStore();

    // const handleOpenSendMessageDialog = () => {
    //     openModal({
    //         view: <SendInterventionSendMessageForm />,
    //         isOverlayCanClosed: true
    //     });
    // };

    // const handleOpenRejectRequestModal = () => {
    //     openModal({
    //         view: <RejectRequestInterventionForm />,
    //         isOverlayCanClosed: true
    //     });
    // };

    // const handleOpenTreateInterventionModal = () => {
    //     openModal({
    //         view: <TreateIntervention />,
    //         isOverlayCanClosed: true
    //     });
    // };

    return (
        <div className="flex flex-col gap-12 px-4">
            <div className="flex items-center justify-between p-2">
                <div className="flex items-center gap-7">
                    <h2>
                        Utilisateur :{' '}
                        <span className="font-bold text-[2rem] text-[#1EA64A]">
                            #id_utilisateur
                        </span>
                    </h2>
                </div>
                <div className="flex items-center gap-14">
                    <Button
                        variant={'destructive'}
                        size={'add'}
                        className="text-white [&_svg]:size-6 w-[26rem]"
                    >
                        <DeleteWhiteIcon />
                        <span className="text-[1.3rem]">DESACTIVER</span>{' '}
                    </Button>
                    <Button
                        variant={'add'}
                        size={'add'}
                        className="text-white [&_svg]:size-6 w-[26rem]"
                    >
                        <EditIcon2 />
                        <span className="text-[1.3rem]">
                            MODIFIER PROFILE
                        </span>{' '}
                    </Button>
                </div>
            </div>
            <div className="flex flex-col">
                <div className="h-[21rem] bg-[#14385C] rounded-2xl" />
                <div className="flex justify-center">
                    <div className="flex justify-center gap-10 w-[90rem] bg-background rounded-t-3xl px-10 py-14 h-[58rem] -mt-44">
                        <div className="w-1/2 h-full flex flex-col items-center justify-between pb-7">
                            <div className="size-[40rem] rounded-2xl overflow-hidden">
                                <Image
                                    alt=""
                                    src="/assets/images/man.png"
                                    width={400}
                                    height={400}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <Button
                                variant={'add'}
                                size={'add'}
                                className="text-white [&_svg]:size-6 w-[40rem]"
                            >
                                <CadenasIcon />
                                <span className="text-[1.3rem]">
                                    RENITIALISER LE MOT DE PASSE
                                </span>{' '}
                            </Button>
                        </div>
                        <div className="w-1/2 h-full flex flex-col gap-6">
                            <div className="bg-white px-6 py-5 rounded-xl">
                                <div className="border flex flex-col gap-5 border-gray-300 rounded-xl p-4">
                                    <div className="flex justify-between items-center">
                                        <div className="flex flex-col gap-2">
                                            <span className="text-[#1F1F1FB2] text-[1.3rem]">
                                                Nom et Prenom
                                            </span>
                                            <span className="text-[#1F1F1F] text-[1.2rem]">
                                                N’DOUFFOU SILVER
                                            </span>
                                        </div>
                                        <button className="bg-[#F0EFFA] flex justify-center items-center py-1 px-3 text-[1.1rem] rounded-full">
                                            Editer
                                        </button>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <div className="flex flex-col gap-2">
                                            <span className="text-[#1F1F1FB2] text-[1.3rem]">
                                                Email
                                            </span>
                                            <span className="text-[#1F1F1F] text-[1.2rem]">
                                                silverdoufou@gmail.com
                                            </span>
                                        </div>
                                        <button className="bg-[#F0EFFA] flex justify-center items-center py-1 px-3 text-[1.1rem] rounded-full">
                                            Editer
                                        </button>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <div className="flex flex-col gap-2">
                                            <span className="text-[#1F1F1FB2] text-[1.3rem]">
                                                Date de naissance
                                            </span>
                                            <span className="text-[#1F1F1F] text-[1.2rem]">
                                                24 juin 1992
                                            </span>
                                        </div>
                                        <button className="bg-[#F0EFFA] flex justify-center items-center py-1 px-3 text-[1.1rem] rounded-full">
                                            Editer
                                        </button>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <div className="flex flex-col gap-2">
                                            <span className="text-[#1F1F1FB2] text-[1.3rem]">
                                                Téléphone
                                            </span>
                                            <span className="text-[#1F1F1F] text-[1.2rem]">
                                                +225 07 45 25 14 96
                                            </span>
                                        </div>
                                        <button className="bg-[#F0EFFA] flex justify-center items-center py-1 px-3 text-[1.1rem] rounded-full">
                                            Editer
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white px-6 py-5 rounded-xl flex flex-col gap-8">
                                <div className="flex flex-col gap-4">
                                    <span className="text-[#1F1F1FB2] font-semibold text-[1.3rem]">
                                        Modules
                                    </span>
                                    <div className="flex gap-4">
                                        <div className="flex justify-center items-center rounded-full border w-fit h-fit py-1 px-4 text-[1.3rem]">
                                            Biens
                                        </div>
                                        <div className="flex justify-center items-center rounded-full border w-fit h-fit py-1 px-4 text-[1.3rem]">
                                            Paiement
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        <div className="flex justify-center items-center rounded-full border w-fit h-fit py-1 px-4 text-[1.3rem]">
                                            Locataire
                                        </div>
                                        <div className="flex justify-center items-center rounded-full border w-fit h-fit py-1 px-4 text-[1.3rem]">
                                            Propriétaire
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <span className="text-[#1F1F1FB2] font-semibold text-[1.1rem]">
                                        Dernière connexion
                                    </span>
                                    <div className="w-[28rem] border border-gray-300 rounded-xl overflow-hidden flex items-center justify-between">
                                        <div className="flex flex-col gap-1 p-3">
                                            <span className="text-[#1F1F1F] font-semibold text-[1.1rem]">
                                                Il y’a 2 jours
                                            </span>
                                            <span className="text-[#1F1F1F] font-semibold text-[1.1rem]">
                                                Déconnexion
                                            </span>
                                        </div>
                                        <div className="bg-[#FEBC2F] w-[5.389rem] h-full flex justify-center items-center">
                                            <MedalIcon />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserDetails;