function CTA() {
  return (
    <section
      id="get-started"
      className="bg-[var(--sidebar)] px-6 py-24 lg:px-8"
    >
      <div className="mx-auto max-w-4xl text-center">
        <p className="mb-4 font-semibold tracking-widest text-[var(--primary)]">
          READY TO GET STARTED?
        </p>

        <h2 className="text-4xl font-bold leading-tight text-[#F7ECEF] md:text-5xl">
          Manage Your Business
          <br />
          <span className="text-[var(--primary)]">
            The Smarter Way.
          </span>
        </h2>

        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-[var(--muted-text)]">
          Take control of your sales, inventory, expenses, and business
          records with one simple digital platform.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <a
            href="#signup"
            className="rounded-lg bg-[var(--primary)] px-7 py-3 font-semibold text-[#2E2528] transition duration-300 hover:scale-105 hover:opacity-90"
          >
            Get Started
          </a>

          <a
            href="#features"
            className="rounded-lg border border-[var(--primary)] px-7 py-3 font-semibold text-[var(--primary)] transition duration-300 hover:bg-[var(--primary)] hover:text-[#2E2528]"
          >
            Explore Features
          </a>
        </div>
      </div>
    </section>
  );
}

export default CTA;