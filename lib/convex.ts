import type { CheckResult, CheckStatus, Point } from "./types";
import { EPS, cross, ensureCCW, onSegment } from "./helpers";

function result(status: CheckStatus, message: string): CheckResult {
  return { status, message };
}

export function pointInConvexPolygon(verticesIn: Point[], p: Point): CheckResult {
  if (verticesIn.length < 3) {
    return result("OUTSIDE", "The polygon must have at least 3 vertices.");
  }

  const vertices = ensureCCW(verticesIn);
  const n = vertices.length;
  const v0 = vertices[0];

  const c1 = cross(v0, vertices[1], p);
  const c2 = cross(v0, vertices[n - 1], p);

  if (c1 < -EPS || c2 > EPS) {
    return result("OUTSIDE", "The point is outside the convex polygon.");
  }

  if (onSegment(v0, vertices[1], p) || onSegment(v0, vertices[n - 1], p)) {
    return result("ON_EDGE", "The point lies on the edge of the polygon.");
  }

  let lo = 1;
  let hi = n - 1;
  while (hi - lo > 1) {
    const mid = (lo + hi) >> 1;
    const cm = cross(v0, vertices[mid], p);
    if (cm >= 0) lo = mid;
    else hi = mid;
  }

  const a = v0;
  const b = vertices[lo];
  const c = vertices[hi];

  const t1 = cross(a, b, p);
  const t2 = cross(b, c, p);
  const t3 = cross(c, a, p);

  const inside = t1 >= -EPS && t2 >= -EPS && t3 >= -EPS;

  if (!inside) {
    return result("OUTSIDE", "The point is outside the polygon.");
  }

  if (onSegment(b, c, p)) {
    return result("ON_EDGE", "The point lies on the edge of the polygon.");
  }

  if (lo === 1 && onSegment(a, b, p)) {
    return result("ON_EDGE", "The point lies on the edge of the polygon.");
  }

  if (hi === n - 1 && onSegment(a, c, p)) {
    return result("ON_EDGE", "The point lies on the edge of the polygon.");
  }

  return result("INSIDE", "The point is inside the convex polygon.");
}