import { Button } from '@/shared/components/ui/button';
import Image from 'next/image';
import { ArrowRightIcon } from '../../../../../public/assets/icons/arrow-right-icon';

const CentralisationSection = () => {
    return (
        <section>
            <div className="mx-auto max-w-[70%] px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
                    {/* Contenu textuel */}
                    <div className="order-2 flex flex-col justify-center lg:order-1">
                        <div className="space-y-10 md:max-w-[95%]">
                            <h2
                                className="text-4xl font-bold text-[#1a1a1a] lg:text-6xl"
                                style={{ lineHeight: '4rem' }}
                            >
                                Centralisez la gestion de vos biens
                            </h2>

                            <p
                                className="text-lg leading-[2rem] text-[#6b7280] lg:text-3xl"
                                style={{ lineHeight: '3rem' }}
                            >
                                Visualisez tous vos appartements, maisons et
                                locaux commerciaux sur un tableau de bord
                                unique. Suivez les loyers, les charges et la
                                rentabilité en temps réel.
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

                    <div className="order-1 lg:order-2">
                        <div className="relative">
                            <Image
                                src="/assets/images/centralisation.svg"
                                alt="Dashboard Miswa - Vision moderne de la gestion locative"
                                width={600}
                                height={500}
                                className="w-full "
                                priority
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CentralisationSection;
