import React from 'react';
import { RunRecord } from '../lib/types';

interface HeatMapProps {
  runs: RunRecord[];
  year: number;
}

export const HeatMap: React.FC<HeatMapProps> = ({ runs, year }) => {
  // 创建一个完整的年度日期数组
  const getDaysInYear = (year: number) => {
    const firstDay = new Date(year, 0, 1);
    const lastDay = new Date(year + 1, 0, 0);
    const days: Date[] = [];
    let currentDay = firstDay;

    while (currentDay <= lastDay) {
      days.push(new Date(currentDay));
      currentDay.setDate(currentDay.getDate() + 1);
    }
    return days;
  };

  // 获取每天的跑步距离
  const getRunDistance = (date: Date) => {
    return runs
      .filter(run => {
        const runDate = new Date(run.start_date);
        return (
          runDate.getFullYear() === date.getFullYear() &&
          runDate.getMonth() === date.getMonth() &&
          runDate.getDate() === date.getDate()
        );
      })
      .reduce((total, run) => total + run.distance, 0);
  };

  // 获取颜色强度
  const getColorIntensity = (distance: number) => {
    if (distance === 0) return 'bg-black/40';
    if (distance < 3000) return 'bg-green-900/40';
    if (distance < 5000) return 'bg-green-700/40';
    if (distance < 8000) return 'bg-green-500/40';
    return 'bg-green-300/40';
  };

  const days = getDaysInYear(year);
  const weeks = Math.ceil(days.length / 7);

  return (
    <div className="bg-black/40 rounded-lg p-4 border border-green-500/20">
      <div className="flex items-center space-x-2 mb-4">
        <div className="text-xs font-mono text-green-400">距离热力图</div>
        <div className="flex items-center space-x-1 text-xs font-mono text-green-400/60">
          <div className="w-3 h-3 bg-black/40 rounded"></div>
          <span>0km</span>
          <div className="w-3 h-3 bg-green-900/40 rounded"></div>
          <span>&lt;3km</span>
          <div className="w-3 h-3 bg-green-700/40 rounded"></div>
          <span>&lt;5km</span>
          <div className="w-3 h-3 bg-green-500/40 rounded"></div>
          <span>&lt;8km</span>
          <div className="w-3 h-3 bg-green-300/40 rounded"></div>
          <span>&gt;8km</span>
        </div>
      </div>
      
      <div className="flex">
        <div className="grid grid-cols-[repeat(53,_minmax(0,_1fr))] gap-2">
          {Array.from({ length: weeks }).map((_, weekIndex) => (
            <div key={weekIndex} className="grid grid-rows-7 gap-1">
              {Array.from({ length: 7 }).map((_, dayIndex) => {
                const dayNumber = weekIndex * 7 + dayIndex;
                const currentDate = days[dayNumber];
                
                if (!currentDate) return (
                  <div
                    key={dayIndex}
                    className="w-5 h-5 rounded bg-transparent"
                  ></div>
                );

                const distance = getRunDistance(currentDate);
                const colorClass = getColorIntensity(distance);
                
                return (
                  <div
                    key={dayIndex}
                    className={`w-3 h-3 rounded ${colorClass} hover:ring-1 hover:ring-green-400 transition-all duration-200`}
                    title={`${currentDate.toLocaleDateString()}: ${(distance / 1000).toFixed(2)}km`}
                  ></div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};