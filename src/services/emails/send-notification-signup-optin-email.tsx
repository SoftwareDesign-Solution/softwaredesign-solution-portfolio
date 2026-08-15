import { resend } from "@/lib/resend";
import NotificationSignupOptinEmail from "@/emails/notification-signup-optin-email";
import type { SendNotificationSignupOptInEmailData } from "@/schemas/notification-signup.schema";

/*
export async function sendNotificationSignupEmail(props: {
    workshopTitel: string;
    vorname: string;
    nachname: string;
    email: string;
    confirmationLink: string;
    expiresInDay: number;
}): Promise<string> {
*/

export async function sendNotificationSignupOptInEmail(props: SendNotificationSignupOptInEmailData): Promise<string> {
    const response = await resend.emails.send({
        from: "workshops@manuel-kuebler.de",
        to: props.email,
        bcc: "mail@softwaredesign-solution.de",
        replyTo: "mail@softwaredesign-solution.de",
        subject: "Workshop-Benachrichtigung · Bitte bestätigen",
        react: <NotificationSignupOptinEmail {...props} />
    });
    return response.data?.id || "";

}