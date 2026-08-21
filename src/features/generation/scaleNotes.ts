import { Scale } from "tonal";

/**
 * Builds an ascending list of concrete notes (e.g. "C4", "D4", ...) spanning
 * two octaves starting at `octave`, for the given scale name and key.
 */
export function buildScaleNoteRange(scaleName: string, key: string, octave: number): string[] {
  const scale = Scale.get(`${key} ${scaleName}`);
  const pitchClasses = scale.notes;
  if (pitchClasses.length === 0) {
    throw new Error(`Escala desconocida: ${key} ${scaleName}`);
  }

  const octaves = [octave, octave + 1];
  return octaves.flatMap((oct) => pitchClasses.map((pc) => `${pc}${oct}`));
}
