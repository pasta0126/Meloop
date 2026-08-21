import { useMemo, useState } from "react";
import { CANVAS_WIDTH, DrawingCanvas } from "./features/drawing/DrawingCanvas";
import { DEFAULT_MUSIC_PARAMS, MusicControls } from "./features/controls/MusicControls";
import { generateMelody } from "./features/generation/generateMelody";
import { totalPatternDuration } from "./features/generation/rhythm";
import { PlaybackControl } from "./features/playback/PlaybackControl";
import { usePlayback } from "./features/playback/usePlayback";
import { usePlayheadProgress } from "./features/playback/usePlayheadProgress";
import { ExportControl } from "./features/export/ExportControl";
import type { MusicParams, Stroke } from "./lib/types";
import "./App.css";

function buildMarkers(bars: number): { barMarkers: number[]; beatMarkers: number[] } {
  const totalBeats = Math.max(bars, 1) * 4;
  const barMarkers: number[] = [];
  const beatMarkers: number[] = [];

  for (let i = 0; i <= totalBeats; i++) {
    const x = (i / totalBeats) * CANVAS_WIDTH;
    if (i % 4 === 0) {
      barMarkers.push(x);
    } else {
      beatMarkers.push(x);
    }
  }
  return { barMarkers, beatMarkers };
}

function App() {
  const [strokes, setStrokes] = useState<Stroke[]>([]);
  const [musicParams, setMusicParams] = useState<MusicParams>(DEFAULT_MUSIC_PARAMS);
  const { isPlaying, play, stop } = usePlayback();

  const notes = useMemo(() => generateMelody(strokes, musicParams), [strokes, musicParams]);
  const totalDuration = useMemo(
    () => totalPatternDuration(musicParams.bars, musicParams.bpm),
    [musicParams.bars, musicParams.bpm]
  );
  const { barMarkers, beatMarkers } = useMemo(() => buildMarkers(musicParams.bars), [musicParams.bars]);

  const progress = usePlayheadProgress(isPlaying, totalDuration);
  const playheadX = progress != null ? progress * CANVAS_WIDTH : null;

  function handleTogglePlayback() {
    if (isPlaying) {
      stop();
    } else {
      void play(notes, totalDuration);
    }
  }

  return (
    <div id="meloop">
      <div className="brand">
        <img src="/meloop-icon.png" alt="Meloop" />
        <h1>Meloop</h1>
      </div>
      <p className="tagline">Draw a pattern. Hear a melody. Make it loop.</p>

      <DrawingCanvas
        onStrokesChange={setStrokes}
        playheadX={playheadX}
        barMarkers={barMarkers}
        beatMarkers={beatMarkers}
      />
      <MusicControls params={musicParams} onChange={setMusicParams} />

      <div className="actions">
        <PlaybackControl isPlaying={isPlaying} hasMelody={notes.length > 0} onToggle={handleTogglePlayback} />
        <ExportControl notes={notes} params={musicParams} />
      </div>
    </div>
  );
}

export default App;
