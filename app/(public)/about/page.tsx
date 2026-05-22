import FAQSection from "@/components/about/faq-section"
import HeroSection from "@/components/about/hero-section"
import AboutFamilySection from "@/components/about/team-members"

const Page = () => {
  return (
    <main className="flex flex-col w-full py-4">
      <HeroSection />
      <AboutFamilySection />
      <FAQSection />
    </main>
  )
}

export default Page