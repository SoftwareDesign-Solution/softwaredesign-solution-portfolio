import { ReactNode } from "react";

export interface ActionStatusModalMetaItem {
  label: string;
  value: string;
}

export type ActionStatusVariant = "success" | "error";

export interface ActionStatusRenderContext {
  variant: ActionStatusVariant;
  close: () => void;
}

export interface ActionStatusContent {
  variant?: ActionStatusVariant;
  kicker: string;
  heading: (ctx: ActionStatusRenderContext) => ReactNode;
  body: (ctx: ActionStatusRenderContext) => ReactNode;
  meta?: ActionStatusModalMetaItem[];
  zIndex?: number;
  maxWidth?: string;
}
