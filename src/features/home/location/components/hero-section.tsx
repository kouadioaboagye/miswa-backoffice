import { Navbar } from '@/shared/components/layouts';
import { Button } from '@/shared/components/ui/button';
import { ArrowRightIcon } from '../../../../../public/assets/icons/arrow-right-icon';
import { Select, SelectContent, SelectItem, SelectTrigger } from '@/shared/components/ui/select';
import { SelectValue } from '@/shared/components/ui/select';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/shared/components/ui/tabs';

const HeroSection = () => {
    return (
        <div className="relative flex h-[550px] w-full flex-col justify-between bg-[url('/assets/images/louer.svg')] bg-cover pt-10 sm:px-4 md:px-8">
            {/* Overlay avec dégradé blanc horizontal */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#FFFFFF] via-white/80 to-transparent"></div>
            <div className="relative w-full flex justify-center">
                <Navbar activeLink="louer" />
            </div>
            <div className='w-full flex justify-center '>

                <div className="flex flex-col justify-between gap-24 h-[110%] w-[92%] w-full px-0">
                    {/* Titre principal */}
                    <div className="relative z-10 flex flex-col gap-10 w-full">
                        <h1 className="text-[48px] font-normal leading-[50px] tracking-[-0.02em] text-[#14385C] font-['Montserrat']">
                            Retrouvez <br /> la maison de vos rêves <br /> sur <span className="font-bold text-[48px] font-bold leading-[48px] tracking-[-0.02em] text-[#1EA64A]">Miswa</span>
                        </h1>
                        <p className="text-[18px] font-normal leading-[22px] tracking-[-0.02em] text-[#757575] font-['Open_Sans'] max-w-[438px]">
                            Accédez à des biens vérifiés et sécurisés. Louez en toute confiance grâce à notre expertise et une gestion centralisée.
                        </p>
                    </div>

                    {/* Barre de recherche */}
                    <div className="relative z-10 bg-white pr-12 rounded-[25px] pt-12 w-fullmx-auto  w-[65%]">
                        {/* Onglets */}
                            <Tabs defaultValue="account" className="w-[400px] text-white flex gap-1 mb-6 absolute -top-12 px-8 rounded-full bg-[#0E4D79] py-6 left-0">
                                
                                <TabsList className='w-full bg-[#0E4D79]'>
                                    <TabsTrigger value="account" className='data-[state=active]:bg-background data-[state=active]:text-[#0E4D79] text-[#0E4D79] h-full py-6 rounded-full bg-white text-2xl font-semibold'>Par budget</TabsTrigger>
                                    <TabsTrigger value="password" className='data-[state=active]:bg-white data-[state=active]:text-[#0E4D79] text-[#0E4D79] h-full py-6 rounded-full bg-white text-2xl font-semibold'>Bâtiment</TabsTrigger>
                                </TabsList>
                            </Tabs>

                        {/* Champs de recherche */}
                        <div className="flex flex-col mt-2 h-full p-6 md:flex-row gap-4 items-end rounded-[12px] border border-[#1EA64A]">
                            {/* Champ Ville */}
                            <div className="flex-1">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Ville</label>
                                <div className="relative">
                                    <Select>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Grand-Bassam" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="grand-bassam">
                                                Grand-Bassam
                                            </SelectItem>
                                            <SelectItem value="abidjan">Abidjan</SelectItem>
                                            <SelectItem value="yamoussoukro">
                                                Yamoussoukro
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            {/* Champ Budget */}
                            <div className="flex-1">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Budget</label>
                                <div className="relative">
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm text-gray-500">100k</span>
                                        <div className="flex-1 h-2 bg-gray-200 rounded-full relative">
                                            <div className="absolute left-0 top-0 h-2 w-3/4 bg-[#1EA64A] rounded-full"></div>
                                            <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-4 h-4 bg-[#1EA64A] rounded-full border-2 border-white shadow-md"></div>
                                            <div className="absolute right-1/4 top-1/2 transform -translate-y-1/2 w-4 h-4 bg-[#1EA64A] rounded-full border-2 border-white shadow-md"></div>
                                        </div>
                                        <span className="text-sm text-gray-500">400k</span>
                                    </div>
                                </div>
                            </div>

                            {/* Bouton Rechercher */}
                            <button className="bg-[#1EA64A] text-white px-8 py-3 rounded-lg font-medium hover:bg-[#1a8a3f] transition-colors">
                                Rechercher
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeroSection;
