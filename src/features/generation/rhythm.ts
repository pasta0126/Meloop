export const STEPS_PER_BAR = 8;

export interface TimedStep {
  time: number;
  duration: number;
}

/**
 * Distributes `bars` bars of a 4/4 pattern into evenly spaced steps
 * (STEPS_PER_BAR per bar), at the given BPM. Total duration always equals
 * `bars` bars played at `bpm`.
 */
export function totalPatternDuration(bars: number, bpm: number): number {
  return Math.max(bars, 1) * 4 * (60 / bpm);
}

export function generateRhythm(bars: number, bpm: number): TimedStep[] {
  const totalSteps = Math.max(bars, 1) * STEPS_PER_BAR;
  const quarterNoteSeconds = 60 / bpm;
  const stepDuration = quarterNoteSeconds * (4 / STEPS_PER_BAR);

  return Array.from({ length: totalSteps }, (_, i) => ({
    time: i * stepDuration,
    duration: stepDuration,
  }));
}
