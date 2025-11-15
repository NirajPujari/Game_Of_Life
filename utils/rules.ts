import { Grid } from "./types";

export function emptyGrid(w: number, h: number): Grid {
  return Array.from({ length: h }, () => Array.from({ length: w }, () => 0));
}

export function nextGeneration(grid: Grid): Grid {
  const h = grid.length;
  const w = h ? grid[0].length : 0;
  const out = emptyGrid(w, h);

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const alive = grid[y][x] === 1;
      let neighbors = 0;
      for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          if (dx === 0 && dy === 0) continue;
          const nx = x + dx;
          const ny = y + dy;
          if (nx >= 0 && nx < w && ny >= 0 && ny < h) {
            neighbors += grid[ny][nx];
          }
        }
      }
      if (alive && (neighbors === 2 || neighbors === 3)) out[y][x] = 1;
      else if (!alive && neighbors === 3) out[y][x] = 1;
      else out[y][x] = 0;
    }
  }
  return out;
}
