import SearchResults from '@/features/home/location/components/search-results';
import Navbar from '@/shared/components/layouts/navbar';

export default function RecherchePage() {
    return (
        <div className="min-h-screen w-full bg-white">
            <div className="pt-10 sm:px-4 md:px-8 mx-auto sm:w-[95%] md:w-[90%]">
                <Navbar activeLink="louer" backgroundColor="green" />
            </div>
            <div className="w-full">
                <SearchResults />
            </div>
        </div>
    );
}
