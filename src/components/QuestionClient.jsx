"use client";


import { useMemo, useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";



function isCorrect(choice) {
  return (
    choice?.is_correct === 1 ||
    choice?.is_correct === true ||
    choice?.answer === 1 ||
    choice?.answer === true ||
    choice?.is_true === 1 ||
    choice?.is_true === true ||
    choice?.correct === 1 ||
    choice?.correct === true
  );
}

export default function QuestionClient({ quizId, index, total, choices }) {
  const searchParams = useSearchParams();
  const currentScore = Number(searchParams.get("score") ?? 0);

  // Sauvegarde du total pour la page score (sans API)
  useEffect(() => {
    if (!quizId) return;
    const n = Number(total ?? 0);
    if (Number.isFinite(n) && n > 0) {
      localStorage.setItem(`quiz:${quizId}:total`, String(n));
    }
  }, [quizId, total]);

  const [selectedId, setSelectedId] = useState(null);
  const revealed = selectedId !== null;

  const selectedChoice = useMemo(() => {
    return choices.find((c) => c.id === selectedId);
  }, [choices, selectedId]);

  const selectedIsCorrect = revealed ? isCorrect(selectedChoice) : false;
  const nextScore = currentScore + (selectedIsCorrect ? 1 : 0);

  const nextHref =
    index >= total
      ? { pathname: `/quiz/${quizId}/score`, query: { score: nextScore } }
      : {
          pathname: `/quiz/${quizId}/question/${Number(index) + 1}`,
          query: { score: nextScore },
        };

  function onPick(choiceId) {
    if (revealed) return;
    setSelectedId(choiceId);
  }

  function getBtnClass(choice) {
    if (!revealed) return "choice-btn";

    const correct = isCorrect(choice);
    const selected = selectedId === choice.id;

    if (correct) return "choice-btn is-correct";
    if (selected && !correct) return "choice-btn is-wrong";
    return "choice-btn is-disabled";
  }

  return (
    <div>
      <div className="choices-grid">
        {choices.map((choice) => (
          <button
            key={choice.id}
            type="button"
            className={getBtnClass(choice)}
            onClick={() => onPick(choice.id)}
            disabled={revealed}
          >
            {choice.label}
          </button>
        ))}
      </div>

      {revealed && (
        <Link className="primary-button" href={nextHref}>
          {index >= total ? "Voir mon score" : "Question suivante"}
        </Link>
      )}
    </div>
  );
}
