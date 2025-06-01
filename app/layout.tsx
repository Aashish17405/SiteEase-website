import type { Metadata } from "next";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";

export const metadata: Metadata = {
  title: "SiteEase",
  description:
    "SiteEase is a Chrome extension designed to enhance web accessibility for individuals with visual impairments and reading difficulties. It offers a suite of customizable features to make web content more inclusive and user-friendly.",
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
      <head>
        <meta
          name="google-site-verification"
          content="P4TknO6FcnS8_S-Z0xt3yLxnPivuec_lG2QcnxpBWWs"
        />
      </head>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
