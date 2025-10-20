'use client';

import * as LabelPrimitive from '@radix-ui/react-label';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/utils';

const labelVariants = cva(
    'text-[1.2rem] font-medium leading-none text-[#718096] peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
);

interface LabelProps
  extends React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>,
    VariantProps<typeof labelVariants> {
  isRequired?: boolean;
}

const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  LabelProps
>(({ className, children, isRequired = false, ...props }, ref) => (
  <LabelPrimitive.Root ref={ref} className={cn(labelVariants(), className)} {...props}>
    {children}
    {isRequired && <span className="text-red-500 ml-1">*</span>}
  </LabelPrimitive.Root>
));

Label.displayName = LabelPrimitive.Root.displayName;

export { Label };

