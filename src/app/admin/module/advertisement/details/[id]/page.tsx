"use client"

import AdDetailView from "@/features/admin/module/advertisement/views/details-ad-view";
import { useParams } from "next/navigation";

const page = () => {
    const params = useParams();
    const idAd = params.idBuilding as string
    return <AdDetailView idAd={idAd}/>
};

export default page;
