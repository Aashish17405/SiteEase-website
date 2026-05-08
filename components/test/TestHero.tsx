"use client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, Clock, BarChart3, Shield } from "lucide-react";

const FEATURES = [
  { icon: Eye, label: "4 Test Modules", desc: "Ishihara, Color Match, Motion & Real-World" },
  { icon: Clock, label: "~10 Minutes", desc: "Quick, accurate, science-backed assessment" },
  { icon: BarChart3, label: "Detailed Results", desc: "Radar charts, scores & vision type estimate" },
  { icon: Shield, label: "100% Private", desc: "No data leaves your browser" },
];

const PARTICLES = [
  { color: "bg-red-400", size: "w-4 h-4", pos: "top-16 left-12", delay: "0s" },
  { color: "bg-green-400", size: "w-6 h-6", pos: "top-24 right-20", delay: "0.5s" },
  { color: "bg-blue-400", size: "w-3 h-3", pos: "top-40 left-1/4", delay: "1s" },
  { color: "bg-yellow-400", size: "w-5 h-5", pos: "bottom-20 right-1/4", delay: "1.5s" },
  { color: "bg-purple-400", size: "w-4 h-4", pos: "bottom-32 left-16", delay: "0.8s" },
  { color: "bg-orange-400", size: "w-3 h-3", pos: "top-1/2 right-12", delay: "1.2s" },
];

export default function TestHero({ onStart }: { onStart: () => void }) {
  return (
    <div className="container mx-auto max-w-5xl text-center relative overflow-hidden py-8 sm:py-12">
      {PARTICLES.map((p, i) => (
        <div
          key={i}
          className={`absolute ${p.color} ${p.size} ${p.pos} rounded-full opacity-30 animate-bounce`}
          style={{ animationDelay: p.delay, animationDuration: "2.5s" }}
        />
      ))}

      <div className="relative z-10">
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200">Free Assessment</Badge>
          <Badge className="bg-teal-100 text-teal-800 border-teal-200">Science-Based</Badge>
          <Badge className="bg-blue-100 text-blue-800 border-blue-200">No Registration</Badge>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
          Color Vision
          <br />
          <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
            Assessment Test
          </span>
        </h1>

        <p className="text-base sm:text-lg lg:text-xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
          Discover your color vision profile through four interactive modules.
          Identify potential color blindness types and get personalized accessibility recommendations.
        </p>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10 max-w-4xl mx-auto">
          {FEATURES.map((f, i) => (
            <div key={i} className="bg-white rounded-xl p-4 shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-300">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                <f.icon className="h-5 w-5 text-emerald-600" />
              </div>
              <p className="font-semibold text-gray-900 text-sm">{f.label}</p>
              <p className="text-xs text-gray-500 mt-1">{f.desc}</p>
            </div>
          ))}
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-8 max-w-2xl mx-auto">
          <p className="text-sm text-amber-800">
            <strong>Note:</strong> This is a screening tool, not a medical diagnosis.
            Consult an eye care professional for clinical assessment.
          </p>
        </div>

        <Button
          size="lg"
          onClick={onStart}
          className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-lg px-10 py-6 shadow-xl animate-pulse hover:animate-none transition-all duration-300"
        >
          Start Color Vision Test
        </Button>

        <p className="text-sm text-gray-500 mt-4">No account needed • Results stay private • ~10 min</p>
      </div>
    </div>
  );
}
