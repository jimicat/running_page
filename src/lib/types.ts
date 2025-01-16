export interface RunRecord {
  run_id: number;
  name: string;
  distance: number;
  moving_time: string;
  type: string;
  subtype: string;
  start_date: string;
  start_date_local: string;
  location_country: string;
  summary_polyline: string | null;
  average_heartrate: number | null;
  average_speed: number;
  streak: number;
}

export interface YearlyStats {
  year: number;
  totalDistance: number;
  totalRuns: number;
  averageSpeed: number;
  averageDistance: number;
  longestRun: RunRecord | null;
}
