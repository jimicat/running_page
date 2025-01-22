import React from 'react';
import { Activity, Calendar, Route, Timer } from 'lucide-react';
import { YearlyStats } from '../lib/types';
import { formatDistance, formatSpeed } from '../lib/utils';

interface YearCardProps {
  stats: YearlyStats;
}

const YearCard: React.FC<YearCardProps> = ({ stats }) => {
  return (

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div className="bg-black/40 rounded-lg p-4 border border-green-500/20">
        <div className="flex items-center space-x-2 mb-2">
          <Route className="w-4 h-4" />
          <span className="text-xs text-green-300">TOTAL_DISTANCE</span>
        </div>
        <p className="text-2xl">{formatDistance(stats.totalDistance || 0)}</p>
      </div>

      <div className="bg-black/40 rounded-lg p-4 border border-green-500/20">
        <div className="flex items-center space-x-2 mb-2">
          <Activity className="w-4 h-4" />
          <span className="text-xs text-green-300">TOTAL_RUNS</span>
        </div>
        <p className="text-2xl">{stats.totalRuns} 次</p>
      </div>

      <div className="bg-black/40 rounded-lg p-4 border border-green-500/20">
        <div className="flex items-center space-x-2 mb-2">
          <Timer className="w-4 h-4" />
          <span className="text-sm text-green-300">AVG_SPEED </span>
        </div>
        <p className="text-2xl">{formatSpeed(stats.averageSpeed)}</p>
      </div>

      <div className="bg-black/40 rounded-lg p-4 border border-green-500/20">
        <div className="flex items-center space-x-2 mb-2">
          <Calendar className="w-4 h-4" />
          <span className="text-sm text-green-300">AVG_DISTANCE</span>
        </div>
          <p className="text-2xl">{formatDistance(stats.averageDistance)}</p>
        </div>
      </div>

  );
};

export default YearCard;