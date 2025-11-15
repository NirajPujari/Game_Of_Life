import { Moon, Sun } from "lucide-react";

export default function ThemeToggle({ theme, setTheme }: { theme: "light"|"dark"; setTheme: (t: "light"|"dark") => void }) {
  return (
    <button
  className="btn p-2"
  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
>
  {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
</button>

  );
}
