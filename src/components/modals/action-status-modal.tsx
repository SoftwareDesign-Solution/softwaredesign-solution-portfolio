import { ActionStatusContent, ActionStatusRenderContext, ActionStatusVariant } from "@/types/action-status-content";
import Modal from "./modal";

const VARIANT_STYLES: Record<ActionStatusVariant, { dot: string; text: string }> = {
  success: { dot: "bg-success-500", text: "text-success-600" },
  error: { dot: "bg-error-500", text: "text-error-600" },
};
 
export interface ActionStatusModalProps extends ActionStatusContent {
  open: boolean;
  onClose: () => void;
}

export default function ActionStatusModal({
  open,
  onClose,
  variant = "success",
  kicker,
  heading,
  body,
  meta,
  zIndex,
  maxWidth,
}: ActionStatusModalProps) {

    const ctx: ActionStatusRenderContext = { variant, close: onClose };
    const styles = VARIANT_STYLES[variant];
    
    return (
        <Modal open={open} onClose={onClose} maxWidth={maxWidth} align="center" zIndex={zIndex} showHeader={false}>
            <div className="px-9 pb-8 pt-10">

                <div
                    className={`mb-4.5 inline-flex items-center gap-2.5 text-[11px] font-semibold uppercase tracking-[1.5px] ${styles.text}`}
                >
                    <span className={`h-2 w-2 rounded-full ${styles.dot}`} />
                    {kicker}
                </div>

                <h2 className="mb-4 text-[44px] font-bold leading-[1.05] tracking-[-1.4px] text-foreground">
                    {heading(ctx)}
                </h2>

                 <p className="mb-6 max-w-145 text-[16px] leading-[1.6] text-foreground">
                    {body(ctx)}
                </p>

                {meta && meta.length > 0 && (
                    <div className="mb-6 flex flex-wrap gap-6 border-y border-border py-4 font-mono text-[12px] text-muted">
                        {meta.map((item) => (
                            <span key={item.label}>
                                {item.label}: {item.value}
                            </span>
                        ))}
                    </div>
                )}

                <div className="flex justify-end">
                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-md bg-foreground px-6.5 py-3.5 text-[14px] font-semibold text-white transition hover:bg-foreground/90"
                    >
                        Schließen
                    </button>
                </div>
            </div>
        </Modal>
    );
};