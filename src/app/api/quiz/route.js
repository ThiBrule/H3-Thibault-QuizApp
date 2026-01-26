import { NextResponse } from "next/server";
import { db } from "@/lib/db";

/**
 * GET /api/quiz
 */
export async function GET() {
  try {
    const [rows] = await db.query(
      `
      SELECT *
      FROM quiz
      `
    );

    return NextResponse.json(rows ?? []);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Server/MySQL error" }, { status: 500 });
  }
}

/**
 * POST /api/quiz
 * body: { title, description }
 */
export async function POST(request) {
  try {
    const body = await request.json();
    const { title, description } = body;

    if (!title || !description) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    const [result] = await db.query(
      `
      INSERT INTO quiz (title, description)
      VALUES (?, ?)
      `,
      [title, description]
    );

    return NextResponse.json({ id: result.insertId }, { status: 201 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Server/MySQL error" }, { status: 500 });
  }
}

/**
 * PUT /api/quiz
 * body: { quizId, title, description }
 */
export async function PUT(request) {
  try {
    const body = await request.json();
    const { quizId, title, description } = body;

    if (!quizId || !title || !description) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    const [result] = await db.query(
      `
      UPDATE quiz
      SET title = ?, description = ?
      WHERE id = ?
      `,
      [title, description, Number(quizId)]
    );

    if (result.affectedRows === 0) {
      return NextResponse.json({ error: "Quiz not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Server/MySQL error" }, { status: 500 });
  }
}

/**
 * DELETE /api/quiz
 * body: { quizId }
 */
export async function DELETE(request) {
  try {
    const body = await request.json();
    const { quizId } = body;

    if (!quizId) {
      return NextResponse.json({ error: "Invalid quizId" }, { status: 400 });
    }

    const [result] = await db.query(
      `
      DELETE FROM quiz
      WHERE id = ?
      `,
      [Number(quizId)]
    );

    if (result.affectedRows === 0) {
      return NextResponse.json({ error: "Quiz not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Server/MySQL error" }, { status: 500 });
  }
}
