"use client";

import { Button } from "@/shared/components/ui/button";
import Image from "next/image";
import EditIcon from "../../../../../../../public/assets/icons/edit-icon";
import { Edit, MapPin, Presentation } from "lucide-react";
import ApartmentBuildingTable from "../../components/forms/tables/building/details/apartment-building-table";

const BuildingDetailView = () => {
    return (
        <div className="flex flex-col space-y-20">
            <div className="w-full space-y-10">
                <div className="flex flex-1 items-center justify-between w-full">
                    <div>
                        <h1 className="text-[25px] font-bold text-[#161C2D]">
                            Batiment : <span className="text-[#1EA64A] text-[20px]">#id_batiment</span>
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
                                rightIcon={<Edit className="text-withe" />}
                            >
                                Modifier
                            </Button>
                        </div>
                    </div>
                </div>
                <div className="flex w-full space-x-4">
                    <div className="w-4/5">
                        <Image
                            src="/assets/images/building.png"
                            width={100}
                            height={10}
                            alt="logo-mclu"
                            className="w-full h-[350px] object-cover rounded-[12px]"
                        />
                    </div>
                    <div className="w-1/5 space-y-4">
                        <Image
                            src="/assets/images/building.png"
                            width={100}
                            height={10}
                            alt="logo-mclu"
                            className="w-full h-[170px] object-cover rounded-[12px]"
                        />
                        <Image
                            src="/assets/images/building.png"
                            width={100}
                            height={10}
                            alt="logo-mclu"
                            className="w-full h-[170px] object-cover rounded-[12px]"
                        />
                    </div>
                </div>
                <div>
                    <h2 className="text-[24px] font-bold mb-2">Immeuble agc R54</h2>
                    <div className="flex space-x-10">
                        <div className="flex items-center gap-2 text-[#778088]">
                            <MapPin className="w-5 h-5" />
                            <span>Côte d’Ivoire, Grand Bassam</span>
                        </div>
                        <div className="flex items-center gap-2 text-[#778088]">
                            <Presentation className="w-5 h-5" />
                            <span>12 étage | 21 appartements | 3 apartements occupés </span>
                        </div>
                    </div>
                </div>
                <div>
                    <h2 className="text-[24px] font-bold mb-2">Description</h2>
                    <p className="text-[#778088]">
                        3 AC BEDROOM APARTMENT Full furnished. Stylish Apartment Near Bashundhara R/A Entrance! Block i, R:4. Located right by the main entrance of Bashundhara R/A from 300ft Road and Madani Avenue. Just a 15-minute drive from Dhaka Airport, and only 5 and 10 minutes from the Cantonment and Airport Train Stations, our location is ideal for both business and leisure travelers. Why wait? Your ideal stay is just a click away, Don’t miss out, book now! Safety Features: CCTV surveillance throughout the building and instant generator support. Your Ideal Home in Dhaka. Wants to visit this property for rent, just WhatsApp (+880 1814 963 028) this property link or call us and share your convenient viewing schedule.
                        Whether you’re here for business or leisure, our apartment offers elegant living spaces with refreshing airflow and abundant natural light. Book your stay today and experience the best of Dhaka!
                    </p>
                </div>
            </div>
            <div>
                <h2 className="text-[24px] font-bold mb-2">Appartements  du batiment</h2>
                <ApartmentBuildingTable/>
            </div>
        </div>
    );
};

export default BuildingDetailView;
