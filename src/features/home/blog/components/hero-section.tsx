import { Navbar } from '@/shared/components/layouts';
import Image from 'next/image';

const HeroSection = () => {
    return (
        <div className="flex h-[600px] w-full flex-col items-center justify-between bg-[#14385C] pt-10 sm:px-4 md:px-8">
            <Navbar activeLink="actualites" />
            <div className="mx-auto max-w-[65%] px-4 sm:px-6 lg:px-8 py-16 sm:py-20 md:py-24">
                <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
                    <div className="order-1 lg:order-2">
                        <div className="relative">
                            <Image
                                src="/assets/images/actualites.svg"
                                alt="Dashboard Miswa - Vision moderne de la gestion locative"
                                width={600}
                                height={400}
                                className="w-full shadow-2xl"
                                priority
                            />
                        </div>
                    </div>

                    {/* Contenu textuel */}
                    <div className="order-2 flex flex-col justify-center lg:order-1">
                        <div className="space-y-10 md:max-w-[85%]">
                            <h2
                                className=" text-4xl font-bold text-white lg:text-6xl"
                                style={{ lineHeight: '4.5rem' }}
                            >
                                Lorem Ipsum is <br /> simply dummy....
                            </h2>

                            <p
                                className="text-lg text-[#6b7280] lg:text-3xl"
                                style={{ lineHeight: '2.5rem' }}
                            >
                                Samedi 06 Septembre 2025 | 11H 32 <br /> Vues :
                                250
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeroSection;
