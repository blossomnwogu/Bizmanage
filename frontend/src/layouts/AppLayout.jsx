import { useState } from "react";
import {
  NavLink,
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";

import ThemeToggle from "../components/ThemeToggle";
import { useAuth } from "../context/AuthContext";

function AppLayout() {
  const [menuOpen, setMenuOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const { user, logout } = useAuth();

  const navItems = [
    { name: "Overview", path: "/overview" },
    { name: "Sales", path: "/sales" },
    { name: "Inventory", path: "/inventory" },
    { name: "Expenses", path: "/expenses" },
    { name: "Customers", path: "/customers" },
    { name: "Records", path: "/records" },
    { name: "Reports", path: "/reports" },
    {name: "Financial Education", path: "/financial-education"},
    { name: "Settings", path: "/settings" },
  ];

  const currentPage =
    navItems.find(
      (item) => location.pathname === item.path
    )?.name || "Overview";

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
    navigate("/login", { replace: true });
  };

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">

      {/* =========================
          TOP NAVIGATION
      ========================= */}
      <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--surface)]/95 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          <div className="flex min-h-[76px] items-center justify-between gap-4">

            {/* LOGO / BUSINESS */}
            <NavLink
              to="/overview"
              className="shrink-0"
            >
              <div className="text-xl font-bold tracking-tight">
                BizManager NG
              </div>

              <div className="mt-0.5 text-xs text-[var(--muted-text)]">
                {user?.business || "SME Business Management"}
              </div>
            </NavLink>


            {/* DESKTOP NAVIGATION */}
            <nav className="hidden items-center gap-1 xl:flex">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `rounded-lg px-3 py-2 text-sm font-medium transition ${
                      isActive
                        ? "bg-[var(--primary)] text-[#2E2528]"
                        : "text-[var(--muted-text)] hover:bg-[var(--bg)] hover:text-[var(--text)]"
                    }`
                  }
                >
                  {item.name}
                </NavLink>
              ))}
            </nav>


            {/* RIGHT SIDE */}
            <div className="flex items-center gap-2">

              {/* THEME TOGGLE */}
              <div className="hidden sm:block">
                <ThemeToggle />
              </div>


              {/* USER INFORMATION */}
              <div className="hidden items-center gap-2 md:flex">

                <div className="rounded-full border border-[var(--border)] bg-[var(--bg)] px-3 py-2 text-sm font-medium">
                  {user?.name || "Business Owner"}
                </div>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="rounded-lg border border-[var(--border)] px-3 py-2 text-sm font-medium text-[var(--muted-text)] transition hover:bg-[var(--bg)] hover:text-[var(--text)]"
                >
                  Logout
                </button>

              </div>


              {/* MOBILE MENU BUTTON */}
              <button
                type="button"
                onClick={() =>
                  setMenuOpen((open) => !open)
                }
                className="rounded-lg border border-[var(--border)] px-3 py-2 text-sm font-semibold xl:hidden"
                aria-expanded={menuOpen}
                aria-label="Toggle navigation menu"
              >
                {menuOpen ? "Close" : "Menu"}
              </button>

            </div>
          </div>


          {/* =========================
              MOBILE / TABLET NAVIGATION
          ========================= */}
          {menuOpen && (
            <nav className="border-t border-[var(--border)] py-3 xl:hidden">

              <div className="grid gap-1 sm:grid-cols-2 md:grid-cols-4">

                {navItems.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={() => setMenuOpen(false)}
                    className={({ isActive }) =>
                      `rounded-lg px-3 py-3 text-sm font-medium transition ${
                        isActive
                          ? "bg-[var(--primary)] text-[#2E2528]"
                          : "text-[var(--muted-text)] hover:bg-[var(--bg)] hover:text-[var(--text)]"
                      }`
                    }
                  >
                    {item.name}
                  </NavLink>
                ))}

              </div>


              {/* MOBILE USER INFO */}
              <div className="mt-3 border-t border-[var(--border)] pt-3">

                <div className="flex items-center justify-between gap-3">

                  <div>
                    <p className="text-sm font-semibold">
                      {user?.name || "Business Owner"}
                    </p>

                    <p className="text-xs text-[var(--muted-text)]">
                      {user?.business || "BizManager NG"}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="rounded-lg border border-[var(--border)] px-3 py-2 text-sm font-medium text-[var(--muted-text)] transition hover:bg-[var(--bg)] hover:text-[var(--text)]"
                  >
                    Logout
                  </button>

                </div>


                {/* MOBILE THEME */}
                <div className="mt-3 flex items-center justify-between border-t border-[var(--border)] pt-3 sm:hidden">

                  <span className="text-sm text-[var(--muted-text)]">
                    Appearance
                  </span>

                  <ThemeToggle />

                </div>

              </div>

            </nav>
          )}

        </div>
      </header>


      {/* =========================
          CURRENT PAGE BAR
      ========================= */}
      <div className="border-b border-[var(--border)] bg-[var(--surface)]">

        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">

          <p className="text-sm text-[var(--muted-text)]">
            Business Management

            <span className="mx-2">
              /
            </span>

            <span className="font-medium text-[var(--text)]">
              {currentPage}
            </span>
          </p>

          <p className="hidden text-xs text-[var(--muted-text)] sm:block">
            Nigeria 🇳🇬
          </p>

        </div>

      </div>


      {/* =========================
          PAGE CONTENT
      ========================= */}
      <main>

        <div className="mx-auto min-h-[calc(100vh-160px)] w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">

          <Outlet />

        </div>

      </main>


      {/* =========================
          FOOTER
      ========================= */}
      <footer className="border-t border-[var(--border)] bg-[var(--surface)]">

        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-6 text-sm text-[var(--muted-text)] sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">

          <p>
            © {new Date().getFullYear()} BizManager NG
          </p>

          <p>
            Digital Business Management for Nigerian SMEs 🇳🇬
          </p>

        </div>

      </footer>

    </div>
  );
}

export default AppLayout;