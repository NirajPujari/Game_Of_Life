export type Cell = 0 | 1;
export type Grid = Cell[][];
export interface Preset {
  id: string;
  name: string;
  width: number;
  height: number;
  coords: Array<[number, number]>; // live cells
}
