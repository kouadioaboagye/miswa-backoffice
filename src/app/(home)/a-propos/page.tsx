import FeaturesSection from '@/features/home/a-propos/components/features-section';
import HeroSection from '@/features/home/a-propos/components/hero-section';
import PartnersSection from '@/features/home/a-propos/components/partners-section';
import PropertiesSection from '@/features/home/a-propos/components/properties-section';
import SupportSection from '@/features/home/a-propos/components/support-section';
import VisionSection from '@/features/home/a-propos/components/vision-section';
import Footer from '@/shared/components/layouts/footer';

const AproposPage = () => {
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

export default AproposPage;
