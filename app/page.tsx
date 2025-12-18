"use client";

import { useMemo, useState } from "react";
import InputPanel from "@/components/InputPanel";
import PolygonCanvas from "@/components/PolygonCanvas";
import ResultBadge from "@/components/ResultBadge";
import type { Point } from "@/lib/types";
import { parsePointsFromText } from "@/lib/helpers";
import { pointInConvexPolygon } from "@/lib/convex";

const DEFAULT_VERTICES = `0 0
6 0
8 3
6 6
0 6
-2 3`;

export default function Home() {
  const [verticesText, setVerticesText] = useState(DEFAULT_VERTICES);
  const [point, setPoint] = useState<Point>({ x: 2.5, y: 2.5 });

  const parsed = useMemo(() => parsePointsFromText(verticesText), [verticesText]);
  const vertices = parsed.points;
  const verticesError = parsed.error;

  const check = useMemo(() => {
    if (verticesError) {
      return { status: "OUTSIDE" as const, message: verticesError };
    }
    return pointInConvexPolygon(vertices, point);
  }, [vertices, point, verticesError]);

  return (
    <main style={{ padding: 20, fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, sans-serif" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gap: 18 }}>
        <header style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
          <div>
            <h1 style={{ margin: 0, fontSize: 26 }}>Convex Polygon Inspector</h1>
            <p style={{ margin: "6px 0 0", color: "#555" }}>
              Check whether a point lies inside a convex polygon.
            </p>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <ResultBadge status={check.status} />
          </div>
        </header>

        <div style={{ display: "grid", gridTemplateColumns: "420px 1fr", gap: 18, alignItems: "start" }}>
          <section style={{ border: "1px solid #eee", borderRadius: 16, padding: 14, background: "white" }}>
            <InputPanel
              verticesText={verticesText}
              setVerticesText={setVerticesText}
              point={point}
              setPoint={setPoint}
            />
            <div style={{ marginTop: 12, fontSize: 13, color: "#444" }}>
              <b>Result:</b> {check.message}
            </div>
          </section>

          <section style={{ border: "1px solid #eee", borderRadius: 16, padding: 14, background: "white" }}>
            {verticesError ? (
              <div style={{ color: "#8a1c1c", fontWeight: 600 }}>
                Fix the vertices input to display the canvas.
                <div style={{ marginTop: 8, fontWeight: 400 }}>{verticesError}</div>
              </div>
            ) : (
            <PolygonCanvas vertices={vertices} point={point} setPoint={setPoint} />
          )}
          </section>
        </div>

        <footer style={{ color: "#666", fontSize: 12 }}>
          Note: The algorithm assumes the polygon is convex. If a non-convex polygon is provided, the result may be incorrect.
        </footer>
      </div>
    </main>
  );
}