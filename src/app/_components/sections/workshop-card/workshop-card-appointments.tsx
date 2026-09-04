import TerminRow from "@/components/termin-row";
import { type Termin } from "@/types/termin";

const MAX_VISIBLE_APPOINTMENTS = 3;

interface WorkshopCardAppointmentsProps {
    termine: Termin[];
}

export default function WorkshopCardAppointments({
    termine,
}: WorkshopCardAppointmentsProps) {
    const visibleTermine = termine.slice(
        0,
        MAX_VISIBLE_APPOINTMENTS,
    );

    const remainingCount =
        termine.length - visibleTermine.length;

    return (
        <>
            <div className="mb-2 text-xs font-semibold uppercase tracking-[1.5px] text-muted">
                Termine
            </div>

            <div className="mb-4.5 flex flex-col gap-0.5">
                {visibleTermine.length > 0 ? (
                    visibleTermine.map((termin) => (
                        <TerminRow
                            key={termin.id}
                            termin={termin}
                        />
                    ))
                ) : (
                    <div className="flex items-center justify-between rounded-md bg-surface px-3 py-2">
                        <span className="text-xs font-medium text-muted">
                            Aktuell keine Termine geplant.
                        </span>

                        <span className="text-[11px] font-semibold text-muted">
                            In Planung
                        </span>
                    </div>
                )}

                {remainingCount > 0 && (
                    <div className="px-3 pt-1.5 text-[11px] italic text-muted">
                        + {remainingCount} weitere Termine verfügbar
                    </div>
                )}
            </div>
        </>
    );
}