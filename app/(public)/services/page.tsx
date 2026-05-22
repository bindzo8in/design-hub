import FAQSection from "@/components/services/faq-section";
import ServicesHeroSection from "@/components/services/hero-section";
import ServicesListSection from "@/components/services/list-section";
import BrandCreationSection from "@/components/services/brand-creation-section";
import {
    Code2,
    Smartphone,
    Settings,
    Palette,
    TrendingUp,
    Video,
    ArrowUpRight
} from "lucide-react";
import Link from "next/link";



const Page = () => {
    return (
        <main className="flex flex-col w-full py-4 gap-16 md:gap-24">
            {/* Replicated Hero Section */}
            <ServicesHeroSection />

            {/* Services List Section */}
            <ServicesListSection />

            {/* Brand spotlight section */}
            <BrandCreationSection />

            {/* FAQ Secion */}
            <FAQSection />


        </main>
    );
};

export default Page;
