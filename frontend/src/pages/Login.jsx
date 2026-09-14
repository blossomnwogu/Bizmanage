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

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
    
    //Clear the error for this field when the user starts typing
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

    // Stop if validation failed
    if (Object.keys(newErrors).length > 0) {
      return;
    }

    try {
      setLoading(true);

      const data = await loginUser({
        email: formData.email,
        password: formData.password,
      });

      //Save token and user through AuthContext
      login(data);

      //Go to the dashboard
      navigate("/overview");
    } catch (error) {
      setErrors({
        general: error.message || "Login failed. Please try again.",
      });
    } finally {
      setLoading(false);
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

      {/* Login area */}
      <section className="mx-auto flex min-h-[calc(100vh-100px)] max-w-md items-center">
        <div className="w-full rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-8 shadow-sm">

          <p className="font-semibold tracking-widest text-[var(--status)]">
            WELCOME BACK
          </p>

          <h1 className="mt-3 text-3xl font-bold">
            Login to your account
          </h1>

          <p className="mt-3 leading-7 text-[var(--muted-text)]">
            Enter your details to continue managing your business.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            {/* General error */}
            {errors.general && (
              <div className="rounded-lg border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-600">
                {errors.general}
              </div>
            )}

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="mb-2 block font-medium"
              >
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
              <div className="mb-2 flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="font-medium"
                >
                  Password
                </label>

                <a
                  href="#forgot-password"
                  className="text-sm font-medium text-[var(--primary)]"
                >
                  Forgot password?
                </a>
              </div>

              <input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="w-full rounded-lg border border-[var(--border)] bg-[var(--bg)] px-4 py-3 outline-none transition focus:border-[var(--primary)]"
              />

              {errors.password && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.password}
                </p>
              )}
            </div>

            {/* Remember me */}
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                className="h-4 w-4"
              />

              Remember me
            </label>

            {/* Login button */}
            <button
              type="submit"
              className="w-full rounded-lg bg-[var(--primary)] px-4 py-3 font-semibold text-[#2E2528] transition hover:opacity-90"
            >
              {loading ? "Logging in..." : "Login"}
            </button>

          </form>

          {/* Signup link */}
          <p className="mt-6 text-center text-[var(--muted-text)]">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="font-semibold text-[var(--primary)]"
            >
              Create an account
            </Link>
          </p>

        </div>
      </section>
    </main>
  );
}

export default Login;