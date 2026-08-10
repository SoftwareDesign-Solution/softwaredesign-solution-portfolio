import { notFound } from "next/navigation";
import { getWorkshop } from "@/app/actions/get-workshop";
import WorkshopHeader from "./_components/workshop-header";

interface WorkshopDetailsPageProps {
    params: Promise<{
        slug: string;
    }>;
}

export default async function WorkshopDetailsPage({ params }: WorkshopDetailsPageProps) {

    const { slug } = await params;

    const workshop = await getWorkshop(slug);

    if (!workshop) {
       notFound();
    }

    else
    {
        return (
            <article>
                
                {/* Workshop Header */}
                <WorkshopHeader {...workshop} />
                
            </article>
        );
    }
}