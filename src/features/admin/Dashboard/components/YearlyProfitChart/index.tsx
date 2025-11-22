import styles from "./styles.module.scss";
import {
    ComposedChart,
    Area,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
} from "recharts";
import { useAppSelector } from "../../../../../store/hooks";
import { HeaderSkeleton, ChartSkeleton } from "../../../../../components";

interface CustomTooltipProps {
    active?: boolean;
    payload?: { value: number }[];
    label?: string;
}

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
    if (active && payload && payload.length) {
        return (
            <div style={{
                backgroundColor: "#F7FBFF",
                border: "none",
                boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
                padding: "12px",
                borderRadius: "8px"
            }}>
                <p style={{ color: "#1E3A8A", margin: "0 0 8px 0", fontWeight: "600" }}>
                    Ամիս: {label}
                </p>
                {payload.map((entry: { value: number }, index: number) => (
                    <p key={index} style={{ color: '#60A5FA', margin: "4px 0", fontWeight: "500" }}>
                        Եկամուտ: {entry.value}դր
                    </p>
                ))}
            </div>
        );
    }
    return null;
};

const YearlyProfitChart = () => {
    const yearlyProfitChart = useAppSelector(state => state.dashboard.yearlyProfitChart)
    const loading = useAppSelector(state => state.dashboard.loading)

    return (
        <div className={`${styles.container} box`}>
            <div className={styles.header}>
                {loading ? (
                    <HeaderSkeleton width={180} height={30} />
                ) : (   
                    <span className={`title ${styles.header_title}`}>Տարի / Եկամուտ</span>
                )}
            </div>

            <div className={styles.chartWrapper}>
                {loading ? (
                    <ChartSkeleton width="100%" height={300} />
                ) : (
                    <ResponsiveContainer width="100%" height={300}>
                        <ComposedChart data={yearlyProfitChart} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                            <defs>
                                <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#60A5FA" stopOpacity={0.4} />
                                    <stop offset="95%" stopColor="#60A5FA" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" strokeOpacity={0.3} />
                            <XAxis dataKey="month" tick={{ fill: "#8B909D", fontSize: 12, opacity: 0.7 }} axisLine={false} />
                            <YAxis tick={{ fill: "#8B909D", fontSize: 12, opacity: 0.7 }} axisLine={false} />
                            <Tooltip content={<CustomTooltip />} />
                            <Area type="monotone" dataKey="profit" stroke="#60A5FA" strokeWidth={2} fill="url(#colorProfit)" />
                        </ComposedChart>
                    </ResponsiveContainer>
                )}
            </div>
        </div>
    );
};

export default YearlyProfitChart;
