import UserDetails from '@/features/admin/views/user-details-view';

const page = ({ params }: { params: { id: number } }) => {
    return <UserDetails id={params.id} />;
};

export default page;
