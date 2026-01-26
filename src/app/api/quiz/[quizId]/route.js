import { NextResponse } from "next/server";
import { db } from "@/lib/db";

/**
 * GET /api/quiz/[quizId]
 */
export async function GET(_request, { params }) {
  try {
    const { quizId } = await params;

    if (!quizId) {
      return NextResponse.json({ error: "Invalid quizId" }, { status: 400 });
    }

    const [rows] = await db.query(
      `
      SELECT *
      FROM quiz
      WHERE id = ?
      `,
      [Number(quizId)]
    );

    const quiz = rows[0] ?? null;

    if (!quiz) {
      return NextResponse.json({ error: "Quiz not found" }, { status: 404 });
    }

    return NextResponse.json(quiz);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Server/MySQL error" }, { status: 500 });
  }
}

/**
 * POST /api/quiz/[quizId]
 * (pas utile en REST, mais demandé) -> renvoie 405
 */
export async function POST() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}

/**
 * PUT /api/quiz/[quizId]
 * body: { title, description }
 */
export async function PUT(request, { params }) {
  try {
    const { quizId } = params;

    if (!quizId) {
      return NextResponse.json({ error: "Invalid quizId" }, { status: 400 });
    }

    const body = await request.json();
    const { title, description } = body;

    if (!title || !description) {
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
 * DELETE /api/quiz/[quizId]
 */
export async function DELETE(_request, { params }) {
  try {
    const { quizId } = params;

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
