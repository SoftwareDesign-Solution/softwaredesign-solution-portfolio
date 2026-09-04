/**
 * @file notification-signup-form-default-values.ts
 * @description Initialwerte für das react-hook-form-Benachrichtigungs-Anmeldeformular.
 * @module components/forms/notification-signup/notification-signup-form-default-values
 * @author Manuel Kübler <mail@softwaredesign-solution.de>
 */

import { type NotificationSignupFormData } from "@/schemas/notification-signup.schema";

/**
 * Liefert die leeren Initialwerte für das Benachrichtigungs-Anmeldeformular (react-hook-form `defaultValues`).
 *
 * @returns Die Default-Werte für {@link NotificationSignupFormData}
 */
export function getNotificationSignupFormDefaultValues():
    NotificationSignupFormData {
    return {
        email: "",
        nachname: "",
        turnstile: {
            token: "",
        },
        vorname: "",
    };
}