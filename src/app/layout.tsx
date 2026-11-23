/**
 * @file layout.tsx
 * @description Root-Layout: umschließt jede Seite mit Header, Footer, Back-to-Top-Button
 * und dem globalen Modal-Kontext.
 * @module app/layout
 * @author Manuel Kübler <mail@softwaredesign-solution.de>
 */

import type { Metadata } from "next";

import { Analytics } from '@vercel/analytics/next';

import "./globals.css";

import { baseOpenGraph, DEFAULT_DESCRIPTION, DEFAULT_TITLE, SITE_NAME, SITE_URL } from "@/lib/site";
import ModalProvider from "@/providers/modal-provider";

import { BackToTopButton } from "./_components/back-to-top-button";
import Footer from "./_components/footer";
import Header from "./_components/header";

// Standard-Meta-Tags für alle Seiten, sofern nicht auf Seitenebene überschrieben.
// Kein `alternates.canonical` und keine `openGraph.url` hier: beides würde an alle Unterseiten
// vererbt und sie auf "/" zeigen lassen – die URL setzt jede Seite selbst.
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: DEFAULT_TITLE,
  description: DEFAULT_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: "Manuel Kübler", url: SITE_URL }],
  creator: "Manuel Kübler",
  openGraph: {
    ...baseOpenGraph,
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
  },
};

/**
 * Root-Layout: umschließt jede Seite mit Header, Footer, Back-to-Top-Button und dem {@link ModalProvider}-Kontext.
 *
 * @param props - Enthält `children`, das gerenderte Seiten-Segment
 * @returns Das HTML-Grundgerüst der Anwendung
 */
export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="de"
      className="h-full"
    >
      <body className="min-h-full">
        
        <Header />

        <main>
          
          <ModalProvider>
            {children}
          </ModalProvider>

        </main>
        
        <Footer />

        <BackToTopButton />

        <Analytics />
        
      </body>
    </html>
  );
}