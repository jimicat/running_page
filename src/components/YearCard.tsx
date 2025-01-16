import React from 'react';
import { Activity, Calendar, Map, Timer } from 'lucide-react';
import { YearlyStats } from '../lib/types';
import { formatDistance, formatSpeed } from '../lib/utils';

interface YearCardProps {
  stats: YearlyStats;
}

export const YearCard: React.FC<YearCardProps> = ({ stats }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
      <h2 className="text-3xl font-bold text-gray-800 mb-4">{stats.year}年度统计</h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center space-x-3">
          <Map className="w-5 h-5 text-blue-500" />
          <div>
            <p className="text-sm text-gray-600">总距离</p>
            <p className="text-lg font-semibold">{formatDistance(stats.totalDistance)}</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <Activity className="w-5 h-5 text-green-500" />
          <div>
            <p className="text-sm text-gray-600">总跑步次数</p>
            <p className="text-lg font-semibold">{stats.totalRuns}次</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <Timer className="w-5 h-5 text-yellow-500" />
          <div>
            <p className="text-sm text-gray-600">平均配速</p>
            <p className="text-lg font-semibold">{formatSpeed(stats.averageSpeed)}</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <Calendar className="w-5 h-5 text-purple-500" />
          <div>
            <p className="text-sm text-gray-600">平均距离</p>
            <p className="text-lg font-semibold">{formatDistance(stats.averageDistance)}</p>
          </div>
        </div>
      </div>
      <div className="mt-4 pt-4 border-t border-gray-200">
        <h3 className="text-sm font-medium text-gray-600 mb-2">最长跑步记录</h3>
        <div className="bg-gray-50 p-3 rounded-lg">
          {stats.longestRun && (
            <>
              <p className="text-sm text-gray-800">{stats.longestRun.name}</p>
              <p className="text-sm text-gray-600">{formatDistance(stats.longestRun.distance)}</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};