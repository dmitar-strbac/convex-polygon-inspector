import type { CheckStatus } from "@/lib/types";

export default function ResultBadge({ status }: { status: CheckStatus }) {
  const styles: Record<CheckStatus, React.CSSProperties> = {
    INSIDE: { background: "#e8fff0", color: "#146c2e", border: "1px solid #b9f6ca" },
    OUTSIDE: { background: "#ffecec", color: "#8a1c1c", border: "1px solid #ffc2c2" },
    ON_EDGE: { background: "#fff8e6", color: "#7a5a00", border: "1px solid #ffe2a8" },
  };

  const LABELS: Record<CheckStatus, string> = {
    INSIDE: "INSIDE",
    OUTSIDE: "OUTSIDE",
    ON_EDGE: "ON EDGE",
  };

  return (
    <span
      style={{
        ...styles[status],
        padding: "6px 10px",
        borderRadius: 999,
        fontSize: 12,
        fontWeight: 700,
        letterSpacing: "0.04em",
      }}
    >
      {LABELS[status]}
    </span>
  );
}