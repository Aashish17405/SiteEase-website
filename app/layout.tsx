import type { Metadata } from "next";
import { Suspense } from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import Loading from  "@/components/ui/loading";
import { siteConfig } from "@/config/metadata.config";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "color filter chrome extension",
    "chrome extension for dyslexia",
    "chrome extension for color blindness",
    "dyslexia support",
    "visual impairment",
    "color vision deficiency",
    "tool to improve reading for dyslexia online",
    "color blindness support",
    "grayscale chrome extension",
    "accessibility tools for dyslexia",
    "accessibility tools for color blindness",
    "open source accessibility tool",
    "best chrome extensions for dyslexia support",
    "best chrome extensions for color blindness support",
  ],
  alternates: {
    canonical: siteConfig.url,
  },
  authors: [{ name: "Aashish Jaini" }],
  creator: "Aashish Jaini",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [{ url: siteConfig.ogImage }],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: "@AashishJaini",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/public/icon-16x16.png",
    apple: "/public/icon-32x32.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta
          name="google-site-verification"
          content="P4TknO6FcnS8_S-Z0xt3yLxnPivuec_lG2QcnxpBWWs"
        />
      </head>
      <body className={inter.className}>
        <Suspense fallback={<Loading />}>
          {children}
        </Suspense>
        <Analytics />
      </body>
    </html>
  );
}
