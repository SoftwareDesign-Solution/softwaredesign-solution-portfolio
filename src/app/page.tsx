import HeroSection from "./_components/sections/hero-section";
import KontaktSection from "./_components/sections/kontakt-section";
import LeistungenSection from "./_components/sections/leistungen-section";
import SchwerpunkteSection from "./_components/sections/schwerpunkte-section";
import WorkshopsSection from "./_components/sections/workshops-section";

export default function Home() {
  return (
    <article>

      <HeroSection />

      <SchwerpunkteSection />

      <LeistungenSection />

      <WorkshopsSection />

      <KontaktSection />

    </article>
  );
}
