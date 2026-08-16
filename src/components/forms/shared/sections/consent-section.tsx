import { ReactNode } from "react";
import { useFormContext } from "react-hook-form";


interface ConsentSectionProps {
    children: ReactNode;
}

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