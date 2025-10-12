import * as React from 'react';

import { cn } from '@/shared/lib/utils';
import ShouldShow from '../layouts/helpers/should-show';
import Error from './error';

function Textarea({
    className,
    error,
    label,
    ...props
}: React.ComponentProps<'textarea'> & { error?: string; label?: string }) {
    return (
        <div>
            <label>
                <ShouldShow
                    when={typeof label !== 'undefined'}
                    show={
                        <span className="fs-16 font-semibold mb-4 inline-block text-[#718096]">
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
                <textarea
                    data-slot="textarea"
                    className={cn(
                        'flex w-full bg-auth-input bg-background px-3 py-[2.4rem] pt-3 pl-[1.5rem] file:border-0 file:bg-transparent file:text-sm file:font-medium  focus-visible:ring focus-visible:ring-primary focus-visible:border-transparent focus-visible:outline-none  disabled:cursor-not-allowed disabled:opacity-50 min-h-[10rem] max-h-[5rem] text-[1.7rem]  rounded-2xl placeholder:fs-15 placeholder:text-placeholder placeholder:font-medium',
                        {
                            'border-error': typeof error !== 'undefined',
                            'focus-visible:ring-error ':
                                typeof error !== 'undefined'
                        },
                        className
                    )}
                    {...props}
                />
            </label>

            <ShouldShow
                when={typeof error !== 'undefined'}
                show={<Error error={error} />}
            />
        </div>
    );
}

export { Textarea };
