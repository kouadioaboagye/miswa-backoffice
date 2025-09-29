import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';

const SectionColor = () => {
    return (
        <section className="bg-white py-0">
            <div className="relative">
                <div className="relative z-0 mx-auto flex flex-col items-center justify-center gap-6 bg-[#14385C] p-8 pt-20 text-white md:px-12 md:py-56">
                    <div className="flex max-w-[75%] flex-col items-center justify-between gap-8 lg:flex-row lg:items-center">
                        <div className="flex max-w-[50%] flex-col gap-6 text-center lg:text-left">
                            <h3 className="mb-2 text-lg font-bold opacity-60 md:text-2xl">
                                Rejoignez-notre newsletter
                            </h3>
                            <h4 className="mb-4 text-3xl font-bold md:text-7xl">
                                Abonnez-vous à notre newsletter
                            </h4>
                            <p className="opacity-40 md:text-3xl">
                                Restez informé de l&apos;avancement de la
                                feuille de route, des annonces et des remises
                                exclusives, n&apos;hésitez pas à vous inscrire
                                avec votre e-mail
                            </p>
                        </div>

                        {/* Colonne droite - Formulaire */}
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                            <Input
                                type="email"
                                placeholder="Entrer votre email"
                                className="w-full rounded-[12px] border border-gray-300 bg-white px-4 py-4 h-[5rem] text-gray-700 focus:border-[#1ea64a] focus:outline-none sm:w-80"
                            />
                            <Button
                                variant="secondary"
                                size="default"
                                className="px-8"
                            >
                                S&apos;inscrire
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SectionColor;
