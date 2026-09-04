/**
 * @file action-button.tsx
 * @description Wiederverwendbarer Aktions-Button für die Workshop-Sidebar
 * (Buchen, Angebot anfordern, Benachrichtigung), wahlweise als Link oder Button.
 * @module app/workshops/[slug]/_components/action-button
 * @author Manuel Kübler <mail@softwaredesign-solution.de>
 */

import Link from "next/link";
import { type ReactNode } from "react";

/** Visueller Stil eines {@link ActionButton}: gefüllt (primäre Aktion), umrandet oder gestrichelt (sekundär/dezent). */
type ActionButtonVariant = "solid" | "outline" | "dashed";

// Tailwind-Klassen je Variante
const variantStyles: Record<ActionButtonVariant, string> = {
  solid: "border-[2px] border-solid border-primary-700 bg-primary-700 text-white hover:bg-primary-800 hover:border-primary-800",
  outline: "border-[2px] border-solid border-primary-700 text-primary-700 hover:bg-primary-50",
  dashed: "border border-dashed border-border-strong text-muted hover:border-primary-700 hover:text-primary-700",
};

/** Props für {@link ActionButton}. */
interface ActionButtonProps {
  variant: ActionButtonVariant;
  children: ReactNode;
  /** Wenn gesetzt, wird ein Next.js `Link` gerendert statt eines `<button>`. */
  href?: string;
  onClick?: () => void;
  disabled?: boolean;
}

/**
 * Wiederverwendbarer Aktions-Button für die Workshop-Sidebar (Buchen, Angebot anfordern, etc.).
 * Rendert als Link, wenn `href` gesetzt ist, sonst als klickbarer Button.
 *
 * @param props - Siehe {@link ActionButtonProps}
 * @returns Den Aktions-Button
 */
export default function ActionButton({ 
  children,
  disabled = false,
  href,
  onClick,
  variant
}: ActionButtonProps) {
  const className = `w-full mt-2.5 py-3 px-6 rounded-md text-sm font-medium text-center flex items-center justify-center transition ${
    disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
  } ${variantStyles[variant]}`;

  if (href) {
    return (
      <Link 
        aria-disabled={disabled}
        className={className}
        href={href}
      >
        {children}
      </Link>
    );
  }

  return (
    <button 
      aria-disabled={disabled}
      className={className}
      disabled={disabled}
      onClick={onClick}
      type="button"
    >
      {children}
    </button>
  );
}