import express from "express";
import jwt from "jsonwebtoken";

const router = express.Router();

const JWT_SECRET = process.env.AUTH_SECRET || "default-secret-change-me-in-production";

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  const adminEmail = process.env.ADMIN_EMAIL || "admin@finix.com";
  const adminPassword = process.env.ADMIN_PASSWORD || "password";

  if (email !== adminEmail || password !== adminPassword) {
    return res.status(401).json({ error: "Invalid login credentials" });
  }

  const admin = {
    id: 1,
    name: "Admin",
    email: adminEmail,
  };

  const token = jwt.sign(admin, JWT_SECRET, { expiresIn: "7d" });

  res.cookie("auth_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7 * 1000, // 7 days in ms
    path: "/",
  });

  res.json({ success: true, user: admin });
});

router.post("/logout", (req, res) => {
  res.clearCookie("auth_token", { path: "/" });
  res.json({ success: true });
});

export default router;
