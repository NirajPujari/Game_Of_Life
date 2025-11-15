import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Game Of Life",
  description:
    "A fast, interactive Conway’s Game of Life built with Next.js, TypeScript, and Tailwind, featuring presets, theme switching, and fully customizable simulation controls.",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  

  return (
    <html lang="en">
      <body className="bg-white text-slate-800 dark:bg-slate-900 dark:text-slate-100 min-h-screen">
        {children}
      </body>
    </html>
  );
}
