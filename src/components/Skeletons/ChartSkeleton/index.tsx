import React from 'react';
import Skeleton from '@mui/material/Skeleton';

interface ChartSkeletonProps {
  width?: string | number;
  height?: number;
  borderRadius?: number;
}

const ChartSkeleton: React.FC<ChartSkeletonProps> = ({ 
  width = "100%", 
  height = 300,
  borderRadius = 1
}) => {
  return (
    <Skeleton
      variant="rectangular"
      width={width}
      height={height}
      sx={{ bgcolor: "grey.300", borderRadius }}
    />
  );
};

export default ChartSkeleton;
