import { FlaskConical, Zap, Calculator } from "lucide-react";
import React from "react";

export interface WeeklyMark {
  week: string;
  chemistry: number | null;
  physics: number | null;
  maths: number | null;
}

export interface SubjectInfo {
  name: string;
  key: keyof Omit<WeeklyMark, "week">;
  color: string;
  lightColor: string;
  icon: React.ReactNode;
  totalMarks: number;
}

export const subjects: SubjectInfo[] = [
  {
    name: "Chemistry",
    key: "chemistry",
    color: "#E53E3E",
    lightColor: "#FEE2E2",
    icon: React.createElement(FlaskConical, { className: "w-5 h-5" }),
    totalMarks: 100,
  },
  {
    name: "Physics",
    key: "physics",
    color: "#F97316",
    lightColor: "#FED7AA",
    icon: React.createElement(Zap, { className: "w-5 h-5" }),
    totalMarks: 100,
  },
  {
    name: "Maths",
    key: "maths",
    color: "#1E3A5F",
    lightColor: "#DBEAFE",
    icon: React.createElement(Calculator, { className: "w-5 h-5" }),
    totalMarks: 100,
  },
];

export const initialMarksData: WeeklyMark[] = [
  { week: "Week 1", chemistry: 72, physics: 68, maths: 85 },
  { week: "Week 2", chemistry: 76, physics: 74, maths: 88 },
  { week: "Week 3", chemistry: 69, physics: 79, maths: 82 },
  { week: "Week 4", chemistry: 82, physics: 83, maths: 90 },
  { week: "Week 5", chemistry: 78, physics: 77, maths: 87 },
  { week: "Week 6", chemistry: 85, physics: 88, maths: 92 },
  { week: "Week 7", chemistry: 80, physics: 85, maths: 95 },
  { week: "Week 8", chemistry: 88, physics: 90, maths: 93 },
];
