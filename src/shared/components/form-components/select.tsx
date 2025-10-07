import { cn } from '@/shared/lib/utils';
import Flex from '../layouts/helpers/flex';
import ShouldShow from '../layouts/helpers/should-show';

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '../ui/select';
import Error from './error';
import { inputVariant } from './input';

export interface TheSelectProps {
    label?: string;
    disabled?: boolean;
    mode?: 'color' | 'normal';
    placeholder?: string;
    className?: string;
    valueClassName?: string;
    labelClassName?: string;
    prefix?: string;
    groupLabel?: string;
    error?: string;
    value?: any;
    onChange?: (value: any) => void;
    data: { value: string | number; label: string }[];
    required?: boolean;
}

export type LabelValues = TheSelectProps['data'];

export function TheSelect({
    mode = 'normal',
    required = false,
    className,
    data,
    value,
    error,
    onChange,
    valueClassName,
    disabled = false,
    placeholder,
    prefix = '',
    label,
    labelClassName
}: TheSelectProps) {
    return (
        <div>
            <label>
                <ShouldShow
                    when={typeof label !== 'undefined'}
                    show={
                        <span
                            className={cn(
                                'fs-16 font-semibold mb-4 inline-block text-[#718096]',
                                {
                                    'opacity-45': disabled
                                },
                                labelClassName
                            )}
                        >
                            {label}
                            <ShouldShow
                                when={required}
                                show={
                                    <sup className="text-error ml-1.5  inline-block scale-175">
                                        *
                                    </sup>
                                }
                            />
                        </span>
                    }
                />

                <Select
                    disabled={disabled}
                    value={value}
                    onValueChange={onChange}
                >
                    <SelectTrigger
                        className={cn(
                            'max-w-full py-8 px-4 rounded-2xl [&_svg]:size-8 [&_svg]:text-gray-800',
                            {
                                'cursor-not-allowed ': disabled
                            },
                            className,
                            inputVariant(),
                            'py-[1rem]'
                        )}
                    >
                        <p
                            className={cn(
                                '!text-[1.5rem] flex  items-center pr-3  font-bold',
                                valueClassName
                            )}
                        >
                            <span className="font-medium">
                                <span>{prefix}</span>
                            </span>
                            <SelectValue
                                placeholder={
                                    <span className="font-normal text-gray-500">
                                        {placeholder}
                                    </span>
                                }
                            />
                        </p>
                    </SelectTrigger>
                    <SelectContent className="py-3 z-[9999]">
                        {data?.map((item: any) => (
                            <SelectItem
                                className="fs-16 cursor-pointer py-3"
                                key={item.value}
                                value={item.value}
                            >
                                <ShouldShow
                                    when={mode === 'color'}
                                    show={
                                        <span>
                                            <Flex
                                                settings={{
                                                    align: 'center',
                                                    shouldTakeSameSpace: false
                                                }}
                                            >
                                                <span
                                                    style={{
                                                        backgroundColor: `#${item.label}`
                                                    }}
                                                    className="inline-block h-10 w-16 capitalize"
                                                ></span>
                                                <span>{item?.name}</span>
                                            </Flex>
                                        </span>
                                    }
                                />
                                <ShouldShow
                                    when={mode === 'normal'}
                                    show={
                                        <span className="capitalize">
                                            {item?.label}
                                        </span>
                                    }
                                />
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </label>

            <ShouldShow when={Boolean(error)} show={<Error error={error} />} />
        </div>
    );
}
