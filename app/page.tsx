"use client";
import { useCallback, useState } from "react";
import BoardCanvas from "@components/BoardCanvas";
import Controls from "@components/Controls";
import { useGameOfLife } from "@hooks/useGameOfLife";
import { PRESETS } from "@utils/presets";
import { useInterval } from "@hooks/useInterval";
import { Grid } from "@/utils/types";

export default function Page() {
  const {
    grid,
    width,
    height,
    running,
    setCell,
    setGrid,
    setRunning,
    step,
    reset,
    loadPreset,
  } = useGameOfLife(60, 40);

  // UI state
  const [speedMs, setSpeedMs] = useState<number>(150); // delay in ms
  const [size, setSize] = useState<number>(Math.max(width, height)); // square board size

  // interval runner
  useInterval(
    () => {
      if (running) step();
    },
    running ? speedMs : null
  );

  const onToggleCell = useCallback(
    (x: number, y: number) => {
      setCell(x, y, grid[y][x] ? 0 : 1);
    },
    [grid, setCell]
  );

  const onRandom = useCallback(() => {
    const g = grid.map((row) => row.map(() => (Math.random() > 0.75 ? 1 : 0)));
    setGrid(g);
  }, [grid, setGrid]);

  // Resize board while preserving current pattern centered in the new board
  const handleSizeChange = useCallback(
    (newSize: number) => {
      // clamp and ensure integer
      const s = Math.max(8, Math.floor(newSize));
      const oldH = grid.length;
      const oldW = oldH ? grid[0].length : 0;

      // build empty new grid
      const newGrid = Array.from({ length: s }, () => Array.from({ length: s }, () => 0));

      // compute offsets to center old grid in new grid
      const offsetX = Math.floor((s - oldW) / 2);
      const offsetY = Math.floor((s - oldH) / 2);

      // copy old into new
      for (let y = 0; y < oldH; y++) {
        for (let x = 0; x < oldW; x++) {
          const nx = x + offsetX;
          const ny = y + offsetY;
          if (ny >= 0 && ny < s && nx >= 0 && nx < s) {
            newGrid[ny][nx] = grid[y][x];
          }
        }
      }

      // reset hook dims (clears to empty) then set our preserved grid
      // reset exists in the hook signature; it sets internal width/height and clears grid
      reset(s, s);
      setGrid(newGrid as Grid);
      setSize(s);
      setRunning(false);
    },
    [grid, reset, setGrid, setRunning]
  );

  // size slider initial sync if user resizes externally
  // (optional) if hook exposes width/height changes elsewhere, we keep local size aligned when page mounts:
  // setSize(Math.max(width, height));

  return (
    <div className="mt-4 grid grid-cols-1 md:grid-cols-[1fr,320px] gap-4">
      <div className="rounded-lg shadow-sm border dark:border-slate-800 overflow-auto p-3 bg-white dark:bg-slate-900">
        <div className="flex items-center justify-between mb-2">
          <div className="text-sm text-slate-600 dark:text-slate-300">Board</div>
          <div className="text-xs text-slate-400 dark:text-slate-500">Click to toggle cells</div>
        </div>
        <div className="flex justify-center items-start">
          <BoardCanvas grid={grid} cellSize={Math.max(6, Math.floor(480 / size))} onToggle={onToggleCell} />
        </div>
      </div>

      <aside className="space-y-3">
        <Controls
          running={running}
          onToggleRun={() => setRunning((r) => !r)}
          onStep={() => step()}
          onClear={() => reset(width, height)}
          onRandom={onRandom}
          presets={PRESETS}
          onLoadPreset={(p) => loadPreset(p)}
          speedMs={speedMs}
          onSpeedChange={(ms) => setSpeedMs(ms)}
          size={size}
          onSizeChange={(s) => handleSizeChange(s)}
          minSize={16}
          maxSize={160}
          minSpeed={30}
          maxSpeed={1500}
        />
      </aside>
    </div>
  );
}
