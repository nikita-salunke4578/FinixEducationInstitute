import express from "express";
import { sendEmail } from "../utils/email";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { name, phone, course } = req.body;

    if (!name || !phone || !course) {
      return res.status(400).json({ error: "Name, phone, and course are required" });
    }

    // Send email notification to admin
    await sendEmail(
      `New Quick Enquiry: ${name}`,
      `<h3>New Enquiry Received</h3>
       <p><strong>Name:</strong> ${name}</p>
       <p><strong>Phone:</strong> ${phone}</p>
       <p><strong>Course:</strong> ${course}</p>`
    );

    return res.json({ success: true, message: "Enquiry submitted successfully" });
  } catch (error: any) {
    console.error("Error submitting enquiry:", error);
    return res.status(500).json({ error: error?.message || "Internal server error" });
  }
});

export default router;
