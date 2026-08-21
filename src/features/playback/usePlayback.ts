import { useRef, useState } from "react";
import * as Tone from "tone";
import type { NoteEvent } from "../../lib/types";

export function usePlayback() {
  const [isPlaying, setIsPlaying] = useState(false);
  const synthRef = useRef<Tone.PolySynth | null>(null);
  const partRef = useRef<Tone.Part<NoteEvent> | null>(null);

  async function play(notes: NoteEvent[], totalDuration: number) {
    if (notes.length === 0 || totalDuration <= 0) return;

    await Tone.start();
    stop();

    const synth = new Tone.PolySynth(Tone.Synth).toDestination();
    synthRef.current = synth;

    const part = new Tone.Part<NoteEvent>((time, note) => {
      synth.triggerAttackRelease(note.pitch, note.duration, time);
    }, notes).start(0);
    part.loop = true;
    part.loopEnd = totalDuration;
    partRef.current = part;

    const transport = Tone.getTransport();
    transport.loop = true;
    transport.loopStart = 0;
    transport.loopEnd = totalDuration;
    transport.position = 0;
    transport.start();
    setIsPlaying(true);
  }

  function stop() {
    const transport = Tone.getTransport();
    transport.stop();
    transport.cancel();
    transport.loop = false;
    partRef.current?.dispose();
    partRef.current = null;
    synthRef.current?.dispose();
    synthRef.current = null;
    setIsPlaying(false);
  }

  return { isPlaying, play, stop };
}
