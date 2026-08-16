import NotificationSignupConfirmedEmail from "@/emails/notification-signup-confirmed-email";
import { resend } from "@/lib/resend";
import { SendNotificationSignupConfirmedEmailData } from "@/schemas/notification-signup.schema";


export async function sendNotificationSignupConfirmedEmail(props: SendNotificationSignupConfirmedEmailData): Promise<string> {
    const response = await resend.emails.send({
        from: process.env.EMAIL_FROM_ADDRESS as string,
        to: props.email,
        bcc: process.env.EMAIL_BCC_ADDRESS as string,
        replyTo: process.env.EMAIL_REPLY_TO_ADDRESS as string,
        subject: "Workshop-Benachrichtigung · Anmeldung bestätigt",
        react: <NotificationSignupConfirmedEmail {...props} />
    });
    return response.data?.id || "";
    
};