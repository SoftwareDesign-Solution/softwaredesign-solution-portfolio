import Link from "next/link";

export default function DesktopNavbar() {
    return (
        <nav className="hidden justify-center gap-8 text-[11px] font-medium uppercase tracking-[1.5px] md:flex">

            {/* Über mich */}
            <Link href="/#ueber-mich" className="dt-nav-link inline-block cursor-pointer text-foreground no-underline transition-colors duration-150 hover:text-gray-600 hover:text-bold">
                Über mich
            </Link>

            {/* Leistungen */}
            <Link href="/#leistungen" className="dt-nav-link inline-block cursor-pointer text-foreground no-underline transition-colors duration-150 hover:text-gray-600 hover:text-bold">
                Leistungen
            </Link>

            {/* Workshops */}
            <Link href="/#workshops" className="dt-nav-link inline-block cursor-pointer text-foreground no-underline transition-colors duration-150 hover:text-gray-600 hover:text-bold">
                Workshops
            </Link>

            {/* Kontakt */}
            <Link href="/#kontakt" className="dt-nav-link inline-block cursor-pointer text-foreground no-underline transition-colors duration-150 hover:text-gray-600 hover:text-bold">
                Kontakt
            </Link>

        </nav>
    )
}