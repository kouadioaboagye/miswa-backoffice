"use client"

import BuildingDetailView from "@/features/admin/module/property/views/building/details-building-view";
import { useParams } from "next/navigation";

const page = () => {
    const params = useParams();
    const idBuilding = params.idBuilding as string
    return <BuildingDetailView idBuilding={idBuilding}/>
};

export default page;
