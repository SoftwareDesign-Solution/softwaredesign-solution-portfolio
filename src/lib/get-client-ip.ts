"use server";

import { headers } from "next/headers";

export default async function getClientIp(): Promise<string | null> {
    const headersList = await headers();
    const forwardedFor = headersList.get("x-forwarded-for");

    return (
        forwardedFor?.split(",").map(ip => ip.trim())[0] ||
        headersList.get("x-real-ip") ||
        null
    );
};