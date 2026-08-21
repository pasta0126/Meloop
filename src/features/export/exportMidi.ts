import { Midi } from "@tonejs/midi";
import type { MusicParams, NoteEvent } from "../../lib/types";

export function buildMidiFile(notes: NoteEvent[], params: MusicParams): Uint8Array {
  const midi = new Midi();
  midi.header.setTempo(params.bpm);

  const track = midi.addTrack();
  notes.forEach((note) => {
    track.addNote({
      name: note.pitch,
      time: note.time,
      duration: note.duration,
    });
  });

  return midi.toArray();
}

export function downloadMidiFile(bytes: Uint8Array, filename = "meloop-melody.mid") {
  const blob = new Blob([new Uint8Array(bytes)], { type: "audio/midi" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
