/**
 * @file get-client-ip.ts
 * @description Ermittelt die Client-IP-Adresse des aktuellen Requests, z.B. für
 * Rate-Limiting oder Bot-Schutz in Server Actions.
 * @module lib/get-client-ip
 * @author Manuel Kübler <mail@softwaredesign-solution.de>
 */

"use server";

import { headers } from "next/headers";

/**
 * Ermittelt die Client-IP-Adresse des aktuellen Requests anhand der Proxy-Header,
 * z.B. für Rate-Limiting oder Bot-Schutz. Gibt `null` zurück, wenn keiner der
 * Header gesetzt ist (z.B. lokale Entwicklung ohne vorgeschalteten Proxy).
 *
 * @returns Die ermittelte Client-IP-Adresse oder `null`
 */
export default async function getClientIp(): Promise<string | null> {
    const headersList = await headers();
    const forwardedFor = headersList.get("x-forwarded-for");

    return (
        // x-forwarded-for kann eine Kommaliste von IPs sein (Client, Proxy1, Proxy2, ...)
        // -> die erste (ursprüngliche Client-IP) verwenden
        forwardedFor?.split(",").map(ip => ip.trim())[0] ||
        headersList.get("x-real-ip") ||
        null
    );
};