export type Point = { x: number; y: number };

export type CheckStatus = "INSIDE" | "OUTSIDE" | "ON_EDGE";

export type CheckResult = {
  status: CheckStatus;
  message: string;
};