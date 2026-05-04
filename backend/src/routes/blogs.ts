import express from "express";
import { query } from "../config/db";

const router = express.Router();

router.get("/", async (req, res) => {
  const { slug } = req.query;

  try {
    if (slug) {
      const results: any = await query("SELECT * FROM blogs WHERE slug = ?", [slug as string]);
      if (results.length === 0) {
        return res.status(404).json({ error: "Blog not found" });
      }
      return res.json(results[0]);
    } else {
      const results = await query("SELECT * FROM blogs ORDER BY created_at DESC");
      return res.json(results);
    }
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return res.status(500).json({ error: "Failed to fetch blogs" });
  }
});

router.get("/:slug", async (req, res) => {
  const { slug } = req.params;
  try {
    const results: any = await query("SELECT * FROM blogs WHERE slug = ?", [slug]);
    if (results.length === 0) {
      return res.status(404).json({ error: "Blog not found" });
    }
    return res.json(results[0]);
  } catch (error) {
    console.error("Error fetching blog by slug:", error);
    return res.status(500).json({ error: "Failed to fetch blog" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { title, slug, excerpt, content, author_name, published_date } = req.body;

    if (!title || !slug || !content) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const sql = `
      INSERT INTO blogs (title, slug, excerpt, content, author_name, published_date)
      VALUES (?, ?, ?, ?, ?, COALESCE(?, CURRENT_TIMESTAMP))
      ON DUPLICATE KEY UPDATE
      title = VALUES(title), excerpt = VALUES(excerpt), content = VALUES(content), 
      author_name = VALUES(author_name), published_date = VALUES(published_date)
    `;
    const values = [
      title, 
      slug, 
      excerpt || '', 
      content, 
      author_name || 'Finix CNC Training',
      published_date || null
    ];
    
    await query(sql, values);

    return res.status(201).json({ message: "Blog saved successfully" });
  } catch (error) {
    console.error("Error saving blog:", error);
    return res.status(500).json({ error: "Failed to save blog" });
  }
});

router.delete("/", async (req, res) => {
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ error: "Blog ID is required" });
  }

  try {
    const result: any = await query("DELETE FROM blogs WHERE id = ?", [id as string]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Blog not found" });
    }
    return res.json({ message: "Blog deleted successfully" });
  } catch (error) {
    console.error("Error deleting blog:", error);
    return res.status(500).json({ error: "Failed to delete blog" });
  }
});

export default router;
