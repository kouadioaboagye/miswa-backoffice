import ArticlesSection from '@/features/home/actualites/components/articles-section';
import HeroSection from '@/features/home/actualites/components/hero-section';
import SectionColor from '@/features/home/location/components/section-color';
import Footer from '@/shared/components/layouts/footer';

const ActualitesPage = () => {
    return (
        <div className="min-h-screen bg-white">
            <HeroSection />
            <ArticlesSection />
            <SectionColor />
            <Footer />
        </div>
    );
};

export default ActualitesPage;
