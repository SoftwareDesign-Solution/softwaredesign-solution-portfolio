/**
 * @file structured-data.ts
 * @description Baut die schema.org-Objekte (JSON-LD) für Startseite und Workshop-Detailseiten.
 * @module lib/structured-data
 * @author Manuel Kübler
 */

import type { Leistung } from "@/types/leistung";
import type { TerminStatus } from "@/types/termin";
import type { Workshop } from "@/types/workshop";

import { DEFAULT_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site";

// Stabile IDs, damit Suchmaschinen Person, Organisation und Website seitenübergreifend als dieselben Entitäten erkennen
const PERSON_ID = `${SITE_URL}/#person`;
const ORGANIZATION_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;

const PERSON_NAME = "Manuel Kübler";

/** Öffentliche Profile, die zur selben Person/Marke gehören (schema.org `sameAs`). */
const SAME_AS = ["https://github.com/SoftwareDesign-Solution"];

/** Firmensitz – muss mit dem Impressum übereinstimmen. */
const BUSINESS_ADDRESS = {
    "@type": "PostalAddress",
    addressCountry: "DE",
    addressLocality: "Nagold",
};

/** Themen, für die Manuel Kübler als Experte auftritt (schema.org `knowsAbout`). */
const KNOWS_ABOUT = [
    "Softwareentwicklung",
    "Webentwicklung",
    "React",
    "Next.js",
    "Vue.js",
    "Nuxt",
    "Angular",
    "Laravel",
    "Node.js",
    "TypeScript",
    ".NET",
    "C#",
    "SAP Business One",
    "SAP Business One Service Layer",
    "coresuite",
    "E2E-Testing mit Cypress und Playwright",
    "IT-Schulungen",
];

/** Abbildung des Termin-Status auf schema.org `ItemAvailability`. */
const AVAILABILITY: Record<TerminStatus, string> = {
    ausgebucht: "https://schema.org/SoldOut",
    restplaetze: "https://schema.org/LimitedAvailability",
    verfuegbar: "https://schema.org/InStock",
};

/**
 * Graph für die Startseite: Person, Organisation (Marke SoftwareDesign-Solution) und Website.
 *
 * @returns Das JSON-LD-Objekt mit `@graph`
 */
export function buildSiteGraph(): Record<string, unknown> {
    return {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@id": PERSON_ID,
                "@type": "Person",
                homeLocation: { "@type": "Place", address: { "@type": "PostalAddress", addressCountry: "DE", addressLocality: "Iserlohn" } },
                jobTitle: "Freelance Full-Stack-Entwickler und IT-Trainer",
                knowsAbout: KNOWS_ABOUT,
                name: PERSON_NAME,
                sameAs: SAME_AS,
                url: SITE_URL,
                worksFor: { "@id": ORGANIZATION_ID },
            },
            {
                "@id": ORGANIZATION_ID,
                "@type": "Organization",
                address: BUSINESS_ADDRESS,
                areaServed: ["DE", "AT", "CH"],
                description: DEFAULT_DESCRIPTION,
                founder: { "@id": PERSON_ID },
                logo: `${SITE_URL}/assets/SoftwareDesign-Solution.png`,
                name: SITE_NAME,
                sameAs: SAME_AS,
                url: SITE_URL,
            },
            {
                "@id": WEBSITE_ID,
                "@type": "WebSite",
                inLanguage: "de-DE",
                name: SITE_NAME,
                publisher: { "@id": ORGANIZATION_ID },
                url: SITE_URL,
            },
        ],
    };
}

/**
 * Graph für eine Workshop-Detailseite: Breadcrumb, Kurs und je ein `Event` pro
 * kommendem Online-Termin.
 *
 * Präsenz-Termine bekommen (noch) kein `Event`, weil Suchmaschinen dafür einen
 * Veranstaltungsort mit Adresse verlangen – den speichert `termin` bisher nicht.
 *
 * @param workshop - Der geladene Workshop inkl. Terminen und Trainer
 * @param heute - Stichtag im Format `YYYY-MM-DD` (Default: heute in Europe/Berlin); vergangene Termine fallen weg
 * @returns Das JSON-LD-Objekt mit `@graph`
 */
export function buildWorkshopGraph(workshop: Workshop, heute: string = heuteInBerlin()): Record<string, unknown> {
    const url = `${SITE_URL}/workshops/${workshop.slug}`;
    const image = `${url}/opengraph-image`;
    const inLanguage = toLanguageCode(workshop.sprache);
    const organizer = { "@type": "Organization", name: SITE_NAME, url: SITE_URL };
    const performer = { "@type": "Person", name: workshop.trainer?.name ?? PERSON_NAME };

    const breadcrumb = {
        "@type": "BreadcrumbList",
        itemListElement: [
            { "@type": "ListItem", item: SITE_URL, name: "Start", position: 1 },
            { "@type": "ListItem", item: `${SITE_URL}/#workshops`, name: "Workshops", position: 2 },
            { "@type": "ListItem", item: url, name: workshop.titel, position: 3 },
        ],
    };

    const course = {
        "@id": `${url}#course`,
        "@type": "Course",
        description: workshop.kurzbeschreibung,
        inLanguage,
        name: workshop.titel,
        provider: organizer,
        url,
        ...(workshop.preis !== undefined && workshop.preis !== null && {
            offers: { "@type": "Offer", ...preisAngaben(workshop.preis), category: "Paid", url },
        }),
    };

    const events = (workshop.termine ?? [])
        .filter((termin) => termin.active && toDateOnly(termin.datumVon) >= heute && istOnline(termin.format))
        .map((termin) => ({
            "@type": "Event",
            description: workshop.kurzbeschreibung,
            endDate: toDateOnly(termin.datumBis),
            eventAttendanceMode: "https://schema.org/OnlineEventAttendanceMode",
            eventStatus: "https://schema.org/EventScheduled",
            image: [image],
            inLanguage,
            location: { "@type": "VirtualLocation", url },
            name: `${workshop.titel} – Online-Workshop`,
            organizer,
            performer,
            startDate: toDateOnly(termin.datumVon),
            url,
            ...(workshop.preis !== undefined && workshop.preis !== null && {
                offers: {
                    "@type": "Offer",
                    ...preisAngaben(workshop.preis),
                    availability: AVAILABILITY[termin.status],
                    url,
                },
            }),
        }));

    return {
        "@context": "https://schema.org",
        "@graph": [breadcrumb, course, ...events],
    };
}

/**
 * Graph für eine Leistungsseite: Breadcrumb und `Service` mit Anbieter und Einsatzgebiet.
 *
 * @param leistung - Die Leistung aus `data/leistungen.ts`
 * @returns Das JSON-LD-Objekt mit `@graph`
 */
export function buildLeistungGraph(leistung: Leistung): Record<string, unknown> {
    const url = `${SITE_URL}/leistungen/${leistung.slug}`;

    return {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "BreadcrumbList",
                itemListElement: [
                    { "@type": "ListItem", item: SITE_URL, name: "Start", position: 1 },
                    { "@type": "ListItem", item: `${SITE_URL}/#leistungen`, name: "Leistungen", position: 2 },
                    { "@type": "ListItem", item: url, name: leistung.titel, position: 3 },
                ],
            },
            {
                "@id": `${url}#service`,
                "@type": "Service",
                areaServed: ["DE", "AT", "CH"],
                description: leistung.metaBeschreibung,
                name: leistung.titel,
                provider: { "@id": ORGANIZATION_ID, "@type": "Organization", name: SITE_NAME, url: SITE_URL },
                serviceType: leistung.serviceTyp,
                url,
            },
        ],
    };
}

/**
 * Preisangaben für ein `Offer`. Die Preise sind netto (B2B) – das wird über
 * `valueAddedTaxIncluded: false` maschinenlesbar mitgeteilt.
 *
 * @param preis - Nettopreis in Euro (aus der DB ggf. als String)
 * @returns `price`, `priceCurrency` und `priceSpecification`
 */
function preisAngaben(preis: number | string) {
    const price = Number(preis).toFixed(2);
    return {
        price,
        priceCurrency: "EUR",
        priceSpecification: {
            "@type": "UnitPriceSpecification",
            price,
            priceCurrency: "EUR",
            valueAddedTaxIncluded: false,
        },
    };
}

/**
 * Ob ein Termin online stattfindet. Erkennt die in `termin.format` gepflegten
 * Freitexte wie "Online" oder "Remote".
 *
 * @param format - Format des Termins
 * @returns `true` bei Online-Terminen
 */
function istOnline(format?: string): boolean {
    return /online|remote|virtuell/i.test(format ?? "");
}

/**
 * Kürzt ein Datum aus der DB (z. B. `2026-09-14` oder `2026-09-14T00:00:00.000Z`) auf `YYYY-MM-DD`.
 *
 * @param datum - Datum als String
 * @returns Das Datum im Format `YYYY-MM-DD`
 */
function toDateOnly(datum: string): string {
    return String(datum).slice(0, 10);
}

/**
 * Heutiges Datum in Europe/Berlin als `YYYY-MM-DD` (Server laufen bei Vercel in UTC).
 *
 * @returns Das heutige Datum
 */
function heuteInBerlin(): string {
    return new Intl.DateTimeFormat("sv-SE", { timeZone: "Europe/Berlin" }).format(new Date());
}

/**
 * Übersetzt die Sprachangabe aus der DB ("Deutsch", "Englisch") in einen Sprachcode.
 *
 * @param sprache - Sprache des Workshops
 * @returns Der BCP-47-Sprachcode, Default `de`
 */
function toLanguageCode(sprache?: string): string {
    return /engl/i.test(sprache ?? "") ? "en" : "de";
}