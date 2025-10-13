import BuildingDetailView from "@/features/admin/module/property/views/building/details-building-view";

interface PageProps {
    params: Promise<{
        id: string;
    }>;
}

const page = async ({ params }: PageProps) => {
    const { id } = await params;
    return <BuildingDetailView idBuilding={id} />;
};

export default page;
