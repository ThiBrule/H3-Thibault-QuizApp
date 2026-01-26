import Link from "next/link";
import Image from "next/image";

export default function Quizzes() {
  return (
    <div className="app-background">

      {/* HEADER */}
      <header className="app-header">
        <div className="logo-container">
          <Image
            src="/assets/logo.jpg"
            alt="Quiz Your Foot logo"
            width={100}
            height={100}
            priority
          />
          <span className="brand-name">QuizoFoot</span>
        </div>
      </header>

      {/* BODY */}
      <main className="app-main">
        <p className="intro-text">
          <strong>QuizoFoot</strong>
        </p>

        <h2>
          Teste ta culture générale sur le foot tous les jours, teste-toi ou apprends de nouvelles choses.
        </h2>

        <Link href="/quiz" className="primary-button">
          Commencer
        </Link>
      </main>

    </div>
  );
}
