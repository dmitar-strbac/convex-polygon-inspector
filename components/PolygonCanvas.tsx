"use client";

import { useMemo, useRef } from "react";
import type { Point } from "@/lib/types";

type Props = {
  vertices: Point[];
  point: Point;
  setPoint: (p: Point) => void;
};

type View = {
  minX: number;
  minY: number;
  maxX: number;
  maxY: number;
  pad: number;
};

function computeView(vertices: Point[], point: Point): View {
  let minX = point.x, maxX = point.x, minY = point.y, maxY = point.y;
  for (const v of vertices) {
    minX = Math.min(minX, v.x);
    maxX = Math.max(maxX, v.x);
    minY = Math.min(minY, v.y);
    maxY = Math.max(maxY, v.y);
  }
  const pad = 20;
  if (minX === maxX) { minX -= 1; maxX += 1; }
  if (minY === maxY) { minY -= 1; maxY += 1; }
  return { minX, minY, maxX, maxY, pad };
}

export default function PolygonCanvas({ vertices, point, setPoint }: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const view = useMemo(() => computeView(vertices, point), [vertices, point]);

  function worldToCanvas(p: Point, w: number, h: number): Point {
    const { minX, minY, maxX, maxY, pad } = view;
    const sx = (w - 2 * pad) / (maxX - minX);
    const sy = (h - 2 * pad) / (maxY - minY);
    const s = Math.min(sx, sy);

    const cx = pad + (p.x - minX) * s;
    const cy = h - (pad + (p.y - minY) * s);
    return { x: cx, y: cy };
  }

  function canvasToWorld(p: Point, w: number, h: number): Point {
    const { minX, minY, maxX, maxY, pad } = view;
    const sx = (w - 2 * pad) / (maxX - minX);
    const sy = (h - 2 * pad) / (maxY - minY);
    const s = Math.min(sx, sy);

    const wx = minX + (p.x - pad) / s;
    const wy = minY + (h - p.y - pad) / s;
    return { x: wx, y: wy };
  }

  function draw() {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;

    ctx.clearRect(0, 0, w, h);

    ctx.fillStyle = "#f7f8fb";
    ctx.fillRect(0, 0, w, h);

    ctx.strokeStyle = "rgba(0,0,0,0.06)";
    ctx.lineWidth = 1;
    for (let x = 0; x <= w; x += 40) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
      ctx.stroke();
    }
    for (let y = 0; y <= h; y += 40) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }

    if (vertices.length >= 2) {
      ctx.strokeStyle = "#5b6cff";
      ctx.lineWidth = 2;
      ctx.fillStyle = "rgba(91,108,255,0.10)";

      const p0 = worldToCanvas(vertices[0], w, h);
      ctx.beginPath();
      ctx.moveTo(p0.x, p0.y);

      for (let i = 1; i < vertices.length; i++) {
        const pi = worldToCanvas(vertices[i], w, h);
        ctx.lineTo(pi.x, pi.y);
      }
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = "#1d2bff";
      for (const v of vertices) {
        const cv = worldToCanvas(v, w, h);
        ctx.beginPath();
        ctx.arc(cv.x, cv.y, 4, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const cp = worldToCanvas(point, w, h);
    ctx.fillStyle = "#ff2d55";
    ctx.strokeStyle = "white";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(cp.x, cp.y, 6, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
  }

  setTimeout(draw, 0);

  return (
    <div style={{ display: "grid", gap: 8 }}>
      <div style={{ fontSize: 13, color: "#444" }}>
        Click on the canvas to place the point.
      </div>

      <canvas
        ref={canvasRef}
        width={700}
        height={420}
        style={{ width: "100%", borderRadius: 16, border: "1px solid #ddd" }}
        onClick={(e) => {
          const canvas = canvasRef.current;
          if (!canvas) return;

          const rect = canvas.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;

          const w = canvas.width;
          const h = canvas.height;

          const wp = canvasToWorld({ x, y }, w, h);
          setPoint({ x: Number(wp.x.toFixed(4)), y: Number(wp.y.toFixed(4)) });
        }}
      />
    </div>
  );
}