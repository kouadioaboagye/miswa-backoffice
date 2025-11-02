"use client"

import OwnerDetailView from "@/features/admin/module/owner/views/owner/details-owner-view";
import { useParams } from "next/navigation";

const page = () => {
    const params = useParams();
    const idOwner = params.id as string
    return <OwnerDetailView idOwner={idOwner}/>;
};

export default page;