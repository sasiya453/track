import React, { useState } from "react";
import { Plus, Trash2, Edit3, Check, X, TableProperties } from "lucide-react";
import { WeeklyMark, SubjectInfo } from "../data/marksData";

interface MarksTableProps {
  data: WeeklyMark[];
  subjects: SubjectInfo[];
  onDataChange: (newData: WeeklyMark[]) => void;
}

// New grade system: A 75-100, B 65-74, C 55-64, S 35-54, F 0-34
const getGrade = (mark: number | null): { grade: string; color: string } => {
  if (mark === null) return { grade: "-", color: "text-gray-400" };
  if (mark >= 75) return { grade: "A", color: "text-green-600" };
  if (mark >= 65) return { grade: "B", color: "text-blue-500" };
  if (mark >= 55) return { grade: "C", color: "text-yellow-600" };
  if (mark >= 35) return { grade: "S", color: "text-orange-500" };
  return { grade: "F", color: "text-red-600" };
};

const getMarkBg = (mark: number | null): string => {
  if (mark === null) return "bg-gray-50 text-gray-400";
  if (mark >= 75) return "bg-green-50 text-green-700 font-bold";
  if (mark >= 65) return "bg-blue-50 text-blue-700 font-bold";
  if (mark >= 55) return "bg-yellow-50 text-yellow-700 font-bold";
  if (mark >= 35) return "bg-orange-50 text-orange-700 font-bold";
  return "bg-red-50 text-red-600 font-bold";
};

const MarksTable: React.FC<MarksTableProps> = ({ data, subjects, onDataChange }) => {
  const [editingRow, setEditingRow] = useState<number | null>(null);
  const [editValues, setEditValues] = useState<Partial<WeeklyMark>>({});
  const [showAddForm, setShowAddForm] = useState(false);
  const [newRow, setNewRow] = useState<WeeklyMark>({
    week: `Week ${data.length + 1}`,
    chemistry: null,
    physics: null,
    maths: null,
  });

  const startEdit = (index: number) => {
    setEditingRow(index);
    setEditValues({ ...data[index] });
  };

  const saveEdit = () => {
    if (editingRow === null) return;
    const updated = [...data];
    updated[editingRow] = { ...data[editingRow], ...editValues };
    onDataChange(updated);
    setEditingRow(null);
    setEditValues({});
  };

  const cancelEdit = () => {
    setEditingRow(null);
    setEditValues({});
  };

  const deleteRow = (index: number) => {
    const updated = data.filter((_, i) => i !== index);
    onDataChange(updated);
  };

  const addRow = () => {
    onDataChange([...data, newRow]);
    setNewRow({
      week: `Week ${data.length + 2}`,
      chemistry: null,
      physics: null,
      maths: null,
    });
    setShowAddForm(false);
  };

  const getTotal = (row: WeeklyMark) => {
    const vals = [row.chemistry, row.physics, row.maths].filter(
      (v) => v !== null
    ) as number[];
    return vals.length ? Math.round(vals.reduce((a, b) => a + b, 0) / vals.length) : null;
  };

  const gradeLegend = [
    { grade: "A", range: "75-100", color: "text-green-600" },
    { grade: "B", range: "65-74", color: "text-blue-500" },
    { grade: "C", range: "55-64", color: "text-yellow-600" },
    { grade: "S", range: "35-54", color: "text-orange-500" },
    { grade: "F", range: "0-34", color: "text-red-600" },
  ];

  return (
    <section id="table" className="max-w-7xl mx-auto px-6 py-10">
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-gray-50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 bg-red-50 rounded-full px-3 py-1 mb-2">
              <TableProperties className="w-3.5 h-3.5 text-[#E53E3E]" />
              <span className="text-[#E53E3E] text-xs font-semibold">Data Table</span>
            </div>
            <h2 className="text-2xl font-black text-[#1a1a2e]">Marks Register</h2>
            <p className="text-gray-400 text-sm mt-1">View, edit, and add weekly marks</p>
          </div>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="inline-flex items-center gap-2 bg-[#E53E3E] text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-red-700 transition-colors shadow-md shadow-red-100"
          >
            <Plus className="w-4 h-4" />
            Add Week
          </button>
        </div>

        {/* Add Row Form */}
        {showAddForm && (
          <div className="p-4 bg-red-50 border-b border-red-100 flex flex-wrap gap-3 items-end">
            <div>
              <label className="text-xs font-semibold text-gray-600 block mb-1">Week</label>
              <input
                className="border border-gray-200 rounded-lg px-3 py-2 text-sm w-28 focus:outline-none focus:border-[#E53E3E]"
                value={newRow.week}
                onChange={(e) => setNewRow({ ...newRow, week: e.target.value })}
              />
            </div>
            {subjects.map((s) => (
              <div key={s.key}>
                <label className="text-xs font-semibold text-gray-600 block mb-1 flex items-center gap-1">
                  <span className="text-gray-500">{s.icon}</span> {s.name}
                </label>
                <input
                  type="number"
                  min={0}
                  max={100}
                  className="border border-gray-200 rounded-lg px-3 py-2 text-sm w-24 focus:outline-none focus:border-[#E53E3E]"
                  placeholder="0-100"
                  value={newRow[s.key] ?? ""}
                  onChange={(e) =>
                    setNewRow({
                      ...newRow,
                      [s.key]: e.target.value === "" ? null : Number(e.target.value),
                    })
                  }
                />
              </div>
            ))}
            <button
              onClick={addRow}
              className="flex items-center gap-1.5 bg-[#E53E3E] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-red-700 transition-colors"
            >
              <Check className="w-4 h-4" /> Save
            </button>
            <button
              onClick={() => setShowAddForm(false)}
              className="flex items-center gap-1.5 bg-gray-200 text-gray-600 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-gray-300 transition-colors"
            >
              <X className="w-4 h-4" /> Cancel
            </button>
          </div>
        )}

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="text-left px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Week
                </th>
                {subjects.map((s) => (
                  <th
                    key={s.key}
                    className="text-center px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider"
                  >
                    <div className="flex items-center justify-center gap-1.5">
                      <span className="text-gray-500" style={{ color: s.color }}>{s.icon}</span>
                      <span>{s.name}</span>
                    </div>
                  </th>
                ))}
                <th className="text-center px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Grade</th>
                <th className="text-center px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Avg</th>
                <th className="text-right px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row, index) => {
                const total = getTotal(row);
                const { grade, color } = getGrade(total);
                const isEditing = editingRow === index;

                return (
                  <tr key={index} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4">
                      {isEditing ? (
                        <input
                          className="border border-gray-200 rounded-lg px-2 py-1 text-sm w-24 focus:outline-none focus:border-[#E53E3E]"
                          value={editValues.week ?? ""}
                          onChange={(e) => setEditValues({ ...editValues, week: e.target.value })}
                        />
                      ) : (
                        <span className="font-bold text-[#1a1a2e] text-sm">{row.week}</span>
                      )}
                    </td>

                    {subjects.map((s) => (
                      <td key={s.key} className="px-6 py-4 text-center">
                        {isEditing ? (
                          <input
                            type="number"
                            min={0}
                            max={100}
                            className="border border-gray-200 rounded-lg px-2 py-1 text-sm w-20 text-center focus:outline-none focus:border-[#E53E3E]"
                            value={editValues[s.key] ?? ""}
                            onChange={(e) =>
                              setEditValues({
                                ...editValues,
                                [s.key]: e.target.value === "" ? null : Number(e.target.value),
                              })
                            }
                          />
                        ) : (
                          <span className={`inline-block px-3 py-1 rounded-lg text-sm ${getMarkBg(row[s.key])}`}>
                            {row[s.key] ?? "-"}
                          </span>
                        )}
                      </td>
                    ))}

                    <td className="px-6 py-4 text-center">
                      <span className={`text-sm font-black ${color}`}>{grade}</span>
                    </td>

                    <td className="px-6 py-4 text-center">
                      <span className="text-sm font-bold text-[#1a1a2e]">{total ?? "-"}</span>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        {isEditing ? (
                          <>
                            <button
                              onClick={saveEdit}
                              className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center text-green-600 hover:bg-green-100 transition-colors"
                            >
                              <Check className="w-4 h-4" />
                            </button>
                            <button
                              onClick={cancelEdit}
                              className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-colors"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              onClick={() => startEdit(index)}
                              className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-500 hover:bg-blue-100 transition-colors"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => deleteRow(index)}
                              className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center text-red-400 hover:bg-red-100 transition-colors"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>

            <tfoot>
              <tr className="bg-gray-50 border-t-2 border-gray-200">
                <td className="px-6 py-4 text-xs font-black text-gray-500 uppercase">Average</td>
                {subjects.map((s) => {
                  const vals = data.map((d) => d[s.key]).filter((v) => v !== null) as number[];
                  const avg = vals.length ? Math.round(vals.reduce((a, b) => a + b, 0) / vals.length) : "-";
                  return (
                    <td key={s.key} className="px-6 py-4 text-center">
                      <span className="text-sm font-black" style={{ color: s.color }}>{avg}</span>
                    </td>
                  );
                })}
                <td colSpan={3} />
              </tr>
            </tfoot>
          </table>
        </div>

        {/* Grade legend */}
        <div className="p-4 bg-gray-50 border-t border-gray-100 flex flex-wrap gap-4 justify-center">
          {gradeLegend.map((g) => (
            <div key={g.grade} className="flex items-center gap-1.5 text-xs">
              <span className={`font-black ${g.color}`}>{g.grade}</span>
              <span className="text-gray-400">= {g.range}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MarksTable;
