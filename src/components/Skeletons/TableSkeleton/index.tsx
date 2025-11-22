import React from 'react';
import Skeleton from '@mui/material/Skeleton';

interface TableSkeletonProps {
  rows?: number;
  columns?: number;
  cellHeight?: number;
  borderRadius?: number;
}

const TableSkeleton: React.FC<TableSkeletonProps> = ({ 
  rows = 5, 
  columns = 7,
  cellHeight = 40,
  borderRadius = 1
}) => {
  return (
    <>
      {Array.from({ length: rows }).map((_, i) => (
        <tr key={i}>
          {Array.from({ length: columns }).map((__, j) => (
            <td key={j}>
              <Skeleton
                variant="rectangular"
                height={cellHeight}
                sx={{ bgcolor: 'grey.300', borderRadius }}
              />
            </td>
          ))}
        </tr>
      ))}
    </>
  );
};

export default TableSkeleton;
