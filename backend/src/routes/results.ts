import express from "express";
import { query } from "../config/db";

const router = express.Router();

router.get("/", async (req, res) => {
  const { certNumber, name } = req.query;

  // Let admin fetch all results without certNumber
  if (!certNumber && req.query.admin === 'true') {
    try {
      const results = await query("SELECT * FROM results ORDER BY created_at DESC");
      return res.json(results);
    } catch (error) {
      console.error("Error fetching results:", error);
      return res.status(500).json({ error: "Failed to fetch results" });
    }
  }

  if (!certNumber) {
    return res.status(400).json({ error: "Certification number is required" });
  }

  try {
    let sql = "SELECT * FROM results WHERE cert_number = ?";
    let values: any[] = [certNumber as string];

    if (name) {
      sql += " AND name LIKE ?";
      values.push(`%${name}%`);
    }

    const results: any = await query(sql, values);

    if (results.length === 0) {
      return res.status(404).json({ error: "Result not found" });
    }

    return res.json(results[0]);
  } catch (error) {
    console.error("Error fetching result:", error);
    return res.status(500).json({ error: "Failed to fetch result" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { cert_number, name, course, fy_marks, sy_marks, ty_marks, result } = req.body;

    if (!cert_number || !name || !course || !result) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const sql = `
      INSERT INTO results (cert_number, name, course, fy_marks, sy_marks, ty_marks, result)
      VALUES (?, ?, ?, ?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE
      name = VALUES(name), course = VALUES(course), fy_marks = VALUES(fy_marks), 
      sy_marks = VALUES(sy_marks), ty_marks = VALUES(ty_marks), result = VALUES(result)
    `;
    const values = [cert_number, name, course, fy_marks || '-', sy_marks || '-', ty_marks || '-', result];
    
    await query(sql, values);

    return res.status(201).json({ message: "Result saved successfully" });
  } catch (error) {
    console.error("Error saving result:", error);
    return res.status(500).json({ error: "Failed to save result" });
  }
});

router.delete("/", async (req, res) => {
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ error: "Result ID is required" });
  }

  try {
    const result: any = await query("DELETE FROM results WHERE id = ?", [id as string]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Result not found" });
    }
    return res.json({ message: "Result deleted successfully" });
  } catch (error) {
    console.error("Error deleting result:", error);
    return res.status(500).json({ error: "Failed to delete result" });
  }
});

export default router;
