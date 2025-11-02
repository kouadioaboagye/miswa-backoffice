"use client"

import EditBuildingView from "@/features/admin/module/property/views/building/edit-building-view";
import { useParams } from "next/navigation";

const page = () => {
    const params = useParams();
    const idBuilding = params.idBuilding as string
    return <EditBuildingView idBuilding={idBuilding}/>
};

export default page;
