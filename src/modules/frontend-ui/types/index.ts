/**
 * types/index.ts — Shared type definitions for the frontend-ui module.
 *
 * Owned by: Member 1 (feature/frontend-ui)
 * Module:   src/modules/frontend-ui/
 *
 * Defines props and primitive types used by reusable UI components.
 * Keep this file free of Firebase, business-logic, or server-only types.
 */

// ─── Navigation ───────────────────────────────────────────────────────────────

/** A single item in the bottom navigation bar */
export interface NavItem {
  label: string;
  href: string;
  /** Lucide icon component */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: React.ComponentType<any>;
}

// ─── SplashScreen ─────────────────────────────────────────────────────────────

export interface SplashScreenProps {
  /** Called when the 4-second splash animation completes */
  onComplete: () => void;
}

// ─── FloatingOrbs ────────────────────────────────────────────────────────────

/** Optional props accepted by FloatingOrbs (currently stateless) */
export type FloatingOrbsProps = Record<string, never>;

// ─── UI primitive variant helpers ────────────────────────────────────────────

/** Generic size token used by button and badge variants */
export type SizeVariant = "sm" | "md" | "lg";

/** Generic visual variant token */
export type StyleVariant = "default" | "ghost" | "outline" | "destructive";
