/**
 * authErrors.ts — Maps Firebase Auth error codes to human-readable messages.
 *
 * Owned by: Member 2 (feature/auth-chat)
 * Module:   src/modules/auth-chat/utils/
 *
 * Add new mappings here whenever a new Auth error code surfaces in
 * login/signup flows. Do not scatter error-handling switch statements
 * across individual page files.
 *
 * Usage:
 *   import { authErrorMessage } from "@/modules/auth-chat/utils/authErrors";
 *   setError(authErrorMessage((err as { code?: string }).code));
 */

/** Maps a Firebase Auth error code to a display-safe message. */
export function authErrorMessage(code: string | undefined): string {
  switch (code) {
    // ── Sign-in ──────────────────────────────────────────────────────────────
    case "auth/user-not-found":
    case "auth/wrong-password":
    case "auth/invalid-credential":
      return "Invalid email or password.";
    case "auth/too-many-requests":
      return "Too many attempts. Please wait a few minutes and try again.";
    case "auth/user-disabled":
      return "This account has been disabled. Contact support.";
    case "auth/network-request-failed":
      return "Network error. Check your connection and try again.";
    // ── Sign-up ──────────────────────────────────────────────────────────────
    case "auth/email-already-in-use":
      return "An account with this email already exists. Try signing in.";
    case "auth/invalid-email":
      return "Please enter a valid college email address.";
    case "auth/weak-password":
      return "Password must be at least 6 characters.";
    case "auth/operation-not-allowed":
      return "Email/password sign-in is not enabled. Contact the administrator.";
    // ── Email verification ────────────────────────────────────────────────────
    case "auth/expired-action-code":
      return "This link has expired. Please request a new verification email.";
    case "auth/invalid-action-code":
      return "This link is invalid or has already been used.";
    // ── Fallback ─────────────────────────────────────────────────────────────
    default:
      return "Something went wrong. Please try again.";
  }
}

/** Returns true for wrong-credential errors — useful for field-level highlighting. */
export function isCredentialError(code: string | undefined): boolean {
  return (
    code === "auth/user-not-found" ||
    code === "auth/wrong-password" ||
    code === "auth/invalid-credential"
  );
}
