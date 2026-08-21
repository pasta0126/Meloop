interface PlaybackControlProps {
  isPlaying: boolean;
  hasMelody: boolean;
  onToggle: () => void;
}

export function PlaybackControl({ isPlaying, hasMelody, onToggle }: PlaybackControlProps) {
  return (
    <button type="button" onClick={onToggle} disabled={!hasMelody}>
      {isPlaying ? "Detener" : "Reproducir"}
    </button>
  );
}
