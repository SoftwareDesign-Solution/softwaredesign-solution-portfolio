/**
 * @file button.tsx
 * @description Zentraler, wiederverwendbarer Button für das gesamte Projekt.
 * @module components/ui/button
 * @author Manuel Kübler <mail@softwaredesign-solution.de>
 */

import type { ButtonHTMLAttributes, ReactNode } from "react";

import Link from "next/link";

/** Visuelle Variante des Buttons. */
type ButtonVariant = "primary" | "secondary" | "dark" | "muted" | "outline" | "dashed";

/** Größe/Padding des Buttons. */
type ButtonSize = "xs" |"sm" | "lg" | "icon";

/** Props für {@link Button}. */
interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "disabled" | "type"> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  type?: "button" | "submit";
  /** Steuert nur das Label ("Wird gesendet …") — Standard-Anwendungsfall: type="submit" */
  isSubmitting?: boolean;
  loadingLabel?: string;
  /** Voller Deaktivierungs-Zustand. Fällt auf isSubmitting zurück, wenn nicht gesetzt (z.B. für Consent-Checks von außen). */
  disabled?: boolean;
  /** Rendert als next/link statt <button> — wird bei disabled=true ignoriert (Links unterstützen "disabled" nicht nativ). */
  href?: string;
  fullWidth?: boolean;
  children: ReactNode;
}

// Tailwind-Klassen je Variante, getrennt nach normalem und deaktiviertem Zustand
const VARIANT_STYLES: Record<ButtonVariant, { base: string; disabled: string }> = {
  primary: {
    base: "bg-primary-700 text-white hover:bg-primary-700/90",
    disabled: "bg-primary-700/50 text-white",
  },
  secondary: {
    base: "border border-border bg-white text-foreground hover:bg-surface",
    disabled: "border border-border bg-white text-muted",
  },
  dark: {
    base: "bg-foreground text-white hover:bg-foreground/90",
    disabled: "bg-foreground/50 text-white",
  },
  muted: {
    base: "border border-border-strong bg-surface text-foreground hover:bg-border",
    disabled: "border border-border-strong bg-surface text-muted",
  },
  outline: {
    base: "border-[2px] border-primary-700 text-primary-700 hover:bg-primary-50",
    disabled: "border-[2px] border-primary-700/50 text-primary-700/50",
  },
  dashed: {
    base: "border border-dashed border-border-strong text-muted hover:border-primary-700 hover:text-primary-700",
    disabled: "border border-dashed border-border-strong text-muted",
  },
};

// Tailwind-Klassen je Größe
const SIZE_STYLES: Record<ButtonSize, string> = {
    xs: "px-4.5 py-3 text-[14px] font-medium",
    sm: "px-6 py-3 text-[14.5px] font-semibold",
    lg: "px-7.5 py-3.5 text-[15px] font-semibold tracking-wide",
    icon: "flex h-9 w-9 items-center justify-center text-lg font-semibold",
};

/**
 * Zentraler, wiederverwendbarer Button für das gesamte Projekt (Formulare, Sidebar, Modals).
 * Unterstützt verschiedene Varianten/Größen, einen submit-gebundenen Ladezustand
 * (`isSubmitting`) sowie optionales Rendern als Link (`href`).
 *
 * @param props - Siehe {@link ButtonProps}
 * @returns Den Button (oder Link, falls `href` gesetzt und nicht deaktiviert)
 */
export default function Button({
  variant = "primary",
  size = "lg",
  type = "button",
  isSubmitting = false,
  loadingLabel = "Wird gesendet …",
  disabled,
  href,
  fullWidth = false,
  children,
  className = "",
  ...rest
}: ButtonProps) {
  const isDisabled = disabled ?? isSubmitting;
  const colors = VARIANT_STYLES[variant];

  const classes = `rounded-md text-center transition ${fullWidth ? "flex w-full items-center justify-center" : ""} ${
    SIZE_STYLES[size]
  } ${isDisabled ? `cursor-not-allowed ${colors.disabled}` : `cursor-pointer ${colors.base}`} ${className}`;

  const content = isSubmitting ? loadingLabel : children;

  // Disabled gewinnt immer über href — next/link unterstützt "disabled" nicht nativ,
  // ein deaktivierter Link wäre sonst trotzdem klickbar.
  if (href && !isDisabled) {
    return (
      <Link href={href} className={classes}>
        {content}
      </Link>
    );
  }

  return (
    <button type={type} disabled={isDisabled} className={classes} {...rest}>
      {content}
    </button>
  );
}