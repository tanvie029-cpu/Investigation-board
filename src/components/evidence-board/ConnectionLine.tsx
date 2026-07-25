interface ConnectionLineProps {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  label: string;
}

export default function ConnectionLine({ x1, y1, x2, y2, label }: ConnectionLineProps) {
  const midX = (x1 + x2) / 2;
  const midY = (y1 + y2) / 2;

  return (
    <g>
      <line
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke="#f59e0b"
        strokeWidth={1.5}
        strokeOpacity={0.4}
        strokeDasharray="4 3"
      />
      <rect
        x={midX - label.length * 3}
        y={midY - 8}
        width={label.length * 6}
        height={14}
        fill="#0B0F14"
        stroke="#ffffff1a"
        rx={4}
      />
      <text
        x={midX}
        y={midY + 2}
        textAnchor="middle"
        fontSize="9"
        fontFamily="monospace"
        fill="#94a3b8"
      >
        {label}
      </text>
    </g>
  );
}