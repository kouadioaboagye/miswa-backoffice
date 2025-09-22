import Image from 'next/image';

const PartnersSection = () => {
    const partners = [
        { name: 'Google', logo: '/assets/logos/google-logo.svg' },
        { name: 'Amazon', logo: '/assets/logos/amazon-logo.svg' },
        {
            name: 'Microsoft',
            logo: '/assets/logos/microsoft-logo.svg'
        },
        { name: 'Uber', logo: '/assets/logos/uber-logo.svg' },
        { name: 'Dropbox', logo: '/assets/logos/dropbox-logo.svg' },
        { name: 'Uber', logo: '/assets/logos/uber-logo.svg' },
        { name: 'Amazon', logo: '/assets/logos/amazon-logo.svg' },
        { name: 'Google', logo: '/assets/logos/google-logo.svg' }
    ];

    return (
        <section className="px-4 py-16 sm:py-20 md:py-36">
            <div className="mx-auto max-w-[75%]">
                <div className="text-center">
                    <h2 className="mb-8 text-6xl font-bold text-[#14385c] md:text-4xl lg:text-5xl">
                        Nos Partenaires
                    </h2>
                    <p className="mb-16 text-lg text-[#6b7280] md:text-3xl">
                        Miswa est conçu pour vous avec l&apos;accompagnement de
                        nos partenaires ci-dessous
                    </p>
                </div>

                <div className="flex flex-wrap justify-center">
                    {partners.map((partner, index) => (
                        <div
                            key={index}
                            className="flex w-80 flex-col items-center justify-center gap-4 rounded-none border-2 border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-md"
                        >
                            <div className="mb-2 text-2xl text-gray-500">
                                {partner.name}
                            </div>
                            <div className="flex h-16 w-full items-center justify-center">
                                <div className="flex items-center justify-center text-lg font-semibold text-[#1a1a1a]">
                                    <Image
                                        src={partner.logo}
                                        alt={partner.name}
                                        width={150}
                                        height={150}
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PartnersSection;
