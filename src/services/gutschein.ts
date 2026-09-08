// services/gutschein.ts

import { db } from "@/lib/db";

interface GutscheinRecord {
  id: string;
  code: string;
  typ: "prozent" | "fest";
  wert: number;
  workshop_id: number | null;
  //max_einloesungen: number | null;
  //einloesungen_anzahl: number;
  gueltig_von: string | null;
  gueltig_bis: string | null;
  active: boolean;
}

export type GutscheinValidierungsErgebnis =
  | { gueltig: true; code: string; rabatt: number; rabattLabel: string }
  | { gueltig: false; nachricht: string };

function runden(betrag: number): number {
  // Vermeidet Floating-Point-Ungenauigkeiten (z.B. 0.1 + 0.2), Rundung auf ganze Cent.
  return Math.round(betrag * 100) / 100;
}

async function findGutscheinByCode(code: string): Promise<GutscheinRecord | null> {
  const rows = await db`
    SELECT code, workshop_id, gueltig_bis, typ, wert, active FROM gutschein WHERE code = ${code.trim().toUpperCase()} LIMIT 1
  `;
  return (rows[0] as GutscheinRecord) ?? null;
}

async function wurdeBereitsEingeloest(code: string, email: string, workshopId: number): Promise<boolean> {
  const rows = await db`
    SELECT 1 FROM buchung
    WHERE gutschein_code = ${code}
      AND email = ${email.trim().toLowerCase()}
      AND workshop_id = ${workshopId}
      AND rabatt > 0
    LIMIT 1
  `;
  return rows.length > 0;
}

/** Prüft, ohne zu verbrauchen — für den Live-Check im Formular. */
/*
export async function validiereGutschein(
  code: string,
  workshopId: number,
  zwischensummeCents: number
): Promise<GutscheinValidierungsErgebnis> {
  const gutschein = await findGutscheinByCode(code);

  if (!gutschein) {// || !gutschein.aktiv) {
    return { gueltig: false, nachricht: "Dieser Gutscheincode ist ungültig." };
  }

  // workshop_id === null → gilt für alle Workshops
  if (gutschein.workshop_id && gutschein.workshop_id !== workshopId) {
    return { gueltig: false, nachricht: "Dieser Gutschein gilt nicht für diesen Workshop." };
  }

  const jetzt = new Date();
  if (gutschein.gueltig_von && new Date(gutschein.gueltig_von) > jetzt) {
    return { gueltig: false, nachricht: "Dieser Gutschein ist noch nicht gültig." };
  }
  if (gutschein.gueltig_bis && new Date(gutschein.gueltig_bis) < jetzt) {
    return { gueltig: false, nachricht: "Dieser Gutschein ist abgelaufen." };
  }
  if (gutschein.max_einloesungen !== null && gutschein.einloesungen_anzahl >= gutschein.max_einloesungen) {
    return { gueltig: false, nachricht: "Dieser Gutschein wurde bereits vollständig eingelöst." };
  }

  const rabatt =
    gutschein.typ === "prozent"
      ? Math.round((zwischensummeCents * gutschein.wert) / 100)
      : Math.min(gutschein.wert, zwischensummeCents);

  const rabattLabel =
    gutschein.typ === "prozent"
      ? `${gutschein.wert}% Rabatt`
      : `${(gutschein.wert / 100).toFixed(2)} € Rabatt`;

  return { gueltig: true, code: gutschein.code, rabatt, rabattLabel };
}
*/

/** Prüft, ohne zu verbrauchen — für den Live-Check im Formular. zwischensumme in Euro. */
export async function validiereGutschein(
  code: string,
  email: string,
  workshopId: number,
  zwischensumme: number
): Promise<GutscheinValidierungsErgebnis> {
  const normalisierterCode = code.trim().toUpperCase();
  const gutschein = await findGutscheinByCode(normalisierterCode);
 
  if (!gutschein || !gutschein.active) {
    return { gueltig: false, nachricht: "Dieser Gutscheincode ist ungültig." };
  }
 
  if (gutschein.workshop_id && gutschein.workshop_id !== workshopId) {
    return { gueltig: false, nachricht: "Dieser Gutschein gilt nicht für diesen Workshop." };
  }
 
  const jetzt = new Date();
  if (gutschein.gueltig_von && new Date(gutschein.gueltig_von) > jetzt) {
    return { gueltig: false, nachricht: "Dieser Gutschein ist noch nicht gültig." };
  }
  if (gutschein.gueltig_bis && new Date(gutschein.gueltig_bis) < jetzt) {
    return { gueltig: false, nachricht: "Dieser Gutschein ist abgelaufen." };
  }
 
  if (await wurdeBereitsEingeloest(normalisierterCode, email, workshopId)) {
    return { gueltig: false, nachricht: "Sie haben diesen Gutschein für diesen Workshop bereits eingelöst." };
  }
 
  /*
  if (gutschein.max_einloesungen !== null) {
    const anzahl = await zaehleEinloesungen(normalisierterCode);
    if (anzahl >= gutschein.max_einloesungen) {
      return { gueltig: false, nachricht: "Dieser Gutschein wurde bereits vollständig eingelöst." };
    }
  }
  */
 
  const rabatt =
    gutschein.typ === "prozent"
      ? runden((zwischensumme * gutschein.wert) / 100)
      : Math.min(gutschein.wert, zwischensumme);
 
  const rabattLabel =
    gutschein.typ === "prozent"
      ? `${gutschein.wert}% Rabatt`
      : `${gutschein.wert.toFixed(2)} € Rabatt`;
 
  return { gueltig: true, code: gutschein.code, rabatt, rabattLabel };
}

/** Verbraucht den Code — erst beim tatsächlichen Buchungsabschluss aufrufen, nie beim Live-Check. */
/*
export async function loeseGutscheinEin(code: string): Promise<boolean> {
  const gutschein = await findGutscheinByCode(code);
  if (!gutschein) return false;

  // Atomar — verhindert, dass zwei gleichzeitige Buchungen ein limitiertes Kontingent überziehen.
  const rows = await db`
    UPDATE gutschein
    SET einloesungen_anzahl = einloesungen_anzahl + 1
    WHERE id = ${gutschein.id}
      AND (max_einloesungen IS NULL OR einloesungen_anzahl < max_einloesungen)
    RETURNING id
  `;
  return rows.length > 0;
}
*/