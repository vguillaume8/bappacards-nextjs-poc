'use client';

/**
 * Custom hook for carousel state management with auto-advance and pause functionality
 * Ported from bappacards-client/src/hooks/useCarousel.js
 */

import { useState, useEffect, useCallback } from 'react';

interface UseCarouselReturn {
  currentIndex: number;
  isPaused: boolean;
  handlePrev: () => void;
  handleNext: () => void;
  goToIndex: (index: number) => void;
  pause: () => void;
  resume: () => void;
}

const useCarousel = (itemCount: number, interval: number = 3000): UseCarouselReturn => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? itemCount - 1 : prevIndex - 1));
  }, [itemCount]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex === itemCount - 1 ? 0 : prevIndex + 1));
  }, [itemCount]);

  const goToIndex = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  const pause = useCallback(() => { setIsPaused(true); }, []);
  const resume = useCallback(() => { setIsPaused(false); }, []);

  useEffect(() => {
    if (isPaused || !interval) return;

    const autoAdvance = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex === itemCount - 1 ? 0 : prevIndex + 1));
    }, interval);

    return () => clearInterval(autoAdvance);
  }, [isPaused, interval, itemCount]);

  return { currentIndex, isPaused, handlePrev, handleNext, goToIndex, pause, resume };
};

export default useCarousel;
