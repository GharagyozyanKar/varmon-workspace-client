import styles from "./styles.module.scss";
import { useAppSelector } from "../../../../../store/hooks";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { HeaderSkeleton, ChartSkeleton } from "../../../../../components";

interface CustomTooltipProps {
  active?: boolean;
  payload?: { value: number }[];
  label?: string;
}

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className={styles.tooltip}>
        <p className={styles.tooltip_label}>Ամիս: {label}</p>
        {payload.map((entry: { value: number }, index: number) => (
          <p key={index} className={styles.tooltip_data}>
            Գործ: {entry.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const YearlyCasesChart = () => {
  const yearlyCasesChart = useAppSelector(state => state.dashboard.yearlyCasesChart)
  const loading = useAppSelector(state => state.dashboard.loading)

  return (
    <div className={`${styles.container} box`}>
      <div className={styles.header}>
        {loading ? (
          <HeaderSkeleton width={160} height={30} />
        ) : (
          <span className={`title ${styles.header_title}`}>Տարի / Գործ</span>
        )}
      </div>

      <div className={styles.chartWrapper}>
        {loading ? (
          <ChartSkeleton width="100%" height={300} />
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={yearlyCasesChart}
              margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient
                  id="colorCasesBar"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="5%" stopColor="#1E3A8A" stopOpacity={0.9} />
                  <stop offset="95%" stopColor="#60A5FA" stopOpacity={0.4} />
                </linearGradient>
              </defs>

              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#334155"
                strokeOpacity={0.3}
              />
              <XAxis
                dataKey="month"
                tick={{ fill: "#8B909D", fontSize: 12, opacity: 0.7 }}
                axisLine={false}
              />
              <YAxis
                tick={{ fill: "#8B909D", fontSize: 12, opacity: 0.7 }}
                axisLine={false}
                allowDecimals={false}
              />
              <Tooltip content={<CustomTooltip />} />

              <Bar
                dataKey="cases"
                fill="url(#colorCasesBar)"
                radius={[8, 8, 0, 0]}
                barSize={20}
              />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};

export default YearlyCasesChart;
