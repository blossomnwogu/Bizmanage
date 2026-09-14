import { useEffect, useState } from "react";

import { useAuth } from "../context/AuthContext";

import {
  getCurrentUser,
  updateCurrentUser,
} from "../api/api";

function Settings() {
  const {
    user,
    login,
  } = useAuth();

  const [formData, setFormData] =
    useState({
      name: "",
      business: "",
      email: "",
    });

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [message, setMessage] =
    useState("");

  const [error, setError] =
    useState("");

  /* LOAD CURRENT USER */
  useEffect(() => {
    let active = true;

    async function loadUser() {
      try {
        setLoading(true);
        setError("");

        const data =
          await getCurrentUser();

        if (!active) return;

        setFormData({
          name: data.name || "",
          business: data.business || "",
          email: data.email || "",
        });
      } catch (error) {
        console.error(
          "Failed to load account:",
          error
        );

        if (active) {
          setError(
            error.message ||
              "Failed to load account."
          );
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadUser();

    return () => {
      active = false;
    };
  }, []);

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

  /* SAVE ACCOUNT */
  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    if (!formData.name.trim()) {
      setError(
        "Full name is required."
      );
      return;
    }

    if (!formData.business.trim()) {
      setError(
        "Business name is required."
      );
      return;
    }

    if (!formData.email.trim()) {
      setError(
        "Email address is required."
      );
      return;
    }

    if (
      !/\S+@\S+\.\S+/.test(
        formData.email
      )
    ) {
      setError(
        "Enter a valid email address."
      );
      return;
    }

    try {
      setSaving(true);

      const updatedUser =
        await updateCurrentUser({
          name: formData.name.trim(),
          business:
            formData.business.trim(),
          email:
            formData.email
              .trim()
              .toLowerCase(),
        });

      /*
       * Keep AuthContext and the
       * navigation header in sync.
       */
      login({
        token:
          localStorage.getItem("token"),
        user: updatedUser,
      });

      setFormData({
        name: updatedUser.name || "",
        business:
          updatedUser.business || "",
        email: updatedUser.email || "",
      });

      setMessage(
        "Account updated successfully."
      );
    } catch (error) {
      console.error(
        "Failed to update account:",
        error
      );

      setError(
        error.message ||
          "Failed to update account."
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div>
        <p className="font-semibold tracking-widest text-[var(--status)]">
          SETTINGS
        </p>

        <h1 className="mt-2 text-3xl font-bold md:text-4xl">
          Manage your account.
        </h1>

        <p className="mt-6 text-[var(--muted-text)]">
          Loading your account...
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* HEADER */}
      <div>
        <p className="font-semibold tracking-widest text-[var(--status)]">
          SETTINGS
        </p>

        <h1 className="mt-2 text-3xl font-bold md:text-4xl">
          Manage your account.
        </h1>

        <p className="mt-3 text-[var(--muted-text)]">
          Update your personal and business information.
        </p>
      </div>

      {/* MESSAGES */}
      {message && (
        <div className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-4 text-sm">
          {message}
        </div>
      )}

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* ACCOUNT INFORMATION */}
      <section className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
        <h2 className="text-xl font-bold">
          Account Information
        </h2>

        <p className="mt-2 text-sm text-[var(--muted-text)]">
          This information is stored securely with your account.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-6 space-y-5"
        >
          {/* NAME */}
          <div>
            <label className="mb-2 block text-sm font-medium">
              Full Name
            </label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full rounded-lg border border-[var(--border)] bg-[var(--bg)] px-4 py-3 outline-none focus:ring-2 focus:ring-[var(--primary)]"
            />
          </div>

          {/* BUSINESS */}
          <div>
            <label className="mb-2 block text-sm font-medium">
              Business Name
            </label>

            <input
              type="text"
              name="business"
              value={formData.business}
              onChange={handleChange}
              className="w-full rounded-lg border border-[var(--border)] bg-[var(--bg)] px-4 py-3 outline-none focus:ring-2 focus:ring-[var(--primary)]"
            />
          </div>

          {/* EMAIL */}
          <div>
            <label className="mb-2 block text-sm font-medium">
              Email Address
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full rounded-lg border border-[var(--border)] bg-[var(--bg)] px-4 py-3 outline-none focus:ring-2 focus:ring-[var(--primary)]"
            />
          </div>

          {/* SAVE */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={saving}
              className="rounded-lg bg-[var(--primary)] px-5 py-3 font-semibold text-[#2E2528] transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving
                ? "Saving..."
                : "Save Changes"}
            </button>
          </div>
        </form>
      </section>

      {/* ACCOUNT STATUS */}
      <section className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
        <h2 className="text-xl font-bold">
          Account Status
        </h2>

        <div className="mt-5 space-y-4">
          <div className="flex flex-col justify-between gap-2 border-b border-[var(--border)] pb-4 sm:flex-row">
            <span className="text-sm text-[var(--muted-text)]">
              Account Name
            </span>

            <span className="font-medium">
              {user?.name || "—"}
            </span>
          </div>

          <div className="flex flex-col justify-between gap-2 border-b border-[var(--border)] pb-4 sm:flex-row">
            <span className="text-sm text-[var(--muted-text)]">
              Business
            </span>

            <span className="font-medium">
              {user?.business || "—"}
            </span>
          </div>

          <div className="flex flex-col justify-between gap-2 sm:flex-row">
            <span className="text-sm text-[var(--muted-text)]">
              Email
            </span>

            <span className="font-medium">
              {user?.email || "—"}
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Settings;