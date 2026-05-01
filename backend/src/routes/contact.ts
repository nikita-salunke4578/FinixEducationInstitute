import express from "express";
import { sendEmail } from "../utils/email";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { firstName, lastName, email, phone, course, message } = req.body;

    if (!firstName || !lastName || !email || !phone || !message) {
      return res.status(400).json({ error: "Required fields are missing" });
    }

    // Send email notification to admin
    await sendEmail(
      `New Contact Message: ${firstName} ${lastName}`,
      `<h3>New Contact Message Received</h3>
       <p><strong>Name:</strong> ${firstName} ${lastName}</p>
       <p><strong>Email:</strong> ${email}</p>
       <p><strong>Phone:</strong> ${phone}</p>
       <p><strong>Course:</strong> ${course || "None specified"}</p>
       <br/>
       <p><strong>Message:</strong><br/>${message}</p>`
    );

    return res.json({ success: true, message: "Contact message sent successfully" });
  } catch (error: any) {
    console.error("Error submitting contact message:", error);
    return res.status(500).json({ error: error?.message || "Internal server error" });
  }
});

export default router;
