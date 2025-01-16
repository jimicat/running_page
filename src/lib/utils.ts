import { RunRecord, YearlyStats } from '../lib/types';

export const formatDistance = (distance: number): string => {
  return (distance / 1000).toFixed(2) + ' km';
};

export const formatSpeed = (speed: number): string => {
  return (speed * 3.6).toFixed(2) + ' km/h';
};

export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

export const calculateYearlyStats = (runs: RunRecord[] = []): YearlyStats[] => {
  const runsByYear = runs.reduce((acc, run) => {
    const year = new Date(run.start_date).getFullYear();
    if (!acc[year]) {
      acc[year] = [];
    }
    acc[year].push(run);
    return acc;
  }, {} as Record<number, RunRecord[]>);

  return Object.entries(runsByYear).map(([year, yearRuns]) => {
    if (!yearRuns || yearRuns.length === 0) {
      return {
        year: parseInt(year),
        totalDistance: 0,
        totalRuns: 0,
        averageSpeed: 0,
        averageDistance: 0,
        longestRun: null
      };
    }
    const totalDistance = yearRuns.reduce((sum, run) => sum + run.distance, 0);
    const totalRuns = yearRuns.length;
    const averageSpeed = yearRuns.reduce((sum, run) => sum + run.average_speed, 0) / totalRuns;
    const averageDistance = totalDistance / totalRuns;
    const longestRun = yearRuns.reduce((longest, run) =>
      run.distance > longest.distance ? run : longest
      , yearRuns[0]);

    return {
      year: parseInt(year),
      totalDistance,
      totalRuns,
      averageSpeed,
      averageDistance,
      longestRun
    };
  }).sort((a, b) => b.year - a.year);
};