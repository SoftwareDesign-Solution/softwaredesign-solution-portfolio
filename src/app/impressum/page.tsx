import Link from "next/link";

export default function ImpressumPage() {
    return (
        <article>
      <div className="pt-28 px-12 pb-14">
        <div className="max-w-225">
          <h1 className="text-5xl md:text-7xl font-bold mb-4 leading-none tracking-[-2.4px] wrap-anywhere hyphens-auto text-foreground">
            Impressum
          </h1>
          <p className="text-lg leading-[1.55] max-w-180 text-muted">
            Angaben gemäß § 5 DDG sowie weitere rechtliche Hinweise.
          </p>
        </div>
      </div>
 
      <div className="pt-6 px-12 pb-24">
        <div className="max-w-205">
          {/* Anbieter */}
          <h2 className="text-3xl font-bold mt-12 mb-4 leading-none tracking-[-1.2px] wrap-anywhere hyphens-auto text-foreground">
            Anbieter
          </h2>
          <p className="text-base leading-[1.7] mb-3.5 text-justify hyphens-auto text-foreground">
            Angaben gemäß § 5 DDG (Digitale-Dienste-Gesetz):
          </p>
          <div className="bg-surface py-5 px-6 rounded-lg mt-1 mb-3.5 text-sm leading-[1.7] text-justify hyphens-auto text-foreground">
            Manuel Kübler
            <br />
            Steinbergstr. 2<br />
            72202 Nagold
            <br />
            Deutschland
          </div>
 
          {/* Vertreten durch */}
          <h3 className="text-lg font-semibold mt-6 mb-2 leading-none tracking-[-0.8px] wrap-anywhere hyphens-auto text-foreground">
            Vertreten durch
          </h3>
          <p className="text-base leading-[1.7] mb-3.5 text-justify hyphens-auto text-foreground">
            Manuel Kübler
          </p>
 
          {/* Kontakt */}
          <h3 className="text-lg font-semibold mt-6 mb-2 leading-none tracking-[-0.8px] wrap-anywhere hyphens-auto text-foreground">
            Kontakt
          </h3>
          <div className="bg-surface py-5 px-6 rounded-lg mt-1 mb-3.5 text-sm leading-[1.7] text-justify hyphens-auto text-foreground">
            Telefon:{" "}
            <Link href="tel:+4917632125780" className="text-primary-700 underline hover:text-primary-800">
              +49 176 32125780
            </Link>
            <br />
            E-Mail:{" "}
            <Link
              href="mailto:mail@softwaredesign-solution.de"
              className="text-primary-700 underline hover:text-primary-800"
            >
              mail@softwaredesign-solution.de
            </Link>
          </div>
 
          {/* Umsatzsteuer-ID */}
          <p className="text-base leading-[1.7] mb-3.5 text-justify hyphens-auto text-foreground">
            Umsatzsteuer-Identifikationsnummer gemäß § 27a Umsatzsteuergesetz:{" "}
            <strong className="font-semibold">DE296251186</strong>
          </p>
 
          {/* Verantwortlich nach */}
          <h3 className="text-lg font-semibold mt-6 mb-2 leading-none tracking-[-0.8px] wrap-anywhere hyphens-auto text-foreground">
            Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV
          </h3>
          <div className="bg-surface py-5 px-6 rounded-lg mt-1 mb-3.5 text-sm leading-[1.7] text-justify hyphens-auto text-foreground">
            Manuel Kübler
            <br />
            Steinbergstr. 2<br />
            72202 Nagold
            <br />
            Deutschland
          </div>
 
          {/* Streitbeilegung */}
          <h2 className="text-3xl font-bold mt-12 mb-4 leading-none tracking-[-1.2px] wrap-anywhere hyphens-auto text-foreground">
            Streitbeilegung
          </h2>
          <p className="text-base leading-[1.7] mb-3.5 text-justify hyphens-auto text-foreground">
            Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:{" "}
            <Link
              href="https://ec.europa.eu/consumers/odr"
              target="_blank"
              className="text-primary-700 underline hover:text-primary-800"
            >
              https://ec.europa.eu/consumers/odr
            </Link>
            . Meine E-Mail-Adresse finden Sie oben im Impressum.
          </p>
          <p className="text-base leading-[1.7] mb-3.5 text-justify hyphens-auto text-foreground">
            Ich bin nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer
            Verbraucherschlichtungsstelle teilzunehmen.
          </p>
 
          {/* Haftungsausschluss */}
          <h2 className="text-3xl font-bold mt-12 mb-4 leading-none tracking-[-1.2px] wrap-anywhere hyphens-auto text-foreground">
            Haftungsausschluss
          </h2>
          <h3 className="text-lg font-semibold mt-6 mb-2 leading-none tracking-[-0.8px] wrap-anywhere hyphens-auto text-foreground">
            Haftung für Inhalte
          </h3>
          <p className="text-base leading-[1.7] mb-3.5 text-justify hyphens-auto text-foreground">
            Die Inhalte dieser Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit,
            Vollständigkeit und Aktualität der Inhalte kann jedoch keine Gewähr übernommen werden. Als
            Diensteanbieter bin ich gemäß § 7 Abs. 1 DDG für eigene Inhalte auf diesen Seiten nach den
            allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 DDG bin ich als Diensteanbieter jedoch
            nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder
            nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
          </p>
          <p className="text-base leading-[1.7] mb-3.5 text-justify hyphens-auto text-foreground">
            Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den
            allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst
            ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden
            entsprechender Rechtsverletzungen werde ich diese Inhalte umgehend entfernen.
          </p>
          <h3 className="text-lg font-semibold mt-6 mb-2 leading-none tracking-[-0.8px] wrap-anywhere hyphens-auto text-foreground">
            Haftung für Links
          </h3>
          <p className="text-base leading-[1.7] mb-3.5 text-justify hyphens-auto text-foreground">
            Mein Angebot enthält Links zu externen Webseiten Dritter, auf deren Inhalte ich keinen
            Einfluss habe. Deshalb kann ich für diese fremden Inhalte auch keine Gewähr übernehmen. Für
            die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten
            verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche
            Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht
            erkennbar.
          </p>
          <p className="text-base leading-[1.7] mb-3.5 text-justify hyphens-auto text-foreground">
            Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete
            Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen
            werde ich derartige Links umgehend entfernen.
          </p>
          <h3 className="text-lg font-semibold mt-6 mb-2 leading-none tracking-[-0.8px] wrap-anywhere hyphens-auto text-foreground">
            Urheberrecht
          </h3>
          <p className="text-base leading-[1.7] mb-3.5 text-justify hyphens-auto text-foreground">
            Die durch den Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem
            deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der
            Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des
            jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind nur für den
            privaten, nicht kommerziellen Gebrauch gestattet.
          </p>
          <p className="text-base leading-[1.7] mb-3.5 text-justify hyphens-auto text-foreground">
            Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die
            Urheberrechte Dritter beachtet. Insbesondere werden Inhalte Dritter als solche
            gekennzeichnet. Sollten Sie trotzdem auf eine Urheberrechtsverletzung aufmerksam werden,
            bitte ich um einen entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen werde ich
            derartige Inhalte umgehend entfernen.
          </p>
 
          {/* Datenschutz */}
          <h2 className="text-3xl font-bold mt-12 mb-4 leading-none tracking-[-1.2px] wrap-anywhere hyphens-auto text-foreground">
            Datenschutz
          </h2>
          <p className="text-base leading-[1.7] mb-3.5 text-justify hyphens-auto text-foreground">
            Hinweise zum Umgang mit personenbezogenen Daten finden Sie in der separaten{" "}
            <Link href="/datenschutz" className="text-primary-700 underline hover:text-primary-800">
              Datenschutzerklärung
            </Link>
            .
          </p>
          <p className="text-base leading-[1.7] mb-3.5 text-justify hyphens-auto text-foreground">
            Der Nutzung von im Rahmen der Impressumspflicht veröffentlichten Kontaktdaten durch Dritte
            zur Übersendung von nicht ausdrücklich angeforderter Werbung und Informationsmaterialien
            wird hiermit ausdrücklich widersprochen. Der Betreiber dieser Seiten behält sich von
            Werbeinformationen, etwa durch Spam-Mails, vor.
          </p>
 
          <div className="mt-16 pt-6 border-t border-border text-sm text-muted">
            Stand: August 2026
          </div>
        </div>
      </div>
    </article>
    );
}