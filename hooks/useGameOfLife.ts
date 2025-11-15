import { useCallback, useState } from "react";
import { Grid } from "types";
import { emptyGrid, nextGeneration } from "utils/rules";

export function useGameOfLife(initW = 50, initH = 30) {
  const [width, setWidth] = useState(initW);
  const [height, setHeight] = useState(initH);
  const [grid, setGrid] = useState<Grid>(() => emptyGrid(initW, initH));
  const [running, setRunning] = useState(false);
  const [tickCount, setTickCount] = useState(0);

  // NEW: wrap mode
  const [wrap, setWrap] = useState<boolean>(false);

  const step = useCallback(() => {
    setGrid((g) => nextGeneration(g, wrap));
    setTickCount((n) => n + 1);
  }, [wrap]);

  // ... other functions unchanged (reset, setCell, loadPreset etc.)

  const reset = useCallback((w = width, h = height) => {
    setWidth(w);
    setHeight(h);
    setGrid(emptyGrid(w, h));
    setTickCount(0);
    setRunning(false);
  }, [width, height]);

  const setCell = useCallback((x: number, y: number, val: 0 | 1) => {
    setGrid((g) => {
      const ng = g.map((row) => row.slice());
      if (y >= 0 && y < ng.length && x >= 0 && x < ng[0].length) ng[y][x] = val;
      return ng;
    });
  }, []);

  // keep existing loadPreset but do not change width/height unless you want to
  const loadPreset = useCallback((preset: { width: number; height: number; coords: [number, number][] }) => {
    const { width: w, height: h, coords } = preset;
    setGrid((oldGrid) => {
      const H = oldGrid.length;
      const W = H ? oldGrid[0].length : 0;
      const g = emptyGrid(W, H);
      const offsetX = Math.floor((W - w) / 2);
      const offsetY = Math.floor((H - h) / 2);
      coords.forEach(([x, y]) => {
        const tx = x + offsetX;
        const ty = y + offsetY;
        if (ty >= 0 && ty < H && tx >= 0 && tx < W) g[ty][tx] = 1;
      });
      return g;
    });
    setTickCount(0);
    setRunning(false);
  }, []);

  return {
    grid, width, height, running, tickCount,
    setGrid, setCell, setWidth, setHeight,
    setRunning, step, reset, loadPreset,
    wrap, setWrap, // expose wrap state + setter
  };
}
