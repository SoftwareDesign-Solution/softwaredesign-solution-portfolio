/**
 * @file layout.tsx
 * @description Root-Layout: umschließt jede Seite mit Header, Footer, Back-to-Top-Button
 * und dem globalen Modal-Kontext.
 * @module app/layout
 * @author Manuel Kübler <mail@softwaredesign-solution.de>
 */

import type { Metadata } from "next";

import "./globals.css";

import ModalProvider from "@/providers/modal-provider";

import { BackToTopButton } from "./_components/back-to-top-button";
import Footer from "./_components/footer";
import Header from "./_components/header";

// Standard-Meta-Tags (Titel/Beschreibung) für alle Seiten, sofern nicht auf Seitenebene überschrieben
export const metadata: Metadata = {
  title: "SoftwareDesign-Solution - Workshops, Beratung und Entwicklung für Front-End-Teams",
  description: "Manuel Kübler — Workshops, Beratung und Entwicklung für Softwareentwicklung. Clean Code, Architektur, Testing — pragmatisch, im DACH-Raum.",
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
        
      </body>
    </html>
  );
}
