"use client";

import { useEffect, useMemo, useState } from "react";
import type { Point } from "@/lib/types";
import { parsePointsFromText } from "@/lib/helpers";

type Props = {
  verticesText: string;
  setVerticesText: (v: string) => void;
  point: Point;
  setPoint: (p: Point) => void;
};

export default function InputPanel({
  verticesText,
  setVerticesText,
  point,
  setPoint,
}: Props) {
  const [px, setPx] = useState<string>(String(point.x));
  const [py, setPy] = useState<string>(String(point.y));

  useEffect(() => {
    setPx(String(point.x));
    setPy(String(point.y));
  }, [point.x, point.y]);

  const parsed = useMemo(() => parsePointsFromText(verticesText), [verticesText]);
  const vertices = parsed.points;
  const verticesError = parsed.error;

  return (
    <div style={{ display: "grid", gap: 12 }}>
      <div>
        <label style={{ fontWeight: 700, display: "block", marginBottom: 6 }}>
          Polygon vertices (one per line: <code>x y</code> or <code>x,y</code>)
        </label>
        <textarea
          value={verticesText}
          onChange={(e) => setVerticesText(e.target.value)}
          rows={8}
          style={{
            width: "100%",
            resize: "vertical",
            padding: 10,
            borderRadius: 10,
            border: "1px solid #ddd",
            fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
            fontSize: 13,
          }}
        />
        <div style={{ marginTop: 6, color: "#555", fontSize: 13 }}>
          Loaded vertices: <b>{vertices.length}</b>
          {verticesError && (
            <div style={{ marginTop: 8, color: "#8a1c1c", fontWeight: 600 }}>
            {verticesError}
            </div>
          )}
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        <div>
          <label style={{ fontWeight: 700, display: "block", marginBottom: 6 }}>Point X</label>
          <input
            value={px}
            onChange={(e) => setPx(e.target.value)}
            onBlur={() => {
              const x = Number(px);
              if (Number.isFinite(x)) setPoint({ ...point, x });
              else setPx(String(point.x));
            }}
            style={{ width: "100%", padding: 10, borderRadius: 10, border: "1px solid #ddd" }}
          />
        </div>
        <div>
          <label style={{ fontWeight: 700, display: "block", marginBottom: 6 }}>Point Y</label>
          <input
            value={py}
            onChange={(e) => setPy(e.target.value)}
            onBlur={() => {
              const y = Number(py);
              if (Number.isFinite(y)) setPoint({ ...point, y });
              else setPy(String(point.y));
            }}
            style={{ width: "100%", padding: 10, borderRadius: 10, border: "1px solid #ddd" }}
          />
        </div>
      </div>

      <button
        onClick={() => {
          const x = Number(px);
          const y = Number(py);
          if (Number.isFinite(x) && Number.isFinite(y)) setPoint({ x, y });
        }}
        style={{
          padding: "10px 12px",
          borderRadius: 12,
          border: "1px solid #111",
          background: "#111",
          color: "white",
          fontWeight: 700,
          cursor: "pointer",
        }}
      >
        Apply point
      </button>
    </div>
  );
}