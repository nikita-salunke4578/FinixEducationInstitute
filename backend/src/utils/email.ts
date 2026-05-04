import { Resend } from 'resend';

// Create Resend instance once
let resendInstance: Resend | null = null;

function getResend() {
  if (resendInstance) return resendInstance;

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error("RESEND_API_KEY is missing in your environment variables.");
  }

  resendInstance = new Resend(apiKey);
  return resendInstance;
}

/**
 * Send email using Resend API (Production Ready)
 * Extremely fast and reliable.
 */
export async function sendEmail(subject: string, htmlMessage: string) {
  const adminEmail = process.env.ADMIN_EMAIL;

  if (!adminEmail) {
    throw new Error("ADMIN_EMAIL is missing in your environment variables.");
  }

  try {
    const resend = getResend();

    // Resend's free tier allows sending from 'onboarding@resend.dev'
    // To send from your own domain, you'd verify it in Resend dashboard.
    const { data, error } = await resend.emails.send({
      from: 'Finix Institute <onboarding@resend.dev>',
      to: adminEmail,
      subject: subject,
      html: htmlMessage,
    });

    if (error) {
      console.error("Resend Error:", error);
      throw new Error(`Resend Error: ${error.message}`);
    }

    console.log("Email sent successfully via Resend:", data?.id);
    return true;
  } catch (error: any) {
    console.error("Failed to send email via Resend:", error);
    throw new Error(error.message || "Failed to send email");
  }
}

/**
 * Fire-and-forget: sends email in background without blocking the response.
 */
export function sendEmailAsync(subject: string, htmlMessage: string) {
  sendEmail(subject, htmlMessage).catch((err) => {
    console.error("Background email failed:", err);
  });
}
