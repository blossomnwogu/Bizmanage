import { useState } from "react";
import { useBusiness } from "../context/BusinessContext";

function Customers() {
  const [customers, setCustomers] = useBusiness();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
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
      newErrors.name = "Customer name is required.";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required.";
    }

    if (
      formData.email &&
      !/\S+@\S+\.\S+/.test(formData.email)
    ) {
      newErrors.email = "Enter a valid email address.";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      const newCustomer = {
        id: Date.now(),
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        address: formData.address,
      };

      setCustomers([newCustomer, ...customers]);

      setFormData({
        name: "",
        phone: "",
        email: "",
        address: "",
      });

      setErrors({});
    }
  };

  const deleteCustomer = (id) => {
    setCustomers(
      customers.filter((customer) => customer.id !== id)
    );
  };

  return (
    <div>
      {/* Page Heading */}
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <p className="font-semibold tracking-widest text-[var(--status)]">
            CUSTOMER MANAGEMENT
          </p>

          <h1 className="mt-2 text-3xl font-bold md:text-4xl">
            Manage your customers.
          </h1>

          <p className="mt-3 text-[var(--muted-text)]">
            Keep your customer information organized in one place.
          </p>
        </div>

        <div className="rounded-xl bg-[var(--primary)] px-6 py-4 text-[#2E2528]">
          <p className="text-sm font-medium">
            Total Customers
          </p>

          <p className="mt-1 text-2xl font-bold">
            {customers.length}
          </p>
        </div>
      </div>

      {/* Summary */}
      <section className="mt-10">
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
          <p className="text-sm text-[var(--muted-text)]">
            Customer Records
          </p>

          <h2 className="mt-3 text-3xl font-bold">
            {customers.length}
          </h2>

          <p className="mt-2 text-sm text-[var(--muted-text)]">
            Total customers currently recorded.
          </p>
        </div>
      </section>

      {/* Add Customer Form */}
      <section className="mt-10 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
        <h2 className="text-xl font-bold">
          Add New Customer
        </h2>

        <form
          onSubmit={handleSubmit}
          className="mt-6 grid gap-5 md:grid-cols-2"
        >
          {/* Customer Name */}
          <div>
            <label className="mb-2 block font-medium">
              Customer Name
            </label>

            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter customer name"
              className="w-full rounded-lg border border-[var(--border)] bg-[var(--bg)] px-4 py-3 outline-none focus:border-[var(--primary)]"
            />

            {errors.name && (
              <p className="mt-1 text-sm text-red-500">
                {errors.name}
              </p>
            )}
          </div>

          {/* Phone Number */}
          <div>
            <label className="mb-2 block font-medium">
              Phone Number
            </label>

            <input
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              placeholder="e.g. 08012345678"
              className="w-full rounded-lg border border-[var(--border)] bg-[var(--bg)] px-4 py-3 outline-none focus:border-[var(--primary)]"
            />

            {errors.phone && (
              <p className="mt-1 text-sm text-red-500">
                {errors.phone}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="mb-2 block font-medium">
              Email Address
              <span className="ml-1 text-sm text-[var(--muted-text)]">
                (Optional)
              </span>
            </label>

            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="customer@example.com"
              className="w-full rounded-lg border border-[var(--border)] bg-[var(--bg)] px-4 py-3 outline-none focus:border-[var(--primary)]"
            />

            {errors.email && (
              <p className="mt-1 text-sm text-red-500">
                {errors.email}
              </p>
            )}
          </div>

          {/* Address */}
          <div>
            <label className="mb-2 block font-medium">
              Address
              <span className="ml-1 text-sm text-[var(--muted-text)]">
                (Optional)
              </span>
            </label>

            <input
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter customer address"
              className="w-full rounded-lg border border-[var(--border)] bg-[var(--bg)] px-4 py-3 outline-none focus:border-[var(--primary)]"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="md:col-span-2 rounded-lg bg-[var(--primary)] px-6 py-3 font-semibold text-[#2E2528] transition hover:opacity-90"
          >
            Add Customer
          </button>
        </form>
      </section>

      {/* Customer Records */}
      <section className="mt-10">
        <h2 className="text-xl font-bold">
          Customer Records
        </h2>

        {customers.length === 0 ? (
          <div className="mt-5 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-10 text-center">
            <p className="text-lg font-semibold">
              No customers added yet.
            </p>

            <p className="mt-2 text-[var(--muted-text)]">
              Add your first customer using the form above.
            </p>
          </div>
        ) : (
          <div className="mt-5 overflow-x-auto rounded-2xl border border-[var(--border)] bg-[var(--surface)]">
            <table className="w-full">
              <thead className="border-b border-[var(--border)]">
                <tr className="text-left text-sm text-[var(--muted-text)]">
                  <th className="p-4">Customer</th>
                  <th className="p-4">Phone</th>
                  <th className="p-4">Email</th>
                  <th className="p-4">Address</th>
                  <th className="p-4">Action</th>
                </tr>
              </thead>

              <tbody>
                {customers.map((customer) => (
                  <tr
                    key={customer.id}
                    className="border-b border-[var(--border)] last:border-none"
                  >
                    <td className="p-4 font-medium">
                      {customer.name}
                    </td>

                    <td className="p-4">
                      {customer.phone}
                    </td>

                    <td className="p-4">
                      {customer.email || "-"}
                    </td>

                    <td className="p-4">
                      {customer.address || "-"}
                    </td>

                    <td className="p-4">
                      <button
                        onClick={() =>
                          deleteCustomer(customer.id)
                        }
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

export default Customers;