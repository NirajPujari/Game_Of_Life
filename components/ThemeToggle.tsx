export default function ThemeToggle({ theme, setTheme }: { theme: "light"|"dark"; setTheme: (t: "light"|"dark") => void }) {
  return (
    <button className="btn" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
      {theme === "dark" ? "Light" : "Dark"}
    </button>
  );
}
