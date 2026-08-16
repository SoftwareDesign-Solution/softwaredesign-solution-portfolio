import type { SendNotificationSignupOptInEmailData } from "@/schemas/notification-signup.schema";

import NotificationSignupOptinEmail from "@/emails/notification-signup-optin-email";
import { resend } from "@/lib/resend";


export async function sendNotificationSignupOptInEmail(props: SendNotificationSignupOptInEmailData): Promise<string> {
    const response = await resend.emails.send({
        from: process.env.EMAIL_FROM_ADDRESS as string,
        to: props.email,
        bcc: process.env.EMAIL_BCC_ADDRESS as string,
        replyTo: process.env.EMAIL_REPLY_TO_ADDRESS as string,
        subject: "Workshop-Benachrichtigung · Bitte bestätigen",
        react: <NotificationSignupOptinEmail {...props} />
    });
    return response.data?.id || "";

}