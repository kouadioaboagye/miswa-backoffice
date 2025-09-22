import { Navbar } from '@/shared/components/layouts';
import { Button } from '@/shared/components/ui/button';
import { ArrowRightIcon } from '../../../../../public/assets/icons/arrow-right-icon';

const HeroSection = () => {
    return (
        <div className="flex h-[540px] w-full flex-col items-center justify-between bg-[#14385C] pt-10 sm:px-4 md:px-8">
            <Navbar activeLink="apropos" />
            <div className="flex text-center  text-6xl font-bold leading-tight text-white sm:max-w-[90%]  md:max-w-[70%] lg:text-7xl">
                Miswa, une plateforme complète qui simplifie les relations entre
                propriétaires, locataires et gestionnaires immobiliers.
            </div>
            {/* <div className="flex items-center justify-around gap-6 rounded-t-2xl bg-white p-10 md:px-28"> */}
            <div className="mx-1 flex w-full items-center justify-between gap-4 rounded-t-2xl bg-white p-6 sm:gap-6 sm:p-10 sm:px-8 md:max-w-4xl md:px-28">
                <Button
                    variant="secondary"
                    rightIcon={<ArrowRightIcon className="size-10 w-full" />}
                >
                    Devenir Propriétaire
                </Button>
                <Button
                    rightIcon={<ArrowRightIcon className="size-10 w-full" />}
                >
                    Rechercher un bien
                </Button>
            </div>
        </div>
    );
};

export default HeroSection;
