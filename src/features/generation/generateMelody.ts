import type { MusicParams, NoteEvent, Stroke } from "../../lib/types";
import { quantizeStrokesToScale } from "./quantize";
import { generateRhythm, STEPS_PER_BAR } from "./rhythm";

/**
 * Deterministically derives a melody (note events) from a set of drawn
 * strokes and a set of music parameters. A time step with no ink under it
 * becomes a silence (no note event). Same strokes + same params always
 * produce the same sequence.
 */
export function generateMelody(strokes: Stroke[], params: MusicParams): NoteEvent[] {
  const totalSteps = Math.max(params.bars, 1) * STEPS_PER_BAR;
  const pitches = quantizeStrokesToScale(strokes, totalSteps, params.scaleName, params.key, params.octave);
  const steps = generateRhythm(params.bars, params.bpm);

  const notes: NoteEvent[] = [];
  steps.forEach((step, i) => {
    const pitch = pitches[i];
    if (pitch === null) return;
    notes.push({ pitch, time: step.time, duration: step.duration });
  });
  return notes;
}
