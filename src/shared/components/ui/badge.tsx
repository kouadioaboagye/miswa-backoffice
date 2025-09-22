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
                    'border-transparent bg-[#48BB78] text-white hover:bg-[#48BB78]/80',
                pending:
                    'border-transparent bg-[#0088FF] text-white hover:bg-[#0088FF]/80',
                destructive:
                    'border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80',
                outline: 'text-foreground',
                failed: 'border-transparent bg-[#FF5F57] text-white hover:bg-[#FF5F57]/80'
            }
        },
        defaultVariants: {
            variant: 'default'
        }
    }
);

export interface BadgeProps
    extends React.HTMLAttributes<HTMLDivElement>,
        VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
    return (
        <div className={cn(badgeVariants({ variant }), className)} {...props} />
    );
}

export { Badge, badgeVariants };
