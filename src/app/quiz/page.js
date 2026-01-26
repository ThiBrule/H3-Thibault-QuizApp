import QuizCard from "@/components/QuizCard";

export default async function QuizListPage() {
  const res = await fetch("http://localhost:3000/api/quiz", {
    cache: "no-store",
  });

  const quiz = await res.json();

  return (
    <div className="quiz-list">
      {quiz.map((q) => (
        <QuizCard key={q.id} quiz={q} />
      ))}
    </div>
  );
}



// c'est ici que nosu devons afficher toute les questions et choice
// le fonctionnement doit etre le suivant, une question s'affiche avec ses choix, on répond la bonne réponse s'affiche et un bouton suivant s'affiche en suite