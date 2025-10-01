import { PropertyDetails } from '@/features/home/location/components';
import DetailsPropertiesSection from '@/features/home/location/components/details-properties-section';
import Footer from '@/shared/components/layouts/footer';
import Navbar from '@/shared/components/layouts/navbar';

interface PropertyPageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function PropertyPage({ params }: PropertyPageProps) {
    const { id } = await params;
    return (
        <div className="min-h-screen bg-white">
            <div className="flex min-h-screen w-full flex-col items-center justify-center bg-white pt-10 sm:px-4 md:px-8">
                <Navbar activeLink="louer" backgroundColor="green" />
                <div className="flex justify-center w-full h-full">
                    <PropertyDetails propertyId={id} />
                </div>
            </div>
            <DetailsPropertiesSection />
            <Footer />
        </div>
    );
}
