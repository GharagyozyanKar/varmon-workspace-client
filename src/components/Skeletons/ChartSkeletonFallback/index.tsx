import { HeaderSkeleton, ChartSkeleton } from '../..';
import styles from './styles.module.scss';

interface ChartSkeletonFallbackProps {
  gridArea?: 'yearly_profit' | 'yearly_cases';
  titleWidth?: number;
  titleHeight?: number;
  chartWidth?: string | number;
  chartHeight?: number;
}

const ChartSkeletonFallback = ({ 
  gridArea = 'yearly_profit',
  titleWidth = 180, 
  titleHeight = 30,
  chartWidth = "100%",
  chartHeight = 300
}: ChartSkeletonFallbackProps) => {
  return (
    <div className={`${styles.container} box`} style={{ gridArea }}>
      <div className={styles.header}>
        <HeaderSkeleton width={titleWidth} height={titleHeight} />
      </div>
      <div className={styles.chartWrapper}>
        <ChartSkeleton width={chartWidth} height={chartHeight} />
      </div>
    </div>
  );
};

export default ChartSkeletonFallback;

