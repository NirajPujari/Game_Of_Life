import { Preset } from "../types";

/*
  Each preset has:
    - id, name
    - width, height: bounding box for the pattern
    - coords: array of [x,y] live cells inside the bounding box
*/

export const PRESETS: Preset[] = [
  {
    id: "glider",
    name: "Glider",
    width: 10,
    height: 10,
    coords: [
      [1, 0],
      [2, 1],
      [0, 2],
      [1, 2],
      [2, 2],
    ],
  },

  {
    id: "blinker",
    name: "Blinker",
    width: 5,
    height: 5,
    coords: [
      [1, 2],
      [2, 2],
      [3, 2],
    ],
  },

  {
    id: "toad",
    name: "Toad",
    width: 6,
    height: 6,
    coords: [
      [2, 2],
      [3, 2],
      [4, 2],
      [1, 3],
      [2, 3],
      [3, 3],
    ],
  },

  {
    id: "beacon",
    name: "Beacon",
    width: 6,
    height: 6,
    coords: [
      [1, 1],
      [2, 1],
      [1, 2],
      [2, 2],
      [3, 3],
      [4, 3],
      [3, 4],
      [4, 4],
    ],
  },

  {
    id: "lwss",
    name: "Lightweight Spaceship",
    width: 8,
    height: 5,
    coords: [
      [1, 0],
      [4, 0],
      [0, 1],
      [0, 2],
      [4, 2],
      [4, 3],
      [1, 4],
      [2, 4],
      [3, 4],
      [4, 4],
    ],
  },

  {
    id: "acorn",
    name: "Acorn",
    width: 7,
    height: 3,
    coords: [
      [0, 1],
      [1, 1],
      [1, 0],
      [3, 1],
      [4, 1],
      [5, 1],
      [6, 1],
    ],
  },

  {
    id: "gosper",
    name: "Gosper Glider Gun",
    width: 38,
    height: 9,
    coords: [
      [0, 4],
      [1, 4],
      [0, 5],
      [1, 5],
      [10, 4],
      [10, 5],
      [10, 6],
      [11, 3],
      [11, 7],
      [12, 2],
      [12, 8],
      [13, 2],
      [13, 8],
      [14, 5],
      [15, 3],
      [15, 7],
      [16, 4],
      [16, 5],
      [16, 6],
      [17, 5],
      [20, 2],
      [20, 3],
      [20, 4],
      [21, 2],
      [21, 3],
      [21, 4],
      [22, 1],
      [22, 5],
      [24, 0],
      [24, 1],
      [24, 5],
      [24, 6],
      [34, 2],
      [34, 3],
      [35, 2],
      [35, 3],
    ],
  },
];
