import HeroSection from '@/features/home/location/components/hero-section';
import VisionSection from '@/features/home/location/components/vision-section';
import FeaturesSection from '@/features/home/location/components/features-section';
import SupportSection from '@/features/home/location/components/support-section';
import PartnersSection from '@/features/home/location/components/partners-section';
import PropertiesSection from '@/features/home/location/components/properties-section';
import Footer from '@/shared/components/layouts/footer';

const HomePage = () => {
    return (
        <div className="min-h-screen bg-white">
            <HeroSection />
            <VisionSection />
            <FeaturesSection />
            <SupportSection />
            <PartnersSection />
            <PropertiesSection />
            <Footer />
        </div>
    );
};

export default HomePage;
