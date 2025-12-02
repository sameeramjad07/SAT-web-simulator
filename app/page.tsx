"use client";

import { useState } from "react";
import SimulatorApp from "@/components/simulator-app";
import Header from "@/components/header";
import Hero from "@/components/hero";
import Features from "@/components/features";

export default function Home() {
  const [showSimulator, setShowSimulator] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      {!showSimulator ? (
        <>
          <Hero onStartSimulating={() => setShowSimulator(true)} />
          <Features />
        </>
      ) : (
        <SimulatorApp />
      )}
    </div>
  );
}
