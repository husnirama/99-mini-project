import { formatCurrency } from "@/utils/orderTransaction.utils";

type WeeklySalesPoint = {
  day: string;
  fullDate: string;
  revenue: number | string;
};

type WeeklySalesChartProps = {
  weeklySales: WeeklySalesPoint[];
};

function normalizeRevenue(value: number | string) {
  if (typeof value === "number") {
    return Number.isFinite(value) ? value : 0;
  }

  const parsedValue = Number(value);
  return Number.isFinite(parsedValue) ? parsedValue : 0;
}

export function getTotalWeeklySales(weeklySales: WeeklySalesPoint[]) {
  return weeklySales.reduce(
    (sum, point) => sum + normalizeRevenue(point.revenue),
    0,
  );
}

export default function WeeklySalesChart({
  weeklySales,
}: WeeklySalesChartProps) {
  const chartWidth = 320;
  const chartHeight = 128;
  const padding = {
    top: 12,
    right: 8,
    bottom: 18,
    left: 8,
  };

  const revenues = weeklySales.map((point) => normalizeRevenue(point.revenue));
  const maxRevenue = Math.max(...revenues, 0);
  const safeMaxRevenue = maxRevenue > 0 ? maxRevenue : 1;
  const drawableWidth = chartWidth - padding.left - padding.right;
  const baselineY = chartHeight - padding.bottom;
  const drawableHeight = baselineY - padding.top;

  const points = weeklySales.map((point, index) => {
    const revenue = normalizeRevenue(point.revenue);
    const x =
      weeklySales.length === 1
        ? chartWidth / 2
        : padding.left + (drawableWidth * index) / (weeklySales.length - 1);
    const y =
      maxRevenue > 0
        ? baselineY - (revenue / safeMaxRevenue) * drawableHeight
        : baselineY;

    return {
      ...point,
      revenue,
      x,
      y,
      label: point.day.charAt(0),
    };
  });

  const linePath = points.reduce((path, point, index) => {
    const command = `${point.x} ${point.y}`;
    return `${path}${index === 0 ? "M" : " L"}${command}`;
  }, "");

  const gridLineCount = 4;
  const gridLines = Array.from({ length: gridLineCount }, (_, index) => {
    return padding.top + (drawableHeight * index) / (gridLineCount - 1);
  });

  return (
    <div className="space-y-3">
      <div className="relative h-32 w-full">
        <svg
          aria-label="Weekly ticket sales line chart"
          className="h-full w-full"
          preserveAspectRatio="none"
          role="img"
          viewBox={`0 0 ${chartWidth} ${chartHeight}`}
        >
          {gridLines.map((lineY, index) => (
            <line
              key={index}
              stroke="var(--border)"
              strokeOpacity={index === gridLines.length - 1 ? "0.9" : "0.45"}
              strokeWidth={index === gridLines.length - 1 ? "1.2" : "1"}
              x1={padding.left}
              x2={chartWidth - padding.right}
              y1={lineY}
              y2={lineY}
            />
          ))}

          <path
            d={linePath}
            fill="none"
            stroke="var(--primary)"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="3"
          />

          {points.map((point) => (
            <g key={point.fullDate}>
              <title>{`${point.day}, ${point.fullDate}: ${formatCurrency(
                point.revenue,
              )}`}</title>
              <circle
                cx={point.x}
                cy={point.y}
                fill="white"
                r="5"
                stroke="var(--primary)"
                strokeWidth="2.5"
              />
              <circle cx={point.x} cy={point.y} fill="var(--primary)" r="2" />
            </g>
          ))}
        </svg>
      </div>

      <div className="grid grid-cols-7 gap-2">
        {points.map((point) => (
          <span
            className="text-center text-[9px] font-bold text-slate-500"
            key={point.fullDate}
          >
            {point.label}
          </span>
        ))}
      </div>
    </div>
  );
}
