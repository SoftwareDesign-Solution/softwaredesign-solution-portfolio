import { notFound } from "next/navigation";
import { getWorkshop } from "@/app/actions/get-workshop";

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
                
                <pre className="text-xs text-muted mb-5">{JSON.stringify(workshop, null, 2)}</pre>
                
            </article>
        );
    }
}