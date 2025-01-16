// src/components/RunTable.tsx
import React from 'react';
import { RunRecord } from '../lib/types';
import useActivities from '../hook/useActivities';
import { formatDate, formatDistance, formatSpeed } from '../lib/utils';
import { Timer, Activity, Heart } from 'lucide-react';


interface RunTableProps {

  runs: RunRecord[];

}


const RunTable: React.FC<RunTableProps> = () => {
  const { activityList, loading, error } = useActivities();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-green-500/20">
        <thead className="bg-black/40">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-mono font-medium text-green-400 uppercase tracking-wider">
              日期
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-mono font-medium text-green-400 uppercase tracking-wider">
              名称
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-mono font-medium text-green-400 uppercase tracking-wider">
              类型
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-mono font-medium text-green-400 uppercase tracking-wider">
              距离
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-mono font-medium text-green-400 uppercase tracking-wider">
              时间
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-mono font-medium text-green-400 uppercase tracking-wider">
              配速
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-mono font-medium text-green-400 uppercase tracking-wider">
              心率
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-green-500/20">
          {activityList.map((run) => (
            <tr key={run.run_id} className="hover:bg-green-500/5">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-green-300">
                {formatDate(run.start_date_local)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <Activity className="h-4 w-4 text-green-400 mr-2" />
                  <span className="text-sm font-mono text-green-300">{run.name}</span>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-2 inline-flex text-xs leading-5 font-mono font-semibold rounded-full bg-green-500/20 text-green-400">
                  {run.type}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <Timer className="h-4 w-4 text-green-400 mr-2" />
                  <span className="text-sm font-mono text-green-300">{formatDistance(run.distance)}</span>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-green-300">
                {run.moving_time}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-green-300">
                {formatSpeed(run.average_speed)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <Heart className="h-4 w-4 text-green-400 mr-2" />
                  <span className="text-sm font-mono text-green-300 truncate max-w-xs">
                    {run.average_heartrate}
                  </span>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RunTable;