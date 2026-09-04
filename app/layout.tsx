import {
  Geist,
  Geist_Mono,
  Bebas_Neue,
  Stick_No_Bills,
  Orbitron,
  Heebo,
  Cormorant_Garamond,
  Syne,
  Audiowide,
  Duru_Sans
} from "next/font/google";
import localFont from "next/font/local";
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

const bebasNeue = Bebas_Neue({
  weight: "400",
  variable: "--font-bebas-neue",
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

export const heebo = Heebo({
  subsets: ["latin", "hebrew"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-heebo",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: ["300", "400", "500", "600", "700"],
});

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
})

const audiowide = Audiowide({
  subsets: ["latin"],
  variable: "--font-audiowide",
  weight: ["400"],
  display: "swap",
})

const duruSans = Duru_Sans({
  subsets: ["latin"],
  variable: "--font-duru-sans",
  weight: ["400"],
  display: "swap",
})

const calfine = localFont({
  src: "../public/font/Calfinedemo.otf",
  variable: "--font-calfine",
  display: "swap",
});

const dantene = localFont({
  src: "../public/font/Dantene.otf",
  variable: "--font-dantene",
  display: "swap",
});

const svetze = localFont({
  src: "../public/font/Svetze.otf",
  variable: "--font-svetze",
  display: "swap",
});

const bistrot = localFont({
  src: "../public/font/Le Bistrot des Amoureux.ttf",
  variable: "--font-bistrot",
  display: "swap",
});

const proudHammyMom = localFont({
  src: "../public/font/Proud Hammy Mom.ttf",
  variable: "--font-proud-hammy-mom",
  display: "swap",
});

const harmond = localFont({
  src: "../public/font/Harmond-ExtraBoldExpanded.otf",
  variable: "--font-harmond",
  display: "swap",
});

const chillax = localFont({
  src: "../public/font/Chillax-Regular.otf",
  variable: "--font-chillax",
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
      className={`${geistSans.variable} ${geistMono.variable} ${bebasNeue.variable} ${stickNoBills.variable} ${orbitron.variable} ${heebo.variable} ${cormorant.variable} ${audiowide.variable} ${syne.variable} ${duruSans.variable} ${calfine.variable} ${dantene.variable} ${svetze.variable} ${bistrot.variable} ${proudHammyMom.variable} ${harmond.variable} ${chillax.variable} antialiased`}
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
