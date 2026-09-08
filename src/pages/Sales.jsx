import { useState } from "react";
import { useBusiness } from "../context/BusinessContext";

function Sales() {
  const [sales, setSales] = useBusiness();
  
  const [formData, setFormData] = useState({
    product: "",
    quantity: "",
    amount: "",
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

    if (!formData.product.trim()) {
      newErrors.product = "Product name is required.";
    }

    if (!formData.quantity || Number(formData.quantity) <= 0) {
      newErrors.quantity = "Enter a valid quantity.";
    }

    if (!formData.amount || Number(formData.amount) <= 0) {
      newErrors.amount = "Enter a valid amount.";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      const newSale = {
        id: Date.now(),
        product: formData.product,
        quantity: Number(formData.quantity),
        amount: Number(formData.amount),
        date: new Date().toLocaleDateString(),
      };

      setSales([newSale, ...sales]);

      setFormData({
        product: "",
        quantity: "",
        amount: "",
      });
    }
  };

  const totalSales = sales.reduce(
    (total, sale) => total + sale.amount,
    0
  );

  const deleteSale = (id) => {
    setSales(sales.filter((sale) => sale.id !== id));
  };

  return (
    <div>
      {/* Page Heading */}
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <p className="font-semibold tracking-widest text-[var(--status)]">
            SALES MANAGEMENT
          </p>

          <h1 className="mt-2 text-3xl font-bold md:text-4xl">
            Track your sales.
          </h1>

          <p className="mt-3 text-[var(--muted-text)]">
            Record and monitor your business sales in one place.
          </p>
        </div>

        <div className="rounded-xl bg-[var(--primary)] px-6 py-4 text-[#2E2528]">
          <p className="text-sm font-medium">Total Sales</p>
          <p className="mt-1 text-2xl font-bold">
            ₦{totalSales.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Add Sale Form */}
      <section className="mt-10 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
        <h2 className="text-xl font-bold">Add New Sale</h2>

        <form
          onSubmit={handleSubmit}
          className="mt-6 grid gap-5 md:grid-cols-3"
        >
          {/* Product */}
          <div>
            <label className="mb-2 block font-medium">
              Product
            </label>

            <input
              name="product"
              value={formData.product}
              onChange={handleChange}
              placeholder="Product name"
              className="w-full rounded-lg border border-[var(--border)] bg-[var(--bg)] px-4 py-3 outline-none focus:border-[var(--primary)]"
            />

            {errors.product && (
              <p className="mt-1 text-sm text-red-500">
                {errors.product}
              </p>
            )}
          </div>

          {/* Quantity */}
          <div>
            <label className="mb-2 block font-medium">
              Quantity
            </label>

            <input
              name="quantity"
              type="number"
              value={formData.quantity}
              onChange={handleChange}
              placeholder="0"
              className="w-full rounded-lg border border-[var(--border)] bg-[var(--bg)] px-4 py-3 outline-none focus:border-[var(--primary)]"
            />

            {errors.quantity && (
              <p className="mt-1 text-sm text-red-500">
                {errors.quantity}
              </p>
            )}
          </div>

          {/* Amount */}
          <div>
            <label className="mb-2 block font-medium">
              Total Amount (₦)
            </label>

            <input
              name="amount"
              type="number"
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

          <button
            type="submit"
            className="md:col-span-3 rounded-lg bg-[var(--primary)] px-6 py-3 font-semibold text-[#2E2528] transition hover:opacity-90"
          >
            Add Sale
          </button>
        </form>
      </section>

      {/* Sales Records */}
      <section className="mt-10">
        <h2 className="text-xl font-bold">Sales Records</h2>

        {sales.length === 0 ? (
          <div className="mt-5 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-10 text-center">
            <p className="text-lg font-semibold">
              No sales recorded yet.
            </p>

            <p className="mt-2 text-[var(--muted-text)]">
              Add your first sale using the form above.
            </p>
          </div>
        ) : (
          <div className="mt-5 overflow-x-auto rounded-2xl border border-[var(--border)] bg-[var(--surface)]">
            <table className="w-full">
              <thead className="border-b border-[var(--border)]">
                <tr className="text-left text-sm text-[var(--muted-text)]">
                  <th className="p-4">Product</th>
                  <th className="p-4">Quantity</th>
                  <th className="p-4">Amount</th>
                  <th className="p-4">Date</th>
                  <th className="p-4">Action</th>
                </tr>
              </thead>

              <tbody>
                {sales.map((sale) => (
                  <tr
                    key={sale.id}
                    className="border-b border-[var(--border)] last:border-none"
                  >
                    <td className="p-4 font-medium">
                      {sale.product}
                    </td>

                    <td className="p-4">
                      {sale.quantity}
                    </td>

                    <td className="p-4">
                      ₦{sale.amount.toLocaleString()}
                    </td>

                    <td className="p-4">
                      {sale.date}
                    </td>

                    <td className="p-4">
                      <button
                        onClick={() => deleteSale(sale.id)}
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

export default Sales;