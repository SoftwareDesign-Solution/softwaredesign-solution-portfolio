import { createPortal } from "react-dom";
import { useEffect, useRef } from "react";


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
  children: React.ReactNode;
}

export default function Modal({ 
    open, 
    onClose, 
    title, 
    maxWidth ="max-w-[960px]", 
    size = "lg", 
    align = "start", 
    zIndex = 9000,
    showHeader = true,
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
    useEffect(() => {
        if (!open) return;
        const original = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = original;
        };
    }, [open]);

    if (!open) return null;
 
    const isSmall = size === "sm";
    const alignClass = align === "center" ? "items-center" : align === "end" ? "items-end" : "items-start";

    return createPortal(
        <div
            className={`fixed inset-0 z-[${zIndex}] flex justify-center overflow-y-auto bg-neutral-900/55 px-6 py-10 backdrop-blur-xs ${alignClass}`}
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
                className={`w-full max-h-[calc(100vh-80px)] ${maxWidth} overflow-y-auto rounded-xl bg-white shadow-2xl`}
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
                                {title}
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
                        <div className="px-6.5 pb-7 pt-9">
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