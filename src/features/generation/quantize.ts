import type { Stroke } from "../../lib/types";
import { buildScaleNoteRange } from "./scaleNotes";

/**
 * Splits the drawing into `steps` evenly spaced time bins along X. For each
 * bin, averages the Y of every point (across all strokes) that falls inside
 * it and maps that average to a note in the scale range. A bin with no
 * points produces `null` (silence).
 */
export function quantizeStrokesToScale(
  strokes: Stroke[],
  steps: number,
  scaleName: string,
  key: string,
  octave: number
): (string | null)[] {
  if (steps <= 0) return [];

  const noteRange = buildScaleNoteRange(scaleName, key, octave);
  const allPoints = strokes.flatMap((stroke) => stroke.points);
  if (allPoints.length === 0) return Array.from({ length: steps }, () => null);

  const binWidth = 1 / steps;
  const pitches: (string | null)[] = [];

  for (let i = 0; i < steps; i++) {
    const binStart = i * binWidth;
    const binEnd = i === steps - 1 ? 1 + Number.EPSILON : (i + 1) * binWidth;
    const pointsInBin = allPoints.filter((p) => p.x >= binStart && p.x < binEnd);

    if (pointsInBin.length === 0) {
      pitches.push(null);
      continue;
    }

    const averageY = pointsInBin.reduce((sum, p) => sum + p.y, 0) / pointsInBin.length;
    const index = Math.round(averageY * (noteRange.length - 1));
    const clampedIndex = Math.min(Math.max(index, 0), noteRange.length - 1);
    pitches.push(noteRange[clampedIndex]);
  }

  return pitches;
}
