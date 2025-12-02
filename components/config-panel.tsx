"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

interface ConfigPanelProps {
  cnfInput: string;
  setCnfInput: (val: string) => void;
  numVars: number;
  setNumVars: (val: number) => void;
  mode: string;
  setMode: (val: string) => void;
  sampleSize: number;
  setSampleSize: (val: number) => void;
  amplificationFactor: number;
  setAmplificationFactor: (val: number) => void;
  onRun: () => void;
  onLoadExample: (example: string) => void;
  error: string;
}

export default function ConfigPanel({
  cnfInput,
  setCnfInput,
  numVars,
  setNumVars,
  mode,
  setMode,
  sampleSize,
  setSampleSize,
  amplificationFactor,
  setAmplificationFactor,
  onRun,
  onLoadExample,
  error,
}: ConfigPanelProps) {
  return (
    <motion.div
      className="lg:col-span-1 space-y-4 h-fit"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
    >
      <motion.div
        className="p-6 rounded-2xl bg-card border border-border"
        whileHover={{ borderColor: "var(--color-primary)" }}
      >
        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-primary" />
          Configuration
        </h2>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">
              CNF Formula
            </label>
            <textarea
              value={cnfInput}
              onChange={(e) => setCnfInput(e.target.value)}
              className="w-full h-24 p-3 rounded-lg bg-input border border-border text-foreground font-mono text-xs focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition"
              placeholder="1 2 3&#10;-1 -2&#10;-2 -3"
            />
            <p className="text-xs text-muted-foreground mt-2">
              Space-separated literals per line
            </p>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-medium">Variables</label>
              <span className="text-xs font-mono bg-secondary px-2 py-1 rounded text-primary">
                {numVars}
              </span>
            </div>
            <input
              type="range"
              min="1"
              max="15"
              value={numVars}
              onChange={(e) => setNumVars(Number.parseInt(e.target.value))}
              className="w-full accent-primary"
            />
          </div>

          <div>
            <label className="text-sm font-medium block mb-2">Mode</label>
            <select
              value={mode}
              onChange={(e) => setMode(e.target.value)}
              className="w-full p-2 rounded-lg bg-input border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition"
            >
              <option value="full">Full Enumeration</option>
              <option value="sample">Random Sampling</option>
            </select>
          </div>

          {mode === "sample" && (
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-medium">Sample Size</label>
                <span className="text-xs font-mono bg-secondary px-2 py-1 rounded text-primary">
                  {sampleSize}
                </span>
              </div>
              <input
                type="range"
                min="100"
                max="10000"
                step="100"
                value={sampleSize}
                onChange={(e) => setSampleSize(Number.parseInt(e.target.value))}
                className="w-full accent-primary"
              />
            </div>
          )}

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-medium">Amplification</label>
              <span className="text-xs font-mono bg-secondary px-2 py-1 rounded text-primary">
                {amplificationFactor}x
              </span>
            </div>
            <input
              type="range"
              min="1"
              max="5"
              value={amplificationFactor}
              onChange={(e) =>
                setAmplificationFactor(Number.parseInt(e.target.value))
              }
              className="w-full accent-primary"
            />
          </div>

          <motion.button
            onClick={onRun}
            className="w-full py-2 rounded-lg bg-primary text-primary-foreground font-semibold hover:opacity-90 transition"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Run Simulation
          </motion.button>

          {error && (
            <motion.div
              className="p-3 rounded-lg bg-destructive/10 border border-destructive/30 text-destructive text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {error}
            </motion.div>
          )}
        </div>
      </motion.div>

      <motion.div
        className="p-6 rounded-2xl bg-card border border-border"
        whileHover={{ borderColor: "var(--color-primary)" }}
      >
        <h3 className="text-lg font-bold mb-3">Examples</h3>
        <div className="space-y-2">
          {[
            { id: "simple", label: "Simple SAT (2 vars)" },
            { id: "simple3", label: "Complex SAT (5 vars)" },
            { id: "4sat", label: "4-SAT Example" },
            { id: "unsat", label: "Unsatisfiable (0 solutions)" },
            { id: "largesat", label: "Large SAT (10 vars)" },
          ].map((ex) => (
            <motion.button
              key={ex.id}
              onClick={() => onLoadExample(ex.id)}
              className="w-full text-left p-2 rounded-lg hover:bg-secondary text-sm transition text-muted-foreground hover:text-foreground"
              whileHover={{ x: 4 }}
            >
              {ex.label}
            </motion.button>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
