import ContactPopupTrigger from "@/components/contact/contact-popup-trigger";
import Footer from "@/components/layout/footer";
import PublicHeader from "@/components/layout/header";
import WhatsAppButton from "@/components/ui/whatsapp-button";

export default async function PublicLayout({
  children,
  modal
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <>
      <PublicHeader />
      {children}
      {modal}
      <ContactPopupTrigger />
      <WhatsAppButton />
      <Footer />
    </>
  );
}
