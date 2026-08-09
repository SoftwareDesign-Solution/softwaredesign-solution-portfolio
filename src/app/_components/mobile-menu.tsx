import Link from "next/link";

interface MobileMenuProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
    return (
        <>
            {isOpen && (
                <div className="fixed inset-0 z-30 bg-black/40 md:hidden" onClick={onClose}>
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

                        {/* Kontakt */}
                        <Link 
                            href="/anfrage" 
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