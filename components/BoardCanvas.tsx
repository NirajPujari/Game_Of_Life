import React, { useEffect, useRef } from "react";
import type { Grid } from "@utils/types";

interface Props {
  grid: Grid;
  cellSize?: number;
  onToggle?: (x: number, y: number) => void;
}

export default function BoardCanvas({ grid, cellSize = 12, onToggle }: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const h = grid.length;
    const w = h ? grid[0].length : 0;
    canvas.width = w * cellSize;
    canvas.height = h * cellSize;

    // background
    const bg =
      getComputedStyle(document.documentElement)
        .getPropertyValue("--bg-canvas")
        .trim() ||
      (document.documentElement.classList.contains("dark")
        ? "#0f172a"
        : "#ffffff");
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    // ctx.clearRect(0, 0, canvas.width, canvas.height);

    // draw cells (no color constants so Tailwind can control via CSS variables)
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        if (grid[y][x]) {
          ctx.fillStyle =
            getComputedStyle(document.documentElement).getPropertyValue(
              "--cell-color"
            ) || "#111";
          ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
        }
      }
    }

    // grid lines (light)
    ctx.strokeStyle =
      getComputedStyle(document.documentElement).getPropertyValue(
        "--grid-color"
      ) || "rgba(0,0,0,0.06)";
    ctx.lineWidth = 0.5;
    for (let x = 0; x <= w; x++) {
      ctx.beginPath();
      ctx.moveTo(x * cellSize + 0.5, 0);
      ctx.lineTo(x * cellSize + 0.5, h * cellSize);
      ctx.stroke();
    }
    for (let y = 0; y <= h; y++) {
      ctx.beginPath();
      ctx.moveTo(0, y * cellSize + 0.5);
      ctx.lineTo(w * cellSize, y * cellSize + 0.5);
      ctx.stroke();
    }
  }, [grid, cellSize]);

  // toggle on click
  const handleClick: React.MouseEventHandler<HTMLCanvasElement> = (e) => {
    if (!canvasRef.current || !onToggle) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const cx = Math.floor((e.clientX - rect.left) / cellSize);
    const cy = Math.floor((e.clientY - rect.top) / cellSize);
    onToggle(cx, cy);
  };

  return (
    <canvas
      ref={canvasRef}
      onClick={handleClick}
      style={{ touchAction: "manipulation" }}
    />
  );
}
