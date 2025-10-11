"use client"

import DetailsContractView from "@/features/admin/views/contract/details-contract-view";
import { useParams } from "next/navigation";

const page = () => {
    const params = useParams();
    const idContract = params.id as string
    return <DetailsContractView idContract={idContract}/>;
};

export default page;