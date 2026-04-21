// supports fix
import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import ConditionalShell from "@/components/layout/ConditionalShell";
import ScrollToTop from "@/components/shared/ScrollToTop";
import CookieConsent from "@/components/shared/CookieConsent";
import StructuredData from "@/components/shared/StructuredData";
import { cn } from "@/lib/utils";
import { SITE_CONFIG } from "@/lib/constants";

const displayFont = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const bodyFont = Plus_Jakarta_Sans({
  subsets: ["latin", "latin-ext"],
  variable: "--font-body",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: {
    default: "Webtier | Dönüşüm Odaklı Web Çözümleri",
    template: "%s | Webtier",
  },
  description:
    "CRO odaklı web tasarım ve e-ticaret çözümleri ile sitenizin dönüşüm oranını artırın. Ücretsiz CRO analizi ile başlayın.",
  keywords: [
    "CRO",
    "dönüşüm optimizasyonu",
    "web tasarım",
    "e-ticaret",
    "kurumsal web sitesi",
    "conversion rate optimization",
  ],
  authors: [{ name: "Webtier" }],
  openGraph: {
    type: "website",
    locale: "tr_TR",
    siteName: "Webtier",
    url: SITE_CONFIG.url,
    title: "Webtier | Dönüşüm Odaklı Web Çözümleri",
    description:
      "CRO odaklı web tasarım ve e-ticaret çözümleri ile sitenizin dönüşüm oranını artırın.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Webtier | Dönüşüm Odaklı Web Çözümleri",
    description:
      "CRO odaklı web tasarım ve e-ticaret çözümleri ile sitenizin dönüşüm oranını artırın.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Webtier",
  description: "CRO odaklı web tasarım ve e-ticaret çözümleri",
  url: SITE_CONFIG.url,
  email: SITE_CONFIG.email,
  sameAs: [],
  serviceType: [
    "CRO Analizi",
    "E-Ticaret Web Tasarım",
    "Kurumsal Web Tasarım",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className={cn(displayFont.variable, bodyFont.variable, "font-sans h-full")}>
      <head>
        <StructuredData id="organization-schema" data={organizationSchema} />
      </head>
      <body className="min-h-full p-0 m-0">
        <LanguageProvider>
          <AuthProvider>
            <ConditionalShell>
              {children}
            </ConditionalShell>
            <CookieConsent />
            <ScrollToTop />
          </AuthProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
