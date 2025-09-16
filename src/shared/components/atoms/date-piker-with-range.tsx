'use client';

import * as React from 'react';
import { format } from 'date-fns';
import type { DateRange } from 'react-day-picker';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { cn } from '@/shared/lib/utils';
import { Button } from '../ui/button';
import { UilCalendar } from '../../../../public/assets/icons/calendar';
import { Calendar } from '../ui/calendar';

type DatePickerWithRangeProps = {
    setStartDate: (startDate: string) => void;
    setEndDate: (endDate: string) => void;
};

export function DatePickerWithRange({
    className,
    setStartDate,
    setEndDate
}: DatePickerWithRangeProps & React.HTMLAttributes<HTMLDivElement>) {
    const [date, setDate] = React.useState<DateRange | undefined>({
        from: undefined,
        to: undefined
    });

    React.useEffect(() => {
        if (date?.from && date?.to) {
            setStartDate(format(date.from, 'yyyy-MM-dd'));
            setEndDate(format(date.to, 'yyyy-MM-dd'));
        }
    }, [date?.from, date?.to, setStartDate, setEndDate]);

    return (
        <div className={cn('grid gap-2', className)}>
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        id="date"
                        variant={'outline'}
                        className={cn(
                            'w-[300px] h-[4.5rem] justify-start text-left font-normal',
                            !date && 'text-muted-foreground'
                        )}
                    >
                        <UilCalendar className="mr-2" />
                        {date?.from ? (
                            date.to ? (
                                <>
                                    {format(date.from, 'LLL dd, y')} -{' '}
                                    {format(date.to, 'LLL dd, y')}
                                </>
                            ) : (
                                format(date.from, 'LLL dd, y')
                            )
                        ) : (
                            <span className="text-muted-foreground">
                                Choisir une date
                            </span>
                        )}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="end">
                    <Calendar
                        initialFocus
                        mode="range"
                        defaultMonth={date?.from}
                        selected={date}
                        onSelect={setDate}
                        numberOfMonths={2}
                    />
                </PopoverContent>
            </Popover>
        </div>
    );
}
