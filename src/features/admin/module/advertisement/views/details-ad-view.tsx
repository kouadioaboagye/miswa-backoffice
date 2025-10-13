"use client";

import { Button } from "@/shared/components/ui/button";
import Image from "next/image";
import { Calendar, Check, Edit, Map, MapPin, Presentation, Star, Trash, Trash2, User } from "lucide-react";
import Loading from "@/app/loading";
import { useRouter } from "next/navigation";

const AdDetailView = ({ idAd }: { idAd: string }) => {
    const router = useRouter()
    // const { data, isLoading, error } = useGetAdByIdQuery(idBuilding)
    // if (error) {
    //     toast.error(error instanceof Error ? error.message : 'Une erreur est survenue.');
    // }

    const amenities = [
        { category: 'Parking', items: ['12'] },
        { category: 'Sécurité', items: ['Gardien'] },
        { category: 'Espaces Communs', items: ['Buanderie', 'terrasse', 'Buanderie', 'terrasse', 'Buanderie', 'terrasse'] }
    ];

    return (
        <div className="flex flex-col space-y-20">
            {/* {isLoading  && <Loading/>} */}
            <div className="w-full space-y-10">
                <div className="flex flex-1 items-center justify-between w-full">
                    <div>
                        <h1 className="text-[25px] font-bold text-[#161C2D]">
                            Annonce : <span className="text-[#1EA64A] text-[20px]">#idAnnonce</span>
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
                            variant={'destructive'}
                            className="h-[4.5rem] w-full shadow-[0px_8px_20px_0px_#11928F66] [&_svg]:size-8 bg-[#FF5F57]"
                            onClick={() => router.push(`/admin/module/advertisement/edit/${idAd}`)}
                            leftIcon={<Trash2 className="text-withe" />}
                        >
                            Archiver
                        </Button>
                    </div>
                    <div className="rounded-3xl bg-white p-4">
                        <Button
                            variant={'success'}
                            className="h-[4.5rem] w-full shadow-[0px_8px_20px_0px_#11928F66] [&_svg]:size-8"
                            onClick={() => router.push(`/admin/module/advertisement/edit/${idAd}`)}
                            leftIcon={<Edit className="text-withe" />}
                        >
                            Modifier
                        </Button>
                    </div>
                </div>
                <div className="flex w-full space-x-4">
                    <div className="w-4/5">
                        <Image
                            src='/assets/images/building.png'
                            width={100}
                            height={10}
                            alt="cover"
                            className="w-full h-[350px] object-cover rounded-[12px]"
                        />
                    </div>
                    <div className="w-1/5 space-y-4">
                        <Image
                            src='/assets/images/building.png'
                            width={100}
                            height={10}
                            alt='photo'
                            className="w-full h-[170px] object-cover rounded-[12px]"
                        />
                        <Image
                            src='/assets/images/building.png'
                            width={100}
                            height={10}
                            alt='photo'
                            className="w-full h-[170px] object-cover rounded-[12px]"
                        />
                    </div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-2">
                    <div className="lg:col-span-2 space-y-10">
                        <div>
                            <h2 className="text-[24px] font-bold mb-2">Annonce appartement 4 pièces</h2>
                            <div className="flex space-x-10">
                                <div className="flex items-center gap-2 text-[#778088]">
                                    <MapPin className="w-5 h-5" />
                                    <span>Côte d'Ivoire, Grand-Bassam</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="flex items-center">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <Star key={star} className="w-5 h-5 mx-1 fill-yellow-400 text-yellow-400" />
                                        ))}
                                    </div>
                                    <span className="font-medium">(904 Avis)</span>
                                </div>
                            </div>
                        </div>
                        <div>
                            <h2 className="text-[24px] font-bold mb-2">Description</h2>
                            <p className="text-[#778088]">
                                3 AC BEDROOM APARTMENT Full furnished. Stylish Apartment Near Bashundhara R/A Entrance! Block i, R:4. Located right by the main entrance of Bashundhara R/A from 300ft Road and Madani Avenue. Just a 15-minute drive from Dhaka Airport, and only 5 and 10 minutes from the Cantonment and Airport Train Stations, our location is ideal for both business and leisure travelers. Why wait? Your ideal stay is just a click away, Don’t miss out, book now! Safety Features: CCTV surveillance throughout the building and instant generator support. Your Ideal Home in Dhaka. Wants to visit this property for rent, just WhatsApp (+880 1814 963 028) this property link or call us and share your convenient viewing schedule.

                                Whether you’re here for business or leisure, our apartment offers elegant living spaces with refreshing airflow and abundant natural light. Book your stay today and experience the best of Dhaka!   See More
                            </p>
                        </div>
                        <div>
                            <h2 className="text-[24px] font-bold mb-2">Commodités</h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {amenities.map((amenity, index) => (
                                    <div key={index + 1} className="border border-gray-200 rounded-lg p-4">
                                        <div className="flex items-start gap-3">
                                            <Check className="w-7 h-7 text-teal-600 bg-teal-100 rounded-full" />
                                            <div>
                                                <h3 className="font-semibold text-gray-900 mb-2">{amenity.category}</h3>
                                                <div className="flex items-center flex-wrap">
                                                    {amenity.items.map((item, idx) => (
                                                        <p key={idx + 1} className="text-lg text-gray-600 mr-1">{item}, </p>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-xl border border-[#E0E0E0] p-6 sticky top-8">
                            <div className="mb-6">
                                <p className="text-xl text-gray-600 my-4">Loyer mensuel</p>
                                <p className="text-3xl font-bold text-[#1A365D]">
                                    120 000 F CFA <span className="text-lg font-normal text-gray-600">/ Mois</span>
                                </p>
                            </div>

                            <button className="my-10 flex items-center justify-center gap-4 w-full bg-[#D9D9D9] text-white py-3 rounded-lg font-medium hover:bg-gray-400 transition-colors">
                                <span>Occuper le bien</span>
                                <Map className="w-8 h-8" />
                            </button>
                            <div className="w-full border-t border-dashed border-gray-400 my-10" />
                            <div className="space-y-4">
                                <h3 className="font-semibold text-gray-900">Demander une visite</h3>

                                <div className="border border-gray-200 rounded-lg p-3 flex items-center gap-2">
                                    <User className="w-5 h-5 text-gray-400" />
                                    <span className="text-gray-700">En personne</span>
                                </div>

                                <div className="border border-gray-200 rounded-lg p-3">
                                    <div className="flex items-center gap-2 cursor-pointer">
                                        <Calendar className="w-5 h-5 text-gray-400" />
                                        <input
                                            type="date"
                                            placeholder="Date de visite"
                                            className="flex-1 outline-none text-gray-700"
                                        />
                                    </div>
                                </div>

                                <button className="w-full  bg-[#D9D9D9] text-white py-3 rounded-lg font-medium hover:bg-gray-400 transition-colors">
                                    Prendre RDV pour la visite
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdDetailView;
