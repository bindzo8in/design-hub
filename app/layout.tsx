import {
  Geist,
  Geist_Mono,
  Stick_No_Bills,
  Orbitron,
  Plus_Jakarta_Sans,
} from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import MouseFollower from "@/components/ui/mouse-follower";
import FloatingChatbot from "@/components/ui/floating-chatbot";
import { StructuredData } from "@/components/seo/structured-data";
import { buildRootMetadata } from "@/lib/seo/metadata";
import { buildOrganizationSchema, buildWebsiteSchema } from "@/lib/seo/schema";
import { seoConfig } from "@/lib/seo/config";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const stickNoBills = Stick_No_Bills({
  subsets: ["latin"],
  variable: "--font-stick-no-bills",
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata = buildRootMetadata();

export const viewport = {
  themeColor: seoConfig.themeColor,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${stickNoBills.variable} ${orbitron.variable} ${plusJakartaSans.variable} antialiased`}
      suppressHydrationWarning
      data-scroll-behavior="smooth"
    >
      <body className="flex flex-col" suppressHydrationWarning>
        <StructuredData
          id="organization-schema"
          schema={buildOrganizationSchema()}
        />
        <StructuredData id="website-schema" schema={buildWebsiteSchema()} />
        <Providers>{children}</Providers>
        <MouseFollower />
        <FloatingChatbot />
      </body>
    </html>
  );
}
