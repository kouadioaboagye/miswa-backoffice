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
            <div className='absolute top-[35%] left-[5%] bg-[#F8FAFC] rounded-[24px] p-10 w-[90%] mx-auto h-[200px]'></div>
        </div>
    )
}

export default OwnerDetailView
