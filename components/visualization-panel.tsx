"use client";

import { motion } from "framer-motion";
import { Play, Pause, RotateCcw, ChevronRight } from "lucide-react";

interface VisualizationPanelProps {
  result: any;
  currentStep: number;
  setCurrentStep: (val: number) => void;
  isPlaying: boolean;
  setIsPlaying: (val: boolean) => void;
}

export default function VisualizationPanel({
  result,
  currentStep,
  setCurrentStep,
  isPlaying,
  setIsPlaying,
}: VisualizationPanelProps) {
  if (!result) {
    return (
      <motion.div
        className="p-12 rounded-2xl bg-card border border-border text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mx-auto mb-4">
          <ChevronRight className="w-8 h-8 text-muted-foreground" />
        </div>
        <p className="text-muted-foreground">
          Configure and run a simulation to see the visualization
        </p>
      </motion.div>
    );
  }

  const currentStepData = result.steps[currentStep];

  return (
    <motion.div
      className="p-6 rounded-2xl bg-card border border-border"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold">Simulation Steps</h2>
        <div className="flex gap-2">
          <motion.button
            onClick={() => setCurrentStep(0)}
            className="p-2 rounded-lg hover:bg-secondary transition"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <RotateCcw className="w-5 h-5 text-muted-foreground" />
          </motion.button>
          <motion.button
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-2 rounded-lg hover:bg-secondary transition"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {isPlaying ? (
              <Pause className="w-5 h-5 text-primary" />
            ) : (
              <Play className="w-5 h-5 text-primary" />
            )}
          </motion.button>
        </div>
      </div>

      <div className="mb-6">
        <input
          type="range"
          min="0"
          max={result.steps.length - 1}
          value={currentStep}
          onChange={(e) => setCurrentStep(Number.parseInt(e.target.value))}
          className="w-full accent-primary"
        />
        <div className="flex justify-between text-xs text-muted-foreground mt-2">
          <span>
            Step {currentStep + 1} of {result.steps.length}
          </span>
          <span>Population: {currentStepData?.size}</span>
        </div>
      </div>

      {currentStepData && (
        <motion.div
          className="p-4 rounded-xl bg-secondary border border-primary/20"
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-start gap-3">
            <ChevronRight className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
            <div>
              <div className="font-medium">{currentStepData.description}</div>
              {currentStepData.clause && (
                <div className="text-xs text-muted-foreground mt-1 font-mono">
                  (
                  {currentStepData.clause
                    .map((l: number) => (l < 0 ? `¬x${Math.abs(l)}` : `x${l}`))
                    .join(" ∨ ")}
                  )
                </div>
              )}
              <div className="text-xs text-muted-foreground mt-1">
                Surviving strands:{" "}
                <span className="text-primary font-semibold">
                  {currentStepData.size}
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      <div className="mt-8">
        <h3 className="font-semibold mb-4">Population Evolution</h3>
        <div className="relative bg-secondary rounded-lg p-4 h-64 flex flex-col">
          {/* Y-axis labels */}
          <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-muted-foreground pr-2 -ml-8">
            {[100, 75, 50, 25, 0].map((pct) => (
              <span key={pct}>{pct}%</span>
            ))}
          </div>

          <svg
            viewBox="0 0 1000 400"
            className="flex-1 w-full"
            preserveAspectRatio="none"
          >
            {/* Grid lines */}
            {[0, 25, 50, 75, 100].map((pct) => (
              <line
                key={`grid-${pct}`}
                x1="0"
                y1={400 - (pct / 100) * 400}
                x2="1000"
                y2={400 - (pct / 100) * 400}
                stroke="currentColor"
                strokeWidth="1"
                opacity="0.1"
                className="text-foreground"
              />
            ))}

            {result.steps.map((step: any, idx: number) => {
              const maxSize = Math.max(
                ...result.steps.map((s: any) => s.size),
                1
              );
              const x = (idx / Math.max(result.steps.length - 1, 1)) * 1000;
              const y = 400 - (step.size / maxSize) * 350;
              const prevStep = result.steps[idx - 1];
              const prevX =
                idx > 0
                  ? ((idx - 1) / Math.max(result.steps.length - 1, 1)) * 1000
                  : x;
              const prevY = idx > 0 ? 400 - (prevStep.size / maxSize) * 350 : y;

              return (
                <g key={idx}>
                  {idx > 0 && (
                    <line
                      x1={prevX}
                      y1={prevY}
                      x2={x}
                      y2={y}
                      stroke={
                        idx <= currentStep
                          ? "var(--color-primary)"
                          : "var(--color-muted)"
                      }
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                  )}
                  <motion.circle
                    cx={x}
                    cy={y}
                    r="6"
                    fill={
                      result.satisfiable && idx === result.steps.length - 1
                        ? "var(--color-primary)"
                        : idx === result.steps.length - 1
                        ? "var(--color-destructive)"
                        : idx <= currentStep
                        ? "var(--color-primary)"
                        : "var(--color-border)"
                    }
                    animate={{ scale: idx === currentStep ? 1.8 : 1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  />
                </g>
              );
            })}
          </svg>

          <div className="mt-4 flex justify-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-primary"></div>
              <span className="text-muted-foreground">
                {result.satisfiable ? "Satisfiable" : "No solutions"}
              </span>
            </div>
            {!result.satisfiable && (
              <div className="text-destructive font-semibold">
                Population eliminated to 0
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
