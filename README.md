# 🌟 Game of Life 

A fast, interactive, and fully customizable implementation of Conway’s Game of Life
built using Next.js (App Router), TypeScript, Tailwind CSS, and a high-performance
Canvas renderer. The project includes a clean landing page, detailed preset info,
wrap-mode simulation, adjustable speed and board size, and user-friendly editing tools.


## ✨ Features

- ⚡ Real-time Game of Life simulation
- 🎨 Canvas-based renderer for smooth performance
- 🌙 / ☀️ Dark–Light theme toggle
- 🔁 Wrap mode (toroidal grid) toggle
- ⏱️ Speed slider (simulation tick rate)
- 🔍 Size slider (dynamic board scaling with center preservation)
- 🖱️ Click-to-toggle cells
- 🎲 Random board generator
- 🧹 Clear board
- ⏭️ Step mode (one generation at a time)
- 📦 Preset loader (Glider, LWSS, Toad, Beacon, Glider Gun, Acorn, etc.)
- 🖼️ Auto-scaled pattern thumbnails
- 📱 Fully responsive UI with Tailwind CSS
- 🧩 Modular architecture with isolated hooks + components

## 📁 Folder Structure

```
/app  
  ├── page.tsx  
  │     → Landing page (hero, preset info)  
  ├── game/page.tsx  
  │     → Main interactive Game of Life simulation  
  └── layout.tsx  
       → Theme + global layout  

/components  
  ├── BoardCanvas.tsx  
  │     → Canvas renderer for the grid  
  ├── Controls.tsx  
  │     → All UI controls (speed, size, wrap, presets)  
  └── ThemeToggle.tsx  
       → Light/Dark mode toggle  

/hooks  
  ├── useGameOfLife.ts  
  │     → Core logic: grid state, stepping, resizing, wrap mode  
  ├── useInterval.ts  
  │     → Frame timing hook  
  └── useLocalStorage.ts  
       → Optional persistence utilities  

/utils  
  ├── presets.ts  
  │     → Built‑in preset patterns  
  ├── rules.ts  
  │     → Life rules with wrap‑mode support  
  └── types.ts  
       → Shared Cell/Grid types  

/styles  
  └── globals.css  
       → Tailwind base + custom variables  
```
## 🛠️ Tech Stack

- Next.js (App Router)  
- React 18  
- TypeScript  
- Tailwind CSS  
- lucide-react (icons)  
- Canvas 2D for rendering  
- Toroidal logic for wrap mode

## 🚀 Run Locally

 1. Clone the project:
    ```bash
    git clone https://github.com/NirajPujari/Game_Of_Life
    ```

2. Go to the project directory:
    ```bash
    cd Game_Of_Life
    ```

3. Install dependencies:
    ```bash
    npm install
    ```

4. Start the server:
    ```bash
    npm run start
    ```

5. Open in browser:
    ```bash
    http://localhost:3000/
    ```

## 🧠 How the Game Works

Each cell on the grid is either **alive (1)** or **dead (0)**.  
On each generation, the entire grid updates simultaneously following Conway’s rules:

1. **Underpopulation:**  
   A live cell with fewer than 2 neighbors dies.
2. **Survival:**  
   A live cell with 2 or 3 neighbors stays alive.
3. **Overpopulation:**  
   A live cell with more than 3 neighbors dies.
4. **Reproduction:**  
   A dead cell with exactly 3 neighbors becomes alive.

With **Wrap Mode** enabled, the grid behaves like a torus (donut shape), so cells that leave  
one edge reappear on the opposite side.


## 🎮 Controls

| Control         | Description |
|-----------------|-------------|
| **Run / Pause** | Start or stop the simulation |
| **Step**        | Advance by one generation |
| **Clear**       | Reset the board to all-dead cells |
| **Random**      | Fill the grid with a random distribution |
| **Speed Slider** | Adjust the simulation tick rate |
| **Size Slider**  | Resize the board (pattern stays centered) |
| **Wrap Mode**    | Toggle edge wrapping (toroidal behavior) |
| **Presets Panel** | Load classic patterns centered in the board |
| **Theme Toggle** | Switch between Light / Dark mode |

## 🧬 Presets Included

- **Glider** – diagonal spaceship  
- **Blinker** – smallest oscillator  
- **Toad** – period-2 oscillator  
- **Beacon** – oscillating block pair  
- **LWSS** – lightweight spaceship  
- **Acorn** – tiny seed that explodes into chaos  
- **Gosper Glider Gun** – produces gliders indefinitely  
- **Random Small Seed** – experimental, unpredictable patterns

Each preset includes:

- A **scaled thumbnail preview**  
- A **detailed description**  
- **Pattern type** (spaceship, oscillator, gun, etc.)  
- **Period or behavior details**  
- **Origin or historical context**  

## 📄 License
MIT


## 👤 Authors

- [@Niraj Pujari](https://github.com/NirajPujari)

