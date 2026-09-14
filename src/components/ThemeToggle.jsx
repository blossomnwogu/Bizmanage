import { useEffect, useState } from "react";
import { assets } from "../assets/assets.js";

function ThemeToggle() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((currentTheme) =>
      currentTheme === "light" ? "dark" : "light"
    );
  };

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className="theme-toggle"
    >
      {theme === "light" ? <img src={assets.light} alt="Light theme" /> : <img src={assets.dark} alt="Dark theme" />}
    </button>
  );
}

export default ThemeToggle;