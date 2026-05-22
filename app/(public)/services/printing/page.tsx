import HeroSection from '@/components/services/common/hero-section'
import PrintingOfferingSection from '@/components/services/printing/offering-section'
import PrintingWhySection from '@/components/services/printing/why-section'
import React from 'react'

const Page = () => {
  return (
    <main>
      <HeroSection
        title="PRINTING"
        heading="Sharp Prints. Strong Impressions."
        description="We Turn Designs Into High-Quality Prints That Speak For Your Brand."
        bottomLabel="DESIGN HUB"
        image="/service/robot.png"
        backgroundImage="/service/hero_bg.png"
      />
      <PrintingOfferingSection />
      <PrintingWhySection />
    </main>
  )
}

export default Page