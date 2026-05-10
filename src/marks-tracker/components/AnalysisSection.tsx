import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  ZAxis,
} from "recharts";
import { WeeklyMark, SubjectInfo } from "../data/marksData";
import { TrendingUp, AlertTriangle, Star, Zap, Brain } from "lucide-react";

interface AnalysisSectionProps {
  data: WeeklyMark[];
  subjects: SubjectInfo[];
}

const AnalysisSection: React.FC<AnalysisSectionProps> = ({ data, subjects }) => {
  const getSubjectAvg = (key: keyof Omit<WeeklyMark, "week">) => {
    const vals = data.map((d) => d[key]).filter((v) => v !== null) as number[];
    return vals.length ? Math.round(vals.reduce((a, b) => a + b, 0) / vals.length) : 0;
  };

  const pieData = subjects.map((s) => ({
    name: s.name,
    value: getSubjectAvg(s.key),
    color: s.color,
    icon: s.icon,
  }));

  const improvements = subjects.map((s) => {
    const vals = data.map((d) => d[s.key]).filter((v) => v !== null) as number[];
    const improvement = vals.length > 1 ? vals[vals.length - 1] - vals[0] : 0;
    return { ...s, improvement, first: vals[0] ?? 0, last: vals[vals.length - 1] ?? 0 };
  });

  const bestSubject = pieData.reduce((a, b) => (a.value > b.value ? a : b));
  const weakSubject = pieData.reduce((a, b) => (a.value < b.value ? a : b));
  const mostImproved = improvements.reduce((a, b) => (a.improvement > b.improvement ? a : b));

  const scatterData = subjects.map((s) => ({
    name: s.name,
    color: s.color,
    points: data.map((d, i) => ({ x: i + 1, y: d[s.key] ?? 0, z: 100 })),
  }));

  const CustomPieTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white border border-gray-100 rounded-xl shadow-lg p-3 text-sm">
          <p className="font-bold text-[#1a1a2e]">{payload[0].name}</p>
          <p style={{ color: payload[0].payload.color }}>Avg: {payload[0].value}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <section id="analysis" className="max-w-7xl mx-auto px-6 py-10">
      <div className="mb-6">
        <div className="inline-flex items-center gap-2 bg-red-50 rounded-full px-3 py-1 mb-2">
          <Brain className="w-3.5 h-3.5 text-[#E53E3E]" />
          <span className="text-[#E53E3E] text-xs font-semibold">Smart Analysis</span>
        </div>
        <h2 className="text-2xl font-black text-[#1a1a2e]">Performance Analysis</h2>
        <p className="text-gray-400 text-sm mt-1">Deep insights into your academic performance</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Pie Chart */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h3 className="text-lg font-black text-[#1a1a2e] mb-4">Score Distribution</h3>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={90}
                paddingAngle={4}
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={index} fill={entry.color} strokeWidth={0} />
                ))}
              </Pie>
              <Tooltip content={<CustomPieTooltip />} />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-col gap-2 mt-2">
            {pieData.map((d, i) => (
              <div key={d.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: d.color }} />
                  <span className="text-sm text-gray-600 flex items-center gap-1.5">
                    <span style={{ color: subjects[i].color }}>{subjects[i].icon}</span>
                    {d.name}
                  </span>
                </div>
                <span className="text-sm font-bold text-[#1a1a2e]">{d.value}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Improvement Tracker */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h3 className="text-lg font-black text-[#1a1a2e] mb-4">Improvement Tracker</h3>
          <div className="flex flex-col gap-4">
            {improvements.map((s) => (
              <div key={s.key}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-sm font-semibold text-gray-700 flex items-center gap-1.5">
                    <span style={{ color: s.color }}>{s.icon}</span> {s.name}
                  </span>
                  <span
                    className={`text-sm font-bold ${
                      s.improvement > 0 ? "text-green-600" : s.improvement < 0 ? "text-red-500" : "text-gray-400"
                    }`}
                  >
                    {s.improvement > 0 ? "+" : ""}{s.improvement} pts
                  </span>
                </div>
                <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{ width: `${Math.min(100, Math.max(0, (s.last / 100) * 100))}%`, backgroundColor: s.color }}
                  />
                </div>
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>Start: {s.first}</span>
                  <span>Now: {s.last}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Smart Insights */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h3 className="text-lg font-black text-[#1a1a2e] mb-4">Smart Insights</h3>
          <div className="flex flex-col gap-3">
            <div className="flex items-start gap-3 p-3 bg-green-50 rounded-xl">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center shrink-0">
                <Star className="w-4 h-4 text-green-600" />
              </div>
              <div>
                <p className="text-xs font-bold text-green-800">Best Subject</p>
                <p className="text-sm text-green-700 font-semibold flex items-center gap-1">
                  <span>{bestSubject.icon}</span> {bestSubject.name} — {bestSubject.value} avg
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-orange-50 rounded-xl">
              <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center shrink-0">
                <AlertTriangle className="w-4 h-4 text-orange-600" />
              </div>
              <div>
                <p className="text-xs font-bold text-orange-800">Needs Attention</p>
                <p className="text-sm text-orange-700 font-semibold flex items-center gap-1">
                  <span>{weakSubject.icon}</span> {weakSubject.name} — {weakSubject.value} avg
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-xl">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center shrink-0">
                <TrendingUp className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <p className="text-xs font-bold text-blue-800">Most Improved</p>
                <p className="text-sm text-blue-700 font-semibold flex items-center gap-1">
                  <span>{mostImproved.icon}</span> {mostImproved.name} (+{mostImproved.improvement})
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-red-50 rounded-xl">
              <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center shrink-0">
                <Zap className="w-4 h-4 text-[#E53E3E]" />
              </div>
              <div>
                <p className="text-xs font-bold text-red-800">Overall Average</p>
                <p className="text-sm text-red-700 font-semibold">
                  {Math.round(pieData.reduce((a, b) => a + b.value, 0) / pieData.length)}% — Keep pushing!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scatter Chart */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-50">
          <h3 className="text-xl font-black text-[#1a1a2e]">Score Scatter Plot</h3>
          <p className="text-gray-400 text-sm mt-1">Individual marks plotted over weeks</p>
        </div>
        <div className="p-6">
          <ResponsiveContainer width="100%" height={280}>
            <ScatterChart margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f5f5f5" />
              <XAxis
                type="number"
                dataKey="x"
                name="Week"
                tick={{ fontSize: 11, fill: "#9ca3af" }}
                axisLine={false}
                tickLine={false}
                label={{ value: "Week", position: "insideBottom", offset: -5, fontSize: 11, fill: "#9ca3af" }}
                domain={[0.5, data.length + 0.5]}
              />
              <YAxis
                type="number"
                dataKey="y"
                name="Mark"
                domain={[40, 100]}
                tick={{ fontSize: 11, fill: "#9ca3af" }}
                axisLine={false}
                tickLine={false}
              />
              <ZAxis type="number" dataKey="z" range={[60, 60]} />
              <Tooltip
                cursor={{ strokeDasharray: "3 3" }}
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-white border border-gray-100 rounded-xl shadow-lg p-3 text-sm">
                        <p className="font-bold">Week {payload[0]?.value}</p>
                        <p className="text-gray-500">Mark: {payload[1]?.value}</p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              {scatterData.map((s) => (
                <Scatter key={s.name} name={s.name} data={s.points} fill={s.color} opacity={0.85} />
              ))}
            </ScatterChart>
          </ResponsiveContainer>
          <div className="flex justify-center gap-6 mt-2">
            {subjects.map((s) => (
              <div key={s.key} className="flex items-center gap-2 text-xs text-gray-500">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: s.color }} />
                <span style={{ color: s.color }}>{s.icon}</span>
                {s.name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AnalysisSection;
