/**
 * @file mobile-menu.tsx
 * @description Vollflächiges Slide-in-Menü für mobile Ansichten, geöffnet über den Hamburger-Button.
 * @module app/_components/mobile-menu
 * @author Manuel Kübler <mail@softwaredesign-solution.de>
 */

import Link from "next/link";

interface MobileMenuProps {
    /** Ob das Menü-Overlay eingeblendet wird. */
    isOpen: boolean;
    /** Wird beim Klick auf den Schließen-Button, das Overlay oder einen Link aufgerufen. */
    onClose: () => void;
}

/**
 * Vollflächiges Slide-in-Menü für mobile Ansichten (unterhalb `md`), geöffnet über den {@link HamburgerButton}.
 *
 * @param props - Siehe {@link MobileMenuProps}
 * @returns Das mobile Menü-Overlay (oder `null`-äquivalent, wenn geschlossen)
 */
export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
    return (
        <>
            {isOpen && (
                // Dunkles Overlay: Klick außerhalb des Panels schließt das Menü
                <div className="fixed inset-0 z-30 bg-black/40 md:hidden" onClick={onClose}>
                    {/* stopPropagation, damit Klicks innerhalb des Panels das Menü nicht sofort wieder schließen */}
                    <div className="ml-auto flex h-full w-70 flex-col gap-6 bg-white px-8 py-8 shadow-xl" onClick={(e) => e.stopPropagation()}>

                        <button
                            type="button"
                            aria-label="Schließen"
                            onClick={onClose}
                            className="self-end text-2xl leading-none text-foreground"
                            >
                                ×
                        </button>

                        {/* Über mich */}
                        <Link 
                            href="/#ueber-mich" 
                            className="dt-nav-link inline-block cursor-pointer text-foreground no-underline transition-colors duration-150 hover:text-gray-600 hover:text-bold"
                            onClick={onClose}
                        >
                            Über mich
                        </Link>

                        {/* Leistungen */}
                        <Link 
                            href="/#leistungen" 
                            className="dt-nav-link inline-block cursor-pointer text-foreground no-underline transition-colors duration-150 hover:text-gray-600 hover:text-bold"
                            onClick={onClose}
                        >
                            Leistungen
                        </Link>

                        {/* Workshops */}
                        <Link 
                            href="/#workshops" 
                            className="dt-nav-link inline-block cursor-pointer text-foreground no-underline transition-colors duration-150 hover:text-gray-600 hover:text-bold"
                            onClick={onClose}
                        >
                            Workshops
                        </Link>

                        {/* Referenzen */}
                        <Link 
                            href="/referenzen" 
                            className="dt-nav-link inline-block cursor-pointer text-foreground no-underline transition-colors duration-150 hover:text-gray-600 hover:text-bold"
                            onClick={onClose}
                        >
                            Referenzen
                        </Link>

                        {/* Kontakt */}
                        <Link 
                            href="/#kontakt" 
                            className="dt-nav-link inline-block cursor-pointer text-foreground no-underline transition-colors duration-150 hover:text-gray-600 hover:text-bold"
                            onClick={onClose}
                        >
                            Kontakt
                        </Link>

                    </div>
                </div>
            )}
        </>
    );
};