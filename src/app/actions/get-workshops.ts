import { db } from "@/lib/db";
import { Workshop } from "@/types/workshop";

export async function getWorkshops(): Promise<Workshop[]> {
    
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
                        'status', t.status
                    ) ORDER BY t.datum_von
                ) FILTER (WHERE t.active = TRUE AND t.id IS NOT NULL),
                '[]'
            ) AS termine
        FROM workshop w
        INNER JOIN trainer tr ON w.trainer_id = tr.id
        LEFT JOIN termin t ON t.workshop_id = w.id
        WHERE (w.active = TRUE)
        GROUP BY w.id, tr.id
    `) as Workshop[];

    return workshops;

}