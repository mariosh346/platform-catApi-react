import { ButtonHTMLAttributes, DetailedHTMLProps, JSX } from 'react';

interface ButtonProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    children: React.ReactNode;
    variant?: 'primary' | 'secondary' | 'danger';
    size?: 'small' | 'medium' | 'large';
    isLoading?: boolean;
}

const Button = ({
    children,
    variant = 'primary',
    size = 'medium',
    isLoading = false,
    className = '',
    disabled,
    ...rest
}: ButtonProps): JSX.Element => {
    const baseStyles = 'font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline';
    const variantStyles = {
        primary: 'bg-blue-500 hover:bg-blue-700 text-white',
        secondary: 'bg-gray-300 hover:bg-gray-400 text-gray-800',
        danger: 'bg-red-500 hover:bg-red-700 text-white',
    };
    const sizeStyles = {
        small: 'text-sm',
        medium: 'text-base',
        large: 'text-lg',
    };

    return (
        <button
            className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className} ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={isLoading || disabled}
            {...rest}
        >
            {isLoading ? 'Loading...' : children}
        </button>
    );
};

export default Button;
