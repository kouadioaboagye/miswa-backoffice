'use client';

import { cn } from '@/shared/lib/utils';
import * as React from 'react';

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        className={cn(
          'flex w-full rounded-xl bg-[#F3F9FF] text-[1.4rem] ring-offset-background px-3 py-3 focus-within:ring-2 focus-within:ring-[#0E4D79] focus-within:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 border border-[#CBD5E0]',
          className
        )}
      >
        <textarea
          ref={ref}
          className={cn(
            'w-full resize-none bg-transparent focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50'
          )}
          {...props}
        />
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';

export { Textarea };
