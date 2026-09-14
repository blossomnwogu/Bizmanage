import { useEffect, useState } from "react";

import { useBusiness } from "../context/BusinessContext";

import {
  createExpense,
  deleteExpense,
  getExpenses,
} from "../api/api";

function Expenses() {
  const {
    expenses,
    setExpenses,
  } = useBusiness();

  const [formData, setFormData] = useState({
    description: "",
    category: "",
    amount: "",
    paymentMethod: "Cash",
    date: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  /* LOAD EXPENSES FROM MONGODB */
  useEffect(() => {
    let active = true;

    async function loadExpenses() {
      try {
        setLoading(true);
        setError("");

        const data = await getExpenses();

        if (active) {
          setExpenses(data);
        }
      } catch (error) {
        console.error(
          "Failed to load expenses:",
          error
        );

        if (active) {
          setError(
            error.message ||
              "Failed to load expenses."
          );
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadExpenses();

    return () => {
      active = false;
    };
  }, [setExpenses]);

  /* HANDLE INPUT */
  const handleChange = (e) => {
    const {
      name,
      value,
    } = e.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));

    setMessage("");
    setError("");
  };

  /* CREATE EXPENSE */
  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    if (!formData.description.trim()) {
      setError(
        "Expense description is required."
      );
      return;
    }

    if (
      formData.amount === "" ||
      Number(formData.amount) <= 0
    ) {
      setError(
        "Enter a valid expense amount."
      );
      return;
    }

    try {
      setSaving(true);

      const newExpense =
        await createExpense({
          description:
            formData.description.trim(),

          category:
            formData.category.trim(),

          amount:
            Number(formData.amount),

          paymentMethod:
            formData.paymentMethod,

          ...(formData.date
            ? {
                date: formData.date,
              }
            : {}),
        });

      setExpenses((current) => [
        newExpense,
        ...current,
      ]);

      setFormData({
        description: "",
        category: "",
        amount: "",
        paymentMethod: "Cash",
        date: "",
      });

      setMessage(
        "Expense added successfully."
      );
    } catch (error) {
      console.error(
        "Failed to create expense:",
        error
      );

      setError(
        error.message ||
          "Failed to add expense."
      );
    } finally {
      setSaving(false);
    }
  };

  /* DELETE EXPENSE */
  const handleDeleteExpense = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this expense?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setError("");
      setMessage("");

      await deleteExpense(id);

      setExpenses((current) =>
        current.filter(
          (expense) =>
            expense._id !== id
        )
      );

      setMessage(
        "Expense deleted successfully."
      );
    } catch (error) {
      console.error(
        "Failed to delete expense:",
        error
      );

      setError(
        error.message ||
          "Failed to delete expense."
      );
    }
  };

  /* FORMAT CURRENCY */
  const formatCurrency = (value) => {
    return new Intl.NumberFormat(
      "en-NG",
      {
        style: "currency",
        currency: "NGN",
        maximumFractionDigits: 2,
      }
    ).format(Number(value) || 0);
  };

  /* FORMAT DATE */
  const formatDate = (date) => {
    if (!date) {
      return "—";
    }

    return new Date(date).toLocaleDateString(
      "en-NG",
      {
        year: "numeric",
        month: "short",
        day: "numeric",
      }
    );
  };

  const totalExpenses = expenses.reduce(
    (total, expense) =>
      total + (Number(expense.amount) || 0),
    0
  );

  return (
    <div className="space-y-8">
      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Expenses
        </h1>

        <p className="mt-2 text-sm text-[var(--muted-text)]">
          Track and manage your business expenses.
        </p>
      </div>

      {/* MESSAGES */}
      {message && (
        <div className="rounded-lg border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-sm">
          {message}
        </div>
      )}

      {error && (
        <div className="rounded-lg border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* SUMMARY */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5">
          <p className="text-sm text-[var(--muted-text)]">
            Total Expenses
          </p>

          <p className="mt-2 text-2xl font-bold">
            {formatCurrency(totalExpenses)}
          </p>
        </div>

        <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5">
          <p className="text-sm text-[var(--muted-text)]">
            Number of Expenses
          </p>

          <p className="mt-2 text-2xl font-bold">
            {expenses.length}
          </p>
        </div>
      </div>

      {/* ADD EXPENSE */}
      <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-6">
        <h2 className="text-lg font-semibold">
          Add Expense
        </h2>

        <form
          onSubmit={handleSubmit}
          className="mt-5 grid gap-4 md:grid-cols-2"
        >
          {/* DESCRIPTION */}
          <div>
            <label className="mb-1 block text-sm font-medium">
              Description
            </label>

            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="e.g. Shop rent"
              className="w-full rounded-lg border border-[var(--border)] bg-[var(--bg)] px-3 py-2.5 outline-none focus:ring-2 focus:ring-[var(--primary)]"
            />
          </div>

          {/* CATEGORY */}
          <div>
            <label className="mb-1 block text-sm font-medium">
              Category
            </label>

            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              placeholder="e.g. Rent"
              className="w-full rounded-lg border border-[var(--border)] bg-[var(--bg)] px-3 py-2.5 outline-none focus:ring-2 focus:ring-[var(--primary)]"
            />
          </div>

          {/* AMOUNT */}
          <div>
            <label className="mb-1 block text-sm font-medium">
              Amount
            </label>

            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              min="0"
              step="0.01"
              placeholder="0.00"
              className="w-full rounded-lg border border-[var(--border)] bg-[var(--bg)] px-3 py-2.5 outline-none focus:ring-2 focus:ring-[var(--primary)]"
            />
          </div>

          {/* PAYMENT METHOD */}
          <div>
            <label className="mb-1 block text-sm font-medium">
              Payment Method
            </label>

            <select
              name="paymentMethod"
              value={formData.paymentMethod}
              onChange={handleChange}
              className="w-full rounded-lg border border-[var(--border)] bg-[var(--bg)] px-3 py-2.5 outline-none focus:ring-2 focus:ring-[var(--primary)]"
            >
              <option value="Cash">
                Cash
              </option>

              <option value="POS">
                POS
              </option>

              <option value="Bank Transfer">
                Bank Transfer
              </option>
            </select>
          </div>

          {/* DATE */}
          <div>
            <label className="mb-1 block text-sm font-medium">
              Date
            </label>

            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full rounded-lg border border-[var(--border)] bg-[var(--bg)] px-3 py-2.5 outline-none focus:ring-2 focus:ring-[var(--primary)]"
            />
          </div>

          {/* BUTTON */}
          <div className="flex items-end">
            <button
              type="submit"
              disabled={saving}
              className="w-full rounded-lg bg-[var(--primary)] px-4 py-2.5 font-semibold text-[#2E2528] transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving
                ? "Saving..."
                : "Add Expense"}
            </button>
          </div>
        </form>
      </div>

      {/* EXPENSE LIST */}
      <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)]">
        <div className="border-b border-[var(--border)] px-6 py-5">
          <h2 className="text-lg font-semibold">
            Expense History
          </h2>
        </div>

        {loading ? (
          <div className="px-6 py-10 text-center text-sm text-[var(--muted-text)]">
            Loading expenses...
          </div>
        ) : expenses.length === 0 ? (
          <div className="px-6 py-10 text-center text-sm text-[var(--muted-text)]">
            No expenses found.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px]">
              <thead>
                <tr className="border-b border-[var(--border)] text-left text-sm text-[var(--muted-text)]">
                  <th className="px-6 py-4 font-medium">
                    Description
                  </th>

                  <th className="px-6 py-4 font-medium">
                    Category
                  </th>

                  <th className="px-6 py-4 font-medium">
                    Amount
                  </th>

                  <th className="px-6 py-4 font-medium">
                    Payment
                  </th>

                  <th className="px-6 py-4 font-medium">
                    Date
                  </th>

                  <th className="px-6 py-4 font-medium">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {expenses.map((expense) => (
                  <tr
                    key={expense._id}
                    className="border-b border-[var(--border)] last:border-b-0"
                  >
                    <td className="px-6 py-4 font-medium">
                      {expense.description}
                    </td>

                    <td className="px-6 py-4 text-sm text-[var(--muted-text)]">
                      {expense.category || "—"}
                    </td>

                    <td className="px-6 py-4 font-semibold">
                      {formatCurrency(
                        expense.amount
                      )}
                    </td>

                    <td className="px-6 py-4 text-sm">
                      {expense.paymentMethod ||
                        "Cash"}
                    </td>

                    <td className="px-6 py-4 text-sm text-[var(--muted-text)]">
                      {formatDate(
                        expense.date
                      )}
                    </td>

                    <td className="px-6 py-4">
                      <button
                        type="button"
                        onClick={() =>
                          handleDeleteExpense(
                            expense._id
                          )
                        }
                        className="rounded-lg border border-red-300 px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50"
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
      </div>
    </div>
  );
}

export default Expenses;