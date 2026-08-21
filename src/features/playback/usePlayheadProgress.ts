import { useEffect, useRef, useState } from "react";
import * as Tone from "tone";

/**
 * Returns a 0..1 progress value that tracks Tone.Transport's position within
 * `totalDuration`, updated via requestAnimationFrame while `isPlaying`.
 */
export function usePlayheadProgress(isPlaying: boolean, totalDuration: number): number | null {
  const [progress, setProgress] = useState<number | null>(null);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    if (!isPlaying || totalDuration <= 0) {
      setProgress(null);
      return;
    }

    function tick() {
      const seconds = Tone.getTransport().seconds;
      setProgress((seconds % totalDuration) / totalDuration);
      frameRef.current = requestAnimationFrame(tick);
    }
    frameRef.current = requestAnimationFrame(tick);

    return () => {
      if (frameRef.current != null) cancelAnimationFrame(frameRef.current);
    };
  }, [isPlaying, totalDuration]);

  return progress;
}
