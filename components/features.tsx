"use client";

import { motion } from "framer-motion";
import {
  Zap,
  Microscope,
  BarChart3,
  Clock,
  Play,
  BookOpen,
  ExternalLink,
} from "lucide-react";

export default function Features() {
  const features = [
    {
      icon: Microscope,
      title: "Molecular Selection",
      description:
        "Watch DNA strands evolve through clause-by-clause selection, simulating natural genetic filtering.",
    },
    {
      icon: Zap,
      title: "Real-time Amplification",
      description:
        "Observe population growth through molecular amplification, mimicking PCR in biological computing.",
    },
    {
      icon: BarChart3,
      title: "Population Visualization",
      description:
        "Track population dynamics across simulation steps with interactive charts and statistics.",
    },
    {
      icon: Clock,
      title: "Interactive Playback",
      description:
        "Control simulation speed, pause at any step, and rewind to analyze the solving process.",
    },
  ];

  return (
    <section id="features" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold mb-4">Powerful Features</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Understand SAT solving through the lens of molecular biology
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              className="p-8 rounded-2xl bg-card border border-border hover:border-primary/50 transition group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <motion.div
                className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center mb-4 group-hover:bg-primary/10 transition"
                whileHover={{ rotate: 10 }}
              >
                <feature.icon className="w-6 h-6 text-primary" />
              </motion.div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            className="rounded-2xl bg-card border border-border overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="aspect-video bg-secondary flex items-center justify-center">
              <div className="text-center">
                <Play className="w-16 h-16 text-primary/30 mx-auto mb-4" />
                <p className="text-muted-foreground">
                  YouTube Video Placeholder
                </p>
                <p className="text-sm text-muted-foreground/70">
                  Add your video here
                </p>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">How it Works</h3>
              <p className="text-muted-foreground">
                Watch a detailed explanation of the DNA-based SAT solver
                algorithm and how molecular computing principles solve Boolean
                satisfiability problems.
              </p>
            </div>
          </motion.div>

          <motion.div
            className="rounded-2xl bg-card border border-border p-8 flex flex-col justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <BookOpen className="w-12 h-12 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-4">Documentation</h3>
            <p className="text-muted-foreground mb-6">
              Explore the full source code, algorithm details, and
              implementation specifics on our GitHub repository.
            </p>
            <motion.a
              href="https://github.com/sameeramjad07/SAT-web-simulator"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground font-semibold hover:opacity-90 transition w-fit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View Repository
              <ExternalLink className="w-4 h-4" />
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
