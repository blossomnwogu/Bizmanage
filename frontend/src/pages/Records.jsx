import { useEffect, useMemo, useState } from "react";

import { useBusiness } from "../context/BusinessContext";

import {
  getSales,
} from "../api/api";

import {
  getExpenses,
} from "../api/api";

function Records() {
  const {
    sales,
    setSales,
    expenses,
    setExpenses,
  } = useBusiness();

  const [searchTerm, setSearchTerm] =
    useState("");

  const [filterType, setFilterType] =
    useState("All");

  const [filterPayment, setFilterPayment] =
    useState("All");

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  /* LOAD SALES + EXPENSES */
  useEffect(() => {
    let active = true;

    async function loadRecords() {
      try {
        setLoading(true);
        setError("");

        const [
          salesData,
          expensesData,
        ] = await Promise.all([
          getSales(),
          getExpenses(),
        ]);

        if (active) {
          setSales(salesData);
          setExpenses(expensesData);
        }
      } catch (error) {
        console.error(
          "Failed to load records:",
          error
        );

        if (active) {
          setError(
            error.message ||
              "Failed to load records."
          );
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadRecords();

    return () => {
      active = false;
    };
  }, [setSales, setExpenses]);

  /* COMBINE SALES + EXPENSES */
  const allRecords = useMemo(() => {
    const salesRecords = sales.map(
      (sale) => ({
        ...sale,

        type: "Sale",

        name:
          sale.productName ||
          sale.product ||
          "Sale",

        amount:
          Number(sale.amount) || 0,

        paymentMethod:
          sale.paymentMethod ||
          "Cash",
      })
    );

    const expenseRecords =
      expenses.map((expense) => ({
        ...expense,

        type: "Expense",

        name:
          expense.description ||
          expense.name ||
          "Expense",

        amount:
          Number(expense.amount) || 0,

        paymentMethod:
          expense.paymentMethod ||
          "Cash",
      }));

    return [
      ...salesRecords,
      ...expenseRecords,
    ].sort(
      (a, b) =>
        new Date(b.date || b.createdAt || 0) -
        new Date(a.date || a.createdAt || 0)
    );
  }, [sales, expenses]);

  /* FILTER RECORDS */
  const filteredRecords = useMemo(() => {
    const search =
      searchTerm.trim().toLowerCase();

    return allRecords.filter(
      (record) => {
        const matchesSearch =
          !search ||
          record.name
            .toLowerCase()
            .includes(search);

        const matchesType =
          filterType === "All" ||
          record.type === filterType;

        const matchesPayment =
          filterPayment === "All" ||
          record.paymentMethod ===
            filterPayment;

        return (
          matchesSearch &&
          matchesType &&
          matchesPayment
        );
      }
    );
  }, [
    allRecords,
    searchTerm,
    filterType,
    filterPayment,
  ]);

  /* TOTALS */
  const totalSales = sales.reduce(
    (total, sale) =>
      total +
      (Number(sale.amount) || 0),
    0
  );

  const totalExpenses =
    expenses.reduce(
      (total, expense) =>
        total +
        (Number(expense.amount) || 0),
      0
    );

  const profit =
    totalSales - totalExpenses;

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

  return (
    <div className="space-y-8">
      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Records
        </h1>

        <p className="mt-2 text-sm text-[var(--muted-text)]">
          View your sales and expenses in one place.
        </p>
      </div>

      {/* ERROR */}
      {error && (
        <div className="rounded-lg border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* SUMMARY */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5">
          <p className="text-sm text-[var(--muted-text)]">
            Total Sales
          </p>

          <p className="mt-2 text-2xl font-bold">
            {formatCurrency(totalSales)}
          </p>
        </div>

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
            Profit
          </p>

          <p className="mt-2 text-2xl font-bold">
            {formatCurrency(profit)}
          </p>
        </div>
      </div>

      {/* FILTERS */}
      <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5">
        <div className="grid gap-4 md:grid-cols-3">
          {/* SEARCH */}
          <div>
            <label className="mb-1 block text-sm font-medium">
              Search
            </label>

            <input
              type="text"
              value={searchTerm}
              onChange={(e) =>
                setSearchTerm(
                  e.target.value
                )
              }
              placeholder="Search records..."
              className="w-full rounded-lg border border-[var(--border)] bg-[var(--bg)] px-3 py-2.5 outline-none focus:ring-2 focus:ring-[var(--primary)]"
            />
          </div>

          {/* TYPE */}
          <div>
            <label className="mb-1 block text-sm font-medium">
              Type
            </label>

            <select
              value={filterType}
              onChange={(e) =>
                setFilterType(
                  e.target.value
                )
              }
              className="w-full rounded-lg border border-[var(--border)] bg-[var(--bg)] px-3 py-2.5 outline-none focus:ring-2 focus:ring-[var(--primary)]"
            >
              <option value="All">
                All
              </option>

              <option value="Sale">
                Sales
              </option>

              <option value="Expense">
                Expenses
              </option>
            </select>
          </div>

          {/* PAYMENT */}
          <div>
            <label className="mb-1 block text-sm font-medium">
              Payment Method
            </label>

            <select
              value={filterPayment}
              onChange={(e) =>
                setFilterPayment(
                  e.target.value
                )
              }
              className="w-full rounded-lg border border-[var(--border)] bg-[var(--bg)] px-3 py-2.5 outline-none focus:ring-2 focus:ring-[var(--primary)]"
            >
              <option value="All">
                All
              </option>

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
        </div>
      </div>

      {/* RECORDS TABLE */}
      <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)]">
        <div className="flex items-center justify-between border-b border-[var(--border)] px-6 py-5">
          <div>
            <h2 className="text-lg font-semibold">
              All Records
            </h2>

            <p className="mt-1 text-sm text-[var(--muted-text)]">
              {filteredRecords.length} record
              {filteredRecords.length === 1
                ? ""
                : "s"}
            </p>
          </div>
        </div>

        {loading ? (
          <div className="px-6 py-10 text-center text-sm text-[var(--muted-text)]">
            Loading records...
          </div>
        ) : filteredRecords.length ===
          0 ? (
          <div className="px-6 py-10 text-center text-sm text-[var(--muted-text)]">
            No records found.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px]">
              <thead>
                <tr className="border-b border-[var(--border)] text-left text-sm text-[var(--muted-text)]">
                  <th className="px-6 py-4 font-medium">
                    Date
                  </th>

                  <th className="px-6 py-4 font-medium">
                    Type
                  </th>

                  <th className="px-6 py-4 font-medium">
                    Description
                  </th>

                  <th className="px-6 py-4 font-medium">
                    Payment
                  </th>

                  <th className="px-6 py-4 text-right font-medium">
                    Amount
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredRecords.map(
                  (record) => (
                    <tr
                      key={`${record.type}-${record._id}`}
                      className="border-b border-[var(--border)] last:border-b-0"
                    >
                      <td className="px-6 py-4 text-sm text-[var(--muted-text)]">
                        {formatDate(
                          record.date
                        )}
                      </td>

                      <td className="px-6 py-4">
                        <span className="rounded-full border border-[var(--border)] px-2.5 py-1 text-xs font-medium">
                          {record.type}
                        </span>
                      </td>

                      <td className="px-6 py-4 font-medium">
                        {record.name}
                      </td>

                      <td className="px-6 py-4 text-sm">
                        {record.paymentMethod ||
                          "—"}
                      </td>

                      <td className="px-6 py-4 text-right font-semibold">
                        {formatCurrency(
                          record.amount
                        )}
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default Records;