import PropertyViewDetails from '@/features/admin/components/forms/property/property-view-details';

const page = ({ params }: { params: { id: string } }) => {
    console.log('params.id', params.id);

    return <PropertyViewDetails id={params.id} />;
};

export default page;
