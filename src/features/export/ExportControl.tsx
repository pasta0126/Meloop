import type { MusicParams, NoteEvent } from "../../lib/types";
import { buildMidiFile, downloadMidiFile } from "./exportMidi";

interface ExportControlProps {
  notes: NoteEvent[];
  params: MusicParams;
}

export function ExportControl({ notes, params }: ExportControlProps) {
  const hasMelody = notes.length > 0;

  function handleExport() {
    const bytes = buildMidiFile(notes, params);
    downloadMidiFile(bytes);
  }

  return (
    <button type="button" onClick={handleExport} disabled={!hasMelody}>
      Exportar MIDI
    </button>
  );
}
