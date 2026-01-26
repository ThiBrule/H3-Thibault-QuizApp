import Link from "next/link";
import ScoreClient from "@/components/ScoreClient";

export default function ScorePage() {
  return (
    <section className="stack">
      <h2 className="title">Score final</h2>

      <ScoreClient />

      <Link href="/quiz" className="primary-button">
        Retour au menu principal
      </Link>
    </section>
  );
}
