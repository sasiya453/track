import React, { useState, useMemo } from "react";
import { initialMarksData, subjects, WeeklyMark } from "./data/marksData";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import SubjectCards from "./components/SubjectCards";
import LineChartSection from "./components/LineChartSection";
import BarRadarSection from "./components/BarRadarSection";
import MarksTable from "./components/MarksTable";
import AnalysisSection from "./components/AnalysisSection";

const MarksTrackerPage: React.FC = () => {
  const [data, setData] = useState<WeeklyMark[]>(initialMarksData);

  const stats = useMemo(() => {
    const allVals: number[] = [];
    const subjectAvgs = subjects.map((s) => {
      const vals = data.map((d) => d[s.key]).filter((v) => v !== null) as number[];
      const avg = vals.length ? Math.round(vals.reduce((a, b) => a + b, 0) / vals.length) : 0;
      allVals.push(...vals);
      return { name: s.name, avg };
    });

    const totalAvg = allVals.length
      ? Math.round(allVals.reduce((a, b) => a + b, 0) / allVals.length)
      : 0;

    const bestSubject = subjectAvgs.reduce((a, b) => (a.avg > b.avg ? a : b)).name;

    return { totalAvg, bestSubject, weekCount: data.length };
  }, [data]);

  return (
    <div
      className="min-h-screen"
      style={{
        background: "linear-gradient(135deg, #fafafa 0%, #fff5f5 50%, #f0f4ff 100%)",
      }}
    >
      <Header />

      <main>
        <HeroSection
          totalAvg={stats.totalAvg}
          bestSubject={stats.bestSubject}
          weekCount={stats.weekCount}
        />

        {/* Divider */}
        <div className="max-w-7xl mx-auto px-6">
          <div className="border-t border-gray-100" />
        </div>

        <SubjectCards data={data} subjects={subjects} />

        <div className="max-w-7xl mx-auto px-6">
          <div className="border-t border-gray-100" />
        </div>

        <LineChartSection data={data} subjects={subjects} />

        <BarRadarSection data={data} subjects={subjects} />

        <div className="max-w-7xl mx-auto px-6 py-2">
          <div className="border-t border-gray-100" />
        </div>

        <MarksTable data={data} subjects={subjects} onDataChange={setData} />

        <div className="max-w-7xl mx-auto px-6">
          <div className="border-t border-gray-100" />
        </div>

        <AnalysisSection data={data} subjects={subjects} />
      </main>

      {/* Footer */}
      <footer className="bg-[#1a1a2e] text-white mt-10">
        <div className="max-w-7xl mx-auto px-6 py-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-lg bg-[#E53E3E] flex items-center justify-center text-white font-bold text-sm">
                  MT
                </div>
                <span className="font-black text-lg">Marks Tracker</span>
              </div>
              <p className="text-gray-400 text-sm">
                Track your Chemistry, Physics & Maths weekly
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-400">
              {subjects.map((s) => (
                <div key={s.key} className="flex items-center gap-2">
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: s.color }}
                  />
                  <span style={{ color: s.color }}>{s.icon}</span>
                  {s.name}
                </div>
              ))}
            </div>
            <p className="text-gray-500 text-xs">
              © {new Date().getFullYear()} Marks Tracker. Made for Students.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MarksTrackerPage;
