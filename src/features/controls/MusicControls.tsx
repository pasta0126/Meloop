import type { MusicParams } from "../../lib/types";

export const DEFAULT_MUSIC_PARAMS: MusicParams = {
  scaleName: "minor pentatonic",
  key: "C",
  octave: 3,
  bpm: 80,
  bars: 2,
};

const SCALE_OPTIONS = ["minor pentatonic", "major pentatonic", "major", "minor", "dorian"];
const KEY_OPTIONS = ["C", "D", "E", "F", "G", "A", "B"];

interface MusicControlsProps {
  params: MusicParams;
  onChange: (params: MusicParams) => void;
}

export function MusicControls({ params, onChange }: MusicControlsProps) {
  function update<K extends keyof MusicParams>(key: K, value: MusicParams[K]) {
    onChange({ ...params, [key]: value });
  }

  return (
    <div>
      <label>
        Escala
        <select value={params.scaleName} onChange={(e) => update("scaleName", e.target.value)}>
          {SCALE_OPTIONS.map((scale) => (
            <option key={scale} value={scale}>
              {scale}
            </option>
          ))}
        </select>
      </label>

      <label>
        Tonalidad
        <select value={params.key} onChange={(e) => update("key", e.target.value)}>
          {KEY_OPTIONS.map((key) => (
            <option key={key} value={key}>
              {key}
            </option>
          ))}
        </select>
      </label>

      <label>
        Octava
        <input
          type="number"
          min={1}
          max={6}
          value={params.octave}
          onChange={(e) => update("octave", Number(e.target.value))}
        />
      </label>

      <label>
        BPM
        <input
          type="number"
          min={40}
          max={200}
          value={params.bpm}
          onChange={(e) => update("bpm", Number(e.target.value))}
        />
      </label>

      <label>
        Compases
        <input
          type="number"
          min={1}
          max={8}
          value={params.bars}
          onChange={(e) => update("bars", Number(e.target.value))}
        />
      </label>
    </div>
  );
}
