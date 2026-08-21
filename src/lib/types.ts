export interface NormalizedPoint {
  x: number;
  y: number;
}

export interface Stroke {
  id: string;
  points: NormalizedPoint[];
}

export interface MusicParams {
  scaleName: string;
  key: string;
  octave: number;
  bpm: number;
  bars: number;
}

export interface NoteEvent {
  pitch: string;
  time: number;
  duration: number;
}
