// src/hook/useActivities.ts
import { useState, useEffect } from 'react';
import { RunRecord } from '../lib/types';
import activities from '../static/activities.json';

const useActivities = () => {
  const [activityList, setActivityList] = useState<RunRecord[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        // Simulating a fetch call
        const response = activities; // Assuming activities is already in the correct format
        setActivityList(response.map(activity => ({
          ...activity,
          location_country: activity.location_country || '',
          summary_polyline: activity.summary_polyline || '',
          average_heartrate: activity.average_heartrate || 0
        })));
      } catch (err) {
        setError('Failed to load activities');
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  return { activityList, loading, error };
};

export default useActivities;