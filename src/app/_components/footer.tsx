import Link from "next/dist/client/link";

export default function Footer() {
    return (
        <footer className="pt-10 px-12 pb-12 flex justify-between items-center border-t border-gray-200 text-sm text-gray-500 flex-wrap gap-6">
            <div>© 2026 Manuel Kübler - SoftwareDesign-Solution</div>
            <div className="flex gap-8 flex-wrap">
                <Link href="/impressum">Impressum</Link>
                <Link href="/datenschutz">Datenschutz</Link>
                <Link href="/agb">AGB</Link>
            </div>
        </footer>
    );
};