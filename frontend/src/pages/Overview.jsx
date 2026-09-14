import { useEffect, useMemo, useState } from "react";

import { useBusiness } from "../context/BusinessContext";

import {
  getProducts,
  getSales,
  getExpenses,
  getCustomers,
} from "../api/api";

function Overview() {
  const {
    products,
    setProducts,
    sales,
    setSales,
    expenses,
    setExpenses,
    customers,
    setCustomers,
  } = useBusiness();

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  /* LOAD ALL DASHBOARD DATA */
  useEffect(() => {
    let active = true;

    async function loadOverviewData() {
      try {
        setLoading(true);
        setError("");

        const [
          productsData,
          salesData,
          expensesData,
          customersData,
        ] = await Promise.all([
          getProducts(),
          getSales(),
          getExpenses(),
          getCustomers(),
        ]);

        if (!active) return;

        setProducts(productsData);
        setSales(salesData);
        setExpenses(expensesData);
        setCustomers(customersData);
      } catch (error) {
        console.error(
          "Failed to load overview data:",
          error
        );

        if (active) {
          setError(
            error.message ||
              "Failed to load dashboard data."
          );
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadOverviewData();

    return () => {
      active = false;
    };
  }, [
    setProducts,
    setSales,
    setExpenses,
    setCustomers,
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
  const profit =
    totalSales - totalExpenses;

  /* LOW STOCK */
  const lowStockProducts = useMemo(() => {
    return products.filter(
      (product) =>
        Number(product.quantity) <= 5
    );
  }, [products]);

  /* TODAY'S SALES */
  const todaySales = useMemo(() => {
    const today = new Date();

    return sales.filter((sale) => {
      const saleDate = new Date(
        sale.date || sale.createdAt
      );

      return (
        saleDate.getDate() ===
          today.getDate() &&
        saleDate.getMonth() ===
          today.getMonth() &&
        saleDate.getFullYear() ===
          today.getFullYear()
      );
    });
  }, [sales]);

  const todaySalesTotal =
    todaySales.reduce(
      (total, sale) =>
        total +
        (Number(sale.amount) || 0),
      0
    );

  /* RECENT SALES */
  const recentSales = useMemo(() => {
    return [...sales]
      .sort(
        (a, b) =>
          new Date(
            b.date || b.createdAt || 0
          ) -
          new Date(
            a.date || a.createdAt || 0
          )
      )
      .slice(0, 5);
  }, [sales]);

  /* CURRENCY */
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

  /* DATE */
  const formatDate = (date) => {
    if (!date) {
      return "—";
    }

    return new Date(date).toLocaleDateString(
      "en-NG",
      {
        day: "numeric",
        month: "short",
        year: "numeric",
      }
    );
  };

  return (
    <div className="space-y-8">
      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Overview
        </h1>

        <p className="mt-2 text-sm text-[var(--muted-text)]">
          Here's what's happening with your business.
        </p>
      </div>

      {/* ERROR */}
      {error && (
        <div className="rounded-lg border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* SUMMARY CARDS */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* SALES */}
        <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5">
          <p className="text-sm text-[var(--muted-text)]">
            Total Sales
          </p>

          <p className="mt-2 text-2xl font-bold">
            {loading
              ? "..."
              : formatCurrency(totalSales)}
          </p>

          <p className="mt-2 text-xs text-[var(--muted-text)]">
            {sales.length} recorded sale
            {sales.length === 1 ? "" : "s"}
          </p>
        </div>

        {/* EXPENSES */}
        <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5">
          <p className="text-sm text-[var(--muted-text)]">
            Total Expenses
          </p>

          <p className="mt-2 text-2xl font-bold">
            {loading
              ? "..."
              : formatCurrency(totalExpenses)}
          </p>

          <p className="mt-2 text-xs text-[var(--muted-text)]">
            {expenses.length} recorded expense
            {expenses.length === 1
              ? ""
              : "s"}
          </p>
        </div>

        {/* PROFIT */}
        <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5">
          <p className="text-sm text-[var(--muted-text)]">
            Profit
          </p>

          <p className="mt-2 text-2xl font-bold">
            {loading
              ? "..."
              : formatCurrency(profit)}
          </p>

          <p className="mt-2 text-xs text-[var(--muted-text)]">
            Sales minus expenses
          </p>
        </div>

        {/* TODAY */}
        <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5">
          <p className="text-sm text-[var(--muted-text)]">
            Today's Sales
          </p>

          <p className="mt-2 text-2xl font-bold">
            {loading
              ? "..."
              : formatCurrency(
                  todaySalesTotal
                )}
          </p>

          <p className="mt-2 text-xs text-[var(--muted-text)]">
            {todaySales.length} sale
            {todaySales.length === 1
              ? ""
              : "s"} today
          </p>
        </div>
      </div>

      {/* BUSINESS COUNTS */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5">
          <p className="text-sm text-[var(--muted-text)]">
            Products
          </p>

          <p className="mt-2 text-2xl font-bold">
            {products.length}
          </p>

          <p className="mt-2 text-xs text-[var(--muted-text)]">
            Products in inventory
          </p>
        </div>

        <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5">
          <p className="text-sm text-[var(--muted-text)]">
            Customers
          </p>

          <p className="mt-2 text-2xl font-bold">
            {customers.length}
          </p>

          <p className="mt-2 text-xs text-[var(--muted-text)]">
            Registered customers
          </p>
        </div>

        <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5">
          <p className="text-sm text-[var(--muted-text)]">
            Low Stock
          </p>

          <p className="mt-2 text-2xl font-bold">
            {lowStockProducts.length}
          </p>

          <p className="mt-2 text-xs text-[var(--muted-text)]">
            Products with 5 or fewer items
          </p>
        </div>
      </div>

      {/* LOWER SECTION */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* RECENT SALES */}
        <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)]">
          <div className="border-b border-[var(--border)] px-6 py-5">
            <h2 className="text-lg font-semibold">
              Recent Sales
            </h2>

            <p className="mt-1 text-sm text-[var(--muted-text)]">
              Your latest transactions.
            </p>
          </div>

          {loading ? (
            <div className="px-6 py-8 text-sm text-[var(--muted-text)]">
              Loading sales...
            </div>
          ) : recentSales.length === 0 ? (
            <div className="px-6 py-8 text-sm text-[var(--muted-text)]">
              No sales recorded yet.
            </div>
          ) : (
            <div>
              {recentSales.map((sale) => (
                <div
                  key={sale._id}
                  className="flex items-center justify-between gap-4 border-b border-[var(--border)] px-6 py-4 last:border-b-0"
                >
                  <div className="min-w-0">
                    <p className="truncate font-medium">
                      {sale.productName ||
                        "Sale"}
                    </p>

                    <p className="mt-1 text-xs text-[var(--muted-text)]">
                      {sale.quantity} item
                      {sale.quantity === 1
                        ? ""
                        : "s"}{" "}
                      •{" "}
                      {formatDate(
                        sale.date ||
                          sale.createdAt
                      )}
                    </p>
                  </div>

                  <p className="shrink-0 font-semibold">
                    {formatCurrency(
                      sale.amount
                    )}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* LOW STOCK */}
        <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)]">
          <div className="border-b border-[var(--border)] px-6 py-5">
            <h2 className="text-lg font-semibold">
              Low Stock
            </h2>

            <p className="mt-1 text-sm text-[var(--muted-text)]">
              Products that may need restocking.
            </p>
          </div>

          {loading ? (
            <div className="px-6 py-8 text-sm text-[var(--muted-text)]">
              Loading inventory...
            </div>
          ) : lowStockProducts.length ===
            0 ? (
            <div className="px-6 py-8 text-sm text-[var(--muted-text)]">
              All products have sufficient stock.
            </div>
          ) : (
            <div>
              {lowStockProducts
                .slice(0, 5)
                .map((product) => (
                  <div
                    key={product._id}
                    className="flex items-center justify-between gap-4 border-b border-[var(--border)] px-6 py-4 last:border-b-0"
                  >
                    <div className="min-w-0">
                      <p className="truncate font-medium">
                        {product.name}
                      </p>

                      <p className="mt-1 text-xs text-[var(--muted-text)]">
                        {product.category ||
                          "Uncategorized"}
                      </p>
                    </div>

                    <div className="shrink-0 text-right">
                      <p className="font-semibold">
                        {product.quantity}
                      </p>

                      <p className="text-xs text-[var(--muted-text)]">
                        in stock
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Overview;