import { getWorkshops } from "@/app/actions/get-workshops";

import WorkshopCard from "./workshop-card/workshop-card";


export default async function WorkshopList() {

    const workshops = await getWorkshops();
    
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">

            {workshops.map((workshop, index, array) => (
                <WorkshopCard key={workshop.id} workshop={workshop} position={index+1} total={array.length} />
            ))}

        </div>
    )
}