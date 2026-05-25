import Footer from "@/components/layout/footer";
import PublicHeader from "@/components/layout/header";

export default async function PublicLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <PublicHeader />
            {children}
            <Footer />
        </>
    )
}