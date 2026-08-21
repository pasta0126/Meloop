import { useRef, useState } from "react";
import type { NormalizedPoint, Stroke } from "../../lib/types";

interface RawPoint {
  x: number;
  y: number;
}

interface RawStroke {
  id: string;
  points: RawPoint[];
}

interface DrawingCanvasProps {
  onStrokesChange: (strokes: Stroke[]) => void;
  playheadX?: number | null;
  barMarkers?: number[];
  beatMarkers?: number[];
}

export const CANVAS_WIDTH = 600;
export const CANVAS_HEIGHT = 300;
const ERASE_RADIUS = 16;
const MIN_POINT_DISTANCE = 3;

function distance(a: RawPoint, b: RawPoint): number {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

function drawStrokes(ctx: CanvasRenderingContext2D, strokes: RawStroke[]) {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  ctx.strokeStyle = "#f78cbc";
  ctx.fillStyle = "#f78cbc";
  ctx.lineWidth = 3;
  ctx.lineJoin = "round";
  ctx.lineCap = "round";

  for (const stroke of strokes) {
    if (stroke.points.length === 0) continue;
    if (stroke.points.length === 1) {
      const [p] = stroke.points;
      ctx.beginPath();
      ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
      ctx.fill();
      continue;
    }
    ctx.beginPath();
    stroke.points.forEach((point, index) => {
      if (index === 0) {
        ctx.moveTo(point.x, point.y);
      } else {
        ctx.lineTo(point.x, point.y);
      }
    });
    ctx.stroke();
  }
}

function toNormalized(strokes: RawStroke[]): Stroke[] {
  return strokes.map((stroke) => ({
    id: stroke.id,
    points: stroke.points.map<NormalizedPoint>((p) => ({
      x: p.x / CANVAS_WIDTH,
      y: 1 - p.y / CANVAS_HEIGHT,
    })),
  }));
}

export function DrawingCanvas({ onStrokesChange, playheadX, barMarkers = [], beatMarkers = [] }: DrawingCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const strokesRef = useRef<RawStroke[]>([]);
  const activeStrokeIdRef = useRef<string | null>(null);
  const [isPointerDown, setIsPointerDown] = useState(false);
  const [tool, setTool] = useState<"draw" | "erase">("draw");

  function getCanvasPoint(event: React.PointerEvent<HTMLCanvasElement>): RawPoint | null {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    const rect = canvas.getBoundingClientRect();
    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    };
  }

  function redraw() {
    const ctx = canvasRef.current?.getContext("2d");
    if (ctx) drawStrokes(ctx, strokesRef.current);
  }

  function commitChange() {
    onStrokesChange(toNormalized(strokesRef.current));
  }

  function eraseAt(point: RawPoint) {
    strokesRef.current = strokesRef.current
      .map((stroke) => ({
        ...stroke,
        points: stroke.points.filter((p) => distance(p, point) > ERASE_RADIUS),
      }))
      .filter((stroke) => stroke.points.length > 0);
    redraw();
  }

  function handlePointerDown(event: React.PointerEvent<HTMLCanvasElement>) {
    const point = getCanvasPoint(event);
    if (!point) return;
    canvasRef.current?.setPointerCapture(event.pointerId);
    setIsPointerDown(true);

    if (tool === "erase") {
      eraseAt(point);
      return;
    }

    const id = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    activeStrokeIdRef.current = id;
    strokesRef.current = [...strokesRef.current, { id, points: [point] }];
    redraw();
  }

  function handlePointerMove(event: React.PointerEvent<HTMLCanvasElement>) {
    if (!isPointerDown) return;
    const point = getCanvasPoint(event);
    if (!point) return;

    if (tool === "erase") {
      eraseAt(point);
      return;
    }

    const activeId = activeStrokeIdRef.current;
    if (!activeId) return;
    strokesRef.current = strokesRef.current.map((stroke) => {
      if (stroke.id !== activeId) return stroke;
      const last = stroke.points[stroke.points.length - 1];
      if (last && distance(last, point) < MIN_POINT_DISTANCE) return stroke;
      return { ...stroke, points: [...stroke.points, point] };
    });
    redraw();
  }

  function handlePointerUp() {
    if (!isPointerDown) return;
    setIsPointerDown(false);
    activeStrokeIdRef.current = null;
    commitChange();
  }

  function handleClearAll() {
    strokesRef.current = [];
    activeStrokeIdRef.current = null;
    redraw();
    commitChange();
  }

  return (
    <div className="canvas-wrapper">
      <canvas
        ref={canvasRef}
        width={CANVAS_WIDTH}
        height={CANVAS_HEIGHT}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        style={{ display: "block", touchAction: "none", cursor: tool === "erase" ? "cell" : "crosshair" }}
      />

      <svg
        className="canvas-overlay"
        width={CANVAS_WIDTH}
        height={CANVAS_HEIGHT}
        viewBox={`0 0 ${CANVAS_WIDTH} ${CANVAS_HEIGHT}`}
      >
        {barMarkers.map((x) => (
          <line key={`bar-${x}`} x1={x} y1={0} x2={x} y2={CANVAS_HEIGHT} className="bar-marker" />
        ))}
        {beatMarkers.map((x) => (
          <line key={`beat-${x}`} x1={x} y1={0} x2={x} y2={CANVAS_HEIGHT} className="beat-marker" />
        ))}
        {playheadX != null && <line x1={playheadX} y1={0} x2={playheadX} y2={CANVAS_HEIGHT} className="playhead" />}
      </svg>

      <div className="tool-toggle">
        <button type="button" className={tool === "draw" ? "active" : ""} onClick={() => setTool("draw")}>
          Dibujar
        </button>
        <button type="button" className={tool === "erase" ? "active" : ""} onClick={() => setTool("erase")}>
          Borrar
        </button>
        <button type="button" onClick={handleClearAll}>
          Borrar todo
        </button>
      </div>
    </div>
  );
}
