"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, ChevronRight, AlertCircle } from "lucide-react";

type PlateResult = {
  plate: number;
  answer: string;
  correct: boolean;
  confidence: number;
};

type Props = {
  onComplete: (data: { score: number; answers: PlateResult[] }) => void;
  onSkip: () => void;
};

const PLATES = [
  { id: 1, number: "12", colors: { bg: "#f0c040", dots: "#e05020" }, hint: "Normal vision sees 12" },
  { id: 2, number: "8", colors: { bg: "#e06030", dots: "#70a050" }, hint: "Normal vision sees 8" },
  { id: 3, number: "29", colors: { bg: "#a0c060", dots: "#d04020" }, hint: "Normal vision sees 29" },
  { id: 4, number: "5", colors: { bg: "#d08030", dots: "#509060" }, hint: "Normal vision sees 5" },
  { id: 5, number: "3", colors: { bg: "#c05030", dots: "#408060" }, hint: "Normal vision sees 3" },
  { id: 6, number: "15", colors: { bg: "#80b040", dots: "#c04020" }, hint: "Normal vision sees 15" },
  { id: 7, number: "74", colors: { bg: "#d06030", dots: "#606060" }, hint: "Normal vision sees 74" },
  { id: 8, number: "6", colors: { bg: "#b04040", dots: "#50a050" }, hint: "Normal vision sees 6" },
];

const TIME_PER_PLATE = 15;

function IshiharaPlate({ plate, size = 280 }: { plate: typeof PLATES[0]; size?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    const cx = size / 2;
    const cy = size / 2;
    const r = size / 2 - 4;

    ctx.clearRect(0, 0, size, size);

    // Background circle
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.fillStyle = plate.colors.bg;
    ctx.fill();

    // Generate random background dots
    const seed = plate.id * 1234;
    const lcg = (s: number) => ((s * 1664525 + 1013904223) & 0xffffffff) >>> 0;
    let s = seed;

    for (let i = 0; i < 500; i++) {
      s = lcg(s);
      const dx = ((s % (size - 20)) - (size - 20) / 2) + cx;
      s = lcg(s);
      const dy = ((s % (size - 20)) - (size - 20) / 2) + cy;
      s = lcg(s);
      const dr = 4 + (s % 6);

      const distFromCenter = Math.sqrt((dx - cx) ** 2 + (dy - cy) ** 2);
      if (distFromCenter + dr > r) continue;

      s = lcg(s);
      const shade = (s % 40) - 20;
      const base = parseInt(plate.colors.bg.slice(1), 16);
      const rb = ((base >> 16) & 0xff) + shade;
      const gb = ((base >> 8) & 0xff) + shade;
      const bb = (base & 0xff) + shade;
      ctx.beginPath();
      ctx.arc(dx, dy, dr, 0, Math.PI * 2);
      ctx.fillStyle = `rgb(${Math.max(0, Math.min(255, rb))},${Math.max(0, Math.min(255, gb))},${Math.max(0, Math.min(255, bb))})`;
      ctx.fill();
    }

    // Draw number using colored dots
    ctx.font = `bold ${size * 0.35}px Arial`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    // Stamp number as dots overlay
    const offscreen = document.createElement("canvas");
    offscreen.width = size;
    offscreen.height = size;
    const octx = offscreen.getContext("2d")!;
    octx.font = `bold ${size * 0.35}px Arial`;
    octx.textAlign = "center";
    octx.textBaseline = "middle";
    octx.fillStyle = "black";
    octx.fillText(plate.number, cx, cy);
    const imgData = octx.getImageData(0, 0, size, size);

    s = seed + 999;
    for (let y = 0; y < size; y += 8) {
      for (let x = 0; x < size; x += 8) {
        const idx = (y * size + x) * 4;
        if (imgData.data[idx + 3] > 128) {
          s = lcg(s);
          const jx = x + (s % 8);
          s = lcg(s);
          const jy = y + (s % 8);
          s = lcg(s);
          const dr2 = 5 + (s % 5);

          const distFromCenter2 = Math.sqrt((jx - cx) ** 2 + (jy - cy) ** 2);
          if (distFromCenter2 + dr2 > r) continue;

          s = lcg(s);
          const shade2 = (s % 30) - 15;
          const base2 = parseInt(plate.colors.dots.slice(1), 16);
          const rd = ((base2 >> 16) & 0xff) + shade2;
          const gd = ((base2 >> 8) & 0xff) + shade2;
          const bd = (base2 & 0xff) + shade2;
          ctx.beginPath();
          ctx.arc(jx, jy, dr2, 0, Math.PI * 2);
          ctx.fillStyle = `rgb(${Math.max(0, Math.min(255, rd))},${Math.max(0, Math.min(255, gd))},${Math.max(0, Math.min(255, bd))})`;
          ctx.fill();
        }
      }
    }
  }, [plate, size]);

  return <canvas ref={canvasRef} width={size} height={size} className="rounded-full shadow-xl" />;
}

export default function IshiharaTest({ onComplete, onSkip }: Props) {
  const [current, setCurrent] = useState(0);
  const [answer, setAnswer] = useState("");
  const [confidence, setConfidence] = useState(50);
  const [timeLeft, setTimeLeft] = useState(TIME_PER_PLATE);
  const [results, setResults] = useState<PlateResult[]>([]);
  const [showHint, setShowHint] = useState(false);

  const plate = PLATES[current];

  const submitAnswer = useCallback((ans: string = answer) => {
    const correct = ans.trim() === plate.number;
    const newResult: PlateResult = {
      plate: plate.id,
      answer: ans.trim() || "(skipped)",
      correct,
      confidence,
    };
    const updated = [...results, newResult];

    if (current + 1 >= PLATES.length) {
      const score = Math.round((updated.filter((r) => r.correct).length / PLATES.length) * 100);
      onComplete({ score, answers: updated });
    } else {
      setResults(updated);
      setCurrent((c) => c + 1);
      setAnswer("");
      setConfidence(50);
      setTimeLeft(TIME_PER_PLATE);
      setShowHint(false);
    }
  }, [answer, confidence, current, plate, results, onComplete]);

  useEffect(() => {
    if (timeLeft <= 0) {
      submitAnswer("");
      return;
    }
    const t = setTimeout(() => setTimeLeft((v) => v - 1), 1000);
    return () => clearTimeout(t);
  }, [timeLeft, submitAnswer]);

  const timePercent = (timeLeft / TIME_PER_PLATE) * 100;

  return (
    <div className="container mx-auto max-w-3xl">
      <div className="text-center mb-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Ishihara Plate Test</h2>
        <p className="text-gray-600">Identify the number hidden in each plate. Answer quickly and naturally.</p>
      </div>

      <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 border border-gray-100">
        {/* Timer */}
        <div className="flex items-center justify-between mb-4">
          <Badge variant="outline" className="text-sm">
            Plate {current + 1} / {PLATES.length}
          </Badge>
          <div className="flex items-center space-x-2">
            <Clock className={`h-4 w-4 ${timeLeft <= 5 ? "text-red-500 animate-pulse" : "text-gray-500"}`} />
            <span className={`font-mono font-bold text-lg ${timeLeft <= 5 ? "text-red-500" : "text-gray-700"}`}>
              {timeLeft}s
            </span>
          </div>
        </div>

        <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
          <div
            className={`h-2 rounded-full transition-all duration-1000 ${timeLeft <= 5 ? "bg-red-500" : "bg-emerald-500"}`}
            style={{ width: `${timePercent}%` }}
          />
        </div>

        {/* Plate */}
        <div className="flex justify-center mb-8">
          <IshiharaPlate plate={plate} size={280} />
        </div>

        {/* Answer input */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">What number do you see?</label>
            <input
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value.replace(/[^0-9]/g, ""))}
              onKeyDown={(e) => e.key === "Enter" && submitAnswer()}
              placeholder="Enter number (0-99)"
              maxLength={2}
              className="w-full text-center text-3xl font-bold border-2 border-gray-200 rounded-xl p-4 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200 transition-all"
              autoFocus
            />
          </div>

          {/* Confidence slider */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Confidence: <span className="text-emerald-600 font-bold">{confidence}%</span>
            </label>
            <input
              type="range"
              min={0}
              max={100}
              value={confidence}
              onChange={(e) => setConfidence(Number(e.target.value))}
              className="w-full accent-emerald-500"
            />
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>Not sure</span>
              <span>Very confident</span>
            </div>
          </div>

          {showHint && (
            <div className="flex items-start space-x-2 bg-blue-50 border border-blue-200 rounded-lg p-3">
              <AlertCircle className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-blue-700">{plate.hint}</p>
            </div>
          )}

          <div className="flex gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowHint(true)}
              className="flex-1"
            >
              Show Hint
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => submitAnswer("")}
              className="flex-1"
            >
              Can&apos;t See
            </Button>
            <Button
              onClick={() => submitAnswer()}
              disabled={!answer}
              className="flex-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 flex items-center space-x-2"
            >
              <span>Next</span>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          <Button variant="ghost" size="sm" onClick={onSkip} className="w-full text-gray-400 hover:text-gray-600">
            Skip this test module
          </Button>
        </div>
      </div>
    </div>
  );
}
