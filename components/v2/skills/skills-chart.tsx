"use client";

/**
 * Skills Chart Component
 * 
 * Extracted Recharts component for dynamic import
 * This reduces initial bundle size by loading Recharts only when needed
 */

import * as React from "react";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from "recharts";

export interface SkillsChartProps {
  data: Array<{
    category: string;
    value: number;
    technologies: string[];
  }>;
}

// Custom Tooltip for Recharts
const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="rounded-lg border border-slate-200/50 bg-white/80 p-3 shadow-lg backdrop-blur-xl dark:border-slate-700/50 dark:bg-slate-800/80">
        <p className="text-sm font-semibold text-slate-900 dark:text-white">{data.category}: {data.value}%</p>
        <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">Technologies:</p>
        <ul className="text-xs text-slate-700 dark:text-slate-300 list-disc pl-4">
          {data.technologies.map((tech: string) => (
            <li key={tech}>{tech}</li>
          ))}
        </ul>
      </div>
    );
  }
  return null;
};

export function SkillsChart({ data }: SkillsChartProps) {
  return (
    <>
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data} margin={{ top: 20, right: 30, bottom: 20, left: 30 }}>
          <PolarGrid
            stroke="rgba(148, 163, 184, 0.3)"
            strokeWidth={1}
            className="dark:stroke-slate-600"
          />
          <PolarAngleAxis
            dataKey="category"
            tick={{
              fill: "rgb(71, 85, 105)",
              fontSize: 13,
              fontWeight: 600,
            }}
            className="dark:fill-slate-300"
          />
          <PolarRadiusAxis
            angle={90}
            domain={[0, 100]}
            tick={false}
            axisLine={false}
          />
          <Radar
            name="Skills"
            dataKey="value"
            stroke="url(#skillGradient)"
            fill="url(#skillGradient)"
            fillOpacity={0.7}
            strokeWidth={3}
            isAnimationActive={false}
          />
          <Tooltip content={<CustomTooltip />} />
          <defs>
            <linearGradient id="skillGradient" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#2563eb" stopOpacity={0.9} />
              <stop offset="50%" stopColor="#7c3aed" stopOpacity={0.9} />
              <stop offset="100%" stopColor="#10b981" stopOpacity={0.9} />
            </linearGradient>
          </defs>
        </RadarChart>
      </ResponsiveContainer>
    </>
  );
}
