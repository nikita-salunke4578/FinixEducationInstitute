import { NextResponse } from "next/server";
import { sendEmail } from "@/lib/email";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, course } = body;

    if (!name || !phone || !course) {
      return NextResponse.json({ error: "Name, phone, and course are required" }, { status: 400 });
    }

    const success = await sendEmail(
      `New Quick Enquiry: ${name}`,
      `<h3>New Enquiry Received</h3>
       <p><strong>Name:</strong> ${name}</p>
       <p><strong>Phone:</strong> ${phone}</p>
       <p><strong>Course:</strong> ${course}</p>`
    );

    if (success) {
      return NextResponse.json({ success: true, message: "Enquiry submitted successfully" });
    } else {
      return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
    }
  } catch (error: any) {
    console.error("Error submitting enquiry:", error);
    return NextResponse.json({ error: error?.message || "Internal server error" }, { status: 500 });
  }
}
