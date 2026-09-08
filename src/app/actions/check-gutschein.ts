"use server";
 
import { validiereGutschein } from "@/services/gutschein";
 
/** Live-Check beim Klick auf "Einlösen" — validiert, verbraucht den Code NICHT. */
export async function checkGutschein(code: string, email: string, workshopId: number, zwischensummeCents: number) {
  return validiereGutschein(code, email, workshopId, zwischensummeCents);
}