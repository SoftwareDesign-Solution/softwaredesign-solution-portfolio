import { pixelBasedPreset, type TailwindConfig } from "react-email";

/**
 * Tailwind-Theme für alle E-Mail-Templates – 1:1 aus src/app/globals.css
 * (`@theme`) übernommen, dieselben Token-Namen wie im Rest der App
 * (`bg-primary-700`, `text-muted`, `border-border`, …). Wird über
 * `<Tailwind config={emailTailwindConfig}>` in EmailShell.tsx eingebunden
 * (siehe https://react.email/docs/components/tailwind).
 *
 * `pixelBasedPreset` rechnet rem-Werte (Spacing, Font-Size) in px um, da
 * einige E-Mail-Clients rem nicht zuverlässig unterstützen. Tailwinds
 * Default-Radius-Skala (`rounded-md`=6px, `rounded-lg`=8px, `rounded-xl`=12px)
 * passt bereits exakt zum bisherigen Kartendesign, daher hier nicht
 * überschrieben.
 */
export const config: TailwindConfig = {
  presets: [pixelBasedPreset],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#eff4f9",
          100: "#dce8f2",
          200: "#b9d1e4",
          300: "#96bad7",
          400: "#6ea0c7",
          500: "#4484b7",
          600: "#2871ac",
          700: "#1565a5",
          800: "#11528a",
          900: "#0d406e",
          950: "#093055",
        },
        surface: "#f2f2f2",
        foreground: "#2b2b2b",
        muted: "#7a7a7a",
        border: {
          DEFAULT: "#e5e5e5",
          strong: "#d0d0d0",
        },
        success: {
          50: "#e9f6ee",
          500: "#2f9e5b",
          600: "#24824a",
          700: "#1b653a",
        },
        error: {
          50: "#fdecec",
          500: "#e0473f",
          600: "#c8362e",
          700: "#a92920",
        },
        warning: {
          50: "#faf1e0",
          500: "#c68a2e",
          600: "#9c6c1f",
          700: "#7d5619",
        },
      },
      fontFamily: {
        // Kein Custom-Webfont in globals.css → System-Font-Stack für maximale
        // Zustellbarkeits-/Rendering-Sicherheit in E-Mail-Clients.
        sans: ["-apple-system", "BlinkMacSystemFont", "'Segoe UI'", "Roboto", "Helvetica", "Arial", "sans-serif"],
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "Consolas", "monospace"],
      },
    },
  },
};
