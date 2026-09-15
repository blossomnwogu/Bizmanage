import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import ThemeToggle from "../components/ThemeToggle";
import { loginUser } from "../api/api";
import { useAuth } from "../context/AuthContext";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));

    setErrors((current) => ({
      ...current,
      [name]: "",
      general: "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email address is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Enter a valid email address.";
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required.";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    try {
      setLoading(true);

      const data = await loginUser({
        email: formData.email,
        password: formData.password,
      });

      // Save token and user through AuthContext
      login(data);

      // Go to dashboard
      navigate("/overview");
    } catch (error) {
      setErrors({
        general:
          error.message || "Login failed. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main
      className="relative min-h-screen overflow-hidden bg-cover bg-center bg-no-repeat text-[#30292c]"
      style={{
        backgroundImage: "url('/images/Login.png')",
      }}
    >
      {/* Soft overlay for readability */}
      <div className="absolute inset-0 bg-white/5" />

      {/* Theme toggle */}
      <div className="absolute right-6 top-6 z-30">
        <ThemeToggle />
      </div>

      {/* Login content */}
      <section className="relative z-10 flex min-h-screen items-center justify-end px-5 py-8 sm:px-8 lg:pr-[14%]">
        <div
          className="
            w-full
            max-w-[555px]
            rounded-[20px]
            border border-white/60
            bg-white/25
            p-7
            shadow-[0_20px_60px_rgba(0,0,0,0.12)]
            backdrop-blur-md
            sm:p-9
            md:p-10
          "
        >
          {/* Heading */}
          <div>
            <p className="text-sm font-bold tracking-[0.12em] text-[#899575]">
              WELCOME BACK
            </p>

            <h1 className="mt-2 text-3xl font-bold leading-tight text-[#30292c] sm:text-[38px]">
              Login to your account
            </h1>

            <p className="mt-3 max-w-[470px] text-base leading-7 text-[#777275] sm:text-lg">
              Enter your details to continue managing your business.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            {/* General error */}
            {errors.general && (
              <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                {errors.general}
              </div>
            )}

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-base font-semibold text-[#30292c]"
              >
                Email Address
              </label>

              <div className="relative">
                {/* Email icon */}
                <svg
                  className="pointer-events-none absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-[#30292c]"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <rect
                    x="3"
                    y="5"
                    width="18"
                    height="14"
                    rx="2"
                  />
                  <path d="m3 7 9 6 9-6" />
                </svg>

                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  autoComplete="email"
                  className="
                    w-full
                    rounded-xl
                    border border-[#d8d2d2]
                    bg-white/70
                    py-4
                    pl-14
                    pr-4
                    text-base
                    text-[#30292c]
                    outline-none
                    transition
                    placeholder:text-[#999395]
                    focus:border-[#899575]
                    focus:ring-2
                    focus:ring-[#899575]/20
                  "
                />
              </div>

              {errors.email && (
                <p className="mt-1.5 text-sm text-red-500">
                  {errors.email}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <div className="mb-2 flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="text-base font-semibold text-[#30292c]"
                >
                  Password
                </label>
              </div>

              <div className="relative">
                {/* Lock icon */}
                <svg
                  className="pointer-events-none absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-[#30292c]"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <rect
                    x="5"
                    y="10"
                    width="14"
                    height="10"
                    rx="2"
                  />
                  <path d="M8 10V7a4 4 0 0 1 8 0v3" />
                </svg>

                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  className="
                    w-full
                    rounded-xl
                    border border-[#d8d2d2]
                    bg-white/70
                    py-4
                    pl-14
                    pr-14
                    text-base
                    text-[#30292c]
                    outline-none
                    transition
                    placeholder:text-[#999395]
                    focus:border-[#899575]
                    focus:ring-2
                    focus:ring-[#899575]/20
                  "
                />

                {/* Show password */}
                <button
                  type="button"
                  onClick={() =>
                    setShowPassword((current) => !current)
                  }
                  aria-label={
                    showPassword
                      ? "Hide password"
                      : "Show password"
                  }
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-[#30292c] transition hover:text-[#899575]"
                >
                  {showPassword ? (
                    <svg
                      className="h-5 w-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M3 3l18 18" />
                      <path d="M10.6 10.6a2 2 0 0 0 2.8 2.8" />
                      <path d="M9.9 4.2A10.8 10.8 0 0 1 12 4c5 0 8.5 4 9.5 6-.4.8-1.4 2.2-3 3.5" />
                      <path d="M6.2 6.2C4.3 7.5 2.9 9.3 2.5 10c1 2 4.5 6 9.5 6 1 0 1.9-.2 2.8-.5" />
                    </svg>
                  ) : (
                    <svg
                      className="h-5 w-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z" />
                      <circle cx="12" cy="12" r="2.5" />
                    </svg>
                  )}
                </button>
              </div>

              {errors.password && (
                <p className="mt-1.5 text-sm text-red-500">
                  {errors.password}
                </p>
              )}
            </div>

            {/* Remember + Forgot password */}
            <div className="flex items-center justify-between gap-4">
              <label className="flex cursor-pointer items-center gap-3 text-sm text-[#555053]">
                <input
                  type="checkbox"
                  className="
                    h-5
                    w-5
                    cursor-pointer
                    rounded
                    border-[#d8d2d2]
                    accent-[#d58f92]
                  "
                />

                <span>Remember me</span>
              </label>

              <a
                href="#forgot-password"
                className="text-sm font-medium text-[#899575] transition hover:underline"
              >
                Forgot password?
              </a>
            </div>

            {/* Login button */}
            <button
              type="submit"
              disabled={loading}
              className="
                w-full
                rounded-full
                bg-[#30292c]
                px-6
                py-4
                text-base
                font-bold
                tracking-wide
                text-white
                shadow-sm
                transition
                hover:bg-[#40373b]
                disabled:cursor-not-allowed
                disabled:opacity-60
              "
            >
              {loading ? "SIGNING IN..." : "SIGN IN"}
            </button>
          </form>

          {/* Divider */}
          <div className="my-7 h-px bg-[#ded9d9]" />

          {/* Signup */}
          <p className="text-center text-sm text-[#777275] sm:text-base">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="font-semibold text-[#d58f92] transition hover:underline"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}

export default Login;