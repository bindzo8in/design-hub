import ContactPopupTrigger from "@/components/contact/contact-popup-trigger";
import Footer from "@/components/layout/footer";
import PublicHeader from "@/components/layout/header";

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <PublicHeader />
      {children}
      <ContactPopupTrigger />
      <Footer />
    </>
  );
}
