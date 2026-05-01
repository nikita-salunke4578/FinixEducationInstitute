import nodemailer from "nodemailer";

export async function sendEmail(subject: string, htmlMessage: string) {
  const { EMAIL_USER, EMAIL_APP_PASSWORD, ADMIN_EMAIL } = process.env;

  if (!EMAIL_USER || !EMAIL_APP_PASSWORD || !ADMIN_EMAIL) {
    throw new Error(
      "Email configuration missing. Set EMAIL_USER, EMAIL_APP_PASSWORD, and ADMIN_EMAIL in your environment variables."
    );
  }

  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_APP_PASSWORD,
      },
    });

    await transporter.verify();

    const mailOptions = {
      from: `"CNC Training Institute" <${EMAIL_USER}>`,
      to: ADMIN_EMAIL,
      subject: subject,
      html: htmlMessage,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: %s", info.messageId);
    return true;
  } catch (error) {
    console.error("Failed to send email. Check your EMAIL_APP_PASSWORD in .env.local.");
    console.error("Detailed error: ", error);
    return false;
  }
}

