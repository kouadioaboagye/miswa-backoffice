import ActualitesSection from '@/features/home/location/components/actualites-section';
import HeroSection from '@/features/home/location/components/hero-section';
import PartnersSection from '@/features/home/location/components/partners-section';
import PropertiesSection from '@/features/home/location/components/properties-section';
import SectionColor from '@/features/home/location/components/section-color';
import Footer from '@/shared/components/layouts/footer';

const HomePage = () => {
    return (
        <div className="min-h-screen bg-white">
            <HeroSection />
            {/* <VisionSection /> */}
            {/* <FeaturesSection /> */}
            {/* <SupportSection /> */}
            <PropertiesSection />
            <PartnersSection />
            <ActualitesSection />
            <SectionColor />
            <Footer />
        </div>
    );
};

export default HomePage;
