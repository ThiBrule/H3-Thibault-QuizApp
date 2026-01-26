"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const isQuizList = pathname === "/quiz";

  return (
    <header className="app-header">
      <div className="app-header__inner">
        <Link href="/" className="app-brand" aria-label="Accueil">
          <span className="app-brand__text">
            <span className="app-brand__title">Quiz App</span>
            
          </span>
        </Link>

        <nav className="app-nav">
          <Link
            href="/quiz"
            className={`nav-pill ${isQuizList ? "is-active" : ""}`}
          >
            Espace quiz
          </Link>

          {!isHome && !isQuizList && (
            <button
              type="button"
              className="nav-link"
              onClick={() => window.history.back()}
            >
            </button>
          )}
        </nav>
      </div>
    </header>
  );
}
