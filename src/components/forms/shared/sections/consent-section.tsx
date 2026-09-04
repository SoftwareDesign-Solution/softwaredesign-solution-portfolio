/**
 * @file consent-section.tsx
 * @description Pflicht-Checkbox zur Datenschutz-Zustimmung, registriert unter dem Feldnamen `consent`.
 * @module components/forms/shared/sections/consent-section
 * @author Manuel Kübler <mail@softwaredesign-solution.de>
 */

import { ReactNode } from "react";
import { useFormContext } from "react-hook-form";

/** Props für {@link ConsentSection}. */
interface ConsentSectionProps {
    /** Der eigentliche Zustimmungstext (z.B. mit Link zur Datenschutzerklärung). */
    children: ReactNode;
}

/**
 * Pflicht-Checkbox zur Datenschutz-Zustimmung, registriert unter dem Feldnamen `consent`.
 *
 * @param props - Siehe {@link ConsentSectionProps}
 * @returns Die Zustimmungs-Checkbox
 */
export default function ConsentSection({ children }: ConsentSectionProps) {

    const { 
        register
    } = useFormContext<{ 
        consent: boolean 
    }>();

    return (
        <div className="mt-6 rounded-lg border border-neutral-200 bg-white px-5 py-5">
                            
            {/* Label.tsx text-[13.5px] */}
            <label className="flex cursor-pointer items-start gap-2.5 text-[14px] leading-[1.55] text-foreground">
                
                <input
                    type="checkbox"
                    className="mt-0.5 h-4 w-4 accent-primary-700"
                    {...register("consent", { required: true })}
                />

                <span>
                    {children}
                </span>
            </label>

        </div>
    );
}