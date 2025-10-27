import SearchWithMap from '@/features/home/location/components/search-with-map';
import Navbar from '@/shared/components/layouts/navbar';

export default function RechercheAvecCartePage() {
    return (
        <div className="min-h-screen bg-white px-4 sm:px-4 py-10 md:px-8">
            {/* Overlay avec dégradé blanc horizontal */}
            <Navbar activeLink="louer" backgroundColor="green" />
            <SearchWithMap />
        </div>
    );
}
