function Footer() {
  return (
    <footer id="contact" className="bg-[var(--surface)] px-6 py-12 lg:px-8">
      <div className="mx-auto max-w-7xl">

        {/* Main footer content */}
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">

          {/* Brand */}
          <div>
            <h2 className="text-2xl font-bold text-[var(--text)]">
              BizManage
            </h2>

            <p className="mt-4 leading-7 text-[var(--muted-text)]">
              A simple digital platform designed to help small and
              medium-scale businesses manage their daily operations.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-bold text-[var(--text)]">
              Navigation
            </h3>

            <div className="mt-4 flex flex-col gap-3 text-[var(--muted-text)]">
              <a href="#home" className="hover:text-[var(--primary)]">
                Home
              </a>

              <a href="#about" className="hover:text-[var(--primary)]">
                About
              </a>

              <a href="#features" className="hover:text-[var(--primary)]">
                Features
              </a>
            </div>
          </div>

          {/* Features */}
          <div>
            <h3 className="font-bold text-[var(--text)]">
              Features
            </h3>

            <div className="mt-4 flex flex-col gap-3 text-[var(--muted-text)]">
              <span>Sales Management</span>
              <span>Inventory Control</span>
              <span>Expense Tracking</span>
              <span>Business Reports</span>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-[var(--text)]">
              Contact
            </h3>

            <div className="mt-4 flex flex-col gap-3 text-[var(--muted-text)]">
              <p>Have questions?</p>

              <a
                href="mailto:hello@bizmanage.com"
                className="hover:text-[var(--primary)]"
              >
                hello@bizmanage.com
              </a>
            </div>
          </div>

        </div>

        {/* Bottom section */}
        <div className="mt-12 border-t border-[var(--border)] pt-6 text-center text-sm text-[var(--muted-text)]">
          <p>
            © 2026 BizManage. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
}

export default Footer;