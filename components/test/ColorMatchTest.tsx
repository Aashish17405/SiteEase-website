"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, RefreshCw } from "lucide-react";

type Props = {
  onComplete: (data: { score: number; accuracy: number; timeMs: number }) => void;
  onSkip: () => void;
};

type Round = {
  target: string;
  options: string[];
  correct: number;
};

const HUE_PAIRS: [string, string][] = [
  ["#e74c3c", "#c0392b"],
  ["#2ecc71", "#27ae60"],
  ["#3498db", "#2980b9"],
  ["#f39c12", "#e67e22"],
  ["#9b59b6", "#8e44ad"],
  ["#1abc9c", "#16a085"],
  ["#e91e63", "#c2185b"],
  ["#ff5722", "#e64a19"],
];

function generateRound(index: number): Round {
  const pair = HUE_PAIRS[index % HUE_PAIRS.length];
  const target = pair[Math.floor(Math.random() * 2)];
  const correctIdx = Math.floor(Math.random() * 4);

  const options = Array.from({ length: 4 }, (_, i) => {
    if (i === correctIdx) return target;
    // Generate confusable color
    const base = parseInt(pair[(index + i) % 2].slice(1), 16);
    const r = ((base >> 16) & 0xff);
    const g = ((base >> 8) & 0xff);
    const b = (base & 0xff);
    const offset = 30 + i * 20;
    return `rgb(${Math.min(255, r + offset)},${Math.max(0, g - offset / 2)},${Math.min(255, b + offset / 3)})`;
  });

  return { target, options, correct: correctIdx };
}

const TOTAL_ROUNDS = 8;

type DragItem = { color: string; id: number };

function SortChallenge({ onResult }: { onResult: (correct: boolean, ms: number) => void }) {
  const colors = ["#e74c3c", "#e67e22", "#f1c40f", "#2ecc71", "#3498db", "#9b59b6"];
  const [items, setItems] = useState<DragItem[]>(() =>
    [...colors].sort(() => Math.random() - 0.5).map((c, i) => ({ color: c, id: i }))
  );
  const [dragging, setDragging] = useState<number | null>(null);
  const startTime = useRef(Date.now());
  const [submitted, setSubmitted] = useState(false);

  const handleDragStart = (id: number) => setDragging(id);

  const handleDrop = (targetId: number) => {
    if (dragging === null || dragging === targetId) return;
    setItems((prev) => {
      const arr = [...prev];
      const fromIdx = arr.findIndex((x) => x.id === dragging);
      const toIdx = arr.findIndex((x) => x.id === targetId);
      [arr[fromIdx], arr[toIdx]] = [arr[toIdx], arr[fromIdx]];
      return arr;
    });
    setDragging(null);
  };

  const checkOrder = () => {
    const expected = [...colors].sort();
    const actual = items.map((x) => x.color);
    const correct = JSON.stringify(actual.sort()) === JSON.stringify(expected.sort());
    onResult(correct, Date.now() - startTime.current);
    setSubmitted(true);
  };

  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-600 text-center">Drag to arrange colors by hue (red → violet)</p>
      <div className="flex gap-3 justify-center flex-wrap">
        {items.map((item) => (
          <div
            key={item.id}
            draggable
            onDragStart={() => handleDragStart(item.id)}
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => handleDrop(item.id)}
            className={`w-16 h-16 rounded-xl cursor-grab active:cursor-grabbing shadow-lg transition-transform hover:scale-110 border-2 ${dragging === item.id ? "border-white scale-110 opacity-70" : "border-transparent"}`}
            style={{ backgroundColor: item.color }}
          />
        ))}
      </div>
      <Button onClick={checkOrder} disabled={submitted} className="w-full bg-gradient-to-r from-emerald-600 to-teal-600">
        {submitted ? "Submitted!" : "Check My Arrangement"}
      </Button>
    </div>
  );
}

export default function ColorMatchTest({ onComplete, onSkip }: Props) {
  const [mode, setMode] = useState<"match" | "sort">("match");
  const [roundIndex, setRoundIndex] = useState(0);
  const [round, setRound] = useState<Round>(() => generateRound(0));
  const [selected, setSelected] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [totalMs, setTotalMs] = useState(0);
  const [sortDone, setSortDone] = useState(false);
  const startTime = useRef(Date.now());
  const totalStartTime = useRef(Date.now());

  const nextRound = useCallback(() => {
    if (roundIndex + 1 >= TOTAL_ROUNDS) {
      if (mode === "match") {
        setMode("sort");
        setRoundIndex(0);
      } else {
        const score = Math.round((correctCount / TOTAL_ROUNDS) * 100);
        const elapsed = Date.now() - totalStartTime.current;
        onComplete({ score, accuracy: score, timeMs: elapsed });
      }
      return;
    }
    const next = roundIndex + 1;
    setRoundIndex(next);
    setRound(generateRound(next));
    setSelected(null);
    setFeedback(null);
    startTime.current = Date.now();
  }, [roundIndex, mode, correctCount, onComplete]);

  const handleSelect = (idx: number) => {
    if (selected !== null) return;
    const ms = Date.now() - startTime.current;
    setTotalMs((v) => v + ms);
    setSelected(idx);
    const isCorrect = idx === round.correct;
    setFeedback(isCorrect ? "correct" : "wrong");
    if (isCorrect) setCorrectCount((v) => v + 1);
    setTimeout(nextRound, 800);
  };

  const handleSortResult = (correct: boolean, ms: number) => {
    setTotalMs((v) => v + ms);
    if (correct) setCorrectCount((v) => v + 1);
    setSortDone(true);
    setTimeout(() => {
      const score = Math.round((correctCount / (TOTAL_ROUNDS + 1)) * 100);
      onComplete({ score, accuracy: score, timeMs: totalMs + ms });
    }, 1000);
  };

  return (
    <div className="container mx-auto max-w-2xl">
      <div className="text-center mb-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Color Matching Test</h2>
        <p className="text-gray-600">Match colors and arrange gradients to test color discrimination.</p>
      </div>

      <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <Badge variant="outline">
            {mode === "match" ? `Round ${roundIndex + 1}/${TOTAL_ROUNDS}` : "Sort Challenge"}
          </Badge>
          <div className="flex items-center space-x-1">
            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
            <span className="text-sm font-medium text-gray-700">{correctCount} correct</span>
          </div>
        </div>

        {mode === "match" && (
          <div className="space-y-6">
            <div>
              <p className="text-sm text-gray-600 mb-3 text-center">Find the matching color:</p>
              <div
                className="w-32 h-32 rounded-2xl mx-auto shadow-lg border-4 border-white ring-2 ring-gray-200"
                style={{ backgroundColor: round.target }}
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              {round.options.map((color, i) => (
                <button
                  key={i}
                  onClick={() => handleSelect(i)}
                  disabled={selected !== null}
                  className={`h-20 rounded-xl shadow-md transition-all duration-300 border-4 ${
                    selected === null
                      ? "hover:scale-105 hover:shadow-xl border-transparent cursor-pointer"
                      : i === round.correct
                      ? "border-emerald-400 scale-105"
                      : selected === i
                      ? "border-red-400 opacity-60"
                      : "border-transparent opacity-50"
                  }`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>

            {feedback && (
              <div className={`text-center font-bold text-lg animate-bounce ${feedback === "correct" ? "text-emerald-600" : "text-red-500"}`}>
                {feedback === "correct" ? "✓ Correct!" : "✗ Not quite"}
              </div>
            )}
          </div>
        )}

        {mode === "sort" && !sortDone && (
          <SortChallenge onResult={handleSortResult} />
        )}

        {sortDone && (
          <div className="text-center py-8">
            <CheckCircle2 className="h-12 w-12 text-emerald-500 mx-auto mb-3" />
            <p className="text-lg font-semibold text-gray-900">Color match complete!</p>
          </div>
        )}

        <Button variant="ghost" size="sm" onClick={onSkip} className="w-full mt-4 text-gray-400 hover:text-gray-600">
          Skip this test module
        </Button>
      </div>
    </div>
  );
}
