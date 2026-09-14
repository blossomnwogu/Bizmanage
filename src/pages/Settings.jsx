import { useState } from "react";
import ThemeToggle from "../components/ThemeToggle";

function Settings() {
  const [formData, setFormData] = useState({
    businessName: "",
    ownerName: "",
    email: "",
    currency: "NGN",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setMessage("Settings saved successfully!");
  };

  return (
    <div>
      {/* Page Heading */}
      <div>
        <p className="font-semibold tracking-widest text-[var(--status)]">
          SETTINGS
        </p>

        <h1 className="mt-2 text-3xl font-bold md:text-4xl">
          Manage your preferences.
        </h1>

        <p className="mt-3 text-[var(--muted-text)]">
          Update your business information and application preferences.
        </p>
      </div>

      {/* Business Information */}
      <section className="mt-10 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
        <h2 className="text-xl font-bold">
          Business Information
        </h2>

        <form
          onSubmit={handleSubmit}
          className="mt-6 grid gap-5 md:grid-cols-2"
        >
          {/* Business Name */}
          <div>
            <label className="mb-2 block font-medium">
              Business Name
            </label>

            <input
              name="businessName"
              value={formData.businessName}
              onChange={handleChange}
              placeholder="Enter your business name"
              className="w-full rounded-lg border border-[var(--border)] bg-[var(--bg)] px-4 py-3 outline-none focus:border-[var(--primary)]"
            />
          </div>

          {/* Owner Name */}
          <div>
            <label className="mb-2 block font-medium">
              Owner Name
            </label>

            <input
              name="ownerName"
              value={formData.ownerName}
              onChange={handleChange}
              placeholder="Enter owner's name"
              className="w-full rounded-lg border border-[var(--border)] bg-[var(--bg)] px-4 py-3 outline-none focus:border-[var(--primary)]"
            />
          </div>

          {/* Email */}
          <div>
            <label className="mb-2 block font-medium">
              Email Address
            </label>

            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="w-full rounded-lg border border-[var(--border)] bg-[var(--bg)] px-4 py-3 outline-none focus:border-[var(--primary)]"
            />
          </div>

          {/* Currency */}
          <div>
            <label className="mb-2 block font-medium">
              Currency
            </label>

            <select
              name="currency"
              value={formData.currency}
              onChange={handleChange}
              className="w-full rounded-lg border border-[var(--border)] bg-[var(--bg)] px-4 py-3 outline-none focus:border-[var(--primary)]"
            >
              <option value="NGN">
                Nigerian Naira (₦)
              </option>
            </select>
          </div>

          {/* Save Button */}
          <button
            type="submit"
            className="md:col-span-2 rounded-lg bg-[var(--primary)] px-6 py-3 font-semibold text-[#2E2528] transition hover:opacity-90"
          >
            Save Changes
          </button>
        </form>

        {message && (
          <p className="mt-4 font-medium text-green-600">
            {message}
          </p>
        )}
      </section>

      {/* Appearance */}
      <section className="mt-10 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
        <h2 className="text-xl font-bold">
          Appearance
        </h2>

        <p className="mt-2 text-[var(--muted-text)]">
          Switch between light and dark mode.
        </p>

        <div className="mt-5">
          <ThemeToggle />
        </div>
      </section>

      {/* Account Information */}
      <section className="mt-10 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
        <h2 className="text-xl font-bold">
          Account
        </h2>

        <p className="mt-2 text-[var(--muted-text)]">
          Account management features will be connected when we add
          the backend and database.
        </p>

        <button
          type="button"
          className="mt-5 rounded-lg border border-red-300 px-5 py-3 font-medium text-red-500 transition hover:bg-red-50"
        >
          Delete Account
        </button>
      </section>
    </div>
  );
}

export default Settings;