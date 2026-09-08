import { Link } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

function Navbar() {
  return (
    <header className="w-full border-b border-[var(--border)] bg-[var(--bg)]">
      <div className="mx-auto flex min-h-[72px] max-w-7xl items-center justify-between px-6 lg:px-8">

        {/* Logo */}
        <a
          href="#home"
          className="text-2xl font-bold text-[var(--text)]"
        >
          BizManage
        </a>

        {/* Navigation Links */}
        <nav className="hidden items-center gap-8 md:flex">
          <a
            href="#home"
            className="transition hover:opacity-70"
          >
            Home
          </a>

          <a
            href="#about"
            className="transition hover:opacity-70"
          >
            About
          </a>

          <a
            href="#features"
            className="transition hover:opacity-70"
          >
            Features
          </a>

          <a
            href="#contact"
            className="transition hover:opacity-70"
          >
            Contact
          </a>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <ThemeToggle />

          <Link
            to="/login"
            className="hidden font-medium transition hover:opacity-70 sm:block"
          >
            Login
          </Link>

          <Link
            to="/signup"
            className="rounded-lg bg-[var(--primary)] px-4 py-2 font-semibold text-[#2E2528] transition hover:opacity-90"
          >
            Get Started
          </Link>
        </div>

      </div>
    </header>
  );
}

export default Navbar;