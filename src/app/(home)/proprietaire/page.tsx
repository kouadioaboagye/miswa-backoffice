import HeroSection from '@/features/home/proprietaires/components/hero-section'
import VisionSection from '@/features/home/proprietaires/components/vision-section'
import React from 'react'
import Footer from '@/shared/components/layouts/footer'

const ProprietairePage = () => {
  return (
    <div className="min-h-screen bg-white">
      <HeroSection />
      <VisionSection />
      <Footer />
    </div>
  )
}

export default ProprietairePage