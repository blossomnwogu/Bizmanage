function About() {
  return (
    <section
      id="about"
      className="bg-[var(--bg)] px-6 py-24 lg:px-8"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-2">

        {/* Left content */}
        <div>
          <p className="mb-4 font-semibold tracking-widest text-[var(--status)]">
            WHY BIZMANAGE?
          </p>

          <h2 className="text-4xl font-bold leading-tight text-[var(--text)] md:text-5xl">
            Less Stress.
            <br />
            <span className="text-[var(--primary)]">
              Better Business Decisions.
            </span>
          </h2>

          <p className="mt-6 leading-8 text-[var(--muted-text)]">
            Many small businesses still rely on notebooks, calculators,
            and manual records to manage their daily operations.
            BizManage provides a simple digital solution that helps
            business owners organize important information in one place.
          </p>

          <p className="mt-4 leading-8 text-[var(--muted-text)]">
            From tracking sales and expenses to monitoring inventory,
            BizManage makes it easier to understand how your business
            is performing and make informed decisions.
          </p>

          <a
            href="#get-started"
            className="mt-8 inline-block rounded-lg bg-[var(--primary)] px-6 py-3 font-semibold text-[#2E2528] transition hover:opacity-90"
          >
            Start Managing Smarter
          </a>
        </div>

        {/* Right content */}
        <div className="grid gap-5 sm:grid-cols-2">

          <div className="rounded-2xl bg-[var(--surface)] p-7">
            <h3 className="text-3xl font-bold text-[var(--primary)]">
              Simple
            </h3>

            <p className="mt-3 leading-7 text-[var(--muted-text)]">
              Easy-to-use tools designed for everyday business management.
            </p>
          </div>

          <div className="rounded-2xl bg-[var(--surface)] p-7 sm:translate-y-8">
            <h3 className="text-3xl font-bold text-[var(--primary)]">
              Organized
            </h3>

            <p className="mt-3 leading-7 text-[var(--muted-text)]">
              Keep your sales, expenses, inventory, and records in one place.
            </p>
          </div>

          <div className="rounded-2xl bg-[var(--surface)] p-7">
            <h3 className="text-3xl font-bold text-[var(--primary)]">
              Efficient
            </h3>

            <p className="mt-3 leading-7 text-[var(--muted-text)]">
              Spend less time managing records and more time growing your business.
            </p>
          </div>

          <div className="rounded-2xl bg-[var(--surface)] p-7 sm:translate-y-8">
            <h3 className="text-3xl font-bold text-[var(--primary)]">
              Insightful
            </h3>

            <p className="mt-3 leading-7 text-[var(--muted-text)]">
              Understand your business performance with clear and useful information.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}

export default About;