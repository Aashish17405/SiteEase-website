"use client";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import TestHero from "@/components/test/TestHero";
import ProgressTracker from "@/components/test/ProgressTracker";
import IshiharaTest from "@/components/test/IshiharaTest";
import ColorMatchTest from "@/components/test/ColorMatchTest";
import MotionPerceptionTest from "@/components/test/MotionPerceptionTest";
import AccessibilitySimulation from "@/components/test/AccessibilitySimulation";
import ResultsDashboard from "@/components/test/ResultsDashboard";
import Footer from "@/components/Footer";

export type TestResults = {
  ishihara: {
    score: number;
    answers: {
      plate: number;
      answer: string;
      correct: boolean;
      confidence: number;
    }[];
  };
  colorMatch: { score: number; accuracy: number; timeMs: number };
  motion: { score: number; reactionTimes: number[]; accuracy: number };
  simulation: { score: number; completed: boolean };
};

type Step =
  | "hero"
  | "ishihara"
  | "colorMatch"
  | "motion"
  | "simulation"
  | "results";

const STEPS: Step[] = [
  "hero",
  "ishihara",
  "colorMatch",
  "motion",
  "simulation",
  "results",
];
const TEST_STEPS: Step[] = ["ishihara", "colorMatch", "motion", "simulation"];

const STEP_LABELS: Record<Step, string> = {
  hero: "Welcome",
  ishihara: "Ishihara Plates",
  colorMatch: "Color Matching",
  motion: "Motion Perception",
  simulation: "Real-World Simulation",
  results: "Results",
};

export default function TestPage() {
  const [step, setStep] = useState<Step>("hero");
  const [results, setResults] = useState<Partial<TestResults>>({});

  const currentTestIndex = TEST_STEPS.indexOf(step);
  const progress =
    step === "hero"
      ? 0
      : step === "results"
        ? 100
        : ((currentTestIndex + 1) / TEST_STEPS.length) * 100;

  function advance() {
    const idx = STEPS.indexOf(step);
    if (idx < STEPS.length - 1) setStep(STEPS[idx + 1]);
  }

  function saveAndAdvance<K extends keyof TestResults>(
    key: K,
    data: TestResults[K],
  ) {
    setResults((prev) => ({ ...prev, [key]: data }));
    advance();
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50">
      <Navbar />
      {step !== "hero" && step !== "results" && (
        <ProgressTracker
          steps={TEST_STEPS.map((s) => STEP_LABELS[s])}
          current={currentTestIndex}
          percent={progress}
        />
      )}

      <main className="px-4 sm:px-6 lg:px-8 py-8">
        {step === "hero" && <TestHero onStart={advance} />}
        {step === "ishihara" && (
          <IshiharaTest
            onComplete={(data) => saveAndAdvance("ishihara", data)}
            onSkip={advance}
          />
        )}
        {step === "colorMatch" && (
          <ColorMatchTest
            onComplete={(data) => saveAndAdvance("colorMatch", data)}
            onSkip={advance}
          />
        )}
        {step === "motion" && (
          <MotionPerceptionTest
            onComplete={(data) => saveAndAdvance("motion", data)}
            onSkip={advance}
          />
        )}
        {step === "simulation" && (
          <AccessibilitySimulation
            onComplete={(data) => saveAndAdvance("simulation", data)}
            onSkip={advance}
          />
        )}
        {step === "results" && (
          <ResultsDashboard
            results={results as TestResults}
            onRetake={() => {
              setStep("hero");
              setResults({});
            }}
          />
        )}
      </main>

      <Footer />
    </div>
  );
}
