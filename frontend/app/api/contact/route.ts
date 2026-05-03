import { NextResponse } from "next/server";
import { sendEmail } from "@/lib/email";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { firstName, lastName, email, phone, course, message } = body;

    if (!firstName || !lastName || !email || !phone || !message) {
      return NextResponse.json({ error: "Required fields are missing" }, { status: 400 });
    }

    const success = await sendEmail(
      `New Contact Message: ${firstName} ${lastName}`,
      `<h3>New Contact Message Received</h3>
       <p><strong>Name:</strong> ${firstName} ${lastName}</p>
       <p><strong>Email:</strong> ${email}</p>
       <p><strong>Phone:</strong> ${phone}</p>
       <p><strong>Course:</strong> ${course || "None specified"}</p>
       <br/>
       <p><strong>Message:</strong><br/>${message}</p>`
    );

    if (success) {
      return NextResponse.json({ success: true, message: "Contact message sent successfully" });
    } else {
      return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
    }
  } catch (error: any) {
    console.error("Error submitting contact message:", error);
    return NextResponse.json({ error: error?.message || "Internal server error" }, { status: 500 });
  }
}
