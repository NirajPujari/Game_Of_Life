import type { ConrtolProps } from "types";

export default function Controls({
  running,
  onToggleRun,
  onStep,
  onClear,
  onRandom,
  presets,
  onLoadPreset,
  speedMs,
  onSpeedChange,
  size,
  onSizeChange,
  wrap,
  onWrapToggle,
  minSize = 16,
  maxSize = 160,
  minSpeed = 30,
  maxSpeed = 1500,
}: ConrtolProps) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap items-center gap-2">
        <button
          onClick={onToggleRun}
          className="px-3 py-1.5 rounded-md border shadow-sm bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-sm font-medium"
        >
          {running ? "Pause" : "Run"}
        </button>

        <button
          onClick={onStep}
          className="px-3 py-1.5 rounded-md border border-slate-200 dark:border-slate-700 text-sm"
        >
          Step
        </button>

        <button
          onClick={onClear}
          className="px-3 py-1.5 rounded-md border border-slate-200 dark:border-slate-700 text-sm"
        >
          Clear
        </button>

        <button
          onClick={onRandom}
          className="px-3 py-1.5 rounded-md border border-slate-200 dark:border-slate-700 text-sm"
        >
          Random
        </button>
        <button
          onClick={onWrapToggle}
          className={`px-3 py-1.5 rounded-md border text-sm ${wrap ? "bg-sky-600 text-white border-sky-600" : "bg-transparent"}`}
          title="Toggle edge wrapping (toroidal)"
        >
          {wrap ? "Wrap: On" : "Wrap: Off"}
        </button>
      </div>

      <div className="flex flex-col md:flex-row md:items-center md:gap-6 gap-3">
        {/* Speed slider */}
        <div className="flex-1 min-w-0">
          <label className="block text-xs text-slate-600 dark:text-slate-300 mb-1">
            Speed: {speedMs} ms
          </label>
          <input
            type="range"
            min={minSpeed}
            max={maxSpeed}
            value={speedMs}
            onChange={(e) => onSpeedChange(Number(e.target.value))}
            className="w-full"
          />
        </div>

        {/* Size slider */}
        <div className="w-56">
          <label className="block text-xs text-slate-600 dark:text-slate-300 mb-1">
            Board size: {size} × {size}
          </label>
          <input
            type="range"
            min={minSize}
            max={maxSize}
            value={size}
            onChange={(e) => onSizeChange(Number(e.target.value))}
            className="w-full"
          />
        </div>
      </div>
      
      <div className="flex flex-wrap items-center gap-2">
        <div className="ml-2 text-sm text-slate-600 dark:text-slate-300">
          Presets:
        </div>
        <div className="flex gap-2 overflow-x-auto px-1">
          {presets.map((p) => (
            <button
              key={p.id}
              onClick={() => onLoadPreset(p)}
              className="px-2 py-1 rounded-md border border-slate-200 dark:border-slate-700 text-sm hover:scale-105 transition"
              title={p.name}
            >
              {p.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
