import ContactHeroSection from "@/components/contact/hero-section";
import ContactForm from "@/components/contact/contact-form";
import WhatsAppButton from "@/components/ui/whatsapp-button";

export const metadata = {
  title: "Contact Us | Design Hub - Tech & Digital Marketing Agency",
  description:
    "Get in touch with Design Hub in Coimbatore. Let's create responsive websites, e-commerce, custom software, graphics, and digital marketing strategies for your business success.",
};

const ContactPage = () => {
  return (
    <main className="flex flex-col w-full py-4">
      {/* Contact page hero section */}
      <ContactHeroSection />

      {/* Dual column address info and service checkbox form */}
      <ContactForm />


    </main>
  );
};

export default ContactPage;
