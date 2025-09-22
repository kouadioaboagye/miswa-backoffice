import Logo from '@/shared/components/atoms/logo';
import FeaturesSection from '@/shared/components/sections/features-section';

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
        <section className="bg-[#14385C]/80 py-16 py-20">
            <div className="mx-auto max-w-[80%]">
                <div className="flex flex-col items-center justify-between gap-20">
                    <div className='flex justify-between items-center w-full'>

                        <div className="z-10 flex flex-col gap-10 w-full">
                            <div className="-mb-3">
                                <Logo src="/assets/logos/logo-miswa-white.png" width={140} height={100} />
                            </div>
                            <h1 className="text-[48px] font-normal leading-[50px] tracking-[-0.02em] text-white font-['Montserrat']">
                                Trouvez votre <br /> <span className="font-bold text-[48px] font-bold leading-[48px] tracking-[-0.02em] text-[#1EA64A]">maison idéale </span> <br /> en quelques clics
                            </h1>
                            <p className="text-[18px] mt-4 font-normal leading-[22px] tracking-[-0.02em] text-[#B8D4E3] font-['Open_Sans'] ">
                                La première plateforme qui révolutionne la location immobilière. <br /> Simple, rapide et sécurisée pour tous vos besoins de location.
                            </p>
                        </div>

                        <FeaturesSection />
                    </div>

                    <div className="w-[95%] flex justify-between py-6 px-12 items-center text-white rounded-3xl bg-gray-400 h-[100px] text-4xl font-bold leading-relaxed lg:text-6xl">
                        <div className="flex items-center flex-col justify-center">
                            <div className="flex items-center font-bold text-3xl text-white">
                                98.5%
                            </div>
                            <div className="text-xl font-normal text-white">
                                Taux de satisfaction
                            </div>
                        </div>
                        <div className="flex items-center flex-col justify-center">
                            <div className="flex items-center font-bold text-3xl text-white">
                                15K+
                            </div>
                            <div className="text-xl font-normal text-white">
                                Propriétés actives
                            </div>
                        </div>
                        <div className="flex items-center flex-col justify-center">
                            <div className="flex items-center font-bold text-3xl text-white">
                                2.5M€
                            </div>
                            <div className="text-xl font-normal text-white">
                                Transactions sécurisées
                            </div>
                        </div>
                        <div className="flex items-center flex-col justify-center">
                            <div className="flex items-center font-bold text-3xl text-white">
                                3min
                            </div>
                            <div className="text-xl font-normal text-white">
                                Temps de réponse moyen
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default PartnersSection;
