import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend,
} from "recharts";
import { WeeklyMark, SubjectInfo } from "../data/marksData";
import { BarChart2, Radar as RadarIcon } from "lucide-react";

interface BarRadarSectionProps {
  data: WeeklyMark[];
  subjects: SubjectInfo[];
}

const CustomBarTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-gray-100 rounded-2xl shadow-xl p-4">
        <p className="text-[#1a1a2e] font-black text-sm mb-2">{label}</p>
        {payload.map((entry: any) => (
          <div key={entry.dataKey} className="flex items-center justify-between gap-4 mb-1">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.fill }} />
              <span className="text-gray-500 text-xs">{entry.name}</span>
            </div>
            <span className="font-bold text-[#1a1a2e] text-sm">{entry.value}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

const BarRadarSection: React.FC<BarRadarSectionProps> = ({ data, subjects }) => {
  const subjectAvgRadar = subjects.map((s) => {
    const vals = data.map((d) => d[s.key]).filter((v) => v !== null) as number[];
    const avg = vals.length ? Math.round(vals.reduce((a, b) => a + b, 0) / vals.length) : 0;
    return { subject: s.name, value: avg, fullMark: 100 };
  });

  return (
    <section className="max-w-7xl mx-auto px-6 py-4 grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Bar Chart */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-50">
          <div className="inline-flex items-center gap-2 bg-orange-50 rounded-full px-3 py-1 mb-2">
            <BarChart2 className="w-3.5 h-3.5 text-[#F97316]" />
            <span className="text-[#F97316] text-xs font-semibold">Comparison</span>
          </div>
          <h2 className="text-xl font-black text-[#1a1a2e]">Weekly Bar Comparison</h2>
          <p className="text-gray-400 text-sm mt-1">Side-by-side marks per week</p>
        </div>
        <div className="p-4">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }} barGap={3}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f5f5f5" />
              <XAxis dataKey="week" tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
              <YAxis domain={[0, 100]} tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomBarTooltip />} />
              <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: "12px", paddingTop: "16px" }} />
              {subjects.map((s) => (
                <Bar key={s.key} dataKey={s.key} name={s.name} fill={s.color} radius={[4, 4, 0, 0]} maxBarSize={20} />
              ))}
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Radar Chart */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-50">
          <div className="inline-flex items-center gap-2 bg-blue-50 rounded-full px-3 py-1 mb-2">
            <RadarIcon className="w-3.5 h-3.5 text-[#1E3A5F]" />
            <span className="text-[#1E3A5F] text-xs font-semibold">Subject Radar</span>
          </div>
          <h2 className="text-xl font-black text-[#1a1a2e]">Performance Radar</h2>
          <p className="text-gray-400 text-sm mt-1">Average scores across subjects</p>
        </div>
        <div className="p-4 flex items-center justify-center">
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={subjectAvgRadar} margin={{ top: 20, right: 30, left: 30, bottom: 20 }}>
              <PolarGrid stroke="#f0f0f0" />
              <PolarAngleAxis dataKey="subject" tick={{ fontSize: 13, fill: "#374151", fontWeight: 700 }} />
              <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fontSize: 10, fill: "#9ca3af" }} tickCount={5} />
              <Radar
                name="Average Score"
                dataKey="value"
                stroke="#E53E3E"
                fill="#E53E3E"
                fillOpacity={0.25}
                strokeWidth={2}
                dot={{ r: 5, fill: "#E53E3E", strokeWidth: 2, stroke: "white" }}
              />
              <Tooltip
                formatter={(value: any) => [`${value}/100`, "Avg Score"]}
                contentStyle={{ borderRadius: "12px", border: "1px solid #f0f0f0", fontSize: "12px", fontWeight: "bold" }}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        <div className="px-6 pb-6 flex justify-center gap-4">
          {subjectAvgRadar.map((s, i) => (
            <div key={s.subject} className="text-center">
              <div className="text-2xl font-black" style={{ color: subjects[i].color }}>{s.value}</div>
              <div className="text-xs text-gray-400">{s.subject}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BarRadarSection;
