/**
 * @file bild-modal.tsx
 * @description Adapter zwischen der abgefangenen Bild-Route und dem generischen
 * Basis-Modal: Das Modal ist immer offen, die URL steuert die Sichtbarkeit,
 * Schließen bedeutet `router.back()`.
 * @module app/referenzen/[id]/@galerie/_components/bild-modal
 * @author Manuel Kübler <mail@softwaredesign-solution.de>
 */

"use client";

import { useRouter } from "next/navigation";

import Modal from "@/components/modals/modal";

/** Props für {@link BildModal}. */
interface BildModalProps {
  /** Titel im Kopf des Modals, hier die Bildunterschrift. */
  title: string;
  children: React.ReactNode;
}

/**
 * Zeigt `children` im Basis-Modal; Schließen navigiert zurück.
 *
 * @param props - Siehe {@link BildModalProps}
 * @returns Das Bild-Modal
 */
export default function BildModal({ title, children }: BildModalProps) {
  const router = useRouter();

  return (
    <Modal open onClose={() => router.back()} title={title} size="md" align="center" maxWidth="max-w-[1100px]">
      {children}
    </Modal>
  );
}
