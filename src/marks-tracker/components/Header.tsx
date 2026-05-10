import React from "react";
import { BookOpen, Bell, Search, GraduationCap } from "lucide-react";

const Header: React.FC = () => {
  return (
    <header className="w-full bg-white border-b border-gray-100 sticky top-0 z-50">
      {/* Top bar */}
      <div className="bg-[#1a1a2e] text-gray-300 text-xs py-1.5 px-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <GraduationCap className="w-3.5 h-3.5 text-gray-400" />
          <span>Track your academic progress weekly</span>
        </div>
        <span className="text-gray-400 italic">Made for Students</span>
      </div>

      {/* Main nav */}
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-[#E53E3E] flex items-center justify-center shadow-md">
            <BookOpen className="w-5 h-5 text-white" />
          </div>
          <div>
            <span className="text-[#1a1a2e] font-black text-xl tracking-tight">
              {"<"}
            </span>
            <span className="text-[#E53E3E] font-black text-xl tracking-tight">
              M
            </span>
            <span className="text-[#1a1a2e] font-black text-xl tracking-tight">
              {"T>"}
            </span>
            <span className="ml-1 text-gray-400 text-xs font-medium hidden sm:inline">
              Marks Tracker
            </span>
          </div>
        </div>

        {/* Nav links */}
        <nav className="hidden md:flex items-center gap-8">
          <a href="#overview" className="text-sm font-medium text-gray-600 hover:text-[#E53E3E] transition-colors">Overview</a>
          <a href="#charts" className="text-sm font-medium text-gray-600 hover:text-[#E53E3E] transition-colors">Charts</a>
          <a href="#table" className="text-sm font-medium text-gray-600 hover:text-[#E53E3E] transition-colors">Table</a>
          <a href="#analysis" className="text-sm font-medium text-gray-600 hover:text-[#E53E3E] transition-colors">Analysis</a>
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-3">
          <button className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">
            <Search className="w-4 h-4 text-gray-500" />
          </button>
          <button className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors relative">
            <Bell className="w-4 h-4 text-gray-500" />
            <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-[#E53E3E] rounded-full border-2 border-white"></span>
          </button>
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#E53E3E] to-[#F97316] flex items-center justify-center text-white text-sm font-bold shadow">
            S
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
