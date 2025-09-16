import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/shared/lib/utils';

const badgeVariants = cva(
    'inline-flex items-center rounded-full border px-3.5 py-1.5 text-[1.2rem] font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
    {
        variants: {
            variant: {
                default:
                    'border-transparent bg-green-100 text-green-500 hover:bg-green-200',
                secondary:
                    'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80',
                destructive:
                    'border-transparent bg-red-100 text-red-500 hover:bg-red-200',
                success:
                    'border-transparent bg-green-100 text-green-500 hover:bg-green-200',
                pending:
                    'border-transparent bg-blue-100 text-blue-500 hover:bg-blue-200',
                initiated:
                    'border-transparent bg-gray-100 text-gray-500 hover:bg-gray-200',
                outline: 'text-foreground',
                particular:
                    'border-transparent bg-orange-100 text-orange-500 hover:bg-orange-200'
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
