"use client";

import { Button } from "@/shared/components/ui/button";
import Image from "next/image";
import EditIcon from "../../../../../../public/assets/icons/edit-icon";
import { Edit } from "lucide-react";

const BuildingDetailView = () => {
    return (
        <div className="flex space-y-10">
            <div className="w-full">
                <div className="flex flex-1 items-center justify-between w-full">
                    <div>
                        <h1 className="text-[25px] font-bold text-[#161C2D]">
                            Batiment : <span className="text-[#1EA64A] text-[20px]">#id_batiment</span>
                        </h1>
                    </div>
                    <div className="flex w-[500px] bg-white shadow-[0px_8px_10px_0px_#11928F66] rounded-full py-4 items-center justify-center border-1 border-[#11928F66]">
                        <Image
                            src="/assets/logos/mclu-logo.png"
                            width={30}
                            height={30}
                            alt="logo-mclu"
                        />
                        <span className="ml-4 text-2xl text-gray-700">Ministère de la Construction du Logement...</span>
                    </div>
                    <div className="rounded-3xl bg-white p-4">
                        <Button
                            variant={'success'}
                            className="h-[4.5rem] w-full shadow-[0px_8px_20px_0px_#11928F66] [&_svg]:size-8"
                            rightIcon={<Edit className="text-withe" />}
                        >
                            Modifier
                        </Button>
                    </div>
                </div>
                <div className="flex w-full space-x-4">
                    <div className="w-4/5">
                        {/* <Image
                            src="/assets/logos/mclu-logo.png"
  width={100}
  height={10}
                            alt="logo-mclu"
                            className="w-full h-auto object-cover"
                        /> */}
                    </div>
                    <div className="w-1/5 space-y-2">
                        {/* <Image
                            src="/assets/logos/mclu-logo.png"
                            width={500}
                            height={500}
                            alt="logo-mclu"
                            className="w-full h-full rounded-full object-cover"
                        /> */}
                        {/* <Image
                            src="/assets/logos/mclu-logo.png"
                            width={500}
                            height={500}
                            alt="logo-mclu"
                            className="w-full h-full rounded-full object-cover"
                        /> */}
                    </div>
                </div>
                <div></div>
                <div></div>
            </div>
            <div></div>
        </div>
    );
};

export default BuildingDetailView;
