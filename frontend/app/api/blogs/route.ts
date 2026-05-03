import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import { revalidatePath } from "next/cache";

// GET handler
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug");

  try {
    if (slug) {
      const results: any = await query("SELECT * FROM blogs WHERE slug = ?", [slug]);
      if (results.length === 0) {
        return NextResponse.json({ error: "Blog not found" }, { status: 404 });
      }
      return NextResponse.json(results[0]);
    } else {
      const results = await query("SELECT * FROM blogs ORDER BY created_at DESC");
      return NextResponse.json(results);
    }
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return NextResponse.json({ error: "Failed to fetch blogs" }, { status: 500 });
  }
}

// POST handler
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, slug, excerpt, content, author_name, published_date } = body;

    if (!title || !slug || !content) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
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
    
    // Clear the cache so the new blog shows up instantly
    revalidatePath("/blog");
    revalidatePath(`/blog/${slug}`);

    return NextResponse.json({ message: "Blog saved successfully" }, { status: 201 });
  } catch (error) {
    console.error("Error saving blog:", error);
    return NextResponse.json({ error: "Failed to save blog" }, { status: 500 });
  }
}

// DELETE handler
export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "Blog ID is required" }, { status: 400 });
  }

  try {
    const result: any = await query("DELETE FROM blogs WHERE id = ?", [id]);
    if (result.affectedRows === 0) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    // Clear the cache so the deleted blog disappears instantly
    revalidatePath("/blog");

    return NextResponse.json({ message: "Blog deleted successfully" });
  } catch (error) {
    console.error("Error deleting blog:", error);
    return NextResponse.json({ error: "Failed to delete blog" }, { status: 500 });
  }
}
