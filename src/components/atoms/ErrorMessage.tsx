import React, { JSX } from 'react';

interface ErrorMessageProps {
    message: string;
    onRetry?: () => void;
}

const ErrorMessage = React.memo(({ message, onRetry }: ErrorMessageProps): JSX.Element => {
    return (
        <div role="alert" className="text-red-500 text-center my-4">
            <p>{message}</p>
            {onRetry && (
                <button
                    onClick={onRetry}
                    className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                >
                    Retry
                </button>
            )}
        </div>
    );
});

export default ErrorMessage;
