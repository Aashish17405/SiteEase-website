"use client";
import { useEffect, useState } from "react";
import { TestResults } from "@/app/test/page";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
} from "recharts";
import {
  Chrome,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  Info,
  CircleX,
  Sparkles,
  Settings2,
} from "lucide-react";

type Props = {
  results: TestResults;
  onRetake: () => void;
};

type VisionType = "Normal" | "Protanopia" | "Deuteranopia" | "Tritanopia" | "Mild Deficiency" | "Monochromacy";

// The 6 filter keys the SiteEase extension understands
export type FilterKey = "protanopia" | "deuteranopia" | "tritanopia" | "tritanomaly" | "achromatopsia" | "dyslexia";

export const EXTENSION_FILTERS: {
  key: FilterKey;
  label: string;
  desc: string;
  color: string;
  swatch: string;
}[] = [
  {
    key: "protanopia",
    label: "Red Blindness",
    desc: "Protanopia — difficulty distinguishing reds",
    color: "bg-red-100 text-red-800 border-red-300",
    swatch: "#ef4444",
  },
  {
    key: "deuteranopia",
    label: "Green Blindness",
    desc: "Deuteranopia — difficulty distinguishing greens",
    color: "bg-green-100 text-green-800 border-green-300",
    swatch: "#22c55e",
  },
  {
    key: "tritanopia",
    label: "Blue Blindness",
    desc: "Tritanopia — difficulty distinguishing blues",
    color: "bg-blue-100 text-blue-800 border-blue-300",
    swatch: "#3b82f6",
  },
  {
    key: "tritanomaly",
    label: "Yellow Blindness",
    desc: "Tritanomaly — reduced blue-yellow sensitivity",
    color: "bg-yellow-100 text-yellow-800 border-yellow-300",
    swatch: "#eab308",
  },
  {
    key: "achromatopsia",
    label: "Achromatopsia",
    desc: "Complete color blindness — sees only greyscale",
    color: "bg-gray-100 text-gray-700 border-gray-300",
    swatch: "#6b7280",
  },
  {
    key: "dyslexia",
    label: "Dyslexia",
    desc: "Dyslexia support — font and spacing adjustments",
    color: "bg-purple-100 text-purple-800 border-purple-300",
    swatch: "#a855f7",
  },
];

// Map test vision type → best matching extension filter
const VISION_TO_FILTER: Record<VisionType, FilterKey | null> = {
  Normal: null,
  "Mild Deficiency": "deuteranopia",
  Protanopia: "protanopia",
  Deuteranopia: "deuteranopia",
  Tritanopia: "tritanopia",
  Monochromacy: "achromatopsia",
};

function estimateVisionType(results: TestResults): { type: VisionType; confidence: number; description: string } {
  const ishiharaScore = results.ishihara?.score ?? 100;
  const colorMatchScore = results.colorMatch?.score ?? 100;
  const avgScore = (ishiharaScore + colorMatchScore) / 2;
  const answers = results.ishihara?.answers ?? [];
  const wrongPlates = answers.filter((a) => !a.correct).map((a) => a.plate);

  if (avgScore >= 85) return { type: "Normal", confidence: Math.round(avgScore), description: "Your color vision appears to be within normal range." };
  if (avgScore >= 60) return { type: "Mild Deficiency", confidence: Math.round(100 - avgScore + 30), description: "You may have a mild color vision deficiency. Some colors may appear similar." };
  if (wrongPlates.includes(1) || wrongPlates.includes(5)) return { type: "Protanopia", confidence: Math.round(100 - avgScore + 50), description: "Pattern suggests possible red color vision deficiency (Protanopia/Protanomaly)." };
  if (wrongPlates.includes(2) || wrongPlates.includes(3)) return { type: "Deuteranopia", confidence: Math.round(100 - avgScore + 50), description: "Pattern suggests possible green color vision deficiency (Deuteranopia/Deuteranomaly)." };
  if (avgScore < 30) return { type: "Monochromacy", confidence: 70, description: "Very low scores across all tests may indicate significant color vision deficiency." };
  return { type: "Tritanopia", confidence: 40, description: "Pattern may indicate blue color vision differences." };
}

const CHART_COLORS = ["#10b981", "#0d9488", "#3b82f6", "#8b5cf6", "#f59e0b"];
const LS_KEY = "siteease_recommended_filter";

export default function ResultsDashboard({ results, onRetake }: Props) {
  const ishiharaScore = results.ishihara?.score ?? 0;
  const colorMatchScore = results.colorMatch?.score ?? 0;
  const motionScore = results.motion?.score ?? 0;
  const simulationScore = results.simulation?.score ?? 0;

  const vision = estimateVisionType(results);
  const overallScore = Math.round((ishiharaScore + colorMatchScore + motionScore + simulationScore) / 4);

  const autoFilter = VISION_TO_FILTER[vision.type];
  const [selectedFilter, setSelectedFilter] = useState<FilterKey | null>(autoFilter);
  const [saved, setSaved] = useState(false);

  // Save to localStorage so SiteEase extension reads on install
  useEffect(() => {
    if (selectedFilter) {
      const payload = {
        filter: selectedFilter,
        visionType: vision.type,
        score: overallScore,
        confidence: vision.confidence,
        savedAt: new Date().toISOString(),
      };
      localStorage.setItem(LS_KEY, JSON.stringify(payload));
      setSaved(true);
    } else {
      localStorage.removeItem(LS_KEY);
    }
  }, [selectedFilter, vision.type, overallScore, vision.confidence]);

  const radarData = [
    { subject: "Plate Recognition", A: ishiharaScore, fullMark: 100 },
    { subject: "Color Matching", A: colorMatchScore, fullMark: 100 },
    { subject: "Motion Perception", A: motionScore, fullMark: 100 },
    { subject: "Real-World Tasks", A: simulationScore, fullMark: 100 },
  ];

  const barData = [
    { name: "Ishihara", score: ishiharaScore },
    { name: "Color Match", score: colorMatchScore },
    { name: "Motion", score: motionScore },
    { name: "Simulation", score: simulationScore },
  ];

  const avgReaction = results.motion?.reactionTimes?.length
    ? Math.round(results.motion.reactionTimes.reduce((a, b) => a + b, 0) / results.motion.reactionTimes.length)
    : null;

  const scoreBg = overallScore >= 80 ? "from-emerald-500 to-teal-500" : overallScore >= 50 ? "from-amber-400 to-orange-400" : "from-red-500 to-pink-500";

  const selectedFilterMeta = EXTENSION_FILTERS.find((f) => f.key === selectedFilter);

  return (
    <div className="container mx-auto max-w-5xl space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">Your Results</h2>
        <p className="text-gray-600">Color vision assessment complete. Here&apos;s your detailed profile.</p>
      </div>

      {/* Overall score + vision type */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="border-0 shadow-lg">
          <CardContent className="p-6 text-center">
            <p className="text-sm text-gray-500 mb-2">Overall Score</p>
            <div className={`text-6xl font-black mb-2 bg-gradient-to-r ${scoreBg} bg-clip-text text-transparent`}>
              {overallScore}%
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 mb-3">
              <div
                className={`h-3 rounded-full bg-gradient-to-r ${scoreBg} transition-all duration-1000`}
                style={{ width: `${overallScore}%` }}
              />
            </div>
            <p className="text-sm text-gray-600">
              {overallScore >= 80 ? "Excellent performance" : overallScore >= 60 ? "Average performance" : "Below average"}
            </p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <p className="text-sm text-gray-500 mb-2">Estimated Vision Type</p>
            <div className="flex items-center space-x-2 mb-3">
              <Badge className={`text-sm px-3 py-1 ${vision.type === "Normal" ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"}`}>
                {vision.type}
              </Badge>
              <span className="text-sm text-gray-500">({vision.confidence}% confidence)</span>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">{vision.description}</p>
            <div className="flex items-start space-x-2 mt-3 bg-blue-50 rounded-lg p-3">
              <Info className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
              <p className="text-xs text-blue-700">Screening estimate only — not a medical diagnosis.</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* ── RECOMMENDED FILTER CARD ── */}
      <Card className="border-2 border-emerald-300 shadow-xl bg-gradient-to-br from-emerald-50 via-white to-teal-50">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center space-x-2 text-emerald-700">
            <Sparkles className="h-5 w-5" />
            <span>Recommended SiteEase Filter</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {autoFilter ? (
            <div className="flex items-center space-x-3 bg-white rounded-xl p-4 shadow-sm border border-emerald-200">
              <div
                className="w-10 h-10 rounded-full flex-shrink-0 shadow-md"
                style={{ backgroundColor: selectedFilterMeta?.swatch ?? "#10b981" }}
              />
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-900">{selectedFilterMeta?.label}</p>
                <p className="text-xs text-gray-500">{selectedFilterMeta?.desc}</p>
              </div>
              {saved && (
                <div className="flex items-center space-x-1 text-emerald-600 flex-shrink-0">
                  <CheckCircle2 className="h-4 w-4" />
                  <span className="text-xs font-medium">Saved</span>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-emerald-100 rounded-xl p-4 text-center">
              <CheckCircle2 className="h-8 w-8 text-emerald-600 mx-auto mb-2" />
              <p className="font-medium text-emerald-800">Normal color vision detected</p>
              <p className="text-xs text-emerald-700 mt-1">You can still select a filter below if needed.</p>
            </div>
          )}

          <p className="text-xs text-gray-500 flex items-center space-x-1">
            <Info className="h-3 w-3 flex-shrink-0" />
            <span>
              When you install SiteEase, this filter will be <strong>automatically applied</strong> based on your test results.
              Stored locally — never sent to any server.
            </span>
          </p>

          {/* Manual override */}
          <div>
            <div className="flex items-center space-x-2 mb-3">
              <Settings2 className="h-4 w-4 text-gray-500" />
              <p className="text-sm font-medium text-gray-700">Override — choose a different filter:</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {EXTENSION_FILTERS.map((f) => (
                <button
                  key={f.key}
                  onClick={() => setSelectedFilter(selectedFilter === f.key ? null : f.key)}
                  className={`flex items-center space-x-2 p-3 rounded-xl border-2 text-left transition-all duration-200 ${
                    selectedFilter === f.key
                      ? `${f.color} border-current shadow-md scale-[1.02]`
                      : "bg-white border-gray-200 hover:border-gray-300 hover:shadow-sm text-gray-700"
                  }`}
                >
                  <div
                    className="w-5 h-5 rounded-full flex-shrink-0 shadow-sm"
                    style={{ backgroundColor: f.swatch }}
                  />
                  <div className="min-w-0">
                    <p className="text-xs font-semibold truncate">{f.label}</p>
                    <p className="text-[10px] text-gray-500 truncate">{f.key}</p>
                  </div>
                  {selectedFilter === f.key && (
                    <CheckCircle2 className="h-3.5 w-3.5 flex-shrink-0 ml-auto" />
                  )}
                </button>
              ))}
            </div>
            {selectedFilter && (
              <button
                onClick={() => setSelectedFilter(null)}
                className="text-xs text-gray-400 hover:text-gray-600 mt-2 underline"
              >
                Clear selection (no filter)
              </button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Charts row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="border-0 shadow-lg">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Performance Radar</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <RadarChart data={radarData}>
                <PolarGrid stroke="#e5e7eb" />
                <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10, fill: "#6b7280" }} />
                <Radar name="Score" dataKey="A" stroke="#10b981" fill="#10b981" fillOpacity={0.3} strokeWidth={2} />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Module Scores</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={barData} margin={{ top: 5, right: 10, bottom: 5, left: -10 }}>
                <XAxis dataKey="name" tick={{ fontSize: 10, fill: "#6b7280" }} />
                <YAxis domain={[0, 100]} tick={{ fontSize: 10, fill: "#6b7280" }} />
                <Tooltip formatter={(v: number) => [`${v}%`, "Score"]} />
                <Bar dataKey="score" radius={[4, 4, 0, 0]}>
                  {barData.map((_, i) => (
                    <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Detail stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Plates Correct", value: `${results.ishihara?.answers?.filter((a) => a.correct).length ?? 0}/${results.ishihara?.answers?.length ?? 8}` },
          { label: "Color Match", value: `${colorMatchScore}%` },
          { label: "Avg Reaction", value: avgReaction ? `${avgReaction}ms` : "N/A" },
          { label: "Simulations", value: results.simulation?.completed ? "Done" : "Skipped" },
        ].map((s, i) => (
          <Card key={i} className="border-0 shadow-md text-center">
            <CardContent className="p-4">
              <p className="text-2xl font-bold text-gray-900 mb-1">{s.value}</p>
              <p className="text-xs text-gray-500">{s.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Ishihara plate breakdown */}
      {results.ishihara?.answers && results.ishihara.answers.length > 0 && (
        <Card className="border-0 shadow-lg">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Ishihara Plate Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
              {results.ishihara.answers.map((a, i) => (
                <div
                  key={i}
                  className={`rounded-lg p-2 text-center text-xs ${a.correct ? "bg-emerald-50 border border-emerald-200" : "bg-red-50 border border-red-200"}`}
                >
                  <div className={`font-bold ${a.correct ? "text-emerald-700" : "text-red-700"}`}>
                    {a.correct ? <CheckCircle2 className="h-4 w-4 mx-auto" /> : <CircleX className="h-4 w-4 mx-auto" />}
                  </div>
                  <div className="text-gray-600 mt-1">#{a.plate}</div>
                  <div className="text-gray-500">{a.answer || "—"}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Professional note */}
      <Card className="border-0 shadow-md">
        <CardContent className="p-4 flex items-start space-x-3">
          <Info className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
          <div>
            <p className="font-medium text-gray-900 text-sm">Professional Assessment</p>
            <p className="text-xs text-gray-600 mt-1">
              For accurate diagnosis, visit an optometrist or ophthalmologist for formal color vision testing (Farnsworth-Munsell 100-Hue, D-15, Anomaloscope).
            </p>
          </div>
        </CardContent>
      </Card>

      {/* CTA */}
      <div className="rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 p-6 text-white text-center space-y-4">
        <AlertCircle className="h-8 w-8 mx-auto opacity-90" />
        <h3 className="text-xl font-bold">
          {selectedFilter
            ? `Install SiteEase — "${selectedFilterMeta?.label}" filter will auto-apply`
            : "Install SiteEase Accessibility Extension"}
        </h3>
        <p className="text-emerald-100 text-sm max-w-lg mx-auto">
          {selectedFilter
            ? `Your recommended ${selectedFilterMeta?.label} correction filter is saved. SiteEase will activate it automatically when you install the extension.`
            : "Transform any website for your visual needs — color filters, dyslexia fonts, and more."}
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-sm mx-auto">
          <Button
            asChild
            size="lg"
            className="bg-white text-emerald-700 hover:bg-gray-100 font-bold shadow-lg"
          >
            <a
              href="https://chromewebstore.google.com/detail/site-ease/hhfjlgpooppjdgbnlemkpkjkddfbfpfj"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center space-x-2"
            >
              <Chrome className="h-5 w-5" />
              <span>Add to Chrome — Free</span>
            </a>
          </Button>
          <Button
            onClick={onRetake}
            variant="outline"
            size="lg"
            className="border-white text-white hover:bg-white/10"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Retake Test
          </Button>
        </div>
        {selectedFilter && (
          <p className="text-xs text-emerald-200">
            Filter &quot;{selectedFilter}&quot; saved to localStorage key <code className="bg-white/20 px-1 rounded">siteease_recommended_filter</code>
          </p>
        )}
      </div>
    </div>
  );
}
