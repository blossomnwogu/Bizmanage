import { useState } from "react";
import { useBusiness } from "../context/BusinessContext";

function Inventory() {
  const [products, setProducts] = useBusiness();

  const [formData, setFormData] = useState({
    name: "",
    quantity: "",
    price: "",
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

    if (!formData.name.trim()) {
      newErrors.name = "Product name is required.";
    }

    if (!formData.quantity || Number(formData.quantity) < 0) {
      newErrors.quantity = "Enter a valid quantity.";
    }

    if (!formData.price || Number(formData.price) <= 0) {
      newErrors.price = "Enter a valid price.";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      const newProduct = {
        id: Date.now(),
        name: formData.name,
        quantity: Number(formData.quantity),
        price: Number(formData.price),
      };

      setProducts([newProduct, ...products]);

      setFormData({
        name: "",
        quantity: "",
        price: "",
      });
    }
  };

  const deleteProduct = (id) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  const lowStockProducts = products.filter(
    (product) => product.quantity <= 5
  );

  return (
    <div>
      {/* Page Heading */}
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <p className="font-semibold tracking-widest text-[var(--status)]">
            INVENTORY MANAGEMENT
          </p>

          <h1 className="mt-2 text-3xl font-bold md:text-4xl">
            Manage your inventory.
          </h1>

          <p className="mt-3 text-[var(--muted-text)]">
            Keep track of your products and available stock.
          </p>
        </div>

        <div className="rounded-xl bg-[var(--primary)] px-6 py-4 text-[#2E2528]">
          <p className="text-sm font-medium">Total Products</p>

          <p className="mt-1 text-2xl font-bold">
            {products.length}
          </p>
        </div>
      </div>

      {/* Inventory Summary */}
      <div className="mt-10 grid gap-5 md:grid-cols-3">
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
          <p className="text-sm text-[var(--muted-text)]">
            Total Products
          </p>

          <h2 className="mt-3 text-3xl font-bold">
            {products.length}
          </h2>
        </div>

        <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
          <p className="text-sm text-[var(--muted-text)]">
            Total Stock
          </p>

          <h2 className="mt-3 text-3xl font-bold">
            {products.reduce(
              (total, product) => total + product.quantity,
              0
            )}
          </h2>
        </div>

        <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
          <p className="text-sm text-[var(--muted-text)]">
            Low Stock Items
          </p>

          <h2 className="mt-3 text-3xl font-bold text-[var(--status)]">
            {lowStockProducts.length}
          </h2>
        </div>
      </div>

      {/* Add Product Form */}
      <section className="mt-10 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
        <h2 className="text-xl font-bold">
          Add Product
        </h2>

        <form
          onSubmit={handleSubmit}
          className="mt-6 grid gap-5 md:grid-cols-3"
        >
          {/* Product Name */}
          <div>
            <label className="mb-2 block font-medium">
              Product Name
            </label>

            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Product name"
              className="w-full rounded-lg border border-[var(--border)] bg-[var(--bg)] px-4 py-3 outline-none focus:border-[var(--primary)]"
            />

            {errors.name && (
              <p className="mt-1 text-sm text-red-500">
                {errors.name}
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
              min="0"
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

          {/* Price */}
          <div>
            <label className="mb-2 block font-medium">
              Price (₦)
            </label>

            <input
              name="price"
              type="number"
              min="0"
              value={formData.price}
              onChange={handleChange}
              placeholder="0"
              className="w-full rounded-lg border border-[var(--border)] bg-[var(--bg)] px-4 py-3 outline-none focus:border-[var(--primary)]"
            />

            {errors.price && (
              <p className="mt-1 text-sm text-red-500">
                {errors.price}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="md:col-span-3 rounded-lg bg-[var(--primary)] px-6 py-3 font-semibold text-[#2E2528] transition hover:opacity-90"
          >
            Add Product
          </button>
        </form>
      </section>

      {/* Product Records */}
      <section className="mt-10">
        <h2 className="text-xl font-bold">
          Product Inventory
        </h2>

        {products.length === 0 ? (
          <div className="mt-5 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-10 text-center">
            <p className="text-lg font-semibold">
              No products added yet.
            </p>

            <p className="mt-2 text-[var(--muted-text)]">
              Add your first product using the form above.
            </p>
          </div>
        ) : (
          <div className="mt-5 overflow-x-auto rounded-2xl border border-[var(--border)] bg-[var(--surface)]">
            <table className="w-full">
              <thead className="border-b border-[var(--border)]">
                <tr className="text-left text-sm text-[var(--muted-text)]">
                  <th className="p-4">Product</th>
                  <th className="p-4">Quantity</th>
                  <th className="p-4">Price</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Action</th>
                </tr>
              </thead>

              <tbody>
                {products.map((product) => (
                  <tr
                    key={product.id}
                    className="border-b border-[var(--border)] last:border-none"
                  >
                    <td className="p-4 font-medium">
                      {product.name}
                    </td>

                    <td className="p-4">
                      {product.quantity}
                    </td>

                    <td className="p-4">
                      ₦{product.price.toLocaleString()}
                    </td>

                    <td className="p-4">
                      {product.quantity <= 5 ? (
                        <span className="font-medium text-[var(--status)]">
                          Low Stock
                        </span>
                      ) : (
                        <span className="font-medium text-green-600">
                          In Stock
                        </span>
                      )}
                    </td>

                    <td className="p-4">
                      <button
                        onClick={() => deleteProduct(product.id)}
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

export default Inventory;