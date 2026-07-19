import React from 'react';

export const SkeletonLoader = ({ className = "" }) => {
  return (
    <div className={`animate-pulse bg-muted rounded-md ${className}`} />
  );
};
