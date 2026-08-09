import Image from "next/image";
import Link from "next/link";
import DesktopNavbar from "./desktop-navbar";

export default function Header() {
    return (
        <header className="sticky top-0 z-20 grid grid-cols-[auto_1fr_auto] md:grid-cols-[1fr_1fr] items-center overflow-visible bg-white px-12 py-4.5 text-[13px] tracking-[0.2px]">
            
            <Link href="/" className="text-foreground no-underline">
                <Image 
                    src="/assets/SoftwareDesign-Solution.png" 
                    alt="SoftwareDesign-Solution Logo" 
                    width={666} 
                    height={210}
                    className="pointer-events-none h-auto w-50 object-contain"
                />
            </Link>

            <DesktopNavbar />

        </header>
    )
};