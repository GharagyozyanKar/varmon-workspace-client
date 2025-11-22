import React from 'react';
import Skeleton from '@mui/material/Skeleton';
import styles from './styles.module.scss';

interface StatsSkeletonProps {
  count?: number;
}

const StatsSkeleton: React.FC<StatsSkeletonProps> = ({ count = 4 }) => {
  return (
    <div className={styles.stats}>
      {Array.from({ length: count }).map((_, idx) => (
        <div key={idx} className={`${styles.stats_item} ${idx === 0 ? styles.year : ""}`}>
          <div className={styles.header}>
            <div className={styles.header_info}>
              <div className={styles.header_info_icon}>
                <Skeleton variant="circular" width={40} height={40} />
              </div>
              {idx < 2 && (
                <span>
                  <Skeleton variant="text" width={50} />
                </span>
              )}
            </div>
          </div>
          <div className={styles.info}>
            <span className={styles.info_count}>
              <Skeleton variant="text" width={40} />
            </span>
            <span className={styles.info_desc}>
              <Skeleton variant="text" width={70} />
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsSkeleton;

