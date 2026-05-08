"use client";
import { CheckCircle2 } from "lucide-react";

type Props = {
  steps: string[];
  current: number;
  percent: number;
};

export default function ProgressTracker({ steps, current, percent }: Props) {
  return (
    <div className="sticky top-[57px] z-40 bg-white/95 backdrop-blur-sm border-b shadow-sm py-3 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">
            Test {current + 1} of {steps.length}: <span className="text-emerald-600">{steps[current]}</span>
          </span>
          <span className="text-sm text-gray-500">{Math.round(percent)}% complete</span>
        </div>

        <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
          <div
            className="bg-gradient-to-r from-emerald-500 to-teal-500 h-2 rounded-full transition-all duration-500"
            style={{ width: `${percent}%` }}
          />
        </div>

        <div className="hidden sm:flex items-center justify-between">
          {steps.map((label, i) => (
            <div key={i} className="flex items-center space-x-1">
              <div className={`flex items-center justify-center w-5 h-5 rounded-full text-xs font-bold transition-all duration-300 ${
                i < current ? "bg-emerald-500 text-white" :
                i === current ? "bg-emerald-600 text-white ring-2 ring-emerald-300" :
                "bg-gray-200 text-gray-500"
              }`}>
                {i < current ? <CheckCircle2 className="w-3 h-3" /> : i + 1}
              </div>
              <span className={`text-xs transition-colors duration-300 ${
                i === current ? "text-emerald-600 font-semibold" :
                i < current ? "text-emerald-500" : "text-gray-400"
              }`}>
                {label}
              </span>
              {i < steps.length - 1 && (
                <div className={`h-px w-8 mx-1 transition-all duration-500 ${i < current ? "bg-emerald-400" : "bg-gray-200"}`} />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
