"use client"

import EditTenantView from "@/features/admin/module/tenant/views/edit-tenant-view";
import { useParams } from "next/navigation";

const page = () => {
    const params = useParams();
    const idTenant = params.id as string
    return <EditTenantView idTenant={idTenant}/>;
};

export default page;