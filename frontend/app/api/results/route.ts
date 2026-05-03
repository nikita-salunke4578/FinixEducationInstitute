import { NextResponse } from "next/server";
import { query } from "@/lib/db";

// GET handler
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const enrollment_number = searchParams.get("enrollment_number");
  const name = searchParams.get("name");
  const admin = searchParams.get("admin");

  // Admin: return all results
  if (admin === "true" && !enrollment_number) {
    try {
      const results = await query(
        "SELECT * FROM results ORDER BY created_at DESC"
      );
      return NextResponse.json(results);
    } catch (error) {
      console.error("Error fetching results:", error);
      return NextResponse.json({ error: "Failed to fetch results" }, { status: 500 });
    }
  }

  // Public: require both enrollment_number AND name
  if (!enrollment_number || !name) {
    return NextResponse.json(
      { error: "Both enrollment number and name are required" },
      { status: 400 }
    );
  }

  try {
    // We search primarily by enrollment_number to get ALL semesters.
    // We also check the name to ensure it's the right student.
    const results: any = await query(
      `SELECT * FROM results
       WHERE enrollment_number = ? 
       AND LOWER(name) LIKE LOWER(?)
       ORDER BY year ASC, semester ASC`,
      [enrollment_number, `%${name.trim()}%`]
    );

    if (!results || results.length === 0) {
      return NextResponse.json({ error: "No results found for this enrollment number and name" }, { status: 404 });
    }

    return NextResponse.json(results);
  } catch (error) {
    console.error("Error fetching result:", error);
    return NextResponse.json({ error: "Failed to fetch result" }, { status: 500 });
  }
}

// POST handler
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      enrollment_number,
      name,
      course,
      year,
      semester,
      total_max_marks,
      total_obtained,
      result,
      class_grade,
    } = body;

    if (!enrollment_number || !name || !course || !year || !semester || !result) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

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
    return NextResponse.json({ message: "Result saved successfully" }, { status: 201 });
  } catch (error) {
    console.error("Error saving result:", error);
    return NextResponse.json({ error: "Failed to save result" }, { status: 500 });
  }
}

// DELETE handler
export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "Result ID is required" }, { status: 400 });
  }

  try {
    const result: any = await query("DELETE FROM results WHERE id = ?", [id]);
    if (result.affectedRows === 0) {
      return NextResponse.json({ error: "Result not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Result deleted successfully" });
  } catch (error) {
    console.error("Error deleting result:", error);
    return NextResponse.json({ error: "Failed to delete result" }, { status: 500 });
  }
}
