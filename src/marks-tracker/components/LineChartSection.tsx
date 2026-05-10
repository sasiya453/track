import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  Area,
  AreaChart,
} from "recharts";
import { WeeklyMark, SubjectInfo } from "../data/marksData";
import { TrendingUp } from "lucide-react";

interface LineChartSectionProps {
  data: WeeklyMark[];
  subjects: SubjectInfo[];
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-gray-100 rounded-2xl shadow-xl p-4 min-w-[180px]">
        <p className="text-[#1a1a2e] font-black text-sm mb-3">{label}</p>
        {payload.map((entry: any) => (
          <div key={entry.dataKey} className="flex items-center justify-between gap-4 mb-1.5">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: entry.color }} />
              <span className="text-gray-500 text-xs capitalize">{entry.name}</span>
            </div>
            <span className="font-bold text-[#1a1a2e] text-sm">{entry.value}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

const LineChartSection: React.FC<LineChartSectionProps> = ({ data, subjects }) => {
  const [chartType, setChartType] = useState<"line" | "area">("line");
  const [activeSubjects, setActiveSubjects] = useState<string[]>(subjects.map((s) => s.key));

  const toggleSubject = (key: string) => {
    setActiveSubjects((prev) => prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]);
  };

  return (
    <section id="charts" className="max-w-7xl mx-auto px-6 py-10">
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 bg-red-50 rounded-full px-3 py-1 mb-2">
              <TrendingUp className="w-3.5 h-3.5 text-[#E53E3E]" />
              <span className="text-[#E53E3E] text-xs font-semibold">Trend Analysis</span>
            </div>
            <h2 className="text-2xl font-black text-[#1a1a2e]">Weekly Progress Chart</h2>
            <p className="text-gray-400 text-sm mt-1">Track your marks across all weeks</p>
          </div>

          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2 bg-gray-50 rounded-xl p-1 border border-gray-100">
              <button
                onClick={() => setChartType("line")}
                className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                  chartType === "line" ? "bg-[#E53E3E] text-white shadow-sm" : "text-gray-500 hover:text-[#E53E3E]"
                }`}
              >
                Line
              </button>
              <button
                onClick={() => setChartType("area")}
                className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                  chartType === "area" ? "bg-[#E53E3E] text-white shadow-sm" : "text-gray-500 hover:text-[#E53E3E]"
                }`}
              >
                Area
              </button>
            </div>

            <div className="flex items-center gap-2">
              {subjects.map((s) => (
                <button
                  key={s.key}
                  onClick={() => toggleSubject(s.key)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all"
                  style={{
                    backgroundColor: activeSubjects.includes(s.key) ? s.color : "transparent",
                    borderColor: s.color,
                    color: activeSubjects.includes(s.key) ? "white" : s.color,
                  }}
                >
                  <span>{s.icon}</span> {s.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="p-6">
          <ResponsiveContainer width="100%" height={380}>
            {chartType === "line" ? (
              <LineChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f5f5f5" />
                <XAxis dataKey="week" tick={{ fontSize: 12, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
                <YAxis domain={[40, 100]} tick={{ fontSize: 12, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <ReferenceLine
                  y={80}
                  stroke="#10B981"
                  strokeDasharray="4 4"
                  strokeWidth={1.5}
                  label={{ value: "Target 80%", position: "right", fontSize: 11, fill: "#10B981" }}
                />
                {subjects.map((s) =>
                  activeSubjects.includes(s.key) ? (
                    <Line
                      key={s.key}
                      type="monotone"
                      dataKey={s.key}
                      name={s.name}
                      stroke={s.color}
                      strokeWidth={3}
                      dot={{ fill: s.color, strokeWidth: 2, r: 5, stroke: "white" }}
                      activeDot={{ r: 7, stroke: "white", strokeWidth: 2 }}
                      connectNulls
                    />
                  ) : null
                )}
              </LineChart>
            ) : (
              <AreaChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                <defs>
                  {subjects.map((s) => (
                    <linearGradient key={s.key} id={`grad-${s.key}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={s.color} stopOpacity={0.2} />
                      <stop offset="95%" stopColor={s.color} stopOpacity={0} />
                    </linearGradient>
                  ))}
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f5f5f5" />
                <XAxis dataKey="week" tick={{ fontSize: 12, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
                <YAxis domain={[40, 100]} tick={{ fontSize: 12, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <ReferenceLine
                  y={80}
                  stroke="#10B981"
                  strokeDasharray="4 4"
                  strokeWidth={1.5}
                  label={{ value: "Target 80%", position: "right", fontSize: 11, fill: "#10B981" }}
                />
                {subjects.map((s) =>
                  activeSubjects.includes(s.key) ? (
                    <Area
                      key={s.key}
                      type="monotone"
                      dataKey={s.key}
                      name={s.name}
                      stroke={s.color}
                      strokeWidth={3}
                      fill={`url(#grad-${s.key})`}
                      dot={{ fill: s.color, strokeWidth: 2, r: 5, stroke: "white" }}
                      activeDot={{ r: 7, stroke: "white", strokeWidth: 2 }}
                      connectNulls
                    />
                  ) : null
                )}
              </AreaChart>
            )}
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  );
};

export default LineChartSection;
