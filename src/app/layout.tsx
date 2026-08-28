import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Terraza Talatona | Marisqueira Fine Dining - Luanda, Angola",
  description:
    "Restaurante Marisqueira de fusão em Luanda, Angola. Cozinha portuguesa, angolana e internacional com ingredientes frescos e ambiente sofisticado. Condomínio Zenith Towers, Talatona.",
  keywords: [
    "restaurante",
    "marisqueira",
    "Luanda",
    "Talatona",
    "fine dining",
    "comida portuguesa",
    "comida angolana",
    "seafood",
    "polvo",
    "lagosta",
    "picanha",
  ],
  openGraph: {
    title: "Terraza Talatona | Marisqueira Fine Dining",
    description:
      "A melhor experiência gastronómica em Talatona, Luanda. Marisqueira, pratos principais e sobremesas artesanais.",
    url: "https://terrazatalatona.co.ao",
    siteName: "Terraza Talatona",
    locale: "pt_AO",
    type: "website",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Terraza Talatona - Restaurante Marisqueira",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Terraza Talatona | Marisqueira Fine Dining",
    description:
      "A melhor experiência gastronómica em Talatona, Luanda.",
    images: ["/images/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt" className={`${playfair.variable} ${inter.variable}`}>
      <body className="min-h-screen bg-dark text-white antialiased">
        {children}
      </body>
    </html>
  );
}
