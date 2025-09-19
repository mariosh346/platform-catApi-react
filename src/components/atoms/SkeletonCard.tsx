import { JSX } from 'react';

const SkeletonCard = (): JSX.Element => {
    return (
        <div className="flex flex-wrap m-3">
            <div className="w-48 h-48 bg-gray-300 rounded-lg shadow-md animate-pulse"></div>
        </div>
    );
};

export default SkeletonCard;
