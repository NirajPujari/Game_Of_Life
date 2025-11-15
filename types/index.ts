export type Cell = 0 | 1;
export type Grid = Cell[][];
export interface Preset {
  id: string;
  name: string;
  width: number;
  height: number;
  coords: Array<[number, number]>; // live cells
}

export interface BoardProps {
  grid: Grid;
  cellSize?: number;
  onToggle?: (x: number, y: number) => void;
}


export interface ConrtolProps {
  running: boolean;
  onToggleRun: () => void;
  onStep: () => void;
  onClear: () => void;
  onRandom: () => void;
  presets: Preset[];
  onLoadPreset: (p: Preset) => void;
  speedMs: number; // current delay in ms
  onSpeedChange: (ms: number) => void;
  size: number; // current board size (square board)
  onSizeChange: (size: number) => void;
  wrap: boolean;
  onWrapToggle: () => void;
  minSize?: number;
  maxSize?: number;
  minSpeed?: number;
  maxSpeed?: number;
}