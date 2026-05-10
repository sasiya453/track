import React from "react";
import { TrendingUp, Award, Target } from "lucide-react";

interface HeroSectionProps {
  totalAvg: number;
  bestSubject: string;
  weekCount: number;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  totalAvg,
  bestSubject,
  weekCount,
}) => {
  return (
    <section className="relative overflow-hidden bg-white pt-16 pb-12 px-6">
      {/* Grid background pattern */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: `
            linear-gradient(rgba(229,62,62,0.07) 1px, transparent 1px),
            linear-gradient(90deg, rgba(229,62,62,0.07) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
        }}
      />
      {/* Gradient blob */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-red-50 to-orange-50 rounded-full blur-3xl opacity-60 -translate-y-1/2 translate-x-1/4" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-blue-50 to-indigo-50 rounded-full blur-3xl opacity-50" />

      <div className="relative max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10">
          {/* Left content */}
          <div className="flex-1">
            <div className="inline-flex items-center gap-2 bg-red-50 border border-red-100 rounded-full px-4 py-1.5 mb-6">
              <span className="w-2 h-2 bg-[#E53E3E] rounded-full animate-pulse"></span>
              <span className="text-[#E53E3E] text-sm font-semibold">
                Live Weekly Updates
              </span>
            </div>

            <h1 className="text-5xl font-black text-[#1a1a2e] leading-tight mb-2">
              Track Smarter.
            </h1>
            <h1 className="text-5xl font-black text-[#E53E3E] leading-tight mb-6">
              Score Higher.
            </h1>
            <p className="text-gray-500 text-lg max-w-md leading-relaxed">
              Monitor your weekly paper marks across Chemistry, Physics &amp;
              Maths. Visualize progress, spot trends, and crush your goals.
            </p>

            <div className="flex flex-wrap gap-4 mt-8">
              <a
                href="#charts"
                className="inline-flex items-center gap-2 bg-[#E53E3E] text-white px-6 py-3 rounded-xl font-semibold text-sm hover:bg-red-700 transition-colors shadow-md shadow-red-200"
              >
                View Charts →
              </a>
              <a
                href="#table"
                className="inline-flex items-center gap-2 bg-white text-[#1a1a2e] px-6 py-3 rounded-xl font-semibold text-sm border border-gray-200 hover:border-[#E53E3E] hover:text-[#E53E3E] transition-colors"
              >
                Add Marks
              </a>
            </div>
          </div>

          {/* Right stats */}
          <div className="grid grid-cols-3 gap-4 lg:gap-6">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 text-center min-w-[110px]">
              <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center mx-auto mb-3">
                <TrendingUp className="w-5 h-5 text-[#E53E3E]" />
              </div>
              <div className="text-3xl font-black text-[#1a1a2e]">
                {totalAvg}
                <span className="text-lg">%</span>
              </div>
              <div className="text-xs text-gray-400 font-medium mt-1">
                Overall Avg
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 text-center min-w-[110px]">
              <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Award className="w-5 h-5 text-[#F97316]" />
              </div>
              <div className="text-lg font-black text-[#1a1a2e] leading-tight">
                {bestSubject}
              </div>
              <div className="text-xs text-gray-400 font-medium mt-1">
                Best Subject
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 text-center min-w-[110px]">
              <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Target className="w-5 h-5 text-[#1E3A5F]" />
              </div>
              <div className="text-3xl font-black text-[#1a1a2e]">
                {weekCount}
              </div>
              <div className="text-xs text-gray-400 font-medium mt-1">
                Weeks Tracked
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
