import { Button } from '@/shared/components/ui/button'
import { Edit } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

function OwnerDetailView() {
    return (
        <div>
            <div className="flex flex-1 items-center justify-between w-full mb-10">
                <div className="flex px-10 bg-white shadow-[0px_8px_10px_0px_#11928F66] rounded-full py-4 items-center justify-center border-1 border-[#11928F66]">
                    <Image
                        src="/assets/logos/mclu-logo.png"
                        width={30}
                        height={30}
                        alt="cover"
                    />
                    <span className="ml-4 text-2xl text-gray-700">Proprio proprio</span>
                </div>
                <div className="rounded-3xl bg-white p-4">
                    <Button
                        variant={'success'}
                        className="h-[4.5rem] w-full shadow-[0px_8px_20px_0px_#11928F66] [&_svg]:size-8"
                        leftIcon={<Edit className="text-withe" />}
                    >
                        Modifier
                    </Button>
                </div>
            </div>
            <div className='bg-[#14385C] w-full h-[200px] rounded-[10px]'>
                <span className='text-white p-4'>Détails du propriétaire</span>
            </div>
            <div className='flex flex-col md:flex-row absolute top-[35%] left-[15%] bg-[#F8FAFC] rounded-[24px] p-10 w-[70%] mx-auto h-auto space-x-10'>
                <div className='w-full md:w-1/3 flex justify-center mb-6 md:mb-0'>
                    <Image
                        src="/assets/images/pp.png"
                        width={30}
                        height={30}
                        alt="cover"
                        className='h-[290px] w-[290px] rounded-[12px]'
                    />
                </div>
                <div className="w-full md:w-2/3 rounded-[10px] p-8 bg-[#FFFFFF]">
                    <div className='border h-full rounded-lg p-4 space-y-5'>
                        <div className="flex flex-col">
                            <span className="font-medium text-[#1F1F1FB2]">Nom et Prénoms</span>
                            <span className='text-[#222222E5] font-medium'>N'DOUFOU SILVER</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="font-medium text-[#1F1F1FB2]">Téléphone</span>
                            <span className='text-[#222222E5] font-medium'>+225 0709090909</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="font-medium text-[#1F1F1FB2]">Email</span>
                            <span className="text-[#222222E5] font-medium">silverdoufou@gmail.com</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="font-medium text-[#1F1F1FB2]">Date de naissance</span>
                            <span className="text-[#222222E5] font-medium">24 Juin 1992</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OwnerDetailView
