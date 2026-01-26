import Link from "next/link";
import Image from "next/image";

const quizImages = {
  1: "/assets/PSGquiz.jpg",
  2: "/assets/L1quiz.jpg",
  3: "/assets/LDCquiz.jpg",
  4: "/assets/LENSquiz.jpg",
  5: "/assets/Barcaquiz.jpeg",
};

export default async function QuizListPage({ params }) {
  const { quizId } = await params;

  const res = await fetch(`http://localhost:3000/api/quiz/${quizId}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    return <p>Quiz introuvable</p>;
  }

  const quiz = await res.json();
  const imageSrc = quizImages[quizId] || "/assets/logo.png";

  return (
    <section className="stack">
      <Image
        src={imageSrc}
        alt={`Illustration ${quiz.title}`}
        width={200}
        height={200}
      />

      <h2 className="title">{quiz.title}</h2>

    <div className="actions">
  <Link
    href={`/quiz/${quizId}/question/1`}
    className="primary-button"
  >
    Commencer
  </Link>
</div>
    </section>
  );
}
