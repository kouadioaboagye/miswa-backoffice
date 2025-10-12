import * as React from 'react';

import { cn } from '@/shared/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import { EyeClosedIcon } from 'lucide-react';
import ShouldShow from '../layouts/helpers/should-show';
import Error from './error';

export const inputVariant = cva(
    cn(
        'flex w-full h-[4.8rem]  border border-input bg-background px-3 py-[2.4rem] pl-[1.5rem] file:border-0 file:bg-transparent file:text-sm file:font-medium  focus-visible:ring focus-visible:ring-primary focus-visible:border-transparent focus-visible:outline-none  disabled:cursor-not-allowed disabled:opacity-50',
        'text-[1.6rem] border-gray-300  rounded-2xl placeholder:!text-[1.5rem] placeholder:text-gray-500 '
    ),
    {
        variants: {
            variant: {
                auth: 'bg-auth-input py-[1.5rem] px-[1.6rem]'
            }
        },
        defaultVariants: {
            variant: 'auth'
        }
    }
);

export interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement>,
        VariantProps<typeof inputVariant> {
    label?: string;
    labelClassName?: string;
    icon?: React.ReactNode;
    leftIcon?: boolean;
    iconSize?: number;
    error?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    (
        {
            className,
            variant,
            error,
            leftIcon = false,
            icon,
            label,
            labelClassName,
            // iconSize = 20,
            type,
            ...props
        },
        ref
    ) => {
        const isPassword = type === 'password';

        const [showPassword, setShowPassword] = React.useState(false);

        return (
            <div className="space-y-3">
                <label>
                    <ShouldShow
                        when={typeof label !== 'undefined'}
                        show={
                            <span
                                className={cn(
                                    'fs-16 font-semibold mb-4 inline-block text-[#718096]',
                                    {
                                        'opacity-45': props.disabled
                                    },
                                    labelClassName
                                )}
                            >
                                {label}
                                <ShouldShow
                                    when={props.required === true}
                                    show={
                                        <sup className="text-error ml-1.5  inline-block scale-175">
                                            *
                                        </sup>
                                    }
                                />
                            </span>
                        }
                    />
                    <div className="relative">
                        <input
                            type={showPassword ? 'text' : type}
                            className={cn(
                                inputVariant({ variant }),
                                {
                                    'pl-20 flex': leftIcon,
                                    'border-error focus-visible:ring-error ':
                                        typeof error !== 'undefined'
                                },
                                'bg-[#F8FAFC]',
                                className
                            )}
                            ref={ref}
                            autoComplete="off"
                            {...props}
                        />

                        {/* Icon */}
                        <div
                            role="button"
                            className={cn(
                                'absolute-center-y w-max !text-gray-500',
                                {
                                    'left-8 ': leftIcon,
                                    'right-8': !leftIcon && !isPassword,
                                    'right-5': !leftIcon && isPassword,
                                    'hover:bg-gray-200 cursor-pointer rounded-full p-2 ':
                                        isPassword
                                }
                            )}
                            onClick={() => {
                                if (isPassword) {
                                    setShowPassword(!showPassword);
                                }
                            }}
                        >
                            {/* Add Gsap Svg Morph */}
                            <ShouldShow
                                when={isPassword}
                                show={
                                    showPassword ? (
                                        <EyeOpenedIcon />
                                    ) : (
                                        <EyeClosedIcon />
                                    )
                                }
                                elseShow={icon}
                            />
                        </div>
                    </div>
                </label>

                {/* Dsiplay error */}
                <ShouldShow
                    when={typeof error !== 'undefined'}
                    show={<Error error={error} />}
                />
            </div>
        );
    }
);
Input.displayName = 'Input';

export { Input };
