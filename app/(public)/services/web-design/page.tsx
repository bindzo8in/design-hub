import HeroSection from '@/components/services/common/hero-section'
import FloatImageSection from '@/components/services/web-design/float-image-section'
import KeyFeaturesSection from '@/components/services/web-design/key-features-section'
import ServicesSection from '@/components/services/web-design/services-section'
import React from 'react'

const Page = () => {
  return (
    <main>
      <HeroSection
        title="WEB DEVELOPMENT"
        heading="Websites Built To Perform"
        description="Creating Digital Experiences That Convert Visitors Into Customers."
        bottomLabel="DESIGN HUB"
        image="/service/robot.png"
        backgroundImage="/service/hero_bg.png"
      />
      <FloatImageSection />
      <ServicesSection />
      <KeyFeaturesSection />
    </main>
  )
}

export default Page