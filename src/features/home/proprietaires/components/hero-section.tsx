import { Navbar } from '@/shared/components/layouts';
import { Button } from '@/shared/components/ui/button';
import { ArrowRightIcon } from '../../../../../public/assets/icons/arrow-right-icon';

const HeroSection = () => {
    return (
        <div className="flex h-[540px] w-full flex-col items-center justify-between bg-white pt-10 sm:px-4 md:px-8">
            <Navbar activeLink="proprietaire" backgroundColor="green" />
            <div className="flex text-center text-6xl font-bold leading-[2.5] text-[#161C2D] sm:max-w-[90%]  md:max-w-[55%] lg:text-7xl">
                Gérez tous vos biens immobiliers depuis une seule plateforme !
            </div>
            <p className="text-4xl font-normal leading-[22px] text-center tracking-[-0.02em] text-[#757575] leading-[1.5] font-['Open_Sans'] max-w-[45%]">
                Miswa vous offre une solution complète pour optimiser vos revenus locatifs, suivre vos propriétés et maintenir de bonnes relations avec vos locataires.
            </p>
            {/* <div className="flex items-center justify-around gap-6 rounded-t-2xl bg-white p-10 md:px-28"> */}
            <div className="mx-1 flex w-full items-center justify-between gap-4 rounded-t-2xl bg-white pb-6 sm:gap-6 sm:p-10 sm:px-8 md:max-w-4xl md:px-28">
                <Button
                    variant="secondary"
                    size="default"
                    rightIcon={<ArrowRightIcon className="size-10 w-full" />}
                >
                    Devenir Propriétaire
                </Button>
                <Button
                    size="default"
                    variant="ghost"
                    rightIcon={<ArrowRightIcon className="size-10 w-full" />}
                    className="text-2xl font-bold"
                >
                    Voir plus d'article
                </Button>
            </div>
        </div>
    );
};

export default HeroSection;
