"use client";

import Link from "next/link";
import { PRESETS } from "utils/presets";
import type { Preset } from "types";
import { Info } from "lucide-react";

/**
 * Landing page with expanded preset info and larger thumbnails.
 * Paste this as app/page.tsx
 */

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-950">
      <header className="border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="rounded-md p-2 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700">
              <Info className="w-6 h-6 text-slate-800 dark:text-slate-100" />
            </div>
            <div>
              <div className="text-lg font-semibold text-slate-900 dark:text-slate-50">
                Game of Life
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400">
                Conway • Cellular automata
              </div>
            </div>
          </div>

          <nav className="flex items-center gap-3">
            <Link
              href="/game"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-slate-800 text-white dark:bg-slate-200 dark:text-slate-900 border border-slate-700 hover:brightness-95 transition"
            >
              Open the Game
            </Link>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Hero */}
        <section className="grid gap-8 md:grid-cols-2 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight text-slate-900 dark:text-slate-50">
              Conway’s Game of Life — explore emergent behavior
            </h1>
            <p className="mt-4 text-lg text-slate-600 dark:text-slate-300 max-w-xl">
              Interactive, performant, and playable — load classic seeds, tweak
              speed and size, paint cells, and observe how simple rules produce
              unexpected complexity.
            </p>

            <div className="mt-6 flex items-center gap-3">
              <Link
                href="/game"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-md bg-emerald-600 text-white font-semibold hover:opacity-95 transition"
              >
                Try it now
              </Link>

              <a
                href="#presets"
                className="text-sm text-slate-700 dark:text-slate-300 hover:underline"
              >
                Learn about presets
              </a>
            </div>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Feature
                title="Fast Canvas renderer"
                desc="Smooth updates for large boards."
              />
              <Feature
                title="Dark & Light themes"
                desc="Global theme that affects the whole UI."
              />
            </div>
          </div>

          {/* Visual preview */}
          <div className="rounded-lg p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
            <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-50 mb-3">
              Sample presets
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {PRESETS.slice(0, 4).map((p) => (
                <div key={p.id} className="flex items-center gap-3">
                  <PresetThumb preset={p} maxSize={96} cellSize={6} />
                  <div>
                    <div className="text-sm font-medium text-slate-900 dark:text-slate-50">
                      {p.name}
                    </div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">
                      {p.width}×{p.height} • {p.coords.length} cells
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 text-xs text-slate-500 dark:text-slate-400">
              These are small examples — open the game to try larger presets
              like the Gosper Glider Gun.
            </div>
          </div>
        </section>

        {/* Presets list with richer information */}
        <section id="presets" className="mt-12">
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-50 mb-4">
            Presets & Detailed Notes
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-300 mb-6 max-w-3xl">
            Below each preset you’ll find a short description, the pattern type
            (oscillator, spaceship, gun, seed), typical behavior/period where
            applicable, and a short origin or usage note.
          </p>

          <div className="grid auto-rows-[1fr] grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {PRESETS.map((p) => {
              let spanClass = "";

              if (p.width > 35) {
                spanClass = "lg:col-span-3 lg:row-span-2";
              } else if (p.width > 20) {
                spanClass = "lg:col-span-2";
              } else if (p.width > 12) {
                spanClass = "lg:col-span-2";
              } else {
                spanClass = "";
              }

              return (
                <div key={p.id} className={spanClass}>
                  <PresetInfoCard preset={p} />
                </div>
              );
            })}
          </div>
        </section>
      </main>
    </div>
  );
}

/* small components used by landing page */
function Feature({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="rounded-md p-3 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700">
      <div className="text-sm font-semibold text-slate-900 dark:text-slate-50">
        {title}
      </div>
      <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
        {desc}
      </div>
    </div>
  );
}

/* Preset info card — larger thumbnail + richer metadata */
function PresetInfoCard({ preset }: { preset: Preset }) {
  const meta = getPresetMeta(preset.id);

  return (
    <article className="flex flex-col gap-3 px-4 py-8 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
      <div className="flex items-start gap-4 ">
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3">
            <h3 className="text-base font-semibold text-slate-900 dark:text-slate-50 truncate">
              {preset.name}
            </h3>
            <PresetThumb preset={preset} maxSize={300} cellSize={6} />
          </div>

          <p className="mt-2 text-sm text-slate-700 dark:text-slate-300">
            {meta.description}
          </p>

          <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-slate-600 dark:text-slate-400">
            <div>
              <strong>Type:</strong> {meta.type}
            </div>
            <div>
              <strong>Period / Behavior:</strong> {meta.period}
            </div>
            <div className="col-span-2">
              <strong>Origin / Notes:</strong> {meta.origin}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

/* THUMBNAIL: larger safe thumbnail with scaling */
function PresetThumb({
  preset,
  maxSize = 96,
  cellSize = 5,
}: {
  preset: Preset;
  maxSize?: number;
  cellSize?: number;
}) {
  const pad = 4;
  const rawW = preset.width * cellSize + pad * 2;
  const rawH = preset.height * cellSize + pad * 2;

  const scale = Math.min(maxSize / rawW, maxSize / rawH, 1);
  const width = Math.round(rawW * scale);
  const height = Math.round(rawH * scale);

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${rawW} ${rawH}`}
      className="flex-none rounded-md border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800"
      aria-hidden
    >
      <rect x="0" y="0" width={rawW} height={rawH} fill="none" />
      <g transform={`scale(${scale})`}>
        <rect
          x={pad}
          y={pad}
          width={preset.width * cellSize}
          height={preset.height * cellSize}
          rx={6}
          fill="transparent"
          stroke="rgba(0,0,0,0.06)"
        />
        {preset.coords.map(([x, y], i) => (
          <rect
            key={i}
            x={pad + x * cellSize + 1}
            y={pad + y * cellSize + 1}
            width={cellSize - 2}
            height={cellSize - 2}
            rx={1}
            fill="currentColor"
            className="text-slate-800 dark:text-slate-100"
          />
        ))}
      </g>
    </svg>
  );
}

/* richer metadata for presets */
function getPresetMeta(id: string) {
  const db: Record<
    string,
    { description: string; type: string; period: string; origin: string }
  > = {
    glider: {
      description:
        "A tiny 5-cell seed that moves diagonally across the board (a 'spaceship'). Useful as a basic moving component.",
      type: "Spaceship",
      period: "Translates every 4 generations",
      origin:
        "Discovered in early Life experiments; commonly used to build conveyors and colliders.",
    },
    blinker: {
      description:
        "The smallest oscillator: a 3-cell line that flips between horizontal and vertical.",
      type: "Oscillator",
      period: "2",
      origin:
        "Classic minimal oscillator — useful to demonstrate periodic behavior.",
    },
    toad: {
      description:
        "A slightly larger period-2 oscillator that appears as two offset rows interacting.",
      type: "Oscillator",
      period: "2",
      origin:
        "A common small oscillator; interacts interestingly with nearby patterns.",
    },
    beacon: {
      description:
        "Two 2×2 blocks that interact to form a blinking 2-period oscillator.",
      type: "Oscillator / Block-pair",
      period: "2",
      origin:
        "Simple block interaction that demonstrates local stability and periodic exchange.",
    },
    lwss: {
      description:
        "Lightweight spaceship — a compact moving pattern that travels horizontally across the board.",
      type: "Spaceship",
      period: "4 (translates)",
      origin:
        "One of the smallest spaceships; often used for tests and moving constructions.",
    },
    acorn: {
      description:
        "A tiny seed that grows into a long, chaotic evolution with many transient structures.",
      type: "Seed / Explorer",
      period: "N/A (growth)",
      origin: "Famous for producing a very complex growth from a tiny start.",
    },
    gosper: {
      description:
        "Gosper Glider Gun — a self-replicating gun that periodically emits gliders forever.",
      type: "Gun (Emitter)",
      period: "30 (emits a glider periodically)",
      origin:
        "One of the first discovered glider guns; historically important in Life research.",
    },
    random_small: {
      description:
        "A sparse random seed — ideal for exploring chaotic and emergent dynamics.",
      type: "Random Seed",
      period: "Unpredictable",
      origin: "Generated randomly — expect varied outcomes on each run.",
    },
  };

  return (
    db[id] ?? {
      description: "A preset pattern.",
      type: "Unknown",
      period: "Unknown",
      origin: "Unknown",
    }
  );
}
