interface HamburgerButtonProps {
    onClick: () => void;
    isOpen: boolean;
}

export default function HamburgerButton({ onClick, isOpen }: HamburgerButtonProps) {
    return (
        <button
            type="button"
            aria-label={isOpen ? 'Menü schließen' : 'Menü öffnen'}
            onClick={onClick}
            className="absolute right-6 top-1/2 flex h-8 w-8 -translate-y-1/2 flex-col items-center justify-center gap-1.25 md:hidden"
        >
            <span
                className={`block h-0.5 w-6 bg-foreground transition-transform duration-200 ${
                isOpen ? 'translate-y-1.75 rotate-45' : ''
                }`}
            />
            <span
                className={`block h-0.5 w-6 bg-foreground transition-opacity duration-200 ${
                isOpen ? 'opacity-0' : 'opacity-100'
                }`}
            />
            <span
                className={`block h-0.5 w-6 bg-foreground transition-transform duration-200 ${
                isOpen ? '-translate-y-1.75 -rotate-45' : ''
                }`}
            />
        </button>
    );
};