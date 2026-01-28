"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();

  const isHome = pathname === "/";
  const isQuizList = pathname === "/quiz";
  const showBackButton = !isHome && !isQuizList;

  return (
    <header className="app-header" role="banner">
      <div className="app-header__inner">
        {/* Brand */}
        <Link
          href="/"
          className="app-brand"
          aria-label="Retour à l’accueil"
        >
          <span className="app-brand__text">
            <span className="app-brand__title">Quiz App</span>
          </span>
        </Link>

        {/* Navigation */}
        <nav className="app-nav" aria-label="Navigation principale">
          <Link
            href="/quiz"
            className={`nav-pill ${isQuizList ? "is-active" : ""}`}
            aria-current={isQuizList ? "page" : undefined}
          >
            Espace quiz
          </Link>

        </nav>
      </div>
    </header>
  );
}
