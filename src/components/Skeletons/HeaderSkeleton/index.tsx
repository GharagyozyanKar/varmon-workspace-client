import React from 'react';
import Skeleton from '@mui/material/Skeleton';

interface HeaderSkeletonProps {
  width?: number;
  height?: number;
}

const HeaderSkeleton: React.FC<HeaderSkeletonProps> = ({ 
  width = 180, 
  height = 30 
}) => {
  return (
    <Skeleton
      variant="text"
      width={width}
      height={height}
      sx={{ bgcolor: 'grey.300' }}
    />
  );
};

export default HeaderSkeleton;
