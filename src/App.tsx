import RunTable from './components/RunTable';
import YearCard from './components/YearCard';
import { calculateYearlyStats, formatDistance } from './lib/utils';
import { Trophy, List, MapPin } from 'lucide-react';
import useActivities from './hook/useActivities';
import { Navbar } from './components/NavBar';
import { useState } from 'react';
import { RunningMap } from './components/RunningMap';

function App() {
  const { activityList: activities, loading, error } = useActivities();
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(currentYear);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const yearlyStats = calculateYearlyStats(activities);
  const years = yearlyStats.map(stat => stat.year);

  const selectedYearStats = yearlyStats.find(stat => stat.year === selectedYear) || yearlyStats[0];
  const filteredRuns = activities.filter(run =>
    new Date(run.start_date).getFullYear() === selectedYear
  );

  return (
    <div className="min-h-screen bg-gray-900">
      <Navbar
        years={years}
        selectedYear={selectedYear}
        onYearChange={setSelectedYear}
      />

      <header className=" text-green-400 py-12 border-green-500/30">
        <div className="container mx-auto px-4">

          <div className="bg-black/50 backdrop-blur-lg rounded-lg p-8 font-mono border border-green-500/30">
            <div className="flex items-center space-x-2 mb-6">
              <span className="text-green-400">$</span>
              <span className="text-xl">stats --year {selectedYearStats.year} --format detailed</span>
            </div>
            <YearCard stats={selectedYearStats} />
            <div className="mt-6 pt-6 border-t border-green-500/20">
              <div className="flex items-center space-x-2 mb-4">
                <Trophy className="w-4 h-4 text-yellow-500" />
                <span className="text-yellow-500">ACHIEVEMENT_UNLOCKED</span>
              </div>
              <div className="text-sm">
                Longest run: {formatDistance(selectedYearStats.longestRun?.distance || 0)} on {selectedYearStats.longestRun ? new Date(selectedYearStats.longestRun.start_date).toLocaleDateString() : 'N/A'}
              </div>
            </div>
          </div>
        </div>
      </header>

        <main className="container mx-auto px-4 py-8">
        <div className="bg-gray-800 rounded-lg shadow-lg p-6 border border-green-500/30">
          <div className="flex items-center space-x-2 mb-6">
            <MapPin className="w-5 h-5 text-green-400" />
            <h2 className="text-xl font-mono font-bold text-green-400">轨迹地图</h2>
          </div>
          <RunningMap runs={filteredRuns} />
        </div>
        </main>

        <main className="container mx-auto px-4 py-8">
          <div className="bg-gray-800 rounded-lg shadow-lg p-6 border border-green-500/30">
            <div className="flex items-center space-x-2 mb-6">
              <List className="w-5 h-5 text-green-400" />
              <h2 className="text-xl font-mono font-bold text-green-400">跑步日志</h2>
            </div>
            <RunTable runs={filteredRuns} />
          </div>
        </main>

        <footer className="bg-gray-800 text-gray-400 py-8 border-t border-green-500/30">
          <div className="container mx-auto px-4 text-center font-mono">
            <p className="text-green-400">© {new Date().getFullYear()} Running.Stats - Tracking Progress</p>
          </div>
        </footer>
      </div>
  );
}

export default App;