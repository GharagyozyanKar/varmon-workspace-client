import { HeaderSkeleton, ListSkeleton } from '../..';
import styles from './styles.module.scss';

interface ListSkeletonFallbackProps {
  gridArea?: 'unpaid_cases' | 'completed_cases';
  titleWidth?: number;
  titleHeight?: number;
  itemCount?: number;
  itemHeight?: number;
}

const ListSkeletonFallback = ({ 
  gridArea,
  titleWidth = 150, 
  titleHeight = 30,
  itemCount = 3,
  itemHeight = 50
}: ListSkeletonFallbackProps) => {
  return (
    <div className={`${styles.wrapper} box`} style={{ gridArea }}>
      <div className={styles.content}>
        <div className={styles.header}>
          <HeaderSkeleton width={titleWidth} height={titleHeight} />
        </div>
        <div className={styles.cases}>
          <ListSkeleton count={itemCount} height={itemHeight} />
        </div>
      </div>
    </div>
  );
};

export default ListSkeletonFallback;

