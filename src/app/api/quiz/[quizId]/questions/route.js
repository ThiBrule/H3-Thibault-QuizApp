import { NextResponse } from "next/server";
import { db } from "@/lib/db";

/**
 * GET /api/quiz/[quizId]/questions
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
      FROM question
      WHERE quiz_id = ?
      `,
      [Number(quizId)]
    );

    const questions = rows ?? [];

    if (!questions.length) {
      return NextResponse.json({ error: "Quiz not found" }, { status: 404 });
    }

    return NextResponse.json(questions);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Server/MySQL error" }, { status: 500 });
  }
}

/**
 * POST /api/quiz/[quizId]/questions
 * body: { label }
 */
export async function POST(request, { params }) {
  try {
    const { quizId } = await params;

    if (!quizId) {
      return NextResponse.json({ error: "Invalid quizId" }, { status: 400 });
    }

    const body = await request.json();
    const { label } = body;

    if (!label) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    const [result] = await db.query(
      `
      INSERT INTO question (quiz_id, label)
      VALUES (?, ?)
      `,
      [Number(quizId), label]
    );

    return NextResponse.json({ id: result.insertId }, { status: 201 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Server/MySQL error" }, { status: 500 });
  }
}

/**
 * PUT /api/quiz/[quizId]/questions
 * body: { questionId, label }
 */
export async function PUT(request, { params }) {
  try {
    const { quizId } = await params;

    if (!quizId) {
      return NextResponse.json({ error: "Invalid quizId" }, { status: 400 });
    }

    const body = await request.json();
    const { questionId, label } = body;

    if (!questionId || !label) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    const [result] = await db.query(
      `
      UPDATE question
      SET label = ?
      WHERE id = ? AND quiz_id = ?
      `,
      [label, Number(questionId), Number(quizId)]
    );

    if (result.affectedRows === 0) {
      return NextResponse.json({ error: "Question not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Server/MySQL error" }, { status: 500 });
  }
}

/**
 * DELETE /api/quiz/[quizId]/questions
 * body: { questionId }
 */
export async function DELETE(request, { params }) {
  try {
    const { quizId } = await params;

    if (!quizId) {
      return NextResponse.json({ error: "Invalid quizId" }, { status: 400 });
    }

    const body = await request.json();
    const { questionId } = body;

    if (!questionId) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    const [result] = await db.query(
      `
      DELETE FROM question
      WHERE id = ? AND quiz_id = ?
      `,
      [Number(questionId), Number(quizId)]
    );

    if (result.affectedRows === 0) {
      return NextResponse.json({ error: "Question not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Server/MySQL error" }, { status: 500 });
  }
}
