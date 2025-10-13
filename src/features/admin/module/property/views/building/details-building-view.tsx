"use client";

import { Button } from "@/shared/components/ui/button";
import Image from "next/image";
import { Edit, MapPin, Presentation } from "lucide-react";
import ApartmentBuildingTable from "../../components/forms/tables/building/details/apartment-building-table";
import { useGetBuildingByIdQuery } from "@/lib/data-service/property/building.queries";
import { toast } from "sonner";
import Loading from "@/app/loading";
import { useRouter } from "next/navigation";

const BuildingDetailView = ({ idBuilding }: { idBuilding: string }) => {
    const router = useRouter()
    const { data, isLoading, error } = useGetBuildingByIdQuery(idBuilding)
    const batiment = data?.batiment;
    if (error) {
        toast.error(error instanceof Error ? error.message : 'Une erreur est survenue.');
    }

    console.log(data, "batiment")

    return (
        <div className="flex flex-col space-y-20">
            {isLoading  && <Loading/>}
            <div className="w-full space-y-10">
                <div className="flex flex-1 items-center justify-between w-full">
                    <div>
                        <h1 className="text-[25px] font-bold text-[#161C2D]">
                            Batiment : <span className="text-[#1EA64A] text-[20px]">#{idBuilding}</span>
                        </h1>
                    </div>
                    <div className="flex items-center gap-40">
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
                                onClick={()=> router.push(`/admin/module/property/building/edit/${idBuilding}`)}
                                rightIcon={<Edit className="text-withe"/>}
                            >
                                Modifier
                            </Button>
                        </div>
                    </div>
                </div>
                <div className="flex w-full space-x-4">
                    <div className="w-4/5">
                        <Image
                            src={batiment?.cover_url || "/fallback-image.jpg"}
                            width={100}
                            height={10}
                            alt="cover"
                            className="w-full h-[350px] object-cover rounded-[12px]"
                        />
                    </div>
                    <div className="w-1/5 space-y-4">
                        {batiment?.photos && batiment?.photos.length > 0 && batiment.photos.slice(0, 2).map((photo: string, index: number) => (
                            <Image
                                key={index + 1}
                                src={photo || ""}
                                width={100}
                                height={10}
                                alt={`photo${index + 1}`}
                                className="w-full h-[170px] object-cover rounded-[12px]"
                            />
                        ))}
                    </div>
                </div>
                <div>
                    <h2 className="text-[24px] font-bold mb-2">{batiment?.name}</h2>
                    <div className="flex space-x-10">
                        <div className="flex items-center gap-2 text-[#778088]">
                            <MapPin className="w-5 h-5" />
                            <span>{batiment?.address}</span>
                        </div>
                        <div className="flex items-center gap-2 text-[#778088]">
                            <Presentation className="w-5 h-5" />
                            <span>Informations sur les étages et appartements</span>
                        </div>
                    </div>
                </div>
                <div>
                    <h2 className="text-[24px] font-bold mb-2">Description</h2>
                    <p className="text-[#778088]">
                        {batiment?.description}
                    </p>
                </div>
            </div>
            <div>
                <h2 className="text-[24px] font-bold mb-2">Appartements  du batiment</h2>
                <ApartmentBuildingTable data={data?.proprietes || []}/>
            </div>
        </div>
    );
};

export default BuildingDetailView;
