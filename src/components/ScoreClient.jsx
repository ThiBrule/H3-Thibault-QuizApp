"use client";

import { useSearchParams } from "next/navigation";

export default function ScoreClient() {
  const searchParams = useSearchParams();

  // score récupéré depuis l’URL
  const score = Number(searchParams.get("score") ?? 0);

  // sécurité
  const normalizedScore = Math.max(0, Math.min(10, score));

  return (
    <p className="score-result">
      {normalizedScore} / 10
    </p>
  );
}
