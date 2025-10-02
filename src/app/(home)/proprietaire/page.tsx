import SectionColor from '@/features/home/location/components/section-color';
import CentralisationSection from '@/features/home/proprietaires/components/centralisation-section';
import HeroSection from '@/features/home/proprietaires/components/hero-section';
import PaiementSection from '@/features/home/proprietaires/components/paiement-section';
import VideoSection from '@/features/home/proprietaires/components/video-section';
import VisionSection from '@/features/home/proprietaires/components/vision-section';
import Footer from '@/shared/components/layouts/footer';

const ProprietairePage = () => {
    return (
        <div className="min-h-screen bg-white">
            <HeroSection />
            <VisionSection />
            <PaiementSection />
            <CentralisationSection />
            <VideoSection />
            <SectionColor />
            <Footer />
        </div>
    );
};

export default ProprietairePage;
