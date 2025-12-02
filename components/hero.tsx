"use client";

import { motion } from "framer-motion";
import { Dna, ArrowRight, Github } from "lucide-react";

interface HeroProps {
  onStartSimulating: () => void;
}

export default function Hero({ onStartSimulating }: HeroProps) {
  return (
    <section className="relative overflow-hidden pt-20 pb-32">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute w-96 h-96 bg-primary/5 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
          }}
          transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY }}
          style={{ top: "10%", left: "10%" }}
        />
        <motion.div
          className="absolute w-96 h-96 bg-accent/5 rounded-full blur-3xl"
          animate={{
            x: [0, -100, 0],
            y: [0, -50, 0],
          }}
          transition={{ duration: 25, repeat: Number.POSITIVE_INFINITY }}
          style={{ bottom: "10%", right: "10%" }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary border border-primary/20 mb-8"
            whileHover={{ scale: 1.05 }}
          >
            <Dna className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">
              Molecular Computing Simulator
            </span>
          </motion.div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight text-balance">
            <span className="text-foreground">Solve SAT Problems</span>
            <br />
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              with DNA Algorithms
            </span>
          </h1>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed text-balance">
            Visualize how biological molecular computing principles solve
            Boolean satisfiability problems in real-time.
          </p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <motion.button
              onClick={onStartSimulating}
              className="px-8 py-3 rounded-lg bg-primary text-primary-foreground font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Start Simulating
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
            </motion.button>
            <motion.a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 rounded-lg border border-primary text-primary font-semibold hover:bg-secondary transition flex items-center justify-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View on GitHub
              <Github className="w-4 h-4" />
            </motion.a>
          </motion.div>
        </motion.div>

        {/* DNA Helix Visualization */}
        <motion.div
          className="mt-20 flex justify-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          <DNAHelix />
        </motion.div>
      </div>
    </section>
  );
}

function DNAHelix() {
  return (
    <div className="relative w-64 h-64 flex items-center justify-center">
      <svg className="w-full h-full" viewBox="0 0 200 200">
        {/* DNA Strands */}
        <motion.path
          d="M100,20 Q130,50 100,80 Q70,110 100,140 Q130,170 100,200"
          fill="none"
          stroke="url(#gradient1)"
          strokeWidth="3"
          strokeLinecap="round"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
        />
        <motion.path
          d="M100,20 Q70,50 100,80 Q130,110 100,140 Q70,170 100,200"
          fill="none"
          stroke="url(#gradient2)"
          strokeWidth="3"
          strokeLinecap="round"
          animate={{ opacity: [1, 0.5, 1] }}
          transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
        />

        {/* Base Pairs */}
        {[0, 30, 60, 90, 120, 150].map((y, i) => (
          <motion.g
            key={i}
            animate={{ opacity: [0.3, 0.8, 0.3] }}
            transition={{
              duration: 2,
              delay: i * 0.2,
              repeat: Number.POSITIVE_INFINITY,
            }}
          >
            <line
              x1="85"
              y1={20 + y}
              x2="115"
              y2={20 + y}
              stroke="currentColor"
              strokeWidth="1"
              className="text-primary"
            />
            <circle
              cx="85"
              cy={20 + y}
              r="2"
              fill="currentColor"
              className="text-primary"
            />
            <circle
              cx="115"
              cy={20 + y}
              r="2"
              fill="currentColor"
              className="text-primary"
            />
          </motion.g>
        ))}

        <defs>
          <linearGradient id="gradient1" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop
              offset="0%"
              stopColor="currentColor"
              className="text-primary"
            />
            <stop
              offset="100%"
              stopColor="currentColor"
              className="text-accent"
            />
          </linearGradient>
          <linearGradient id="gradient2" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop
              offset="0%"
              stopColor="currentColor"
              className="text-accent"
            />
            <stop
              offset="100%"
              stopColor="currentColor"
              className="text-primary"
            />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
