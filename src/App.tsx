import RunTable from './components/RunTable';
import { calculateYearlyStats, formatDistance, formatSpeed } from './lib/utils';
import { Terminal, Activity, Zap, Timer, Route, Trophy, List } from 'lucide-react';
import useActivities from './hook/useActivities';

function App() {
  const { activityList: activities, loading, error } = useActivities();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const yearlyStats = calculateYearlyStats(activities);
  const latestYearStats = yearlyStats[0] || {};

  return (
    <div className="min-h-screen bg-gray-900">
      <header className="text-green-400 py-12 border-green-500/30">
        <div className="container mx-auto px-4">
          <div className="flex items-center space-x-3 mb-8">
            <Terminal className="w-8 h-8" />
            <h1 className="text-3xl font-mono font-bold">Running.Stats</h1>
          </div>

          <div className="bg-black/50 backdrop-blur-lg rounded-lg p-8 font-mono border border-green-500/30">
            <div className="flex items-center space-x-2 mb-6">
              <span className="text-green-400">$</span>
              <span className="text-xl">stats --year {latestYearStats.year || 'N/A'} --format detailed</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-black/40 rounded-lg p-4 border border-green-500/20">
                <div className="flex items-center space-x-2 mb-2">
                  <Route className="w-4 h-4" />
                  <span className="text-xs text-green-300">TOTAL_DISTANCE</span>
                </div>
                <p className="text-2xl">{formatDistance(latestYearStats.totalDistance || 0)}</p>
                <div className="mt-2 text-xs text-green-300/60">
                  {(latestYearStats.totalDistance / 1000).toFixed(2)} kilometers tracked
                </div>
              </div>

              <div className="bg-black/40 rounded-lg p-4 border border-green-500/20">
                <div className="flex items-center space-x-2 mb-2">
                  <Activity className="w-4 h-4" />
                  <span className="text-xs text-green-300">TOTAL_RUNS</span>
                </div>
                <p className="text-2xl">{latestYearStats.totalRuns || 0}</p>
                <div className="mt-2 text-xs text-green-300/60">
                  sessions completed
                </div>
              </div>

              <div className="bg-black/40 rounded-lg p-4 border border-green-500/20">
                <div className="flex items-center space-x-2 mb-2">
                  <Zap className="w-4 h-4" />
                  <span className="text-xs text-green-300">AVG_SPEED</span>
                </div>
                <p className="text-2xl">{formatSpeed(latestYearStats.averageSpeed || 0)}</p>
                <div className="mt-2 text-xs text-green-300/60">
                  average velocity
                </div>
              </div>

              <div className="bg-black/40 rounded-lg p-4 border border-green-500/20">
                <div className="flex items-center space-x-2 mb-2">
                  <Timer className="w-4 h-4" />
                  <span className="text-xs text-green-300">AVG_DISTANCE</span>
                </div>
                <p className="text-2xl">{formatDistance(latestYearStats.averageDistance || 0)}</p>
                <div className="mt-2 text-xs text-green-300/60">
                  per session
                </div>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-green-500/20">
              <div className="flex items-center space-x-2 mb-4">
                <Trophy className="w-4 h-4 text-yellow-500" />
                <span className="text-yellow-500">ACHIEVEMENT_UNLOCKED</span>
              </div>
              <div className="text-sm">
                Longest run: {formatDistance(latestYearStats.longestRun?.distance || 0)} on {latestYearStats.longestRun ? new Date(latestYearStats.longestRun.start_date).toLocaleDateString() : 'N/A'}
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="bg-gray-800 rounded-lg shadow-lg p-6 border border-green-500/30">
          <div className="flex items-center space-x-2 mb-6">
            <List className="w-5 h-5 text-green-400" />
            <h2 className="text-xl font-mono font-bold text-green-400">跑步日志</h2>
          </div>
          <RunTable runs={activities} />
        </div>
      </main>

      <footer className="bg-gray-800 text-gray-400 py-8 border-t border-green-500/30">
        <div className="container mx-auto px-4 text-center font-mono">
          <p className="text-green-400">/* © {new Date().getFullYear()} Running.Stats - Tracking Progress */</p>
        </div>
      </footer>
    </div>
  );
}

export default App;