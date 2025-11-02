import DetailsAssetView from "@/features/admin/module/property/views/asset/details-asset-view";
import BuildingDetailView from "@/features/admin/module/property/views/building/details-building-view";

interface PageProps {
    params: Promise<{
        id: string;
    }>;
}

const page = async ({ params }: PageProps) => {
    const { id } = await params;
    return <DetailsAssetView idAsset={id} />;
};

export default page;
