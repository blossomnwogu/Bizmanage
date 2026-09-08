function Hero() {
  return (
    <section
      id="home"
      className="relative overflow-hidden bg-[var(--bg)]"
    >
      <div className="mx-auto flex min-h-[calc(100vh-72px)] max-w-7xl items-center px-6 py-20 lg:px-8">

        <div className="max-w-3xl">

          {/* Small heading */}
          <p className="mb-5 font-semibold tracking-widest text-[var(--status)]">
            YOUR BUSINESS, SIMPLIFIED
          </p>

          {/* Main heading */}
          <h1 className="text-5xl font-bold leading-tight text-[var(--text)] md:text-6xl lg:text-7xl">
            Manage Your Business.
            <br />
            <span className="text-[var(--primary)]">
              Grow Your Success.
            </span>
          </h1>

          {/* Description */}
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--muted-text)]">
            BizManage helps small and medium-scale businesses manage
            sales, inventory, expenses, customers, and business records
            from one simple digital platform.
          </p>

          {/* Buttons */}
          <div className="mt-8 flex flex-wrap gap-4">

            <a
              href="#signup"
              className="rounded-lg bg-[var(--primary)] px-6 py-3 font-semibold text-[#2E2528] transition duration-300 hover:scale-105 hover:opacity-90"
            >
              Get Started
            </a>

            <a
              href="#about"
              className="rounded-lg border border-[var(--border)] px-6 py-3 font-semibold text-[var(--text)] transition duration-300 hover:bg-[var(--surface)]"
            >
              Learn More
            </a>

          </div>

        </div>

      </div>

      {/* Decorative circles */}
      <div className="absolute right-[-100px] top-[80px] h-72 w-72 rounded-full bg-[var(--primary)] opacity-20 blur-3xl" />

      <div className="absolute bottom-[-100px] right-[10%] h-64 w-64 rounded-full bg-[var(--status)] opacity-20 blur-3xl" />

    </section>
  );
}

export default Hero;