import { NextResponse } from "next/server";
import { db } from "@/lib/db";

/**
 * GET /api/question/[questionId]/choices
 */
export async function GET(_request, { params }) {
  try {
    const { questionId } = await params;

    if (!questionId) {
      return NextResponse.json({ error: "Invalid questionId" }, { status: 400 });
    }

    const [rows] = await db.query(
      `
      SELECT *
      FROM choice
      WHERE question_id = ?
      `,
      [Number(questionId)]
    );

    const choices = rows ?? [];

    if (!choices.length) {
      return NextResponse.json({ error: "choice not found" }, { status: 404 });
    }

    return NextResponse.json(choices);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

/**
 * POST /api/question/[questionId]/choices
 * body: { label }
 */
export async function POST(request, { params }) {
  try {
    const { questionId } = params;

    if (!questionId) {
      return NextResponse.json({ error: "Invalid questionId" }, { status: 400 });
    }

    const body = await request.json();
    const { label } = body;

    if (!label) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    const [result] = await db.query(
      `
      INSERT INTO choice (question_id, label)
      VALUES (?, ?)
      `,
      [Number(questionId), label]
    );

    return NextResponse.json({ id: result.insertId }, { status: 201 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

/**
 * PUT /api/question/[questionId]/choices
 * body: { choiceId, label }
 */
export async function PUT(request, { params }) {
  try {
    const { questionId } = params;

    if (!questionId) {
      return NextResponse.json({ error: "Invalid questionId" }, { status: 400 });
    }

    const body = await request.json();
    const { choiceId, label } = body;

    if (!choiceId || !label) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    const [result] = await db.query(
      `
      UPDATE choice
      SET label = ?
      WHERE id = ? AND question_id = ?
      `,
      [label, Number(choiceId), Number(questionId)]
    );

    if (result.affectedRows === 0) {
      return NextResponse.json({ error: "choice not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

/**
 * DELETE /api/question/[questionId]/choices
 * body: { choiceId }
 */
export async function DELETE(request, { params }) {
  try {
    const { questionId } = params;

    if (!questionId) {
      return NextResponse.json({ error: "Invalid questionId" }, { status: 400 });
    }

    const body = await request.json();
    const { choiceId } = body;

    if (!choiceId) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    const [result] = await db.query(
      `
      DELETE FROM choice
      WHERE id = ? AND question_id = ?
      `,
      [Number(choiceId), Number(questionId)]
    );

    if (result.affectedRows === 0) {
      return NextResponse.json({ error: "choice not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
