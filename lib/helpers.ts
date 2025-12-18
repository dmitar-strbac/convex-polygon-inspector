import type { Point } from "./types";

export const EPS = 1e-9;

export function cross(a: Point, b: Point, c: Point): number {
  return (b.x - a.x) * (c.y - a.y) - (b.y - a.y) * (c.x - a.x);
}

export function dot(a: Point, b: Point, c: Point): number {
  return (b.x - a.x) * (c.x - a.x) + (b.y - a.y) * (c.y - a.y);
}

export function onSegment(a: Point, b: Point, p: Point): boolean {
  if (Math.abs(cross(a, b, p)) > EPS) return false;

  const dp = dot(p, a, b); 
  return dp <= EPS;
}

export function polygonSignedArea(poly: Point[]): number {
  let s = 0;
  for (let i = 0; i < poly.length; i++) {
    const j = (i + 1) % poly.length;
    s += poly[i].x * poly[j].y - poly[j].x * poly[i].y;
  }
  return s / 2;
}

export function ensureCCW(poly: Point[]): Point[] {
  if (poly.length < 3) return poly;
  const area = polygonSignedArea(poly);
  if (area < 0) return [...poly].reverse();
  return poly;
}

export function parsePointsFromText(text: string): { points: Point[]; error: string | null } {
  const lines = text.split(/\r?\n/);
  const points: Point[] = [];

  const num = `([+-]?(?:\\d+\\.?\\d*|\\.\\d+))`;

  const lineRe = new RegExp(`^${num}(?: ${num}|,${num})$`);

  for (let i = 0; i < lines.length; i++) {
    const raw = lines[i].trim();
    if (!raw) continue;

    const match = raw.match(lineRe);
    if (!match) {
      return {
        points: [],
        error: `Invalid vertex format on line ${i + 1}: "${raw}". Use exactly "x y" or "x,y".`,
      };
    }

    const x = Number(match[1]);
    const y = Number(match[2] ?? match[3]);

    if (!Number.isFinite(x) || !Number.isFinite(y)) {
      return {
        points: [],
        error: `Invalid number on line ${i + 1}: "${raw}".`,
      };
    }

    points.push({ x, y });
  }

  return { points, error: null };
}

export function formatPoint(p: Point): string {
  return `(${p.x.toFixed(2)}, ${p.y.toFixed(2)})`;
}