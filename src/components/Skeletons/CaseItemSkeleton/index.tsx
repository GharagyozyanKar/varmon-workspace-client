import React from 'react';
import Skeleton from '@mui/material/Skeleton';
import styles from './styles.module.scss';

interface CaseItemSkeletonProps {
  count?: number;
}

const CaseItemSkeleton: React.FC<CaseItemSkeletonProps> = ({ count = 3 }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, idx) => (
        <div key={idx} className={styles.caseItem}>
          <div className={styles.header}>
            <Skeleton
              variant="text"
              width="40%"
              height={24}
              sx={{ bgcolor: 'grey.300' }}
            />
            <Skeleton
              variant="rectangular"
              width={80}
              height={32}
              sx={{ bgcolor: 'grey.300', borderRadius: 1 }}
            />
          </div>
          <div className={styles.icon_wrapper}>
            <Skeleton
              variant="rectangular"
              width={80}
              height={80}
              sx={{ bgcolor: 'grey.300', borderRadius: 1 }}
            />
          </div>
          <div className={styles.footer}>
            <div className={styles.info}>
              <Skeleton
                variant="text"
                width="30%"
                height={16}
                sx={{ bgcolor: 'grey.300' }}
              />
              <Skeleton
                variant="text"
                width="60%"
                height={16}
                sx={{ bgcolor: 'grey.300' }}
              />
            </div>
            <div className={styles.info}>
              <Skeleton
                variant="text"
                width="40%"
                height={16}
                sx={{ bgcolor: 'grey.300' }}
              />
              <Skeleton
                variant="text"
                width="50%"
                height={16}
                sx={{ bgcolor: 'grey.300' }}
              />
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default CaseItemSkeleton;
