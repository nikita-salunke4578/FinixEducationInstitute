import express from "express";
import { query } from "../config/db";

const router = express.Router();

// ─── GET ──────────────────────────────────────────────────────────────────────
router.get("/", async (req, res) => {
  const { enrollment_number, name, admin } = req.query;

  // Admin: return all results
  if (admin === "true" && !enrollment_number) {
    try {
      const results = await query(
        "SELECT * FROM results ORDER BY created_at DESC"
      );
      return res.json(results);
    } catch (error) {
      console.error("Error fetching results:", error);
      return res.status(500).json({ error: "Failed to fetch results" });
    }
  }

  // Public: require enrollment_number
  if (!enrollment_number) {
    return res
      .status(400)
      .json({ error: "Enrollment number is required" });
  }

  try {
    // 1. Fetch by enrollment number first (trimmed)
    const cleanEnrollment = (enrollment_number as string).trim();
    const rows: any = await query(
      "SELECT * FROM results WHERE enrollment_number = ? ORDER BY year ASC, semester ASC",
      [cleanEnrollment]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: "Result not found" });
    }

    // 2. Return results (Enrollment number is unique enough for verification)
    return res.json(rows);
  } catch (error) {
    console.error("Error fetching result:", error);
    return res.status(500).json({ error: "Failed to fetch result" });
  }
});

// ─── POST (create / update) ───────────────────────────────────────────────────
router.post("/", async (req, res) => {
  console.log("POST /api/results body:", req.body);
  try {
    const {
      id,
      enrollment_number,
      name,
      course,
      year,
      semester,
      total_max_marks,
      total_obtained,
      result,
      class_grade,
    } = req.body;

    if (!enrollment_number || !name || !course || !year || !semester || !result) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    if (id) {
      // UPDATE existing record
      const sql = `
        UPDATE results SET
          enrollment_number = ?,
          name = ?,
          course = ?,
          year = ?,
          semester = ?,
          total_max_marks = ?,
          total_obtained = ?,
          result = ?,
          class_grade = ?
        WHERE id = ?
      `;
      const values = [
        enrollment_number,
        name,
        course,
        year,
        semester,
        parseInt(total_max_marks) || 0,
        parseInt(total_obtained) || 0,
        result,
        class_grade || "",
        id,
      ];
      await query(sql, values);
      return res.json({ message: "Result updated successfully" });
    } else {
      // INSERT new record (with upsert safeguard)
      const sql = `
        INSERT INTO results
          (enrollment_number, name, course, year, semester, total_max_marks, total_obtained, result, class_grade)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE
          name            = VALUES(name),
          total_max_marks = VALUES(total_max_marks),
          total_obtained  = VALUES(total_obtained),
          result          = VALUES(result),
          class_grade     = VALUES(class_grade)
      `;
      const values = [
        enrollment_number,
        name,
        course,
        year,
        semester,
        parseInt(total_max_marks) || 0,
        parseInt(total_obtained) || 0,
        result,
        class_grade || "",
      ];
      await query(sql, values);
      return res.status(201).json({ message: "Result saved successfully" });
    }
  } catch (error) {
    console.error("Error saving result:", error);
    return res.status(500).json({ error: "Failed to save result" });
  }
});

// ─── DELETE ───────────────────────────────────────────────────────────────────
router.delete("/", async (req, res) => {
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ error: "Result ID is required" });
  }

  try {
    const result: any = await query("DELETE FROM results WHERE id = ?", [
      id as string,
    ]);
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
