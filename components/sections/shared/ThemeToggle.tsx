"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
      setIsDark(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setIsDark(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setIsDark(true);
    }
  };

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <div className="w-14 h-7 rounded-full bg-muted border border-border" />
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className="relative w-14 h-7  cursor-pointer rounded-full transition-colors duration-300 focus:outline-none focus:ring-primary focus:ring-offset-2 bg-muted border border-border hover:border-foreground/50"
      aria-label="Toggle theme"
    >
      {/* Track */}
      <div className="absolute inset-0 rounded-full overflow-hidden">
        <div
          className={`absolute inset-0 transition-opacity duration-300 ${
            isDark ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="w-full h-full bg-foreground" />
        </div>
      </div>

      {/* Slider */}
      <div
        className={`absolute top-0.5  left-0.5 w-6 h-6 bg-background rounded-full shadow-md transform transition-all duration-300 ease-in-out border border-border ${
          isDark ? "translate-x-7" : "translate-x-0"
        }`}
      >
        {/* Icon inside slider */}
        <div className="w-full h-full flex items-center justify-center">
          {isDark ? (
            // Moon icon
            <svg
              className="w-3.5 h-3.5 text-foreground animate-fade-in"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
            </svg>
          ) : (
            // Sun icon
            <svg
              className="w-3.5 h-3.5 text-foreground animate-fade-in"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </div>
      </div>
    </button>
  );
}
