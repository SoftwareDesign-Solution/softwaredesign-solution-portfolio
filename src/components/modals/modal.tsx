/**
 * @file modal.tsx
 * @description Generisches Basis-Modal (Portal in `document.body`), das von allen
 * konkreten Modals (Buchung, Angebotsanfrage, Benachrichtigung, Erfolgs-/Fehler-Status)
 * verwendet wird.
 * @module components/modals/modal
 * @author Manuel Kübler <mail@softwaredesign-solution.de>
 */

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

/** Props für {@link Modal}. */
interface ModalProps {
  open: boolean;
  onClose?: () => void;
  title?: string;
  maxWidth?: string;
  size?: "sm" | "md" | "lg";
  align?: "start" | "center" | "end";
  /** Fest 9000 vorher — jetzt konfigurierbar, damit sich z.B. ActionStatusModal über ein offenes Formular-Modal legen kann */
  zIndex?: number;
  /** false = kein Titel-Balken/kein X-Button — Aufrufer rendert eigenen Inhalt inkl. eigenem Schließen-Mechanismus */
  showHeader?: boolean;
  /**
   * true = unterhalb von md (768px) als Vollbild ohne Rand, Overlay und abgerundete Ecken.
   * Desktop bleibt unverändert.
   */
  fullscreenBelowMd?: boolean;
  /** Mobile Überzeile im Kopf (z.B. "Angebotsanfrage"). Nur zusammen mit `mobileTitle`. */
  mobileEyebrow?: string;
  /** Mobiler Titel unter der Überzeile (z.B. der Workshop-Name). Ersetzt mobil `title`. */
  mobileTitle?: string;
  children: React.ReactNode;
}

// Zähler für den Scroll-Lock, damit sich gestapelte Modals (z.B. ActionStatusModal über
// einem offenen Formular-Modal) beim Schließen nicht gegenseitig den Zustand zurücksetzen
let scrollLockCount = 0;
let lockedScrollY = 0;

/** Sperrt das Scrollen des Dokuments, auch in iOS Safari (dort reicht `overflow: hidden` nicht). */
function lockBodyScroll() {
    if (scrollLockCount++ > 0) return;
    lockedScrollY = window.scrollY;
    const { style } = document.body;
    style.position = "fixed";
    style.top = `-${lockedScrollY}px`;
    style.left = "0";
    style.right = "0";
    style.overflow = "hidden";
}

/** Hebt den Scroll-Lock wieder auf, sobald das letzte Modal geschlossen ist. */
function unlockBodyScroll() {
    if (--scrollLockCount > 0) return;
    const { style } = document.body;
    style.position = "";
    style.top = "";
    style.left = "";
    style.right = "";
    style.overflow = "";
    window.scrollTo(0, lockedScrollY);
}

/**
 * Generisches Basis-Modal (Portal in `document.body`), das von allen konkreten Modals
 * (Buchung, Angebotsanfrage, Benachrichtigung, Erfolgs-/Fehler-Status) verwendet wird.
 * Schließt sich per Escape-Taste oder Klick auf den Hintergrund und sperrt in der Zeit
 * das Scrollen des restlichen Dokuments.
 *
 * @param props - Siehe {@link ModalProps}
 * @returns Das Modal (via Portal), oder `null` wenn `open` `false` ist
 */
export default function Modal({ 
    open, 
    onClose, 
    title, 
    maxWidth ="max-w-[960px]", 
    size = "lg", 
    align = "start", 
    zIndex = 9000,
    showHeader = true,
    fullscreenBelowMd = false,
    mobileEyebrow,
    mobileTitle,
    children 
}: ModalProps) {

    const dialogRef = useRef(null);

    // Escape key closes the dialog
    useEffect(() => {
        if (!open) return;
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose?.();
        };
        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [open, onClose]);

    // Lock body scroll while the dialog is open
    /*
    useEffect(() => {
        if (!open) return;
        const original = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = original;
        };
    }, [open]);
    */
    useEffect(() => {
        if (!open) return;
        lockBodyScroll();
        return unlockBodyScroll;
    }, [open]);

    if (!open) return null;
 
    const isSmall = size === "sm";
    const alignClass = align === "center" ? "items-center" : align === "end" ? "items-end" : "items-start";
    const hasMobileTitle = fullscreenBelowMd && Boolean(mobileTitle);

    // Nur unterhalb von md: Vollbild, kein Rand/Overlay/Radius, 100dvh statt 100vh
    const overlayMobileClass = fullscreenBelowMd ? "max-md:items-stretch max-md:overflow-hidden max-md:bg-white max-md:p-0 max-md:backdrop-blur-none" : "";
    const dialogMobileClass = fullscreenBelowMd ? "max-md:h-dvh max-md:max-h-dvh max-md:max-w-none max-md:overscroll-contain max-md:rounded-none max-md:shadow-none" : "";

    // Render the modal via a portal to document.body
    return createPortal(
        <div
            className={`fixed inset-0 z-[${zIndex}] flex justify-center overflow-y-auto bg-neutral-900/55 px-6 py-10 backdrop-blur-xs ${alignClass} ${overlayMobileClass}`}
            style={{ zIndex }}
            onMouseDown={(e) => {
                if (e.target === e.currentTarget) onClose?.();
            }}
        >
            <div
                ref={dialogRef}
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-title"
                className={`w-full max-h-[calc(100vh-80px)] ${maxWidth} overflow-y-auto rounded-xl bg-white shadow-2xl ${dialogMobileClass}`}
            >

                {showHeader ? (
                    <>
                        <div
                            className={`sticky top-0 z-10 flex items-center justify-between border-b border-border bg-white ${isSmall ? "px-7 py-5" : "px-9 py-5"}`}
                        >
                            <div
                                id="modal-title"
                                className={`font-bold tracking-tight text-foreground ${isSmall ? "text-[16px]" : "text-[18px]"}`}
                            >
                                {hasMobileTitle ? (
                                    <>
                                        <span className="max-md:hidden">{title}</span>
                                        <span className="block md:hidden">
                                            {mobileEyebrow && (
                                                <span className="block text-[11px] font-semibold uppercase tracking-[1.5px] text-primary-700">
                                                    {mobileEyebrow}
                                                </span>
                                            )}
                                            <span className="block text-[17px] leading-snug font-bold wrap-break-word">
                                                {mobileTitle}
                                            </span>
                                        </span>
                                    </>
                                ) : (
                                    title
                                )}
                            </div>
                            <button
                                type="button"
                                aria-label="Schließen"
                                onClick={() => onClose?.()}
                                className={`flex items-center justify-center rounded-full bg-surface text-foreground transition hover:bg-border ${isSmall ? "h-8 w-8" : "h-9 w-9"}`}
                            >
                                <svg
                                    width={isSmall ? 14 : 16}
                                    height={isSmall ? 14 : 16}
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2.2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M6 6l12 12M18 6L6 18" />
                                </svg>
                            </button>
                        </div>
                        <div className={`px-6.5 pb-7 pt-9 ${fullscreenBelowMd ? "max-md:p-0" : ""}`}>
                            {children}
                        </div>
                    </>
                ) : (
                    children
                )}
            </div>
        </div>,
    document.body
    );
};