import NotificationSignupConfirmedEmail from "@/emails/notification-signup-confirmed-email";
import { resend } from "@/lib/resend";
import { SendNotificationSignupConfirmedEmailData } from "@/schemas/notification-signup.schema";

/*
export async function sendNotificationSignupConfirmedEmail(props: {
    workshopTitel: string;
    vorname: string;
    nachname: string;
    email: string;
    unsubscribeLink: string;
}): Promise<string> {
*/

export async function sendNotificationSignupConfirmedEmail(props: SendNotificationSignupConfirmedEmailData): Promise<string> {
    const response = await resend.emails.send({
        from: "workshops@manuel-kuebler.de",
        to: props.email,
        bcc: "mail@softwaredesign-solution.de",
        replyTo: "mail@softwaredesign-solution.de",
        subject: "Workshop-Benachrichtigung · Anmeldung bestätigt",
        react: <NotificationSignupConfirmedEmail {...props} />
    });
    return "";
    
};