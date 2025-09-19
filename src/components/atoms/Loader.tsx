import { JSX } from 'react';

interface LoaderProps {
    message?: string;
}

const Loader = ({ message = 'Loading...' }: LoaderProps): JSX.Element => {
    return (
        <div className="flex items-center justify-center p-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            <p className="ml-3 text-blue-500">{message}</p>
        </div>
    );
};

export default Loader;
