import { type NotificationSignupFormData } from "@/schemas/notification-signup.schema";

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