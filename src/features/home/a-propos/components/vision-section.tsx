import Image from 'next/image';

const VisionSection = () => {
    return (
        <section className="py-20 md:py-40">
            <div className="mx-auto max-w-[70%] px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
                    <div className="order-2 lg:order-1">
                        <div className="relative">
                            <Image
                                src="/assets/images/vision-img.svg"
                                alt="Dashboard Miswa - Vision moderne de la gestion locative"
                                width={600}
                                height={400}
                                className="w-full shadow-2xl"
                                priority
                            />
                        </div>
                    </div>

                    {/* Contenu textuel */}
                    <div className="order-1 flex flex-col justify-center lg:order-2">
                        <div className="space-y-10 md:max-w-[85%]">
                            <h2 className=" text-4xl font-bold leading-relaxed text-[#1a1a1a] lg:text-6xl">
                                Une vision moderne de la gestion locative
                            </h2>

                            <p className="text-lg leading-[20rem] text-[#6b7280] lg:text-3xl">
                                Miswa est née d&apos;un constat simple : la
                                gestion locative traditionnelle est complexe,
                                chronophage et source de nombreux malentendus
                                entre propriétaires et locataires.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default VisionSection;
