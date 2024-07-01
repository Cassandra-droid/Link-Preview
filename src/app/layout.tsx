import Head from "next/head";
import { ReactNode } from "react";
import { Inter } from "next/font/google";
import type { Metadata } from "next";
import "./globals.css";

interface ExtendedMetadata extends Metadata {
  ogImage?: string;
  ogUrl?: string;
  title?: string;
}

const metadata: ExtendedMetadata = {
  title: "Create Next App",
  description: "Generated by create next app",
  ogImage: "https://link-preview-eta.vercel.app/assets/header.png",
  ogUrl: "https://link-preview-eta.vercel.app/",
};

interface RootLayoutProps {
  children: ReactNode;
}

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
      <Head>
        <html lang="en" />
        <meta name="description" content={metadata.description || undefined} />
        {/* Open Graph tags */}
        <meta property="og:title" content={metadata.title || undefined} />
        <meta
          property="og:description"
          content={metadata.description || undefined}
        />
        {metadata.ogImage && (
          <meta property="og:image" content={metadata.ogImage} />
        )}
        {metadata.ogUrl && <meta property="og:url" content={metadata.ogUrl} />}
        <meta property="og:type" content="website" />
      </Head>
      <body className={inter.className}>{children}</body>
    </>
  );
}
