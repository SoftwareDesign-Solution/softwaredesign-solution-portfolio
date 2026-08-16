import Link from "next/link";

import SectionHeader from "../section-header";
import WorkshopList from "./workshop-list";


export default function WorkshopsSection() {
    return (
        <section id="workshops" className="py-16 px-6 md:py-28 md:px-12 scroll-mt-18">

            <SectionHeader 
                title="Workshops"
                action={
                    <Link href="/anfrage" className="py-2 px-3.5 border border-solid border-gray-200 rounded-sm text-sm bg-gray-100">
                        Inhouse anfragen
                    </Link>
                }
            >
                    Wissen, Praxisbezug, Remote
            </SectionHeader>

            <WorkshopList />
            
        </section>
    )
};