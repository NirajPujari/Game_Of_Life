import { useCallback, useState } from "react";
import { Grid } from "@utils/types";
import { emptyGrid, nextGeneration } from "@utils/rules";

export function useGameOfLife(initW = 50, initH = 30) {
  const [width, setWidth] = useState(initW);
  const [height, setHeight] = useState(initH);
  const [grid, setGrid] = useState<Grid>(() => emptyGrid(initW, initH));
  const [running, setRunning] = useState(false);
  const [tickCount, setTickCount] = useState(0);

  const step = useCallback(() => {
    setGrid((g) => nextGeneration(g));
    setTickCount((n) => n + 1);
  }, []);

  const reset = useCallback(
    (w = width, h = height) => {
      setWidth(w);
      setHeight(h);
      setGrid(emptyGrid(w, h));
      setTickCount(0);
      setRunning(false);
    },
    [width, height]
  );

  const setCell = useCallback((x: number, y: number, val: 0 | 1) => {
    setGrid((g) => {
      const ng = g.map((row) => row.slice());
      if (y >= 0 && y < ng.length && x >= 0 && x < ng[0].length) ng[y][x] = val;
      return ng;
    });
  }, []);

  const loadPreset = useCallback(
    (preset: { width: number; height: number; coords: [number, number][] }) => {
      setGrid((oldGrid) => {
        const h = oldGrid.length;
        const w = h ? oldGrid[0].length : 0;
        const g = emptyGrid(w, h);

        // compute offset to center the preset inside the fixed board
        const offsetX = Math.floor((w - preset.width) / 2);
        const offsetY = Math.floor((h - preset.height) / 2);

        preset.coords.forEach(([x, y]) => {
          const tx = x + offsetX;
          const ty = y + offsetY;
          if (ty >= 0 && ty < h && tx >= 0 && tx < w) g[ty][tx] = 1;
        });

        return g;
      });
      setTickCount(0);
      setRunning(false);
    },
    []
  );

  return {
    grid,
    width,
    height,
    running,
    tickCount,
    setGrid,
    setCell,
    setWidth,
    setHeight,
    setRunning,
    step,
    reset,
    loadPreset,
  };
}
