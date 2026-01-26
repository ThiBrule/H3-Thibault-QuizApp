import QuestionClient from "@/components/QuestionClient";

export default async function QuestionPage({ params, searchParams }) {
  const { quizId, index } = await params;

  const questionsRes = await fetch(
    `http://localhost:3000/api/quiz/${quizId}/questions`,
    { cache: "no-cache" }
  );

  const questions = await questionsRes.json();
  const question = questions[index - 1];

  if (!question) return <p>Question introuvable</p>;

  const choicesRes = await fetch(
    `http://localhost:3000/api/question/${question.id}/choices`,
    { cache: "no-cache" }
  );

  const choices = await choicesRes.json();

  const score = Number(searchParams?.score ?? 0);

  return (
    <div className="stack">
      <h2 className="title">{question.label}</h2>

      <QuestionClient
        quizId={quizId}
        index={Number(index)}
        total={questions.length}
        choices={choices}
        score={score}
      />
    </div>
  );
}
