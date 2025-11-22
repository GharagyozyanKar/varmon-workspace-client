import React from 'react';
import Skeleton from '@mui/material/Skeleton';

interface ListSkeletonProps {
  count?: number;
  height?: number;
  borderRadius?: number;
}

const ListSkeleton: React.FC<ListSkeletonProps> = ({ 
  count = 3, 
  height = 50,
  borderRadius = 1
}) => {
  return (
    <>
      {Array.from({ length: count }).map((_, idx) => (
        <Skeleton
          key={idx}
          variant="rectangular"
          width="100%"
          height={height}
          sx={{ bgcolor: 'grey.300', borderRadius }}
        />
      ))}
    </>
  );
};

export default ListSkeleton;
