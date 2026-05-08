"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, XCircle } from "lucide-react";

type Props = {
  onComplete: (data: { score: number; completed: boolean }) => void;
  onSkip: () => void;
};

type FilterType = "normal" | "protanopia" | "deuteranopia" | "tritanopia" | "monochromacy";

const FILTERS: Record<FilterType, string> = {
  normal: "none",
  protanopia: "url(#protanopia)",
  deuteranopia: "url(#deuteranopia)",
  tritanopia: "url(#tritanopia)",
  monochromacy: "grayscale(100%)",
};

const FILTER_LABELS: Record<FilterType, string> = {
  normal: "Normal Vision",
  protanopia: "Protanopia (Red-Blind)",
  deuteranopia: "Deuteranopia (Green-Blind)",
  tritanopia: "Tritanopia (Blue-Blind)",
  monochromacy: "Monochromacy (No Color)",
};

type Scenario = {
  id: number;
  title: string;
  question: string;
  render: () => JSX.Element;
  options: string[];
  correct: number;
};

function TrafficLight({ filter }: { filter: string }) {
  return (
    <div style={{ filter }} className="bg-gray-800 rounded-xl p-4 flex flex-col items-center gap-3 w-24 mx-auto">
      <div className="w-12 h-12 rounded-full bg-red-500 shadow-lg shadow-red-500/50" />
      <div className="w-12 h-12 rounded-full bg-yellow-400 shadow-lg shadow-yellow-400/50 opacity-30" />
      <div className="w-12 h-12 rounded-full bg-green-500 shadow-lg shadow-green-500/50 opacity-30" />
    </div>
  );
}

function PieChart({ filter }: { filter: string }) {
  return (
    <div style={{ filter }} className="flex items-center gap-6 justify-center">
      <svg width="120" height="120" viewBox="0 0 120 120">
        <circle cx="60" cy="60" r="50" fill="#e74c3c" />
        <path d="M60 60 L60 10 A50 50 0 0 1 110 60 Z" fill="#2ecc71" />
        <path d="M60 60 L110 60 A50 50 0 0 1 60 110 Z" fill="#3498db" />
        <path d="M60 60 L60 110 A50 50 0 0 1 10 60 Z" fill="#f39c12" />
      </svg>
      <div className="space-y-2 text-sm">
        {[["#e74c3c", "Category A (38%)"], ["#2ecc71", "Category B (25%)"], ["#3498db", "Category C (25%)"], ["#f39c12", "Category D (12%)"]].map(([c, l]) => (
          <div key={l} className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-sm flex-shrink-0" style={{ backgroundColor: c }} />
            <span className="text-gray-700">{l}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function MetroMap({ filter }: { filter: string }) {
  return (
    <div style={{ filter }} className="bg-white p-4 rounded-xl border">
      <svg width="280" height="160" viewBox="0 0 280 160">
        {/* Red line */}
        <line x1="20" y1="40" x2="260" y2="40" stroke="#e74c3c" strokeWidth="6" />
        {/* Green line */}
        <line x1="60" y1="20" x2="60" y2="140" stroke="#2ecc71" strokeWidth="6" />
        {/* Blue line */}
        <line x1="20" y1="120" x2="260" y2="80" stroke="#3498db" strokeWidth="6" />

        {[20, 60, 120, 180, 260].map((x) => (
          <circle key={x} cx={x} cy={40} r={6} fill="white" stroke="#e74c3c" strokeWidth={2} />
        ))}
        {[20, 60, 100, 140].map((y) => (
          <circle key={y} cx={60} cy={y} r={6} fill="white" stroke="#2ecc71" strokeWidth={2} />
        ))}

        <text x="22" y="56" fontSize="10" fill="#e74c3c" fontWeight="bold">Red Line</text>
        <text x="65" y="90" fontSize="10" fill="#2ecc71" fontWeight="bold">Green</text>
        <text x="180" y="75" fontSize="10" fill="#3498db" fontWeight="bold">Blue Line</text>
      </svg>
    </div>
  );
}

const SCENARIOS: Scenario[] = [
  {
    id: 1,
    title: "Traffic Signal",
    question: "With your selected vision filter, which light is currently ON?",
    render: () => <TrafficLight filter="none" />,
    options: ["Green", "Yellow", "Red", "Cannot tell"],
    correct: 2,
  },
  {
    id: 2,
    title: "Data Chart",
    question: "Under color blindness simulation, how many distinct categories can you identify?",
    render: () => <PieChart filter="none" />,
    options: ["1-2 categories", "3 categories", "All 4 categories", "Cannot distinguish any"],
    correct: 2,
  },
  {
    id: 3,
    title: "Metro Map",
    question: "Can you distinguish all three transit lines using color alone?",
    render: () => <MetroMap filter="none" />,
    options: ["Yes, all distinct", "Two look similar", "All look the same", "Very hard to tell"],
    correct: 0,
  },
];

export default function AccessibilitySimulation({ onComplete, onSkip }: Props) {
  const [filter, setFilter] = useState<FilterType>("normal");
  const [scenarioIdx, setScenarioIdx] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(Array(SCENARIOS.length).fill(null));
  const [showResult, setShowResult] = useState(false);

  const scenario = SCENARIOS[scenarioIdx];

  const selectAnswer = (idx: number) => {
    const next = [...answers];
    next[scenarioIdx] = idx;
    setAnswers(next);
  };

  const finish = () => {
    const correct = answers.filter((a, i) => a === SCENARIOS[i].correct).length;
    const score = Math.round((correct / SCENARIOS.length) * 100);
    setShowResult(true);
    setTimeout(() => onComplete({ score, completed: true }), 2000);
  };

  return (
    <div className="container mx-auto max-w-3xl">
      {/* SVG filters */}
      <svg width="0" height="0" style={{ position: "absolute" }}>
        <defs>
          <filter id="protanopia">
            <feColorMatrix type="matrix" values="0.567,0.433,0,0,0 0.558,0.442,0,0,0 0,0.242,0.758,0,0 0,0,0,1,0" />
          </filter>
          <filter id="deuteranopia">
            <feColorMatrix type="matrix" values="0.625,0.375,0,0,0 0.7,0.3,0,0,0 0,0.3,0.7,0,0 0,0,0,1,0" />
          </filter>
          <filter id="tritanopia">
            <feColorMatrix type="matrix" values="0.95,0.05,0,0,0 0,0.433,0.567,0,0 0,0.475,0.525,0,0 0,0,0,1,0" />
          </filter>
        </defs>
      </svg>

      <div className="text-center mb-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Real-World Simulation</h2>
        <p className="text-gray-600">See how color blindness affects real UI elements.</p>
      </div>

      <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 border border-gray-100 space-y-6">
        {/* Filter selector */}
        <div>
          <p className="text-sm font-medium text-gray-700 mb-3">Simulate vision type:</p>
          <div className="flex flex-wrap gap-2">
            {(Object.keys(FILTERS) as FilterType[]).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all border ${
                  filter === f
                    ? "bg-emerald-600 text-white border-emerald-600"
                    : "bg-gray-100 text-gray-600 border-gray-200 hover:bg-gray-200"
                }`}
              >
                {FILTER_LABELS[f]}
              </button>
            ))}
          </div>
        </div>

        {/* Scenario tabs */}
        <div className="flex gap-2 border-b pb-2">
          {SCENARIOS.map((s, i) => (
            <button
              key={s.id}
              onClick={() => setScenarioIdx(i)}
              className={`px-3 py-1.5 rounded-t-lg text-sm font-medium transition-colors ${
                i === scenarioIdx
                  ? "bg-emerald-50 text-emerald-700 border border-b-0 border-emerald-200"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {s.title}
              {answers[i] !== null && <CheckCircle2 className="h-3 w-3 inline ml-1 text-emerald-500" />}
            </button>
          ))}
        </div>

        {/* Scenario content */}
        <div className="space-y-4">
          <div style={{ filter: FILTERS[filter] }}>
            {scenario.id === 1 && <TrafficLight filter="none" />}
            {scenario.id === 2 && <PieChart filter="none" />}
            {scenario.id === 3 && <MetroMap filter="none" />}
          </div>

          <p className="font-medium text-gray-900">{scenario.question}</p>

          <div className="grid grid-cols-2 gap-2">
            {scenario.options.map((opt, i) => (
              <button
                key={i}
                onClick={() => selectAnswer(i)}
                className={`p-3 rounded-lg text-sm text-left transition-all border ${
                  answers[scenarioIdx] === i
                    ? "bg-emerald-50 border-emerald-400 text-emerald-800 font-medium"
                    : "border-gray-200 hover:border-emerald-300 hover:bg-emerald-50/50 text-gray-700"
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        {showResult && (
          <div className="text-center py-4">
            <CheckCircle2 className="h-10 w-10 text-emerald-500 mx-auto mb-2" />
            <p className="font-semibold text-gray-900">Simulation complete! Analyzing results...</p>
          </div>
        )}

        <div className="flex gap-3">
          {scenarioIdx < SCENARIOS.length - 1 ? (
            <Button
              onClick={() => setScenarioIdx((i) => i + 1)}
              disabled={answers[scenarioIdx] === null}
              className="flex-1 bg-gradient-to-r from-emerald-600 to-teal-600"
            >
              Next Scenario
            </Button>
          ) : (
            <Button
              onClick={finish}
              disabled={answers.some((a) => a === null) || showResult}
              className="flex-1 bg-gradient-to-r from-emerald-600 to-teal-600"
            >
              Finish Simulation
            </Button>
          )}
        </div>

        <Button variant="ghost" size="sm" onClick={onSkip} className="w-full text-gray-400 hover:text-gray-600">
          Skip this test module
        </Button>
      </div>
    </div>
  );
}
