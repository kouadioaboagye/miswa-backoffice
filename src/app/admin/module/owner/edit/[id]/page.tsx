"use client"

import EditOwnerView from "@/features/admin/module/owner/views/owner/edit-owner-view";
import { useParams } from "next/navigation";

const page = () => {
    const params = useParams();
    const idOwner = params.id as string
    return <EditOwnerView idOwner={idOwner}/>;
};

export default page;