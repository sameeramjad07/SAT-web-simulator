"use client";

import { motion } from "framer-motion";
import { Dna } from "lucide-react";

export default function Header() {
  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-md sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <motion.div
          className="flex items-center gap-2 cursor-pointer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="relative w-8 h-8">
            <Dna className="w-8 h-8 text-accent" />
            <motion.div
              className="absolute inset-0 border-2 border-accent rounded-full"
              animate={{ rotate: 360 }}
              transition={{
                duration: 20,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
            />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-accent via-secondary to-accent bg-clip-text text-transparent">
            DNAce
          </span>
        </motion.div>

        <div className="hidden md:flex items-center gap-8">
          <a
            href="#features"
            className="text-muted-foreground hover:text-foreground transition"
          >
            Features
          </a>
          <a
            href="#how"
            className="text-muted-foreground hover:text-foreground transition"
          >
            How It Works
          </a>
          <a
            href="#"
            className="text-muted-foreground hover:text-foreground transition"
          >
            Docs
          </a>
        </div>

        <button className="px-4 py-2 rounded-lg bg-accent text-accent-foreground font-medium hover:opacity-90 transition">
          GitHub
        </button>
      </nav>
    </header>
  );
}
