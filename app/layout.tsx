import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SiteEase",
  description: "SiteEase is a Chrome extension designed to enhance web accessibility for individuals with visual impairments and reading difficulties. It offers a suite of customizable features to make web content more inclusive and user-friendly.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
