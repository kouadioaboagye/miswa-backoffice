import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/utils';
import { ButtonLoader } from '../../../../public/assets/icons/button-loader';

const buttonVariants = cva(
    'inline-flex h-full items-center justify-center gap-[10px] whitespace-nowrap text-[1.5rem] font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
    {
        variants: {
            variant: {
                // Couleur primaire principale
                default: 'bg-[#14385c] text-white shadow hover:bg-[#14385c]/90',
                // Couleur secondaire (vert)
                secondary:
                    'bg-[#1ea64a] text-white shadow-sm hover:bg-[#1ea64a]/90',
                // Couleur d'accentuation (orange)
                accent: 'bg-[#F27D42] text-white shadow-sm hover:bg-[#F27D42]/90',
                // Couleur destructive (rouge)
                destructive:
                    'bg-[#DC3545] text-white shadow-sm hover:bg-[#DC3545]/90',
                // Bouton outline avec bordure
                outline:
                    'border-2 border-[#14385c] bg-transparent text-[#14385c] shadow-sm hover:bg-[#14385c] hover:text-white',
                // Bouton ghost
                ghost: 'text-[#14385c] hover:bg-[#f8fafc] hover:text-[#14385c]',
                // Bouton de lien
                link: 'text-[#14385c] underline-offset-4 hover:underline',
                // Bouton de validation (vert)
                success:
                    'bg-[#28A745] text-white shadow-sm hover:bg-[#28A745]/90',
                // Bouton d'avertissement (jaune)
                warning:
                    'bg-[#FFC107] text-[#1a1a1a] shadow-sm hover:bg-[#FFC107]/90',
                // Bouton info (bleu cyan)
                info: 'bg-[#17A2B8] text-white shadow-sm hover:bg-[#17A2B8]/90'
            },
            size: {
                default:
                    'h-[56px] rounded-[12px] px-[20px] py-[16px] md:px-[30px]',
                sm: 'h-[40px] rounded-[8px] px-[20px] py-[12px] text-xs',
                lg: 'h-[64px] rounded-[16px] p-[20px] md:px-[40px] [&_svg]:size-8',
                pill: 'h-[54px] rounded-[40px] px-[20px] py-[16px] md:px-[30px]',
                icon: 'size-[56px] rounded-[12px]'
            }
        },
        defaultVariants: {
            variant: 'default',
            size: 'default'
        }
    }
);

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
        VariantProps<typeof buttonVariants> {
    asChild?: boolean;
    isLoading?: boolean;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            className,
            variant,
            size,
            isLoading = false,
            asChild = false,
            leftIcon,
            rightIcon,
            ...props
        },
        ref
    ) => {
        const Comp = asChild ? Slot : 'button';
        return (
            <Comp
                className={cn(buttonVariants({ variant, size, className }))}
                ref={ref}
                {...props}
                disabled={isLoading || props.disabled}
            >
                {isLoading ? (
                    <ButtonLoader style={{ fontSize: '3rem' }} />
                ) : (
                    <div className="flex items-center justify-center gap-2">
                        {leftIcon}
                        {props.children}
                        {rightIcon}
                    </div>
                )}
            </Comp>
        );
    }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
