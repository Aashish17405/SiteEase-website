"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Target } from "lucide-react";

type Props = {
  onComplete: (data: { score: number; reactionTimes: number[]; accuracy: number }) => void;
  onSkip: () => void;
};

type Phase = "intro" | "task1" | "task2" | "done";

type Ball = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  r: number;
  id: number;
};

const COLORS_NORMAL = ["#e74c3c", "#2ecc71", "#3498db", "#f1c40f", "#9b59b6"];
const COLORS_BLIND_SIM = ["#a0a020", "#20a0a0", "#a02020", "#20a020", "#2020a0"];

function useAnimationLoop(cb: (dt: number) => void, active: boolean) {
  const rafRef = useRef<number>(0);
  const lastRef = useRef<number>(0);
  useEffect(() => {
    if (!active) return;
    const loop = (ts: number) => {
      const dt = Math.min(ts - (lastRef.current || ts), 50);
      lastRef.current = ts;
      cb(dt);
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, [active, cb]);
}

function Task1_TrackTarget({ onResult }: { onResult: (rt: number, hit: boolean) => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ballsRef = useRef<Ball[]>([]);
  const targetRef = useRef<number>(0);
  const highlightedRef = useRef<boolean>(false);
  const highlightTimeRef = useRef<number>(0);
  const waitingRef = useRef<boolean>(false);
  const waitStartRef = useRef<number>(0);
  const phase = useRef<"moving" | "highlight" | "waiting">("moving");
  const [msg, setMsg] = useState("Watch the balls — click the RED one when it flashes!");

  useEffect(() => {
    const W = 500, H = 300;
    ballsRef.current = Array.from({ length: 5 }, (_, i) => ({
      x: 60 + i * 80,
      y: 80 + (i % 2) * 100,
      vx: (Math.random() - 0.5) * 3,
      vy: (Math.random() - 0.5) * 3,
      color: COLORS_NORMAL[i],
      r: 24,
      id: i,
    }));
    targetRef.current = Math.floor(Math.random() * 5);

    // After 3s, highlight target
    const t = setTimeout(() => {
      phase.current = "highlight";
      highlightTimeRef.current = Date.now();
      setMsg("CLICK the highlighted ball NOW!");
      setTimeout(() => {
        if (phase.current === "highlight") {
          waitingRef.current = true;
          phase.current = "waiting";
          waitStartRef.current = Date.now();
        }
      }, 2000);
    }, 3000);
    return () => clearTimeout(t);
  }, []);

  const draw = useCallback((dt: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    const W = canvas.width, H = canvas.height;

    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = "#1a1a2e";
    ctx.fillRect(0, 0, W, H);

    ballsRef.current.forEach((b) => {
      b.x += b.vx * (dt / 16);
      b.y += b.vy * (dt / 16);
      if (b.x - b.r < 0 || b.x + b.r > W) b.vx *= -1;
      if (b.y - b.r < 0 || b.y + b.r > H) b.vy *= -1;
      b.x = Math.max(b.r, Math.min(W - b.r, b.x));
      b.y = Math.max(b.r, Math.min(H - b.r, b.y));

      ctx.beginPath();
      ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);

      const isTarget = b.id === targetRef.current;
      const isHighlight = phase.current === "highlight" && isTarget;

      if (isHighlight) {
        const pulse = 0.5 + 0.5 * Math.sin(Date.now() / 100);
        ctx.fillStyle = `rgba(255, ${Math.round(50 + 150 * pulse)}, 50, 0.9)`;
        ctx.shadowBlur = 20;
        ctx.shadowColor = "#ff3333";
      } else {
        ctx.fillStyle = b.color;
        ctx.shadowBlur = 0;
      }
      ctx.fill();
      ctx.shadowBlur = 0;
    });
  }, []);

  useAnimationLoop(draw, true);

  const handleClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (phase.current !== "highlight" && phase.current !== "waiting") return;
    const rect = (e.target as HTMLCanvasElement).getBoundingClientRect();
    const mx = (e.clientX - rect.left) * (500 / rect.width);
    const my = (e.clientY - rect.top) * (300 / rect.height);

    const tb = ballsRef.current[targetRef.current];
    const dist = Math.sqrt((mx - tb.x) ** 2 + (my - tb.y) ** 2);
    const hit = dist <= tb.r + 10;
    const rt = phase.current === "highlight"
      ? Date.now() - highlightTimeRef.current
      : Date.now() - waitStartRef.current + 2000;

    phase.current = "moving";
    onResult(rt, hit);
  };

  return (
    <div className="space-y-3">
      <p className="text-center text-sm text-gray-600">{msg}</p>
      <canvas
        ref={canvasRef}
        width={500}
        height={300}
        className="w-full rounded-xl cursor-crosshair"
        style={{ maxHeight: 300 }}
        onClick={handleClick}
      />
    </div>
  );
}

function Task2_ColorSequence({ onResult }: { onResult: (rt: number, correct: boolean) => void }) {
  const [sequence] = useState(() => Array.from({ length: 5 }, () => COLORS_BLIND_SIM[Math.floor(Math.random() * COLORS_BLIND_SIM.length)]));
  const [showing, setShowing] = useState<number | null>(null);
  const [phase, setPhase] = useState<"watch" | "answer">("watch");
  const [answer, setAnswer] = useState<string[]>([]);
  const startTimeRef = useRef(0);

  useEffect(() => {
    let i = 0;
    const show = () => {
      if (i >= sequence.length) {
        setShowing(null);
        setPhase("answer");
        startTimeRef.current = Date.now();
        return;
      }
      setShowing(i);
      setTimeout(() => { setShowing(null); setTimeout(() => { i++; show(); }, 300); }, 700);
    };
    const t = setTimeout(show, 800);
    return () => clearTimeout(t);
  }, [sequence]);

  const addColor = (c: string) => {
    const next = [...answer, c];
    setAnswer(next);
    if (next.length === sequence.length) {
      const correct = next.every((v, i) => v === sequence[i]);
      onResult(Date.now() - startTimeRef.current, correct);
    }
  };

  return (
    <div className="space-y-4">
      <p className="text-center text-sm text-gray-600">
        {phase === "watch" ? "Memorize the color sequence..." : "Recreate the sequence by clicking colors:"}
      </p>

      {phase === "watch" && (
        <div className="flex justify-center gap-3">
          {sequence.map((c, i) => (
            <div
              key={i}
              className="w-12 h-12 rounded-xl transition-all duration-300"
              style={{
                backgroundColor: showing === i ? c : "#e5e7eb",
                transform: showing === i ? "scale(1.3)" : "scale(1)",
                boxShadow: showing === i ? `0 0 20px ${c}` : "none",
              }}
            />
          ))}
        </div>
      )}

      {phase === "answer" && (
        <>
          <div className="flex justify-center gap-3 mb-4">
            {Array.from({ length: sequence.length }, (_, i) => (
              <div
                key={i}
                className="w-12 h-12 rounded-xl border-2 border-dashed border-gray-300"
                style={{ backgroundColor: answer[i] || "transparent" }}
              />
            ))}
          </div>
          <div className="flex justify-center gap-3 flex-wrap">
            {COLORS_BLIND_SIM.map((c, i) => (
              <button
                key={i}
                onClick={() => addColor(c)}
                disabled={answer.length >= sequence.length}
                className="w-14 h-14 rounded-xl shadow-md hover:scale-110 transition-transform border-2 border-transparent hover:border-white"
                style={{ backgroundColor: c }}
              />
            ))}
          </div>
          {answer.length > 0 && (
            <Button variant="ghost" size="sm" className="w-full" onClick={() => setAnswer([])}>
              Reset Answer
            </Button>
          )}
        </>
      )}
    </div>
  );
}

const TASKS = 4;

export default function MotionPerceptionTest({ onComplete, onSkip }: Props) {
  const [taskNum, setTaskNum] = useState(0);
  const [phase, setPhase] = useState<Phase>("intro");
  const [reactionTimes, setReactionTimes] = useState<number[]>([]);
  const [hits, setHits] = useState(0);
  const [key, setKey] = useState(0);

  const handleTask1Result = (rt: number, hit: boolean) => {
    const rts = [...reactionTimes, rt];
    setReactionTimes(rts);
    if (hit) setHits((h) => h + 1);
    nextTask(rts, hits + (hit ? 1 : 0));
  };

  const handleTask2Result = (rt: number, correct: boolean) => {
    const rts = [...reactionTimes, rt];
    setReactionTimes(rts);
    if (correct) setHits((h) => h + 1);
    nextTask(rts, hits + (correct ? 1 : 0));
  };

  const nextTask = (rts: number[], currentHits: number) => {
    const next = taskNum + 1;
    if (next >= TASKS) {
      const score = Math.round((currentHits / TASKS) * 100);
      const accuracy = Math.round((currentHits / TASKS) * 100);
      onComplete({ score, reactionTimes: rts, accuracy });
      return;
    }
    setTaskNum(next);
    setKey((k) => k + 1);
  };

  return (
    <div className="container mx-auto max-w-2xl">
      <div className="text-center mb-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Motion & Perception Test</h2>
        <p className="text-gray-600">Track moving objects and memorize color sequences under time pressure.</p>
      </div>

      <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <Badge variant="outline">Task {taskNum + 1} / {TASKS}</Badge>
          <div className="flex items-center space-x-1">
            <Target className="h-4 w-4 text-emerald-500" />
            <span className="text-sm font-medium">{hits} hits</span>
          </div>
        </div>

        {phase === "intro" ? (
          <div className="text-center space-y-4 py-8">
            <div className="w-16 h-16 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-full flex items-center justify-center mx-auto">
              <Target className="h-8 w-8 text-emerald-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900">Motion & Color Perception</h3>
            <p className="text-gray-600 max-w-sm mx-auto">
              You&apos;ll track moving colored balls and memorize color sequences.
              This tests visual attention and color discrimination under dynamic conditions.
            </p>
            <Button
              onClick={() => setPhase("task1")}
              className="bg-gradient-to-r from-emerald-600 to-teal-600 px-8 py-3"
            >
              Begin Tasks
            </Button>
          </div>
        ) : (
          <div key={key}>
            {taskNum % 2 === 0 ? (
              <Task1_TrackTarget onResult={handleTask1Result} />
            ) : (
              <Task2_ColorSequence onResult={handleTask2Result} />
            )}
          </div>
        )}

        <Button variant="ghost" size="sm" onClick={onSkip} className="w-full mt-6 text-gray-400 hover:text-gray-600">
          Skip this test module
        </Button>
      </div>
    </div>
  );
}
