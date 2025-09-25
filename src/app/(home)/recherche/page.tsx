import SearchResults from '@/features/home/location/components/search-results';
import Navbar from '@/shared/components/layouts/navbar';

export default function RecherchePage() {
    return (
        <div className="flex min-h-screen w-full flex-col items-center justify-center bg-white pt-10 sm:px-4 md:px-8">
            <Navbar activeLink="louer" backgroundColor="green" />
            <div className="flex justify-center w-full h-full">
                <SearchResults />
            </div>
        </div>
    );
}
