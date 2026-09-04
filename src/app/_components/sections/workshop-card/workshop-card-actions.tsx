"use client";

import { useModal } from "@/providers/modal-provider";
import { type Workshop } from "@/types/workshop";

interface WorkshopCardActionsProps {
    workshop: Workshop;
}

export default function WorkshopCardActions({
    workshop,
}: WorkshopCardActionsProps) {
    const {
        openNotificationSignupModal,
        openQuoteRequestModal,
    } = useModal();

    return (
        <div className="mb-1 flex flex-col items-start">
            <button
                className="relative z-2 flex cursor-pointer items-center gap-2 px-0.5 py-2.5 text-sm text-muted"
                onClick={() =>
                    openNotificationSignupModal(workshop)
                }
                type="button"
            >
                <NotificationIcon />

                <span className="border-b border-dashed pb-px">
                    Bei neuen Terminen benachrichtigen
                </span>
            </button>

            <button
                className="relative z-2 flex cursor-pointer items-center gap-2 px-0.5 pb-2.5 text-sm text-muted"
                onClick={() =>
                    openQuoteRequestModal(workshop)
                }
                type="button"
            >
                <QuoteIcon />

                <span className="border-b border-dashed pb-px">
                    Angebot anfordern
                </span>
            </button>
        </div>
    );
}

function NotificationIcon() {
    return (
        <svg
            aria-hidden="true"
            fill="none"
            height="13"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            width="13"
        >
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
        </svg>
    );
}

function QuoteIcon() {
    return (
        <svg
            aria-hidden="true"
            fill="none"
            height="13"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            width="13"
        >
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <path d="M14 2v6h6" />
            <path d="M8 13h8M8 17h5" />
        </svg>
    );
}