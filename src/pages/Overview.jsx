import { useBusiness } from "../context/BusinessContext";

function Overview() {
  const { sales, expenses, products, customers } = useBusiness();

  const totalSales = sales.reduce(
  (total, sale) => total + sale.amount,
  0
);

const totalExpenses = expenses.reduce(
  (total, expense) => total + expense.amount,
  0
);

const estimatedProfit = totalSales - totalExpenses;

const totalProducts = products.length;

const totalCustomers = customers.length;

const lowStockProducts = products.filter(
  (product) => product.quantity <= 5
);

  const summary = [
    {
      title: "Today's Sales",
      value: "₦0.00",
      description: "No sales recorded today",
    },
    {
      title: "Today's Expenses",
      value: "₦0.00",
      description: "No expenses recorded today",
    },
    {
      title: "Low Stock Items",
      value: "0",
      description: "All inventory levels are okay",
    },
  ];

  return (
    <div>
      {/* Page heading */}
      <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
        <div>
          <p className="font-semibold tracking-widest text-[var(--status)]">
            BUSINESS OVERVIEW
          </p>

          <h1 className="mt-2 text-3xl font-bold md:text-4xl">
            Here's what's happening today.
          </h1>

          <p className="mt-3 text-[var(--muted-text)]">
            Keep track of your business activities in one place.
          </p>
        </div>

        {/* Quick actions */}
        <div className="flex flex-wrap gap-3">
          <button className="rounded-lg bg-[var(--primary)] px-5 py-3 font-semibold text-[#2E2528] transition hover:opacity-90">
            + Add Sale
          </button>

          <button className="rounded-lg border border-[var(--border)] px-5 py-3 font-semibold transition hover:bg-[var(--surface)]">
            + Add Expense
          </button>
        </div>
      </div>

      {/* Summary cards */}
      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {summary.map((item) => (
          <div
            key={item.title}
            className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6"
          >
            <p className="text-sm text-[var(--muted-text)]">
              {item.title}
            </p>

            <h2 className="mt-3 text-3xl font-bold">
              {item.value}
            </h2>

            <p className="mt-3 text-sm text-[var(--status)]">
              {item.description}
            </p>
          </div>
        ))}
      </div>

      {/* Recent activity */}
      <section className="mt-10">
        <h2 className="text-xl font-bold">
          Recent Activity
        </h2>

        <div className="mt-5 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <p className="text-lg font-semibold">
              No activity yet
            </p>

            <p className="mt-2 max-w-md text-[var(--muted-text)]">
              Your recent sales, expenses, and other business activities
              will appear here.
            </p>
          </div>
        </div>
      </section>

      {/* Quick information */}
      <section className="mt-10 grid gap-5 lg:grid-cols-2">
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
          <h2 className="text-xl font-bold">
            Inventory Status
          </h2>

          <p className="mt-3 text-[var(--muted-text)]">
            You have not added any products yet.
          </p>

          <button className="mt-5 font-semibold text-[var(--primary)]">
            Add your first product →
          </button>
        </div>

        <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
          <h2 className="text-xl font-bold">
            Business Records
          </h2>

          <p className="mt-3 text-[var(--muted-text)]">
            Start recording your business transactions to keep your
            information organized.
          </p>

          <button className="mt-5 font-semibold text-[var(--primary)]">
            Learn more →
          </button>
        </div>
      </section>
    </div>
  );
}

export default Overview;