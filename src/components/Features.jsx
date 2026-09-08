function Features() {
  const features = [
    {
      number: "01",
      title: "Sales Management",
      description:
        "Record and monitor your daily sales easily from one organized platform.",
    },
    {
      number: "02",
      title: "Inventory Management",
      description:
        "Keep track of your products and monitor available stock levels.",
    },
    {
      number: "03",
      title: "Expense Tracking",
      description:
        "Record and organize business expenses to understand where your money goes.",
    },
    {
      number: "04",
      title: "Customer Management",
      description:
        "Keep important customer information organized and accessible.",
    },
    {
      number: "05",
      title: "Business Reports",
      description:
        "View clear reports that help you understand your business performance.",
    },
    {
      number: "06",
      title: "Secure Records",
      description:
        "Keep your business information organized in a secure digital system.",
    },
  ];

  return (
    <section
      id="features"
      className="bg-[var(--surface)] px-6 py-24 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        
        {/* Section heading */}
        <div className="max-w-2xl">
          <p className="mb-4 font-semibold tracking-widest text-[var(--status)]">
            EVERYTHING YOU NEED
          </p>

          <h2 className="text-4xl font-bold text-[var(--text)] md:text-5xl">
            Manage Your Business
            <span className="text-[var(--primary)]"> Smarter.</span>
          </h2>

          <p className="mt-5 text-lg leading-8 text-[var(--muted-text)]">
            BizManage brings essential business management tools together
            in one simple and easy-to-use platform.
          </p>
        </div>

        {/* Feature cards */}
        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.number}
              className="group rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-7 transition duration-300 hover:-translate-y-2"
            >
              <span className="text-sm font-bold text-[var(--status)]">
                {feature.number}
              </span>

              <h3 className="mt-5 text-xl font-bold text-[var(--text)]">
                {feature.title}
              </h3>

              <p className="mt-3 leading-7 text-[var(--muted-text)]">
                {feature.description}
              </p>

              <div className="mt-6 h-1 w-10 rounded-full bg-[var(--primary)] transition-all duration-300 group-hover:w-16" />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default Features;