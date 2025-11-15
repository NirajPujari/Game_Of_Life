"use client";
import "./globals.css";
import { useEffect, useState } from "react";
import ThemeToggle from "@components/ThemeToggle";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    if (typeof window === "undefined") return "light";
    return (localStorage.getItem("theme") as "light" | "dark") || "light";
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") root.classList.add("dark");
    else root.classList.remove("dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <html lang="en">
      <body className="bg-white text-slate-800 dark:bg-slate-900 dark:text-slate-100 min-h-screen">
        <header className="px-4 py-3 border-b border-slate-200 dark:border-slate-800/60">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <h1 className="text-lg font-semibold">Game of Life</h1>
            <div className="flex items-center gap-3">
              <ThemeToggle theme={theme} setTheme={setTheme} />
            </div>
          </div>
        </header>

        <main className="max-w-6xl mx-auto p-4">
          {children}
        </main>
      </body>
    </html>
  );
}
