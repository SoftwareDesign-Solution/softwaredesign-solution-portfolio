import Link from "next/link";

export default function DatenschutzPage() {
    return (
        <article>
      <div className="pt-28 px-12 pb-14 bg-white">
        <div className="max-w-225">
          <div className="text-xs tracking-[1.5px] uppercase font-semibold text-primary-700 mb-4.5">
            {"//"} Rechtliches
          </div>
          <h1 className="text-[80px] leading-none tracking-[-2.4px] font-bold mb-4 text-foreground">
            Datenschutz<span className="text-primary-700">.</span>
          </h1>
          <p className="text-lg leading-[1.55] max-w-180 text-muted">
            Informationen zur Verarbeitung personenbezogener Daten gemäß DSGVO.
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
            <Link href="#verLinkntwortlicher" className="block text-foreground no-underline">
              <span className="text-muted">→</span> 1. Verantwortlicher
            </Link>
            <Link href="#rechte" className="block text-foreground no-underline">
              <span className="text-muted">→</span> 2. Ihre Rechte
            </Link>
            <Link href="#logfiles" className="block text-foreground no-underline">
              <span className="text-muted">→</span> 3. Server-Logfiles
            </Link>
            <Link href="#plattform" className="block text-foreground no-underline">
              <span className="text-muted">→</span> 3a. Technische Plattform
            </Link>
            <Link href="#kontakt" className="block text-foreground no-underline">
              <span className="text-muted">→</span> 4. Kontaktformular &amp; E-Mail
            </Link>
            <Link href="#notification" className="block text-foreground no-underline">
              <span className="text-muted">→</span> 5. Workshop-Termin-Benachrichtigung
            </Link>
            <Link href="#booking" className="block text-foreground no-underline">
              <span className="text-muted">→</span> 6. Workshop-Buchung
            </Link>
            <Link href="#speicherdauer" className="block text-foreground no-underline">
              <span className="text-muted">→</span> 7. Speicherdauer
            </Link>
          </div>
 
          {/* 1. Verantwortlicher */}
          <h2 id="verantwortlicher" className="scroll-mt-25 text-[28px] font-bold tracking-[-0.6px] mt-12 mb-4 text-foreground">
            1. Verantwortlicher
          </h2>
          <p className="text-[15px] leading-[1.7] mb-3.5 text-justify hyphens-auto text-foreground">
            Verantwortlich für die Datenverarbeitung auf dieser Website ist:
          </p>
          <div className="bg-surface border-l-[3px] border-primary-700 py-5 px-6 rounded my-1 mb-3.5 text-[15px] leading-[1.7] text-foreground">
            Manuel Kübler
            <br />
            Steinbergstr. 2
            <br />
            72202 Nagold
            <br />
            Deutschland
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
            <Link href="tel:+491234567890" className="text-foreground no-underline border-b border-primary-700">
              +49 176 32125780
            </Link>
          </div>
 
          <h3 className="text-lg font-semibold tracking-[-0.2px] mt-6 mb-2 text-foreground">
            Hosting
          </h3>
          <p className="text-[15px] leading-[1.7] mb-3.5 text-justify hyphens-auto text-foreground">
            {/* TODO: an euer tatsächliches Hosting-Setup anpassen (Vercel + Cloudflare DNS statt privatem NAS) */}
            Diese Website wird bei Vercel gehostet. Details zur Auftragsverarbeitung und
            zum Serverstandort finden Sie in der Datenschutzerklärung des Anbieters.
          </p>
 
          {/* 2. Rechte */}
          <h2 id="rechte" className="scroll-mt-25 text-[28px] font-bold tracking-[-0.6px] mt-12 mb-4 text-foreground">
            2. Ihre Rechte als betroffene Person
          </h2>
          <p className="text-[15px] leading-[1.7] mb-3.5 text-justify hyphens-auto text-foreground">
            Sie haben gegenüber mir folgende Rechte hinsichtlich der Sie betreffenden
            personenbezogenen Daten:
          </p>
          <ul className="text-[15px] leading-[1.75] mb-3.5 ml-5.5 list-disc text-foreground">
            <li>Recht auf Auskunft (Art. 15 DSGVO)</li>
            <li>Recht auf Berichtigung oder Löschung (Art. 16, 17 DSGVO)</li>
            <li>Recht auf Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
            <li>Recht auf Widerspruch gegen die Verarbeitung (Art. 21 DSGVO)</li>
            <li>Recht auf Datenübertragbarkeit (Art. 20 DSGVO)</li>
            <li>Recht auf Widerruf einer erteilten Einwilligung (Art. 7 Abs. 3 DSGVO)</li>
          </ul>
          <p className="text-[15px] leading-[1.7] mb-3.5 text-justify hyphens-auto text-foreground">
            Sie haben zudem das Recht, sich bei einer Datenschutz-Aufsichtsbehörde über die
            Verarbeitung Ihrer personenbezogenen Daten zu beschweren.{" "}
            {/* TODO: zuständige Aufsichtsbehörde je nach Bundesland/Sitz anpassen */}
            Zuständig ist die für Ihren Sitz zuständige Landesdatenschutzbehörde.
          </p>
 
          {/* 3. Logfiles */}
          <h2 id="logfiles" className="scroll-mt-25 text-[28px] font-bold tracking-[-0.6px] mt-12 mb-4 text-foreground">
            3. Bereitstellung der Website / Server-Logfiles
          </h2>
          <p className="text-[15px] leading-[1.7] mb-3.5 text-justify hyphens-auto text-foreground">
            Beim Aufruf dieser Website werden durch den Hosting-Provider automatisch Informationen
            erfasst und in Server-Logfiles gespeichert. Erfasst werden:
          </p>
          <ul className="text-[15px] leading-[1.75] mb-3.5 ml-5.5 list-disc text-foreground">
            <li>IP-Adresse (gekürzt / anonymisiert)</li>
            <li>Datum und Uhrzeit des Zugriffs</li>
            <li>aufgerufene URL und HTTP-Statuscode</li>
            <li>übertragene Datenmenge</li>
            <li>Referrer-URL (zuvor besuchte Seite)</li>
            <li>Browser-Typ, Betriebssystem und Sprache</li>
          </ul>
          <p className="text-[15px] leading-[1.7] mb-3.5 text-justify hyphens-auto text-foreground">
            <strong className="font-semibold">Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. f DSGVO —
            berechtigtes Interesse am stabilen, sicheren Betrieb der Website.{" "}
            <strong className="font-semibold">Speicherdauer:</strong> max. 7 Tage, danach automatische
            Löschung bzw. Anonymisierung.
          </p>
 
          {/* 3a. Technische Plattform — NEU geschrieben für Next.js/Vercel statt Blazor Server */}
          <h2 id="plattform" className="scroll-mt-25 text-[28px] font-bold tracking-[-0.6px] mt-12 mb-4 text-foreground">
            3a. Technische Plattform
          </h2>
          <p className="text-[15px] leading-[1.7] mb-3.5 text-justify hyphens-auto text-foreground">
            Diese Website ist mit Next.js umgesetzt und wird bei Vercel
            gehostet. Anders als bei dauerhaft verbundenen Anwendungen erfolgt die Kommunikation
            zwischen Ihrem Browser und dem Server über einzelne, klassische HTTP-Anfragen — es
            besteht keine permanente Verbindung, die einen fortlaufenden serverseitigen
            Sitzungszustand hält.
          </p>
          <h3 className="text-lg font-semibold tracking-[-0.2px] mt-6 mb-2 text-foreground">
            Technisch notwendige Cookies
          </h3>
          <p className="text-[15px] leading-[1.7] mb-3.5 text-justify hyphens-auto text-foreground">
            Zur sicheren Funktion der Formulare (Buchung, Angebotsanfrage, Benachrichtigung) wird
            Cloudflare Turnstile zum Schutz vor automatisiertem Missbrauch (Bots/Spam) eingesetzt.
            Turnstile kann hierzu technisch notwendige Cookies setzen.
          </p>
          <p className="text-[15px] leading-[1.7] mb-3.5 text-justify hyphens-auto text-foreground">
            <strong className="font-semibold">Rechtsgrundlage:</strong> § 25 Abs. 2 Nr. 2 TDDDG
            (technisch unbedingt erforderlich) sowie Art. 6 Abs. 1 lit. f DSGVO — berechtigtes
            Interesse am sicheren und funktionsfähigen Betrieb der Website. Eine Einwilligung ist
            für diese Verarbeitung nicht erforderlich.
          </p>
 
          {/* 4. Kontakt */}
          <h2 id="kontakt" className="scroll-mt-25 text-[28px] font-bold tracking-[-0.6px] mt-12 mb-4 text-foreground">
            4. Kontaktaufnahme
          </h2>
          <p className="text-[15px] leading-[1.7] mb-3.5 text-justify hyphens-auto text-foreground">
            Wenn Sie über das Anfrageformular oder per E-Mail Kontakt mit mir aufnehmen, werden Ihre
            Angaben (Name, E-Mail-Adresse, Telefonnummer sofern angegeben, Inhalt der Anfrage) zur
            Bearbeitung der Anfrage und für mögliche Anschlusskommunikation gespeichert.
          </p>
          <p className="text-[15px] leading-[1.7] mb-3.5 text-justify hyphens-auto text-foreground">
            <strong className="font-semibold">Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. b DSGVO
            (Vertragsanbahnung) bzw. Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an effektiver
            Anfragenbearbeitung).
          </p>
          <p className="text-[15px] leading-[1.7] mb-3.5 text-justify hyphens-auto text-foreground">
            Eine Weitergabe an Dritte erfolgt nicht. Die Daten werden gelöscht, sobald sie für die
            Zweckerreichung nicht mehr erforderlich sind:
          </p>
          <ul className="text-[15px] leading-[1.75] mb-3.5 ml-5.5 list-disc text-foreground">
            <li>
              <strong className="font-semibold">Anfragen ohne Vertragsabschluss:</strong> Löschung
              spätestens 6 Monate nach Ende der Korrespondenz (Nachlauffrist für mögliche
              Anschlussfragen).
            </li>
            <li>
              <strong className="font-semibold">Anfragen mit anschließender Beauftragung:</strong>{" "}
              Aufbewahrung im Rahmen der gesetzlichen steuer- und handelsrechtlichen Pflichten (siehe
              Abschnitt 10).
            </li>
          </ul>
          <p className="text-[15px] leading-[1.7] mb-3.5 text-justify hyphens-auto text-foreground">
            Sie können die Löschung jederzeit per E-Mail an{" "}
            <Link
              href="mailto:mail@softwaredesign-solution.de"
              className="text-foreground no-underline border-b border-primary-700"
            >
              mail@softwaredesign-solution.de
            </Link>{" "}
            verlangen, sofern keine gesetzlichen Aufbewahrungspflichten entgegenstehen.
          </p>
 
          {/* 5. Termin-Benachrichtigung */}
          <h2 id="notification" className="scroll-mt-25 text-[28px] font-bold tracking-[-0.6px] mt-12 mb-4 text-foreground">
            5. Benachrichtigung bei neuen Workshop-Terminen
          </h2>
          <p className="text-[15px] leading-[1.7] mb-3.5 text-justify hyphens-auto text-foreground">
            Auf jeder Workshop-Detailseite können Sie sich für Benachrichtigungen eintragen, sobald
            ein neuer Termin für den jeweiligen Workshop verfügbar wird. Hierzu erfasse ich{" "}
            <strong className="font-semibold">Vorname, Nachname und E-Mail-Adresse</strong> sowie die
            Workshop-Zuordnung und den Anmelde-Zeitpunkt. Die Anmeldung erfolgt im{" "}
            <strong className="font-semibold">Double-Opt-In-Verfahren</strong>: nach dem Absenden des
            Formulars erhalten Sie eine Bestätigungs-Mail mit einem Aktivierungs-Link. Erst nach Klick
            auf diesen Link wird Ihre Benachrichtigung aktiv.
          </p>
          <p className="text-[15px] leading-[1.7] mb-3.5 text-justify hyphens-auto text-foreground">
            <strong className="font-semibold">Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. a DSGVO
            (Einwilligung). Sie können sich jederzeit über den Abmelde-Link in jeder
            Benachrichtigungs-Mail abmelden.
          </p>
          <p className="text-[15px] leading-[1.7] mb-3.5 text-justify hyphens-auto text-foreground">
            <strong className="font-semibold">Speicherdauer:</strong> bis zur Abmeldung.
            Bestätigungs-Token bei nicht abgeschlossenem Double-Opt-In werden nach 3 Tagen automatisch
            gelöscht.
          </p>
 
          {/* 6. Workshop-Buchung */}
          <h2 id="booking" className="scroll-mt-25 text-[28px] font-bold tracking-[-0.6px] mt-12 mb-4 text-foreground">
            6. Workshop-Buchung
          </h2>
          <p className="text-[15px] leading-[1.7] mb-3.5 text-justify hyphens-auto text-foreground">
            Wenn Sie einen Workshop buchen, erfasse ich folgende Daten zur Vertragsabwicklung:
          </p>
          <ul className="text-[15px] leading-[1.75] mb-3.5 ml-5.5 list-disc text-foreground">
            <li>Firmendaten: Firmenname, Adresse, ggf. USt-ID, ggf. abweichende Rechnungsadresse</li>
            <li>Ansprechperson: Anrede, Vorname, Nachname, E-Mail, optional Telefon</li>
            <li>Teilnehmerdaten (sofern angegeben): Vor- und Nachname, E-Mail je teilnehmender Person</li>
            <li>
              Buchungsmetadaten: gebuchter Termin, Teilnehmeranzahl, optional eingelöster
              Rabattcode, optional Anmerkungen
            </li>
          </ul>
          <p className="text-[15px] leading-[1.7] mb-3.5 text-justify hyphens-auto text-foreground">
            <strong className="font-semibold">Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. b DSGVO
            (Vertragserfüllung) für die Durchführung des Workshops und die Rechnungsstellung sowie
            Art. 6 Abs. 1 lit. c DSGVO i. V. m. § 147 AO und § 257 HGB für die gesetzlich
            vorgeschriebene Aufbewahrung von Vertrags- und Rechnungsdaten.
          </p>
          <p className="text-[15px] leading-[1.7] mb-3.5 text-justify hyphens-auto text-foreground">
            Eine Weitergabe an Dritte erfolgt nur, soweit dies zur Vertragserfüllung erforderlich ist
            (z. B. Übermittlung der Teilnehmer-Mailadressen an das Videokonferenz-System bei
            Online-Workshops). Eine Weitergabe zu Werbezwecken erfolgt nicht.
          </p>
          <p className="text-[15px] leading-[1.7] mb-3.5 text-justify hyphens-auto text-foreground">
            <strong className="font-semibold">Speicherdauer:</strong> Vertrags- und Rechnungsdaten
            werden 10 Jahre aufbewahrt (steuer- und handelsrechtliche Pflichten).
          </p>
 
          
          {/* 7. Speicherdauer im Überblick */}
          <h2 id="speicherdauer" className="scroll-mt-25 text-[28px] font-bold tracking-[-0.6px] mt-12 mb-4 text-foreground">
            7. Speicherdauer im Überblick
          </h2>
          <div className="bg-surface border-l-[3px] border-primary-700 py-5 px-6 rounded my-1 mb-3.5 text-[15px] leading-[1.7] text-foreground">
            <strong className="font-semibold">Server-Logfiles:</strong> max. 7 Tage
            <br />
            <strong className="font-semibold">Analytics-Cookies:</strong> bis zu 14 Monate (oder
            Widerruf)
            <br />
            <strong className="font-semibold">Anfrage-Daten (ohne Vertrag):</strong> max. 6 Monate
            nach letztem Kontakt
            <br />
            <strong className="font-semibold">Newsletter / Termin-Benachrichtigung:</strong> bis
            Widerruf
            <br />
            <strong className="font-semibold">Vertrags- &amp; Rechnungsdaten:</strong> 10 Jahre (§
            147 AO, § 257 HGB)
          </div>
 
          {/* Änderungen */}
          <h2 className="text-[28px] font-bold tracking-[-0.6px] mt-12 mb-4 text-foreground">
            Änderungen dieser Datenschutzerklärung
          </h2>
          <p className="text-[15px] leading-[1.7] mb-3.5 text-justify hyphens-auto text-foreground">
            Ich behalte mir vor, diese Datenschutzerklärung anzupassen, damit sie stets den aktuellen
            rechtlichen Anforderungen entspricht oder um Änderungen meiner Leistungen umzusetzen —
            z. B. bei der Einführung neuer Dienste. Für Ihren erneuten Besuch gilt dann die neue
            Datenschutzerklärung.
          </p>
 
          <div className="mt-16 pt-6 border-t border-border text-xs text-muted font-mono">
            Stand: Mai 2026
          </div>
        </div>
      </div>
    </article>
    );
}