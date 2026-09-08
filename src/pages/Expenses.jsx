import { useState } from "react";
import { useBusiness } from "../context/BusinessContext";

function Expenses() {
  const [expenses, setExpenses] = useBusiness();

  const [formData, setFormData] = useState({
    description: "",
    category: "",
    amount: "",
    date: new Date().toISOString().split("T")[0],
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};

    if (!formData.description.trim()) {
      newErrors.description = "Expense description is required.";
    }

    if (!formData.category) {
      newErrors.category = "Please select a category.";
    }

    if (!formData.amount || Number(formData.amount) <= 0) {
      newErrors.amount = "Enter a valid amount.";
    }

    if (!formData.date) {
      newErrors.date = "Please select a date.";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      const newExpense = {
        id: Date.now(),
        description: formData.description,
        category: formData.category,
        amount: Number(formData.amount),
        date: formData.date,
      };

      setExpenses([newExpense, ...expenses]);

      setFormData({
        description: "",
        category: "",
        amount: "",
        date: new Date().toISOString().split("T")[0],
      });
    }
  };

  const deleteExpense = (id) => {
    setExpenses(expenses.filter((expense) => expense.id !== id));
  };

  const totalExpenses = expenses.reduce(
    (total, expense) => total + expense.amount,
    0
  );

  return (
    <div>
      {/* Page Heading */}
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <p className="font-semibold tracking-widest text-[var(--status)]">
            EXPENSE MANAGEMENT
          </p>

          <h1 className="mt-2 text-3xl font-bold md:text-4xl">
            Track your expenses.
          </h1>

          <p className="mt-3 text-[var(--muted-text)]">
            Record and monitor your business spending in one place.
          </p>
        </div>

        <div className="rounded-xl bg-[var(--primary)] px-6 py-4 text-[#2E2528]">
          <p className="text-sm font-medium">Total Expenses</p>

          <p className="mt-1 text-2xl font-bold">
            ₦{totalExpenses.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Summary */}
      <section className="mt-10 grid gap-5 md:grid-cols-2">
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
          <p className="text-sm text-[var(--muted-text)]">
            Total Expenses
          </p>

          <h2 className="mt-3 text-3xl font-bold">
            ₦{totalExpenses.toLocaleString()}
          </h2>
        </div>

        <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
          <p className="text-sm text-[var(--muted-text)]">
            Number of Expenses
          </p>

          <h2 className="mt-3 text-3xl font-bold">
            {expenses.length}
          </h2>
        </div>
      </section>

      {/* Add Expense Form */}
      <section className="mt-10 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
        <h2 className="text-xl font-bold">
          Add New Expense
        </h2>

        <form
          onSubmit={handleSubmit}
          className="mt-6 grid gap-5 md:grid-cols-2"
        >
          {/* Description */}
          <div>
            <label className="mb-2 block font-medium">
              Description
            </label>

            <input
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="e.g. Electricity bill"
              className="w-full rounded-lg border border-[var(--border)] bg-[var(--bg)] px-4 py-3 outline-none focus:border-[var(--primary)]"
            />

            {errors.description && (
              <p className="mt-1 text-sm text-red-500">
                {errors.description}
              </p>
            )}
          </div>

          {/* Category */}
          <div>
            <label className="mb-2 block font-medium">
              Category
            </label>

            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full rounded-lg border border-[var(--border)] bg-[var(--bg)] px-4 py-3 outline-none focus:border-[var(--primary)]"
            >
              <option value="">Select category</option>
              <option value="Utilities">Utilities</option>
              <option value="Rent">Rent</option>
              <option value="Transportation">Transportation</option>
              <option value="Supplies">Supplies</option>
              <option value="Salaries">Salaries</option>
              <option value="Marketing">Marketing</option>
              <option value="Other">Other</option>
            </select>

            {errors.category && (
              <p className="mt-1 text-sm text-red-500">
                {errors.category}
              </p>
            )}
          </div>

          {/* Amount */}
          <div>
            <label className="mb-2 block font-medium">
              Amount (₦)
            </label>

            <input
              name="amount"
              type="number"
              min="0"
              value={formData.amount}
              onChange={handleChange}
              placeholder="0"
              className="w-full rounded-lg border border-[var(--border)] bg-[var(--bg)] px-4 py-3 outline-none focus:border-[var(--primary)]"
            />

            {errors.amount && (
              <p className="mt-1 text-sm text-red-500">
                {errors.amount}
              </p>
            )}
          </div>

          {/* Date */}
          <div>
            <label className="mb-2 block font-medium">
              Date
            </label>

            <input
              name="date"
              type="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full rounded-lg border border-[var(--border)] bg-[var(--bg)] px-4 py-3 outline-none focus:border-[var(--primary)]"
            />

            {errors.date && (
              <p className="mt-1 text-sm text-red-500">
                {errors.date}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="md:col-span-2 rounded-lg bg-[var(--primary)] px-6 py-3 font-semibold text-[#2E2528] transition hover:opacity-90"
          >
            Add Expense
          </button>
        </form>
      </section>

      {/* Expense Records */}
      <section className="mt-10">
        <h2 className="text-xl font-bold">
          Expense Records
        </h2>

        {expenses.length === 0 ? (
          <div className="mt-5 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-10 text-center">
            <p className="text-lg font-semibold">
              No expenses recorded yet.
            </p>

            <p className="mt-2 text-[var(--muted-text)]">
              Add your first expense using the form above.
            </p>
          </div>
        ) : (
          <div className="mt-5 overflow-x-auto rounded-2xl border border-[var(--border)] bg-[var(--surface)]">
            <table className="w-full">
              <thead className="border-b border-[var(--border)]">
                <tr className="text-left text-sm text-[var(--muted-text)]">
                  <th className="p-4">Description</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Amount</th>
                  <th className="p-4">Date</th>
                  <th className="p-4">Action</th>
                </tr>
              </thead>

              <tbody>
                {expenses.map((expense) => (
                  <tr
                    key={expense.id}
                    className="border-b border-[var(--border)] last:border-none"
                  >
                    <td className="p-4 font-medium">
                      {expense.description}
                    </td>

                    <td className="p-4">
                      {expense.category}
                    </td>

                    <td className="p-4">
                      ₦{expense.amount.toLocaleString()}
                    </td>

                    <td className="p-4">
                      {expense.date}
                    </td>

                    <td className="p-4">
                      <button
                        onClick={() => deleteExpense(expense.id)}
                        className="font-medium text-red-500 hover:underline"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}

export default Expenses;