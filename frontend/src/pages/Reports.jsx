import { useEffect, useMemo, useState } from "react";

import { useBusiness } from "../context/BusinessContext";

import {
  getExpenses,
  getProducts,
  getSales,
} from "../api/api";

function Reports() {
  const {
    sales,
    setSales,
    expenses,
    setExpenses,
    products,
    setProducts,
  } = useBusiness();

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  /* LOAD REPORT DATA FROM MONGODB */
  useEffect(() => {
    let active = true;

    async function loadReportData() {
      try {
        setLoading(true);
        setError("");

        const [
          salesData,
          expensesData,
          productsData,
        ] = await Promise.all([
          getSales(),
          getExpenses(),
          getProducts(),
        ]);

        if (!active) return;

        setSales(salesData);
        setExpenses(expensesData);
        setProducts(productsData);
      } catch (error) {
        console.error(
          "Failed to load report data:",
          error
        );

        if (active) {
          setError(
            error.message ||
              "Failed to load report data."
          );
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadReportData();

    return () => {
      active = false;
    };
  }, [
    setSales,
    setExpenses,
    setProducts,
  ]);

  /* TOTAL SALES */
  const totalSales = useMemo(() => {
    return sales.reduce(
      (total, sale) =>
        total +
        (Number(sale.amount) || 0),
      0
    );
  }, [sales]);

  /* TOTAL EXPENSES */
  const totalExpenses = useMemo(() => {
    return expenses.reduce(
      (total, expense) =>
        total +
        (Number(expense.amount) || 0),
      0
    );
  }, [expenses]);

  /* PROFIT */
  const estimatedProfit =
    totalSales - totalExpenses;

  /* COUNTS */
  const totalProducts =
    products.length;

  const totalSalesCount =
    sales.length;

  const totalExpensesCount =
    expenses.length;

  /* AVERAGE SALE */
  const averageSale =
    totalSalesCount > 0
      ? totalSales / totalSalesCount
      : 0;

  /* LOW STOCK */
  const lowStockProducts =
    products.filter(
      (product) =>
        Number(product.quantity) <= 5
    );

  /* FORMAT CURRENCY */
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat(
      "en-NG",
      {
        style: "currency",
        currency: "NGN",
        maximumFractionDigits: 2,
      }
    ).format(Number(amount) || 0);
  };

  return (
    <div>
      {/* PAGE HEADING */}
      <div>
        <p className="font-semibold tracking-widest text-[var(--status)]">
          BUSINESS REPORTS
        </p>

        <h1 className="mt-2 text-3xl font-bold md:text-4xl">
          Understand your business performance.
        </h1>

        <p className="mt-3 text-[var(--muted-text)]">
          View important business information and financial summaries.
        </p>
      </div>

      {/* ERROR */}
      {error && (
        <div className="mt-6 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* LOADING */}
      {loading ? (
        <div className="mt-10 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-8">
          <p className="text-[var(--muted-text)]">
            Loading your business reports...
          </p>
        </div>
      ) : (
        <>
          {/* REPORT SUMMARY */}
          <section className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {/* TOTAL SALES */}
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
              <p className="text-sm text-[var(--muted-text)]">
                Total Sales
              </p>

              <h2 className="mt-3 text-3xl font-bold">
                {formatCurrency(
                  totalSales
                )}
              </h2>

              <p className="mt-2 text-sm text-[var(--muted-text)]">
                {totalSalesCount} recorded sale
                {totalSalesCount === 1
                  ? ""
                  : "s"}
              </p>
            </div>

            {/* TOTAL EXPENSES */}
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
              <p className="text-sm text-[var(--muted-text)]">
                Total Expenses
              </p>

              <h2 className="mt-3 text-3xl font-bold">
                {formatCurrency(
                  totalExpenses
                )}
              </h2>

              <p className="mt-2 text-sm text-[var(--muted-text)]">
                {totalExpensesCount} recorded expense
                {totalExpensesCount === 1
                  ? ""
                  : "s"}
              </p>
            </div>

            {/* PROFIT */}
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
              <p className="text-sm text-[var(--muted-text)]">
                Estimated Profit
              </p>

              <h2 className="mt-3 text-3xl font-bold">
                {formatCurrency(
                  estimatedProfit
                )}
              </h2>

              <p className="mt-2 text-sm text-[var(--muted-text)]">
                Sales minus expenses
              </p>
            </div>

            {/* PRODUCTS */}
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
              <p className="text-sm text-[var(--muted-text)]">
                Total Products
              </p>

              <h2 className="mt-3 text-3xl font-bold">
                {totalProducts}
              </h2>

              <p className="mt-2 text-sm text-[var(--muted-text)]">
                Products in inventory
              </p>
            </div>
          </section>

          {/* ADDITIONAL METRICS */}
          <section className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {/* AVERAGE SALE */}
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
              <p className="text-sm text-[var(--muted-text)]">
                Average Sale
              </p>

              <h2 className="mt-3 text-2xl font-bold">
                {formatCurrency(
                  averageSale
                )}
              </h2>

              <p className="mt-2 text-sm text-[var(--muted-text)]">
                Average value per sale
              </p>
            </div>

            {/* LOW STOCK */}
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
              <p className="text-sm text-[var(--muted-text)]">
                Low Stock Products
              </p>

              <h2 className="mt-3 text-2xl font-bold">
                {lowStockProducts.length}
              </h2>

              <p className="mt-2 text-sm text-[var(--muted-text)]">
                Products with 5 or fewer items
              </p>
            </div>

            {/* PROFIT MARGIN */}
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
              <p className="text-sm text-[var(--muted-text)]">
                Profit Margin
              </p>

              <h2 className="mt-3 text-2xl font-bold">
                {totalSales > 0
                  ? `${(
                      (estimatedProfit /
                        totalSales) *
                      100
                    ).toFixed(1)}%`
                  : "0.0%"}
              </h2>

              <p className="mt-2 text-sm text-[var(--muted-text)]">
                Profit as a percentage of sales
              </p>
            </div>
          </section>

          {/* PERFORMANCE SUMMARY */}
          <section className="mt-10 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
            <h2 className="text-xl font-bold">
              Performance Summary
            </h2>

            <div className="mt-6">
              {totalSales === 0 &&
              totalExpenses === 0 ? (
                <div className="py-10 text-center">
                  <p className="text-lg font-semibold">
                    No business data available yet.
                  </p>

                  <p className="mt-2 text-[var(--muted-text)]">
                    Start recording sales and expenses to generate business reports.
                  </p>
                </div>
              ) : (
                <div>
                  <p className="text-[var(--muted-text)]">
                    Your business has generated{" "}
                    <span className="font-semibold text-[var(--text)]">
                      {formatCurrency(
                        totalSales
                      )}
                    </span>{" "}
                    in sales and recorded{" "}
                    <span className="font-semibold text-[var(--text)]">
                      {formatCurrency(
                        totalExpenses
                      )}
                    </span>{" "}
                    in expenses.
                  </p>

                  <div className="mt-6">
                    <p className="font-medium">
                      Estimated Profit
                    </p>

                    <p className="mt-2 text-3xl font-bold">
                      {formatCurrency(
                        estimatedProfit
                      )}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* REPORT INFORMATION */}
          <section className="mt-10 grid gap-5 lg:grid-cols-2">
            {/* SALES REPORT */}
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
              <h2 className="text-xl font-bold">
                Sales Report
              </h2>

              <p className="mt-3 text-[var(--muted-text)]">
                Review your sales performance and monitor revenue generated by your business.
              </p>

              <div className="mt-5">
                <p className="text-sm text-[var(--muted-text)]">
                  Revenue
                </p>

                <p className="mt-1 font-semibold text-[var(--primary)]">
                  {formatCurrency(
                    totalSales
                  )}
                </p>
              </div>

              <div className="mt-4">
                <p className="text-sm text-[var(--muted-text)]">
                  Transactions
                </p>

                <p className="mt-1 font-semibold">
                  {totalSalesCount}
                </p>
              </div>
            </div>

            {/* EXPENSE REPORT */}
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
              <h2 className="text-xl font-bold">
                Expense Report
              </h2>

              <p className="mt-3 text-[var(--muted-text)]">
                Monitor your business spending and understand where your money is being used.
              </p>

              <div className="mt-5">
                <p className="text-sm text-[var(--muted-text)]">
                  Expenses
                </p>

                <p className="mt-1 font-semibold text-[var(--primary)]">
                  {formatCurrency(
                    totalExpenses
                  )}
                </p>
              </div>

              <div className="mt-4">
                <p className="text-sm text-[var(--muted-text)]">
                  Transactions
                </p>

                <p className="mt-1 font-semibold">
                  {totalExpensesCount}
                </p>
              </div>
            </div>
          </section>
        </>
      )}
    </div>
  );
}

export default Reports;