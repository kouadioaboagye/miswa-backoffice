import Loading from '@/app/loading';
import { fakePayments, columns } from '@/features/admin/components/tables/payment/columns';
import PaymentTable from '@/features/admin/components/tables/payment/payment-table';
import { useGetContractByIdQuery } from '@/lib/data-service/contract/contract.queries';
import { Button } from '@/shared/components/ui/button';
import { Edit, Lock, Printer } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { toast } from 'sonner';

function DetailsContractView({ idContract }: Readonly<{ idContract: string }>) {
    const router = useRouter();
    const { data, isLoading, error } = useGetContractByIdQuery(idContract);

    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 10;

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    if (error) {
        toast.error(error instanceof Error ? error.message : 'Une erreur est survenue.');
    }

    return (
        <div className="flex flex-col space-y-10 p-4">
            {isLoading && <Loading />}

            {/* First Part: Contract Header */}
            <div className="space-y-10">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between w-full">
                    <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-10">
                        <h1 className="text-[25px] font-bold text-[#161C2D]">
                            Contract: <span className="text-[#1EA64A] text-[20px]">#idContrat</span>
                        </h1>
                        <div className="flex px-[10px] bg-white shadow-[0px_8px_10px_0px_#11928F66] rounded-full py-2 items-center justify-center border-1 border-[#11928F66]">
                            <Image
                                src="/assets/images/pp.png"
                                width={40}
                                height={40}
                                alt="logo-mclu"
                                className="h-[40px] w-[40px] rounded-full"
                            />
                            <span className="ml-[40px] mr-4 text-2xl text-gray-700">Touré Malick</span>
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mt-4 md:mt-0">
                        <div className="rounded-3xl bg-white p-4">
                            <Button
                                variant="success"
                                className="h-[4.5rem] w-full shadow-[0px_8px_20px_0px_#11928F66] [&_svg]:size-8"
                                leftIcon={<Edit className="text-white" />}
                            >
                                MODIFIER LE PROFILE
                            </Button>
                        </div>
                        <div className="rounded-3xl bg-white p-4">
                            <Button
                                variant="info"
                                className="h-[4.5rem] w-full shadow-[0px_8px_20px_0px_#11928F66] [&_svg]:size-8"
                                leftIcon={<Printer className="text-white" />}
                            >
                                IMPRIMER LE CONTRAT
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Contract Details */}
                <div className="relative">
                    <div className="bg-[#14385C] w-full h-[200px] rounded-[10px]">
                        <span className="text-white p-4">Détails du contrat</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-[#F8FAFC] rounded-[24px] p-10 w-full md:w-[90%] mx-auto mt-[-100px]">
                        <div className="flex justify-center">
                            <Image
                                src="/assets/images/pp.png"
                                width={290}
                                height={290}
                                alt="cover"
                                className="h-[290px] w-[290px] rounded-[12px]"
                            />
                        </div>
                        <div className="rounded-[10px] p-8 bg-[#FFFFFF]">
                            <div className="border rounded-lg p-4 space-y-5">
                                <div className="flex justify-between items-center">
                                    <div className="flex flex-col">
                                        <span className="font-medium text-[#1F1F1FB2]">Nom et Prénoms</span>
                                        <span className="text-[#222222E5] font-medium">N'DOUFFOU Silver</span>
                                    </div>
                                    <button className="bg-[#F0EFFA] rounded-3xl px-3 py-1 text-lg font-medium text-[#222222E5] h-fit">
                                        Editer
                                    </button>
                                </div>
                                <div className="flex justify-between items-center">
                                    <div className="flex flex-col">
                                        <span className="font-medium text-[#1F1F1FB2]">Email</span>
                                        <span className="text-[#222222E5] font-medium">email@gmail.com</span>
                                    </div>
                                    <button className="bg-[#F0EFFA] rounded-3xl px-3 py-1 text-lg font-medium text-[#222222E5] h-fit">
                                        Editer
                                    </button>
                                </div>
                                <div className="flex justify-between items-center">
                                    <div className="flex flex-col">
                                        <span className="font-medium text-[#1F1F1FB2]">Date de naissance</span>
                                        <span className="text-[#222222E5] font-medium">24 juin 2000</span>
                                    </div>
                                    <button className="bg-[#F0EFFA] rounded-3xl px-3 py-1 text-lg font-medium text-[#222222E5] h-fit">
                                        Editer
                                    </button>
                                </div>
                                <div className="flex justify-end">
                                    <Button variant="default" className="h-[3rem] w-[70%]" size="sm">
                                        Voir plus
                                    </Button>
                                </div>
                            </div>
                        </div>
                        <div className="rounded-[10px] p-8 bg-[#FFFFFF]">
                            <div className="w-full">
                                <h2 className="text-3xl font-semibold text-[#222222E5] mb-8">
                                    Caractéristique du contrat
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-8">
                                    <div className="border border-[#CECECE] rounded-full px-4 py-2">
                                        <p className="text-lg text-[#49454FCC]">Contrat de location</p>
                                    </div>
                                    <div className="border border-[#CECECE] rounded-full px-4 py-2">
                                        <p className="text-lg text-[#49454FCC]">Loyer : 450 000 F CFA</p>
                                    </div>
                                    <div className="border border-[#CECECE] rounded-full px-4 py-2">
                                        <p className="text-lg text-[#49454FCC]">Date de début : 12/05/2024</p>
                                    </div>
                                    <div className="border border-[#CECECE] rounded-full px-4 py-2">
                                        <p className="text-lg text-[#49454FCC]">Propriétaire</p>
                                    </div>
                                    <div className="border border-[#CECECE] rounded-full px-4 py-2 md:col-span-1">
                                        <p className="text-lg text-[#49454FCC]">Date de fin : 12/12/2025</p>
                                    </div>
                                </div>
                                <div className="mt-12">
                                    <button className="w-full bg-[#1EA64A] text-white text-lg font-normal py-4 px-8 rounded-full transition-colors duration-200 shadow-md">
                                        Avis de consentement lu et approuvé par le locataire
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Payment History Section */}
            <div className="w-full mt-10">
                <h1 className="text-[25px] font-bold text-[#161C2D] mb-4">
                    Historique des paiements
                </h1>
                <PaymentTable
                    data={fakePayments}
                    totalItems={fakePayments.length}
                    columns={columns}
                    pageSize={pageSize}
                    onPageChange={handlePageChange}
                    currentPage={currentPage}
                    isLoading={isLoading}
                />
            </div>
            <div className='fixed bottom-4 right-[3%] z-50'>
                <Button
                    variant={'destructive'}
                    size='lg'
                    className="h-[4.5rem] w-full shadow-[0px_8px_20px_0px_#11928F66] [&_svg]:size-8 bg-[#FF5F57]"
                    leftIcon={<Lock className='text-white' />}
                >
                    ROMPRE LE CONTRAT
                </Button>
            </div>
        </div>
    );
}

export default DetailsContractView;