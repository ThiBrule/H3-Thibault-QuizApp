import Link from "next/link";
import Image from "next/image";

const QUIZ_IMAGES = {
  1: "/assets/PSGquiz.jpg",
  2: "/assets/L1quiz.jpg",
  3: "/assets/LDCquiz.jpg",
  4: "/assets/LENSquiz.jpg",
  5: "/assets/Barcaquiz.jpeg",
};

export default function QuizCard({ quiz }) {
  const { id, title, description } = quiz;
  const imageSrc = QUIZ_IMAGES[id] ?? "/assets/logo.png";

  return (
    <Link
      href={`/quiz/${id}`}
      className="quiz-card"
      aria-label={`Accéder au quiz ${title}`}
    >
      <div className="quiz-card-image">
        <Image
          src={imageSrc}
          alt={`Illustration du quiz ${title}`}
          width={160}
          height={80}
          sizes="80px"
          style={{ objectFit: "cover" }}
        />
      </div>

      <div className="quiz-card-content">
        <h3 className="quiz-card-title">{title}</h3>
        <p className="quiz-card-description">{description}</p>
      </div>
    </Link>
  );
}
