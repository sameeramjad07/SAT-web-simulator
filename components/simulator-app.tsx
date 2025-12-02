"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import SimulatorCore from "@/lib/simulator-core";
import ConfigPanel from "./config-panel";
import VisualizationPanel from "./visualization-panel";
import ResultsPanel from "./results-panel";

export default function SimulatorApp() {
  const [cnfInput, setCnfInput] = useState("1 2 3\n-1 -2\n-2 -3\n1 -3");
  const [numVars, setNumVars] = useState(3);
  const [mode, setMode] = useState("full");
  const [sampleSize, setSampleSize] = useState(1000);
  const [amplificationFactor, setAmplificationFactor] = useState(2);
  const [result, setResult] = useState<{ steps: any[] } | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isPlaying && result && currentStep < result.steps.length - 1) {
      const timer = setTimeout(() => {
        setCurrentStep((prev) => prev + 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (result?.steps && currentStep >= result.steps.length - 1) {
      setIsPlaying(false);
    }
  }, [isPlaying, currentStep, result]);

  const runSimulation = () => {
    try {
      setError("");
      const lines = cnfInput.trim().split("\n");
      const clauses = lines
        .map((line) =>
          line
            .trim()
            .split(/\s+/)
            .map((n) => Number.parseInt(n))
            .filter((n) => !isNaN(n))
        )
        .filter((clause) => clause.length > 0);

      if (clauses.length === 0) {
        throw new Error("No valid clauses found");
      }

      const simulator = new SimulatorCore(clauses, numVars, {
        mode,
        sampleSize,
        amplificationFactor,
        seed: 42,
      });

      const res = simulator.run();
      setResult(res);
      setCurrentStep(0);
      setIsPlaying(false);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unknown error");
      setResult(null);
    }
  };

  const loadExample = (example: string) => {
    if (example === "simple") {
      setCnfInput("1 2\n-1 -2\n1 -2");
      setNumVars(2);
    } else if (example === "simple3") {
      setCnfInput("1 2 3\n1 -2 3\n-1 2 -3\n-1 -2 -3");
      setNumVars(3);
    } else if (example === "4sat") {
      setCnfInput("1 2 3 4\n-1 -2 -3\n2 3 -4\n-1 3 4\n1 -2 4");
      setNumVars(4);
    } else if (example === "unsat") {
      setCnfInput("1\n-1");
      setNumVars(1);
    } else if (example === "largesat") {
      setCnfInput("1 2 3 4 5\n-1 -2 3\n2 4 -5\n-3 4 5\n1 -4\n-1 2 -3 4 -5");
      setNumVars(10);
    } else if (example === "3sat") {
      setCnfInput("1 2 3\n-1 -2\n-2 -3\n1 -3");
      setNumVars(3);
    }
  };

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl font-bold mb-2">Interactive Simulator</h1>
          <p className="text-muted-foreground">
            Configure your SAT problem and watch the molecular solver work
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 pb-20">
          <ConfigPanel
            cnfInput={cnfInput}
            setCnfInput={setCnfInput}
            numVars={numVars}
            setNumVars={setNumVars}
            mode={mode}
            setMode={setMode}
            sampleSize={sampleSize}
            setSampleSize={setSampleSize}
            amplificationFactor={amplificationFactor}
            setAmplificationFactor={setAmplificationFactor}
            onRun={runSimulation}
            onLoadExample={loadExample}
            error={error}
          />

          <div className="lg:col-span-3 space-y-6">
            <VisualizationPanel
              result={result}
              currentStep={currentStep}
              setCurrentStep={setCurrentStep}
              isPlaying={isPlaying}
              setIsPlaying={setIsPlaying}
            />

            <ResultsPanel result={result} />
          </div>
        </div>
      </div>
    </div>
  );
}
