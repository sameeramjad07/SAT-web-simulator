"use client";

import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, XCircle, Copy, Check } from "lucide-react";
import { useState } from "react";

interface ResultsPanelProps {
  result: any;
}

export default function ResultsPanel({ result }: ResultsPanelProps) {
  const [copied, setCopied] = useState(false);

  if (!result) return null;

  const copyToClipboard = () => {
    const text = result.assignments
      .map((a: any) =>
        Object.entries(a)
          .map(([k, v]) => `x${k}=${v ? "T" : "F"}`)
          .join(" ")
      )
      .join("\n");
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      className="p-6 rounded-2xl bg-card border border-border"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h2 className="text-xl font-bold mb-6">Results</h2>

      <div className="flex items-center gap-3 p-4 rounded-xl mb-6 bg-secondary/10 border border-secondary/30">
        {result.satisfiable ? (
          <>
            <CheckCircle className="w-6 h-6 text-accent flex-shrink-0" />
            <div>
              <div className="font-semibold text-accent">SATISFIABLE</div>
              <div className="text-sm text-muted-foreground">
                Found {result.assignments.length} unique solution(s)
              </div>
            </div>
          </>
        ) : (
          <>
            <XCircle className="w-6 h-6 text-destructive flex-shrink-0" />
            <div>
              <div className="font-semibold text-destructive">
                UNSATISFIABLE
              </div>
              <div className="text-sm text-muted-foreground">
                No satisfying assignments found
              </div>
            </div>
          </>
        )}
      </div>

      {result.satisfiable && result.assignments.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold">Solutions</h3>
            <motion.button
              onClick={copyToClipboard}
              className="flex items-center gap-2 text-xs px-2 py-1 rounded hover:bg-secondary/20 transition"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-accent" />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-muted-foreground" />
                  Copy
                </>
              )}
            </motion.button>
          </div>

          <div className="space-y-2 max-h-64 overflow-y-auto">
            <AnimatePresence>
              {result.assignments
                .slice(0, 10)
                .map((assignment: any, idx: number) => (
                  <motion.div
                    key={idx}
                    className="p-3 rounded-lg bg-accent/10 border border-accent/30 font-mono text-xs"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                  >
                    {Object.entries(assignment).map(
                      ([varNum, value]: [string, any]) => (
                        <span key={varNum} className="mr-4">
                          <span className="text-accent">x{varNum}</span>
                          {" = "}
                          <span className="text-secondary font-bold">
                            {value ? "T" : "F"}
                          </span>
                        </span>
                      )
                    )}
                  </motion.div>
                ))}
            </AnimatePresence>
            {result.assignments.length > 10 && (
              <div className="text-center text-xs text-muted-foreground py-2">
                ... and {result.assignments.length - 10} more solutions
              </div>
            )}
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-border">
        <div>
          <div className="text-xs text-muted-foreground">Runtime</div>
          <div className="font-semibold text-accent">{result.runtime} ms</div>
        </div>
        <div>
          <div className="text-xs text-muted-foreground">Final Population</div>
          <div className="font-semibold text-accent">
            {result.finalPopulationSize}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
