import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ThemeToggle from "../components/ThemeToggle";

function Signup() {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: "",
    business: "",
    email: "",
    password: "",
    confirmPassword: "",
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
      newErrors.name = "Full name is required.";
    }

    if (!formData.business.trim()) {
      newErrors.business = "Business name is required.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email address is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Enter a valid email address.";
    }

    if (!formData.password) {
      newErrors.password = "Password is required.";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password.";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log("Account created:", formData);

      navigate("/overview");
    }
  };

  return (
    <main className="min-h-screen bg-[var(--bg)] px-6 py-8 text-[var(--text)]">
      {/* Top navigation */}
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <Link
          to="/"
          className="text-2xl font-bold text-[var(--text)]"
        >
          BizManage
        </Link>

        <ThemeToggle />
      </div>

      {/* Signup section */}
      <section className="mx-auto flex min-h-[calc(100vh-100px)] max-w-md items-center py-10">
        <div className="w-full rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-8 shadow-sm">

          <p className="font-semibold tracking-widest text-[var(--status)]">
            GET STARTED
          </p>

          <h1 className="mt-3 text-3xl font-bold">
            Create your account
          </h1>

          <p className="mt-3 leading-7 text-[var(--muted-text)]">
            Start managing your business smarter with BizManage.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">

            {/* Full Name */}
            <div>
              <label htmlFor="name" className="mb-2 block font-medium">
                Full Name
              </label>

              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                className="w-full rounded-lg border border-[var(--border)] bg-[var(--bg)] px-4 py-3 outline-none transition focus:border-[var(--primary)]"
              />

              {errors.name && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.name}
                </p>
              )}
            </div>

            {/* Business Name */}
            <div>
              <label htmlFor="business" className="mb-2 block font-medium">
                Business Name
              </label>

              <input
                id="business"
                name="business"
                type="text"
                value={formData.business}
                onChange={handleChange}
                placeholder="Enter your business name"
                className="w-full rounded-lg border border-[var(--border)] bg-[var(--bg)] px-4 py-3 outline-none transition focus:border-[var(--primary)]"
              />

              {errors.business && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.business}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="mb-2 block font-medium">
                Email Address
              </label>

              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full rounded-lg border border-[var(--border)] bg-[var(--bg)] px-4 py-3 outline-none transition focus:border-[var(--primary)]"
              />

              {errors.email && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.email}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="mb-2 block font-medium">
                Password
              </label>

              <input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Create a password"
                className="w-full rounded-lg border border-[var(--border)] bg-[var(--bg)] px-4 py-3 outline-none transition focus:border-[var(--primary)]"
              />

              {errors.password && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.password}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="mb-2 block font-medium"
              >
                Confirm Password
              </label>

              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
                className="w-full rounded-lg border border-[var(--border)] bg-[var(--bg)] px-4 py-3 outline-none transition focus:border-[var(--primary)]"
              />

              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full rounded-lg bg-[var(--primary)] px-4 py-3 font-semibold text-[#2E2528] transition hover:opacity-90"
            >
              Create Account
            </button>

          </form>

          <p className="mt-6 text-center text-[var(--muted-text)]">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold text-[var(--primary)]"
            >
              Login
            </Link>
          </p>

        </div>
      </section>
    </main>
  );
}

export default Signup;