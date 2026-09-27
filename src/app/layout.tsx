import type { Metadata } from "next";
import { Atkinson_Hyperlegible, Nunito } from "next/font/google";
import { getSiteUrl, site } from "@/config/site";
import { defaultOgImage } from "@/lib/metadata";
import "./globals.css";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  display: "swap",
});

const atkinson = Atkinson_Hyperlegible({
  variable: "--font-atkinson",
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    template: `%s | ${site.name}`,
    default: `${site.name}, ${site.tagline.toLowerCase()}`,
  },
  description: site.description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: site.name,
    title: `${site.name}, ${site.tagline.toLowerCase()}`,
    description: site.description,
    url: "/",
    images: [defaultOgImage],
  },
  formatDetection: { telephone: false },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fr" className={`${nunito.variable} ${atkinson.variable}`}>
      <body className="flex min-h-screen flex-col antialiased">{children}</body>
    </html>
  );
}
