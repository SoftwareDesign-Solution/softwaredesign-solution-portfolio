import Link from "next/link";
import { ReactNode } from "react";

type ActionButtonVariant = "solid" | "outline" | "dashed";

interface ActionButtonProps {
  variant: ActionButtonVariant;
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  disabled?: boolean;
}

const variantStyles: Record<ActionButtonVariant, string> = {
  solid: "border-[2px] border-solid border-primary-700 bg-primary-700 text-white hover:bg-primary-800 hover:border-primary-800",
  outline: "border-[2px] border-solid border-primary-700 text-primary-700 hover:bg-primary-50",
  dashed: "border border-dashed border-border-strong text-muted hover:border-primary-700 hover:text-primary-700",
};

export default function ActionButton({ variant, children, href, onClick, disabled }: ActionButtonProps) {
  const className = `w-full mt-2.5 py-3 px-6 rounded-md text-sm font-medium text-center flex items-center justify-center transition ${
    disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
  } ${variantStyles[variant]}`;

  if (href) {
    return (
      <Link href={href} className={className}>
        {children}
      </Link>
    );
  }

  return (
    <button className={className} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}