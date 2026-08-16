import SectionHeader from "../section-header";

type FocusArea = {
  title: string;
  description: string;
  skills: string[];
}

const FOCUS_AREAS: FocusArea[] = [
  {
    title: ".NET-Entwicklung",
    description:
      "Von klassischen Windows-Anwendungen bis zu modernen Web-APIs — ich entwickle mit dem .NET-Stack maßgeschneiderte Lösungen, die langfristig wartbar bleiben.",
    skills: [".NET Framework", ".NET", "ASP.NET Core", "Entity Framework", "DevExpress"],
  },
  {
    title: "Web-Entwicklung",
    description:
      "Moderne Web-Frontends mit den gängigen Frameworks — von der Komponentenbibliothek bis zur abgesicherten End-to-End-Testabdeckung.",
    skills: ["Angular", "Cypress", "React (Next.js)", "Storybook", "Vue.js (Nuxt.js, Quasar)"],
  },
  {
    title: "Softwarequalität",
    description:
      "Qualität entsteht nicht zufällig, sondern durch klare Standards, automatisierte Tests und kontinuierliche Codeanalyse.",
    skills: ["Clean Code", "Coding Guidelines", "Unit-Testing", "Codeanalyse", "Code-Reviews"],
  },
  {
    title: "SAP Business One",
    description:
      "Individuelle Anpassungen und Beratung rund um SAP Business One — von Customizing bis zur Integration über die Service Layer.",
    skills: ["Customizing", "Beratung", "Service Layer", "coresuite Country Package", "Add-On-Entwicklung"],
  },
];

export default function SchwerpunkteSection() {
    return (
        <section id="schwerpunkte" className="scroll-mt-18 px-6 py-16 md:px-12 md:py-28">
            
            <SectionHeader title="Schwerpunkte">
                Vier Disziplinen, ein Ziel: Qualität.
            </SectionHeader>
 
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {/* border-t-2 border-b-2 border-t-primary-700 border-b-primary-700*/}
                {FOCUS_AREAS.map((area) => (
                    
                    <div
                        key={area.title}
                        className="flex flex-col rounded-lg border border-l border-r border-border  bg-white p-8"
                    >
                        <div className="mb-2.5 text-[19px] font-semibold tracking-[-0.4px] text-foreground">
                            {area.title}
                        </div>

                        <p className="mb-5 text-[13.5px] leading-[1.55] text-muted">{area.description}</p>

                        <ul className="m-0 list-none space-y-1.25 p-0 text-[13.5px] text-foreground mt-auto">
                            {area.skills.map((skill) => (
                                <li key={skill} className="flex items-center gap-2.5">
                                    <span className="flex h-4 w-4 flex-none items-center justify-center rounded-full border-[1.5px] border-primary-700">
                                        ✓
                                    </span>
                                    <span>{skill}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
    </section>
    );
};