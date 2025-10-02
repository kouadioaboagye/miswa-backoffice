import { Button } from '@/shared/components/ui/button';
import Image from 'next/image';
import { ArrowRightIcon } from '../../../../../public/assets/icons/arrow-right-icon';

const PaiementSection = () => {
    return (
        <section className="py-20 md:pt-40 pb-20">
            <div className="mx-auto max-w-[70%] px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
                    <div className="order-2 lg:order-1">
                        <div className="relative">
                            <Image
                                src="/assets/images/paiement.svg"
                                alt="Dashboard Miswa - Vision moderne de la gestion locative"
                                width={600}
                                height={500}
                                className="w-full "
                                priority
                            />
                        </div>
                    </div>

                    {/* Contenu textuel */}
                    <div className="order-1 flex flex-col justify-center lg:order-2">
                        <div className="space-y-10 md:max-w-[95%]">
                            <h2
                                className=" text-4xl font-bold text-[#1a1a1a] lg:text-5xl"
                                style={{ lineHeight: '4rem' }}
                            >
                                Suivez le paiement de vos locataire avec notre
                                plateforme avancée
                            </h2>

                            <p
                                className="text-lg leading-[2rem] text-[#6b7280] lg:text-3xl"
                                style={{ lineHeight: '3rem' }}
                            >
                                Nous partageons les statistiques pour améliorer
                                vos revenus locatifs, mieux communiquer avec vos
                                locataires,
                            </p>

                            <Button
                                size="default"
                                variant="ghost"
                                rightIcon={
                                    <ArrowRightIcon className="size-10 w-full" />
                                }
                                className="text-2xl text-[#1EA64A] font-bold pl-0"
                            >
                                Commencer
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PaiementSection;
