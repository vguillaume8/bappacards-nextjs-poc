'use client';

import { useState } from 'react';

interface UseTimeRangeDataReturn {
  timeRange: number;
  setTimeRange: (value: number) => void;
}

export function useTimeRangeData(): UseTimeRangeDataReturn {
  const [timeRange, setTimeRange] = useState(0);
  return { timeRange, setTimeRange };
}
