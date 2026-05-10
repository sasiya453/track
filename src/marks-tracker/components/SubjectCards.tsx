import React from "react";
import { TrendingUp, TrendingDown, Minus, Calendar } from "lucide-react";
import { WeeklyMark, SubjectInfo } from "../data/marksData";

interface SubjectCardsProps {
  data: WeeklyMark[];
  subjects: SubjectInfo[];
}

const SubjectCards: React.FC<SubjectCardsProps> = ({ data, subjects }) => {
  const getStats = (key: keyof Omit<WeeklyMark, "week">) => {
    const values = data.map((d) => d[key]).filter((v) => v !== null) as number[];
    if (values.length === 0) return { avg: 0, latest: 0, trend: 0, max: 0, min: 0 };
    const avg = Math.round(values.reduce((a, b) => a + b, 0) / values.length);
    const latest = values[values.length - 1];
    const prev = values.length > 1 ? values[values.length - 2] : latest;
    const trend = latest - prev;
    const max = Math.max(...values);
    const min = Math.min(...values);
    return { avg, latest, trend, max, min };
  };

  const getTrendIcon = (trend: number) => {
    if (trend > 0) return <TrendingUp className="w-4 h-4" />;
    if (trend < 0) return <TrendingDown className="w-4 h-4" />;
    return <Minus className="w-4 h-4" />;
  };

  const getTrendColor = (trend: number) => {
    if (trend > 0) return "text-green-600 bg-green-50";
    if (trend < 0) return "text-red-600 bg-red-50";
    return "text-gray-500 bg-gray-50";
  };

  return (
    <section id="overview" className="max-w-7xl mx-auto px-6 py-10">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-black text-[#1a1a2e]">Subject Overview</h2>
          <p className="text-gray-400 text-sm mt-1">Weekly performance summary per subject</p>
        </div>
        <div className="inline-flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-full px-3 py-1.5 text-xs text-gray-500 font-medium">
          <Calendar className="w-3.5 h-3.5" />
          Updated Weekly
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {subjects.map((subject) => {
          const stats = getStats(subject.key);
          const percentage = Math.round((stats.latest / subject.totalMarks) * 100);

          return (
            <div
              key={subject.key}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow overflow-hidden group"
            >
              <div className="h-1.5 w-full" style={{ backgroundColor: subject.color }} />

              <div className="p-6">
                <div className="flex items-start justify-between mb-5">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: subject.lightColor, color: subject.color }}
                    >
                      {subject.icon}
                    </div>
                    <div>
                      <h3 className="font-black text-[#1a1a2e] text-lg">{subject.name}</h3>
                      <p className="text-gray-400 text-xs">Out of {subject.totalMarks}</p>
                    </div>
                  </div>
                  <div className={`flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full ${getTrendColor(stats.trend)}`}>
                    {getTrendIcon(stats.trend)}
                    <span>{stats.trend > 0 ? "+" : ""}{stats.trend}</span>
                  </div>
                </div>

                <div className="mb-5">
                  <div className="flex items-end gap-2">
                    <span className="text-5xl font-black" style={{ color: subject.color }}>
                      {stats.latest}
                    </span>
                    <span className="text-gray-400 text-lg mb-1 font-medium">/ {subject.totalMarks}</span>
                  </div>
                  <p className="text-gray-400 text-xs mt-1">Latest Score</p>
                </div>

                <div className="mb-5">
                  <div className="flex justify-between text-xs text-gray-400 mb-1.5">
                    <span>Progress</span>
                    <span className="font-semibold" style={{ color: subject.color }}>{percentage}%</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{ width: `${percentage}%`, backgroundColor: subject.color }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-gray-50 rounded-xl p-3 text-center">
                    <div className="text-lg font-black text-[#1a1a2e]">{stats.avg}</div>
                    <div className="text-xs text-gray-400">Avg</div>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-3 text-center">
                    <div className="text-lg font-black text-green-600">{stats.max}</div>
                    <div className="text-xs text-gray-400">Best</div>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-3 text-center">
                    <div className="text-lg font-black text-red-500">{stats.min}</div>
                    <div className="text-xs text-gray-400">Lowest</div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default SubjectCards;
