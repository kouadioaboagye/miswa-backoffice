import SearchWithMap from '@/features/home/location/components/search-with-map';
import Navbar from '@/shared/components/layouts/navbar';

export default function RechercheAvecCartePage() {
    return (
        <div className="min-h-screen bg-white">
            <Navbar activeLink="louer" backgroundColor="green" />
            <SearchWithMap />
        </div>
    );
}
