import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/utils';

const badgeVariants = cva(
    'inline-flex items-center rounded-[0.8rem] border px-6 py-2 text-[1rem] font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
    {
        variants: {
            variant: {
                default:
                    'border-transparent bg-[#CBD5E0] text-white hover:bg-[#CBD5E0]/80',
                secondary:
                    'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80',
                success:
                    'border-transparent bg-emerald text-white hover:bg-emerald/80', 
                pending:
                    'border-transparent bg-sky text-white hover:bg-sky/80', 
                destructive:
                    'border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80',
                outline:
                    'text-foreground border border-midnight hover:bg-midnight/10', 
                failed:
                    'border-transparent bg-coral text-white hover:bg-coral/80', 
                warning:
                    'border-transparent bg-amber text-black hover:bg-amber/80', 
                dark:
                    'border-transparent bg-midnight text-white hover:bg-midnight/80',
                primary:
                    'border-transparent bg-sky text-white hover:bg-sky/80', 
            }
        },
        defaultVariants: {
            variant: 'default'
        }
    }
);

export interface BadgeProps
    extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> { }

function Badge({ className, variant, ...props }: BadgeProps) {
    return (
        <div className={cn(badgeVariants({ variant }), className)} {...props} />
    );
}

export { Badge, badgeVariants };
