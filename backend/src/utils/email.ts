import nodemailer from "nodemailer";

// Create transporter once (reused across all requests — much faster)
let transporter: nodemailer.Transporter | null = null;

function getTransporter() {
  if (transporter) return transporter;

  const { EMAIL_USER, EMAIL_APP_PASSWORD } = process.env;
  if (!EMAIL_USER || !EMAIL_APP_PASSWORD) {
    throw new Error(
      "Email configuration missing. Set EMAIL_USER, EMAIL_APP_PASSWORD, and ADMIN_EMAIL in your environment variables."
    );
  }

  transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_APP_PASSWORD,
    },
  });

  return transporter;
}

/**
 * Send email and wait for it to complete (use when you need confirmation).
 */
export async function sendEmail(subject: string, htmlMessage: string) {
  const { EMAIL_USER, ADMIN_EMAIL } = process.env;

  if (!EMAIL_USER || !ADMIN_EMAIL) {
    throw new Error(
      "Email configuration missing. Set EMAIL_USER, EMAIL_APP_PASSWORD, and ADMIN_EMAIL in your environment variables."
    );
  }

  try {
    const t = getTransporter();
    const info = await t.sendMail({
      from: `"Finix Education Institute" <${EMAIL_USER}>`,
      to: ADMIN_EMAIL,
      subject,
      html: htmlMessage,
    });
    console.log("Email sent: %s", info.messageId);
    return true;
  } catch (error) {
    console.error("Failed to send email:", error);
    return false;
  }
}

/**
 * Fire-and-forget: sends email in background without blocking the response.
 * Use this for contact/enquiry forms so the user gets an instant response.
 */
export function sendEmailAsync(subject: string, htmlMessage: string) {
  sendEmail(subject, htmlMessage).catch((err) => {
    console.error("Background email failed:", err);
  });
}
