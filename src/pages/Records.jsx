import { useState } from "react";
import { useBusiness } from "../context/BusinessContext";

function Records() {
  const [records, setRecords] = useBusiness();

  const [formData, setFormData] = useState({
    title: "",
    type: "",
    description: "",
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

    if (!formData.title.trim()) {
      newErrors.title = "Record title is required.";
    }

    if (!formData.type) {
      newErrors.type = "Please select a record type.";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required.";
    }

    if (!formData.date) {
      newErrors.date = "Please select a date.";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      const newRecord = {
        id: Date.now(),
        title: formData.title,
        type: formData.type,
        description: formData.description,
        date: formData.date,
      };

      setRecords([newRecord, ...records]);

      setFormData({
        title: "",
        type: "",
        description: "",
        date: new Date().toISOString().split("T")[0],
      });

      setErrors({});
    }
  };

  const deleteRecord = (id) => {
    setRecords(records.filter((record) => record.id !== id));
  };

  return (
    <div>
      {/* Page Heading */}
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <p className="font-semibold tracking-widest text-[var(--status)]">
            BUSINESS RECORDS
          </p>

          <h1 className="mt-2 text-3xl font-bold md:text-4xl">
            Keep your records organized.
          </h1>

          <p className="mt-3 text-[var(--muted-text)]">
            Store important business information in one place.
          </p>
        </div>

        <div className="rounded-xl bg-[var(--primary)] px-6 py-4 text-[#2E2528]">
          <p className="text-sm font-medium">
            Total Records
          </p>

          <p className="mt-1 text-2xl font-bold">
            {records.length}
          </p>
        </div>
      </div>

      {/* Add Record Form */}
      <section className="mt-10 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
        <h2 className="text-xl font-bold">
          Add New Record
        </h2>

        <form
          onSubmit={handleSubmit}
          className="mt-6 grid gap-5 md:grid-cols-2"
        >
          {/* Title */}
          <div>
            <label className="mb-2 block font-medium">
              Record Title
            </label>

            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. Supplier Agreement"
              className="w-full rounded-lg border border-[var(--border)] bg-[var(--bg)] px-4 py-3 outline-none focus:border-[var(--primary)]"
            />

            {errors.title && (
              <p className="mt-1 text-sm text-red-500">
                {errors.title}
              </p>
            )}
          </div>

          {/* Record Type */}
          <div>
            <label className="mb-2 block font-medium">
              Record Type
            </label>

            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full rounded-lg border border-[var(--border)] bg-[var(--bg)] px-4 py-3 outline-none focus:border-[var(--primary)]"
            >
              <option value="">Select record type</option>
              <option value="Supplier">Supplier</option>
              <option value="Customer">Customer</option>
              <option value="Financial">Financial</option>
              <option value="Inventory">Inventory</option>
              <option value="Business Document">
                Business Document
              </option>
              <option value="Other">Other</option>
            </select>

            {errors.type && (
              <p className="mt-1 text-sm text-red-500">
                {errors.type}
              </p>
            )}
          </div>

          {/* Description */}
          <div className="md:col-span-2">
            <label className="mb-2 block font-medium">
              Description
            </label>

            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              placeholder="Enter record details..."
              className="w-full resize-none rounded-lg border border-[var(--border)] bg-[var(--bg)] px-4 py-3 outline-none focus:border-[var(--primary)]"
            />

            {errors.description && (
              <p className="mt-1 text-sm text-red-500">
                {errors.description}
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

          {/* Button */}
          <button
            type="submit"
            className="md:col-span-2 rounded-lg bg-[var(--primary)] px-6 py-3 font-semibold text-[#2E2528] transition hover:opacity-90"
          >
            Add Record
          </button>
        </form>
      </section>

      {/* Records List */}
      <section className="mt-10">
        <h2 className="text-xl font-bold">
          All Records
        </h2>

        {records.length === 0 ? (
          <div className="mt-5 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-10 text-center">
            <p className="text-lg font-semibold">
              No records added yet.
            </p>

            <p className="mt-2 text-[var(--muted-text)]">
              Add your first business record using the form above.
            </p>
          </div>
        ) : (
          <div className="mt-5 space-y-4">
            {records.map((record) => (
              <div
                key={record.id}
                className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6"
              >
                <div className="flex flex-col justify-between gap-4 sm:flex-row">
                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="text-lg font-bold">
                        {record.title}
                      </h3>

                      <span className="rounded-full bg-[var(--bg)] px-3 py-1 text-sm">
                        {record.type}
                      </span>
                    </div>

                    <p className="mt-3 text-[var(--muted-text)]">
                      {record.description}
                    </p>

                    <p className="mt-3 text-sm text-[var(--muted-text)]">
                      Date: {record.date}
                    </p>
                  </div>

                  <button
                    onClick={() => deleteRecord(record.id)}
                    className="h-fit font-medium text-red-500 hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default Records;