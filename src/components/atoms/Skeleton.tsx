import React, { JSX } from 'react';

interface SkeletonProps {
    width?: string;
    height?: string;
    className?: string;
}

const Skeleton = React.memo(({ width = '100%', height = '100%', className = '' }: SkeletonProps): JSX.Element => {
    return (
        <div
            role="status"
            aria-label="loading"
            className={`bg-gray-300 rounded-lg shadow-md animate-pulse ${className}`}
            style={{ width, height }}
            data-cy="skeleton-loader"
        ></div>
    );
});

export default Skeleton;
