import React from 'react';
import { RunRecord } from '../lib/types';
import { formatDate, formatDistance, formatSpeed } from '../lib/utils';
import { Timer, Activity, Heart } from 'lucide-react';

interface RunTableProps {
  runs: RunRecord[];
}

const RunTable: React.FC<RunTableProps> = ({ runs }) => {
  return (
    <div className="overflow-x-auto max-w-4xl mx-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              日期
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              名称
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              类型
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              距离
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              时间
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              配速
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              心率
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-green-500/20">
          {runs.map((run) => (
            <tr key={run.run_id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                {formatDate(run.start_date_local)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <Activity className="h-4 w-4 text-blue-600 mr-2" />
                  <span className="text-sm text-gray-700">{run.name}</span>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                  {run.type}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <Timer className="h-4 w-4 text-blue-600 mr-2" />
                  <span className="text-sm text-gray-700">{formatDistance(run.distance)}</span>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                {run.moving_time}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                {formatSpeed(run.average_speed)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <Heart className="h-4 w-4 text-blue-600 mr-2" />
                  <span className="text-sm text-gray-700 truncate max-w-xs">
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