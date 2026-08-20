import Link from "next/link";

export default function AGBPage() {
    return (
        <article>
      <div className="pt-28 px-12 pb-14 bg-white">
        <div className="max-w-225">
          <div className="text-xs tracking-[1.5px] uppercase font-semibold text-primary-700 mb-4.5">
            {"//"} Rechtliches
          </div>
          <h1 className="text-[80px] leading-none tracking-[-2.4px] font-bold mb-4 text-foreground">
            AGB<span className="text-primary-700">.</span>
          </h1>
          <p className="text-lg leading-[1.55] max-w-180 text-muted">
            Allgemeine Geschäftsbedingungen für Workshop-Buchungen, Beratungen und sonstige Leistungen.
          </p>
        </div>
      </div>
 
      <div className="pt-6 px-12 pb-24 bg-white">
        <div className="max-w-205">
          {/* Inhaltsverzeichnis */}
          <div className="bg-surface py-5 px-6 rounded mb-8 text-sm leading-[1.9]">
            <div className="font-mono text-[11px] text-primary-700 tracking-[1.5px] uppercase mb-2">
              {"//"} Inhalt
            </div>
            <a href="#geltung" className="block text-foreground no-underline">
              <span className="text-muted">→</span> § 1 Geltungsbereich
            </a>
            <a href="#partner" className="block text-foreground no-underline">
              <span className="text-muted">→</span> § 2 Vertragspartner
            </a>
            <a href="#vertrag" className="block text-foreground no-underline">
              <span className="text-muted">→</span> § 3 Vertragsschluss
            </a>
            <a href="#leistungen" className="block text-foreground no-underline">
              <span className="text-muted">→</span> § 4 Leistungen
            </a>
            <a href="#preise" className="block text-foreground no-underline">
              <span className="text-muted">→</span> § 5 Preise &amp; Zahlung
            </a>
            <a href="#storno" className="block text-foreground no-underline">
              <span className="text-muted">→</span> § 6 Stornierung &amp; Umbuchung
            </a>
            <a href="#widerruf" className="block text-foreground no-underline">
              <span className="text-muted">→</span> § 7 Widerrufsrecht (Verbraucher)
            </a>
            <a href="#durchfuehrung" className="block text-foreground no-underline">
              <span className="text-muted">→</span> § 8 Durchführung &amp; Mitwirkung
            </a>
            <a href="#urheber" className="block text-foreground no-underline">
              <span className="text-muted">→</span> § 9 Urheberrecht
            </a>
            <a href="#gewaehrleistung" className="block text-foreground no-underline">
              <span className="text-muted">→</span> § 10 Gewährleistung
            </a>
            <a href="#haftung" className="block text-foreground no-underline">
              <span className="text-muted">→</span> § 11 Haftung
            </a>
            <a href="#datenschutz" className="block text-foreground no-underline">
              <span className="text-muted">→</span> § 12 Datenschutz
            </a>
            <a href="#schluss" className="block text-foreground no-underline">
              <span className="text-muted">→</span> § 13 Schlussbestimmungen
            </a>
          </div>
 
          {/* § 1 */}
          <h2 id="geltung" className="scroll-mt-25 text-2xl font-bold tracking-[-0.4px] mt-12 mb-4 text-foreground">
            § 1 Geltungsbereich
          </h2>
          <p className="text-[15px] leading-[1.7] mb-3 text-justify hyphens-auto text-foreground">
            Diese Allgemeinen Geschäftsbedingungen (nachfolgend &quot;AGB&quot;) gelten für sämtliche Verträge
            zwischen Manuel Kübler, Steinbergstr. 2, 72202 Nagold (nachfolgend &quot;Anbieter&quot; oder &quot;ich&quot;)
            und seinen Kunden über die Buchung von Workshops, Schulungen, Beratungen, Coachings und
            sonstigen Leistungen, die über diese Website angeboten werden.
          </p>
          <p className="text-[15px] leading-[1.7] mb-3 text-justify hyphens-auto text-foreground">
            Abweichende Bedingungen des Kunden werden nicht anerkannt, es sei denn, ihrer Geltung wird
            ausdrücklich schriftlich zugestimmt.
          </p>
 
          {/* § 2 */}
          <h2 id="partner" className="scroll-mt-25 text-2xl font-bold tracking-[-0.4px] mt-12 mb-4 text-foreground">
            § 2 Vertragspartner und Verbraucher / Unternehmer
          </h2>
          <p className="text-[15px] leading-[1.7] mb-3 text-justify hyphens-auto text-foreground">
            Vertragspartner ist:
          </p>
          <div className="bg-surface border-l-[3px] border-primary-700 py-5 px-6 rounded my-2 mb-3.5 text-[15px] leading-[1.7] text-foreground">
            Manuel Kübler
            <br />
            Steinbergstr. 2<br />
            72202 Nagold
            <br />
            E-Mail:{" "}
            <Link
              href="mailto:mail@softwaredesign-solution.de"
              className="text-foreground no-underline border-b border-primary-700"
            >
              mail@softwaredesign-solution.de
            </Link>
            <br />
            Telefon:{" "}
            <Link href="tel:+4916096806809" className="text-foreground no-underline border-b border-primary-700">
              +49 176 32125780
            </Link>
          </div>
          <p className="text-[15px] leading-[1.7] mb-3 text-justify hyphens-auto text-foreground">
            Verbraucher i. S. d. AGB ist jede natürliche Person, die ein Rechtsgeschäft zu Zwecken
            abschließt, die überwiegend weder ihrer gewerblichen noch ihrer selbständigen beruflichen
            Tätigkeit zugerechnet werden können (§ 13 BGB). Unternehmer ist jede natürliche oder
            juristische Person oder rechtsfähige Personengesellschaft, die bei Abschluss des
            Rechtsgeschäfts in Ausübung ihrer gewerblichen oder selbständigen beruflichen Tätigkeit
            handelt (§ 14 BGB).
          </p>
 
          {/* § 3 */}
          <h2 id="vertrag" className="scroll-mt-25 text-2xl font-bold tracking-[-0.4px] mt-12 mb-4 text-foreground">
            § 3 Vertragsschluss
          </h2>
          <p className="text-[15px] leading-[1.7] mb-3 text-justify hyphens-auto text-foreground">
            Die Darstellung der Workshops und Leistungen auf dieser Website stellt kein rechtlich
            bindendes Angebot dar, sondern eine unverbindliche Aufforderung zur Abgabe einer
            Buchungsanfrage.
          </p>
          <p className="text-[15px] leading-[1.7] mb-3 text-justify hyphens-auto text-foreground">
            Mit dem Absenden des Buchungsformulars (&quot;Jetzt verbindlich buchen&quot;) gibt der Kunde ein
            verbindliches Vertragsangebot ab. Der Vertrag kommt durch meine Annahme zustande, die in
            der Regel per E-Mail-Bestätigung an die vom Kunden angegebene Adresse innerhalb von 5
            Werktagen erfolgt. Geht innerhalb dieser Frist keine Annahmeerklärung beim Kunden ein, ist
            der Kunde nicht mehr an sein Angebot gebunden.
          </p>
          <p className="text-[15px] leading-[1.7] mb-3 text-justify hyphens-auto text-foreground">
            Der Vertragstext wird nach dem Vertragsschluss von mir gespeichert und dem Kunden in der
            Buchungsbestätigung in Textform (E-Mail) zur Verfügung gestellt. Vertragssprache ist
            Deutsch.
          </p>
 
          {/* § 4 */}
          <h2 id="leistungen" className="scroll-mt-25 text-2xl font-bold tracking-[-0.4px] mt-12 mb-4 text-foreground">
            § 4 Leistungen
          </h2>
          <p className="text-[15px] leading-[1.7] mb-3 text-justify hyphens-auto text-foreground">
            Der konkrete Leistungsumfang ergibt sich aus der jeweiligen Workshop- bzw.
            Leistungsbeschreibung auf der Website sowie aus der Buchungsbestätigung. Geschuldet wird
            die fachgerechte Durchführung der jeweiligen Leistung, nicht ein bestimmter wirtschaftlicher
            Erfolg.
          </p>
          <h3 className="text-[17px] font-semibold mt-5 mb-2 text-foreground">Workshops</h3>
          <ul className="text-[15px] leading-[1.75] mb-3.5 ml-5.5 list-disc text-foreground">
            <li>Durchführung als Online- oder Inhouse-Workshop nach Vereinbarung</li>
            <li>Bereitstellung der Workshop-Materialien in digitaler Form</li>
            <li>Teilnahmebescheinigung auf Wunsch</li>
          </ul>
          <h3 className="text-[17px] font-semibold mt-5 mb-2 text-foreground">
            Beratung &amp; Coaching
          </h3>
          <p className="text-[15px] leading-[1.7] mb-3 text-justify hyphens-auto text-foreground">
            Beratungs- und Coaching-Leistungen werden auf Stunden- oder Tagessatz-Basis abgerechnet.
            Der konkrete Leistungsumfang wird individuell vereinbart.
          </p>
          <h3 className="text-[17px] font-semibold mt-5 mb-2 text-foreground">
            Individualsoftware-Projekte
          </h3>
          <p className="text-[15px] leading-[1.7] mb-3 text-justify hyphens-auto text-foreground">
            Bei der Entwicklung individueller Software (z. B. Web-, App- oder Individualentwicklung
            sowie SAP-Business-One-Customizing) wird der Leistungsumfang vorab schriftlich vereinbart,
            insbesondere hinsichtlich Funktionsumfang, Meilensteine und Abnahmekriterien.
          </p>
 
          {/* § 5 */}
          <h2 id="preise" className="scroll-mt-25 text-2xl font-bold tracking-[-0.4px] mt-10 mb-3.5 text-foreground">
            § 5 Preise und Zahlungsbedingungen
          </h2>
          <p className="text-[15px] leading-[1.7] mb-3 text-justify hyphens-auto text-foreground">
            Es gelten die zum Zeitpunkt der Buchung auf der Website ausgewiesenen Preise. Alle Preise
            verstehen sich für Verbraucher inklusive der gesetzlichen Umsatzsteuer; für Unternehmer
            werden Preise zzgl. der jeweils gültigen Umsatzsteuer ausgewiesen.
          </p>
          <p className="text-[15px] leading-[1.7] mb-3 text-justify hyphens-auto text-foreground">
            Die Rechnungsstellung erfolgt nach Erbringung der Leistung (Workshop-Durchführung) per
            E-Mail. Sofern nicht abweichend vereinbart, ist der Rechnungsbetrag innerhalb von 14 Tagen
            ab Rechnungsdatum ohne Abzug fällig. Bei Zahlungsverzug gelten die gesetzlichen
            Verzugszinsen.
          </p>
          <p className="text-[15px] leading-[1.7] mb-3 text-justify hyphens-auto text-foreground">
            Akzeptierte Zahlungsarten: Banküberweisung. Weitere Zahlungsarten können auf Anfrage
            vereinbart werden.
          </p>
          <h3 className="text-[17px] font-semibold mt-5 mb-2 text-foreground">
            Zahlungsbedingungen bei Projektarbeiten
          </h3>
          <p className="text-[15px] leading-[1.7] mb-3 text-justify hyphens-auto text-foreground">
            Bei individuellen Projekten (z. B. Beratung, Individualsoftware-Entwicklung) können
            abweichend von Absatz 1 Teilzahlungen vereinbart werden: 50 % der vereinbarten Vergütung
            sind im Voraus fällig, weitere 25 % nach Fertigstellung von 50 % der vereinbarten
            Leistung. Die restlichen 25 % werden nach Abschluss der Leistung, jedoch vor Übergabe der
            Arbeitsergebnisse fällig. Bei Neukunden oder fehlender Bonitätsauskunft behalte ich mir
            vor, bis zu 100 % Vorauskasse zu verlangen.
          </p>
 
          {/* § 6 */}
          <h2 id="storno" className="scroll-mt-25 text-2xl font-bold tracking-[-0.4px] mt-10 mb-3.5 text-foreground">
            § 6 Stornierung und Umbuchung von Workshops
          </h2>
          <p className="text-[15px] leading-[1.7] mb-3 text-justify hyphens-auto text-foreground">
            Eine Stornierung gebuchter Workshops durch den Kunden ist unter folgenden Bedingungen
            möglich:
          </p>
          <ul className="text-[15px] leading-[1.75] mb-3.5 ml-5.5 list-disc text-foreground">
            <li>
              <strong className="font-semibold">bis 14 Tage vor Workshop-Beginn:</strong> kostenfrei
            </li>
            <li>
              <strong className="font-semibold">14 bis 7 Tage vor Workshop-Beginn:</strong> 50 % des
              Teilnahmepreises
            </li>
            <li>
              <strong className="font-semibold">
                weniger als 7 Tage vor Workshop-Beginn oder bei Nichterscheinen:
              </strong>{" "}
              100 % des Teilnahmepreises
            </li>
          </ul>
          <p className="text-[15px] leading-[1.7] mb-3 text-justify hyphens-auto text-foreground">
            Eine Umbuchung auf einen anderen Termin oder die Übertragung der Teilnahme auf eine
            Ersatzperson ist bis 7 Tage vor Workshop-Beginn kostenfrei möglich. Die Stornierung bzw.
            Umbuchung muss in Textform (z. B. per E-Mail) erfolgen.
          </p>
          <p className="text-[15px] leading-[1.7] mb-3 text-justify hyphens-auto text-foreground">
            Ich behalte mir vor, Workshops bei Nichterreichen der Mindest-Teilnehmerzahl, bei
            Erkrankung oder bei sonstigen wichtigen Gründen abzusagen oder zu verschieben. In diesem
            Fall werden bereits geleistete Zahlungen vollständig erstattet oder auf einen Ersatztermin
            angerechnet; weitergehende Ansprüche sind ausgeschlossen, soweit nicht zwingend gesetzlich
            geregelt.
          </p>
          <h3 className="text-[17px] font-semibold mt-5 mb-2 text-foreground">
            Stornierung bei Projektarbeiten
          </h3>
          <p className="text-[15px] leading-[1.7] mb-3 text-justify hyphens-auto text-foreground">
            Für individuelle Projekte (Beratung, Individualsoftware-Entwicklung) gilt abweichend von
            den vorstehenden Absätzen: Eine Stornierung durch den Kunden bedarf meiner schriftlichen
            Zustimmung. Stimme ich einer Stornierung zu, kann ich neben den bereits erbrachten
            Leistungen und aufgelaufenen Kosten eine Stornogebühr in Höhe von 30 % des noch nicht
            abgerechneten Auftragswerts des Gesamtprojekts in Rechnung stellen.
          </p>
 
          {/* § 7 */}
          <h2 id="widerruf" className="scroll-mt-25 text-2xl font-bold tracking-[-0.4px] mt-10 mb-3.5 text-foreground">
            § 7 Widerrufsrecht für Verbraucher
          </h2>
          <div className="bg-surface border-l-[3px] border-primary-700 py-5 px-6 rounded my-2 mb-4.5 text-[15px] leading-[1.7] text-foreground">
            <strong className="font-bold">Widerrufsbelehrung</strong>
            <div className="mt-2.5">
              Verbraucher haben das Recht, binnen vierzehn Tagen ohne Angabe von Gründen diesen Vertrag
              zu widerrufen. Die Widerrufsfrist beträgt vierzehn Tage ab dem Tag des
              Vertragsabschlusses.
            </div>
            <div className="mt-2.5">Um Ihr Widerrufsrecht auszuüben, müssen Sie mir</div>
            <div className="mt-1.5 pl-4 text-sm">
              Manuel Kübler
              <br />
              Steinbergstr. 2
              <br />
              72202 Nagold
              <br />
              <br />
              E-Mail: mail@softwaredesign-solution.de
              <br />
              Telefon: +49 176 32125780
            </div>
            <div className="mt-2.5">
              mittels einer eindeutigen Erklärung (z. B. ein mit der Post versandter Brief oder E-Mail)
              über Ihren Entschluss, diesen Vertrag zu widerrufen, informieren. Zur Wahrung der
              Widerrufsfrist reicht es aus, dass Sie die Mitteilung über die Ausübung des
              Widerrufsrechts vor Ablauf der Widerrufsfrist absenden.
            </div>
            <div className="mt-3.5 font-semibold">Folgen des Widerrufs</div>
            <div className="mt-1.5">
              Wenn Sie diesen Vertrag widerrufen, habe ich Ihnen alle Zahlungen, die ich von Ihnen
              erhalten habe, unverzüglich und spätestens binnen vierzehn Tagen ab dem Tag
              zurückzuzahlen, an dem die Mitteilung über Ihren Widerruf bei mir eingegangen ist. Für
              die Rückzahlung verwende ich dasselbe Zahlungsmittel, das Sie bei der ursprünglichen
              Transaktion eingesetzt haben, es sei denn, mit Ihnen wurde ausdrücklich etwas anderes
              vereinbart; in keinem Fall werden Ihnen wegen dieser Rückzahlung Entgelte berechnet.
            </div>
            <div className="mt-3.5 font-semibold">Vorzeitiges Erlöschen des Widerrufsrechts</div>
            <div className="mt-1.5">
              Das Widerrufsrecht erlischt vorzeitig, wenn der Workshop bzw. die Dienstleistung mit
              ausdrücklicher Zustimmung des Verbrauchers vor Ablauf der Widerrufsfrist vollständig
              erbracht wurde und der Verbraucher zur Kenntnis genommen hat, dass er mit
              Vertragsabschluss sein Widerrufsrecht verliert (§ 356 Abs. 4 BGB).
            </div>
            <div className="mt-3.5 font-semibold">Hinweis bei Beginn vor Fristende</div>
            <div className="mt-1.5">
              Verlangt der Verbraucher ausdrücklich, dass die Dienstleistung vor Ablauf der
              Widerrufsfrist beginnt, hat er bei Widerruf denjenigen Betrag zu zahlen, der dem Anteil
              der bis zum Widerruf bereits erbrachten Dienstleistungen im Vergleich zum Gesamtumfang
              der Leistung entspricht.
            </div>
          </div>
 
          {/* § 8 */}
          <h2 id="durchfuehrung" className="scroll-mt-25 text-2xl font-bold tracking-[-0.4px] mt-10 mb-3.5 text-foreground">
            § 8 Durchführung und Mitwirkung
          </h2>
          <p className="text-[15px] leading-[1.7] mb-3 text-justify hyphens-auto text-foreground">
            Online-Workshops werden über Videokonferenzsysteme (z. B. Zoom, Microsoft Teams)
            durchgeführt. Der Kunde stellt die hierfür erforderliche technische Ausstattung (stabile
            Internetverbindung, Mikrofon, ggf. Kamera) eigenverantwortlich bereit.
          </p>
          <p className="text-[15px] leading-[1.7] mb-3 text-justify hyphens-auto text-foreground">
            Bei Inhouse-Workshops stellt der Kunde die örtliche und technische Infrastruktur
            (Räumlichkeit, Beamer, ggf. Whiteboard, Internetzugang) bereit. Reisekosten werden — sofern
            nicht ausdrücklich im Pauschalpreis enthalten — gesondert nach tatsächlichem Aufwand
            berechnet.
          </p>
          <p className="text-[15px] leading-[1.7] mb-3 text-justify hyphens-auto text-foreground">
            Kommt es durch höhere Gewalt, Verkehrsstörungen, behördliche Verfügungen oder sonstige von
            mir nicht zu vertretende Ereignisse zu Verzögerungen bei der Leistungserbringung,
            entstehen daraus keine Schadensersatzansprüche gegen mich.
          </p>
 
          {/* § 9 */}
          <h2 id="urheber" className="scroll-mt-25 text-2xl font-bold tracking-[-0.4px] mt-10 mb-3.5 text-foreground">
            § 9 Urheberrecht und Nutzungsrechte
          </h2>
          <p className="text-[15px] leading-[1.7] mb-3 text-justify hyphens-auto text-foreground">
            Sämtliche im Rahmen der Workshops bereitgestellten Materialien (Folien, Code-Beispiele,
            schriftliche Unterlagen) sind urheberrechtlich geschützt. Der Teilnehmer erhält ein
            einfaches, nicht übertragbares Nutzungsrecht zur ausschließlich persönlichen und internen
            Nutzung im eigenen Unternehmen.
          </p>
          <p className="text-[15px] leading-[1.7] mb-3 text-justify hyphens-auto text-foreground">
            Eine Vervielfältigung, Weitergabe, öffentliche Wiedergabe oder kommerzielle Verwertung der
            Materialien — insbesondere die Verwendung zur Durchführung eigener oder fremder Schulungen
            — ist ohne meine vorherige schriftliche Zustimmung nicht gestattet.
          </p>
 
          {/* § 10 */}
          <h2 id="gewaehrleistung" className="scroll-mt-25 text-2xl font-bold tracking-[-0.4px] mt-10 mb-3.5 text-foreground">
            § 10 Gewährleistung
          </h2>
          <p className="text-[15px] leading-[1.7] mb-3 text-justify hyphens-auto text-foreground">
            Für im Rahmen von Beratungs- und Individualsoftware-Projekten erbrachte Werkleistungen
            gelten die gesetzlichen Gewährleistungsvorschriften. Zeigt sich innerhalb der gesetzlichen
            Gewährleistungsfrist ein Mangel an der erbrachten Leistung, ist dieser mit einer möglichst
            detaillierten Beschreibung anzuzeigen.
          </p>
          <p className="text-[15px] leading-[1.7] mb-3 text-justify hyphens-auto text-foreground">
            Die Gewährleistung beschränkt sich zunächst auf Nacherfüllung. Schlägt die Nacherfüllung
            fehl, kann der Kunde nach seiner Wahl vom Vertrag zurücktreten oder die vereinbarte
            Vergütung mindern.
          </p>
 
          {/* § 11 */}
          <h2 id="haftung" className="scroll-mt-25 text-2xl font-bold tracking-[-0.4px] mt-10 mb-3.5 text-foreground">
            § 11 Haftung
          </h2>
          <p className="text-[15px] leading-[1.7] mb-3 text-justify hyphens-auto text-foreground">
            Ich hafte unbeschränkt für Vorsatz und grobe Fahrlässigkeit sowie für Schäden aus der
            Verletzung des Lebens, des Körpers oder der Gesundheit. Für leichte Fahrlässigkeit hafte
            ich nur bei Verletzung wesentlicher Vertragspflichten (Kardinalpflichten), deren Erfüllung
            die ordnungsgemäße Durchführung des Vertrags überhaupt erst ermöglicht und auf deren
            Einhaltung der Kunde regelmäßig vertrauen darf. In diesem Fall ist die Haftung auf den
            vertragstypischen, vorhersehbaren Schaden begrenzt.
          </p>
          <p className="text-[15px] leading-[1.7] mb-3 text-justify hyphens-auto text-foreground">
            Eine Haftung für mittelbare Schäden — insbesondere entgangenen Gewinn, Datenverlust oder
            Folgeschäden aus der Anwendung vermittelter Inhalte in der Praxis des Kunden — ist
            ausgeschlossen, soweit nicht zwingend gesetzlich geregelt.
          </p>
 
          {/* § 12 */}
          <h2 id="datenschutz" className="scroll-mt-25 text-2xl font-bold tracking-[-0.4px] mt-10 mb-3.5 text-foreground">
            § 12 Datenschutz
          </h2>
          <p className="text-[15px] leading-[1.7] mb-3 text-justify hyphens-auto text-foreground">
            Hinweise zum Umgang mit personenbezogenen Daten finden Sie in der separaten{" "}
            <Link href="/datenschutz" className="text-primary-700 no-underline border-b border-primary-700">
              Datenschutzerklärung
            </Link>
            .
          </p>
 
          {/* § 13 */}
          <h2 id="schluss" className="scroll-mt-25 text-2xl font-bold tracking-[-0.4px] mt-10 mb-3.5 text-foreground">
            § 13 Schlussbestimmungen
          </h2>
          <p className="text-[15px] leading-[1.7] mb-3 text-justify hyphens-auto text-foreground">
            Es gilt das Recht der Bundesrepublik Deutschland unter Ausschluss des UN-Kaufrechts. Bei
            Verbrauchern gilt diese Rechtswahl nur insoweit, als nicht der gewährte Schutz durch
            zwingende Bestimmungen des Rechts des Staates, in dem der Verbraucher seinen gewöhnlichen
            Aufenthalt hat, entzogen wird.
          </p>
          <p className="text-[15px] leading-[1.7] mb-3 text-justify hyphens-auto text-foreground">
            Erfüllungsort und — soweit gesetzlich zulässig — ausschließlicher Gerichtsstand für alle
            Streitigkeiten aus diesem Vertrag ist mein Wohnsitz, sofern der Kunde Kaufmann, juristische
            Person des öffentlichen Rechts oder öffentlich-rechtliches Sondervermögen ist.
          </p>
          <p className="text-[15px] leading-[1.7] mb-3 text-justify hyphens-auto text-foreground">
            Sollten einzelne Bestimmungen dieser AGB ganz oder teilweise unwirksam sein oder werden,
            bleibt die Wirksamkeit der übrigen Bestimmungen unberührt.
          </p>
          <p className="text-[15px] leading-[1.7] mb-3 text-justify hyphens-auto text-foreground">
            <strong className="font-semibold">Online-Streitbeilegung:</strong> Die Europäische
            Kommission stellt eine Plattform zur Online-Streitbeilegung bereit:{" "}
            <Link
              href="https://ec.europa.eu/consumers/odr"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-700 no-underline border-b border-primary-700"
            >
              https://ec.europa.eu/consumers/odr
            </Link>
            . Ich bin nicht bereit und nicht verpflichtet, an Streitbeilegungsverfahren vor einer
            Verbraucherschlichtungsstelle teilzunehmen.
          </p>
 
          <div className="mt-16 pt-6 border-t border-border text-xs text-muted font-mono">
            Stand: August 2026
          </div>
        </div>
      </div>
        </article>
    );
}