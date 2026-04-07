import type { Metadata } from "next";
import { Syne, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/shared/WhatsAppButton";
import ScrollToTop from "@/components/shared/ScrollToTop";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin", "latin-ext"],
  variable: "--font-body",
  display: "swap",
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className={`${syne.variable} ${plusJakartaSans.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Webtier",
              description: "CRO odaklı web tasarım ve e-ticaret çözümleri",
              url: "https://webtier.com.tr",
              email: "info@webtier.com.tr",
              sameAs: [],
              serviceType: [
                "CRO Analizi",
                "E-Ticaret Web Tasarım",
                "Kurumsal Web Tasarım",
              ],
            }),
          }}
        />
      </head>
      <body className="min-h-screen bg-[var(--background)] text-[var(--foreground)] antialiased">
        <AuthProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <WhatsAppButton />
          <ScrollToTop />
        </AuthProvider>
      </body>
    </html>
  );
}
