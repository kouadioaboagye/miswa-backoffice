'use client';
import { cn } from '@/shared/lib/utils';
import * as React from 'react';
import { PrimeEye } from '../../../../public/assets/icons/eye-icon';
import { IconamoonEyeOffLight } from '../../../../public/assets/icons/eye-off-icon-password';

export interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    leftIcon?: React.ReactNode | string;
    rightIcon?: React.ReactNode | string;
    showToggle?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    (
        { className, type, leftIcon, rightIcon, showToggle = false, ...props },
        ref
    ) => {
        const [showPassword, setShowPassword] = React.useState(false);

        const handleToggleClick = () => {
            setShowPassword(!showPassword);
        };

        const inputType =
            showToggle && type === 'password'
                ? showPassword
                    ? 'text'
                    : 'password'
                : type;
        // bg-[#F1F2F7]
        return (
            <div
                className={cn(
                    'flex h-[4.5rem] w-full items-center rounded-xl bg-[#E7EBEE33] text-[1.4rem] ring-offset-background gap-3 px-3 py-6 [&_svg]:size-5 [&_svg]:cursor-pointer focus-within:ring-2 focus-within:ring-[#0E4D79] focus-within:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 border border-[#CBD5E0]',
                    className
                )}
            >
                {leftIcon}
                <input
                    type={inputType}
                    className={cn(
                        'flex-grow bg-transparent py-6 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
                        !leftIcon && 'pl-1',
                        !rightIcon && 'pr-1'
                    )}
                    ref={ref}
                    {...props}
                />
                {showToggle && type === 'password' && (
                    <span
                        className="cursor-pointer "
                        onClick={handleToggleClick}
                    >
                        {showPassword ? (
                            <IconamoonEyeOffLight className="size-6" />
                        ) : (
                            <PrimeEye className="size-6" />
                        )}
                    </span>
                )}

                {rightIcon && !showToggle && (
                    <span className="px-2 " onClick={handleToggleClick}>
                        {rightIcon}
                    </span>
                )}
            </div>
        );
    }
);

Input.displayName = 'Input';

export { Input };
