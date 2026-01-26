import Link from "next/link";
import Image from "next/image";

const quizImages = {
  1: "/assets/PSGquiz.jpg",
  2: "/assets/L1quiz.jpg",
  3: "/assets/LDCquiz.jpg",
  4: "/assets/LENSquiz.jpg",
  5: "/assets/Barcaquiz.jpeg",
};

export default function QuizCard({ quiz }) {
  const imageSrc = quizImages[quiz.id] || "/assets/logo.png";

  return (
    <Link href={`/quiz/${quiz.id}`} className="quiz-card">
      <div className="quiz-card-image">
        <Image
          src={imageSrc}
          alt={`Illustration ${quiz.title}`}
          width={80}
          height={80}
        />
      </div>

      <div className="quiz-card-content">
        <h3 className="quiz-card-title">{quiz.title}</h3>
        <p className="quiz-card-description">{quiz.description}</p>
      </div>
    </Link>
  );
}
