import SectionHeader from "../section-header";

type Service = {
  title: string;
  description: string;
}

const SERVICES: Service[] = [
    {
        title: "Beratung & Konzeption",
        description: "Ich unterstütze Sie bei der Analyse Ihrer Anforderungen, der Definition von Zielen und der Entwicklung einer maßgeschneiderten Strategie für Ihr Projekt."
    },{
        title: "Software-Entwicklung",
        description: "Ich entwickle maßgeschneiderte Windows-Anwendungen mit C#, DevExpress, Entity Framework, Java, Spring Boot. Dabei lege ich besonders viel Wert auf eine leichte Bedienung und Übersichtlichkeit."
    },{
        title: "Web-Entwicklung",
        description: "Ich entwickle maßgeschneiderte Webanwendungen mit Laravel, Symfony, Node.js, MySQL, Vue, React und Angular. Dabei lege ich besonders viel Wert auf eine leichte Bedienung und Übersichtlichkeit."
    },{
        title: "App-Entwicklung",
        description: "Ich programmiere maßgeschneiderte mobile Applikationen. Apps sind häufig beliebter als Webseiten, da sie eine zielgruppenorientierte Kundenbindung ermöglichen."
    },{
        title: "SAP Business One",
        description: "Ihr habt euch für SAP Business One entschieden und sucht einen erfahrenen Berater/Entwickler, der eure Anforderungen umsetzt? Auch da kann ich weiterhelfen"
    }, {
        title: "Workshops & Schulungen",
        description: "Ich biete Workshops und Schulungen zu den Themen Softwareentwicklung, Webentwicklung, App-Entwicklung und SAP Business One an. Dabei lege ich besonders viel Wert auf eine praxisnahe Vermittlung von Wissen."
    }
];

export default function LeistungenSection() {
    return (
        <section id="leistungen" className="py-16 px-6 md:py-28 md:px-12 bg-surface scroll-mt-18">

            <SectionHeader title="Leistungen">
                Wie ich Sie unterstütze
            </SectionHeader>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {SERVICES.map((service) => (
                    <div
                        key={service.title}
                        className="p-8 border border-solid border-border rounded-lg bg-white relative flex flex-col gap-4 min-h-50"
                    >
                        {/*
                        <div className="min-h-11 flex items-center">
                            <div className="w-11 h-11 text-primary-700">{service.icon}</div>
                        </div>
                        */}

                        <div>
                            <div className="text-xl font-semibold tracking-[-0.4px] mb-2 text-foreground">
                                {service.title}
                            </div>
                            <p className="text-sm text-muted leading-[1.55]">{service.description}</p>
                        </div>
                    </div>
                ))}
            </div>

        </section>
    );
};