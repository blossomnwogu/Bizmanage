import { Link } from "react-router-dom";
import ThemeToggle from "../components/ThemeToggle";

function AppLayout({ children }) {
  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 hidden h-screen w-64 bg-[var(--sidebar)] p-6 text-[#F7ECEF] md:block">
        
        <h1 className="text-2xl font-bold">
          BizManage
        </h1>

        <p className="mt-2 text-sm text-[#F7ECEF]/60">
          Business Workspace
        </p>

        {/* Navigation */}
        <nav className="mt-10 flex flex-col gap-3">

          <Link
            to="/overview"
            className="rounded-lg px-4 py-3 transition hover:bg-white/10"
          >
            Overview
          </Link>

          <Link
            to="/sales"
            className="rounded-lg px-4 py-3 transition hover:bg-white/10"
          >
            Sales
          </Link>

          <Link
            to="/inventory"
            className="rounded-lg px-4 py-3 transition hover:bg-white/10"
          >
            Inventory
          </Link>

          <Link
            to="/expenses"
            className="rounded-lg px-4 py-3 transition hover:bg-white/10"
          >
            Expenses
          </Link>

          <Link
            to="/customers"
            className="rounded-lg px-4 py-3 transition hover:bg-white/10"
          >
            Customers
          </Link>

          <Link
            to="/records"
            className="rounded-lg px-4 py-3 transition hover:bg-white/10"
          >
            Records
          </Link>

          <Link
            to="/reports"
            className="rounded-lg px-4 py-3 transition hover:bg-white/10"
          >
            Reports
          </Link>

        </nav>

        {/* Bottom */}
        <div className="absolute bottom-6 left-6">
          <Link
            to="/settings"
            className="text-sm text-[#F7ECEF]/70 hover:text-white"
          >
            Settings
          </Link>
        </div>

      </aside>

      {/* Main content */}
      <main className="md:ml-64">

        {/* Top bar */}
        <header className="flex h-20 items-center justify-between border-b border-[var(--border)] bg-[var(--bg)] px-6">

          <div>
            <p className="text-sm text-[var(--muted-text)]">
              Welcome back
            </p>

            <h2 className="text-xl font-bold">
              Your Business
            </h2>
          </div>

          <ThemeToggle />

        </header>

        {/* Page content */}
        <div className="p-6 lg:p-10">
          {children}
        </div>

      </main>

    </div>
  );
}

export default AppLayout;