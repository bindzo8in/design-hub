import {
  Geist,
  Geist_Mono,
  Bebas_Neue,
  Stick_No_Bills,
  Orbitron,
  Heebo,
  Cormorant_Garamond,
  Syne,
} from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
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
      className={`${geistSans.variable} ${geistMono.variable} ${bebasNeue.variable} ${stickNoBills.variable} ${orbitron.variable} ${heebo.variable} ${cormorant.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <StructuredData
          id="organization-schema"
          schema={buildOrganizationSchema()}
        />
        <StructuredData id="website-schema" schema={buildWebsiteSchema()} />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
