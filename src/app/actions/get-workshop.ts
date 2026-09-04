/**
 * @file get-workshop.ts
 * @description Server Action zum Laden eines einzelnen Workshops für die Detailseite.
 * @module app/actions/get-workshop
 * @author Manuel Kübler <mail@softwaredesign-solution.de>
 */

import { db } from "@/lib/db";
import { Workshop } from "@/types/workshop";

/**
 * Lädt einen einzelnen aktiven Workshop anhand seines Slugs inklusive Trainer
 * und allen aktiven Terminen (aufsteigend nach Datum sortiert).
 *
 * @param slug - Der eindeutige URL-Slug des Workshops
 * @returns Den Workshop oder `null`, falls kein aktiver Workshop mit diesem Slug existiert
 */
export async function getWorkshop(slug: string): Promise<Workshop | null> {
    
    // Termine werden als JSON-Array direkt in der DB aggregiert, um N+1-Queries zu vermeiden;
    // COALESCE liefert '[]' statt eines Arrays mit einem "leeren" Termin-Objekt, falls keine Termine existieren
    const workshops = await db.query(`
        SELECT
            w.id,
            w.slug,
            w.titel,
            w.kurzbeschreibung,
            w.beschreibung,
            w.dauer,
            w.format,
            w.sprache,
            w.preis,
            w.trainer_id,
            json_build_object(
                'id', tr.id,
                'name', tr.name,
                'titel', tr.titel,
                'bio', tr.bio,
                'foto', tr.foto
            ) AS trainer,
            w.zielgruppe,
            w.voraussetzungen,
            w.lernziele,
            w.agenda,
            w.active,
            COALESCE(
                json_agg(
                    json_build_object(
                        'id', t.id,
                        'datumVon', t.datum_von,
                        'datumBis', t.datum_bis,
                        'format', t.format,
                        'status', t.status,
                        'active', t.active
                    ) ORDER BY t.datum_von
                ) FILTER (WHERE t.active = TRUE AND t.id IS NOT NULL),
                '[]'
            ) AS termine
        FROM workshop w
        INNER JOIN trainer tr ON w.trainer_id = tr.id
        LEFT JOIN termin t ON t.workshop_id = w.id
        WHERE (w.active = TRUE) AND (w.slug = $1)
        GROUP BY w.id, tr.id
    `, [slug]) as Workshop[];

    return workshops.length > 0 ? workshops[0] : null;
    
    // ) FILTER (WHERE t.active = TRUE AND t.id IS NOT NULL AND t.datum_von >= CURRENT_DATE),

};