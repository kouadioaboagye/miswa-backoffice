'use client';
import { CheckIcon, ChevronsUpDown } from 'lucide-react';
import * as React from 'react';
import * as RPNInput from 'react-phone-number-input';
import flags from 'react-phone-number-input/flags';

import { cn } from '@/lib/utils';
import { Button } from '../ui/button';
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList
} from '../ui/command';
import { Input } from '../ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { ScrollArea } from '../ui/scroll-area';

type PhoneInputProps = Omit<
    React.ComponentProps<'input'>,
    'onChange' | 'value' | 'ref'
> &
    Omit<RPNInput.Props<typeof RPNInput.default>, 'onChange'> & {
        onChange?: (value: RPNInput.Value) => void;
    };

const PhoneInput: React.ForwardRefExoticComponent<PhoneInputProps> =
    React.forwardRef<
        React.ElementRef<typeof RPNInput.default>,
        PhoneInputProps
    >(({ className, onChange, ...props }, ref) => {
        return (
            <RPNInput.default
                ref={ref}
                className={cn('flex rounded-full', className)}
                flagComponent={FlagComponent}
                countrySelectComponent={CountrySelect}
                inputComponent={InputComponent}
                smartCaret={false}
                /**
                 * Handles the onChange event.
                 *
                 * react-phone-number-input might trigger the onChange event as undefined
                 * when a valid phone number is not entered. To prevent this,
                 * the value is coerced to an empty string.
                 *
                 * @param {E164Number | undefined} value - The entered value
                 */
                onChange={(value) =>
                    onChange?.(value || ('' as RPNInput.Value))
                }
                {...props}
            />
        );
    });
PhoneInput.displayName = 'PhoneInput';

const InputComponent = React.forwardRef<
    HTMLInputElement,
    React.ComponentProps<'input'>
>(({ className, ...props }, ref) => (
    <Input
        className={cn(
            '-ms-px w-[48rem] rounded-l-none rounded-r-full shadow-none focus-visible:z-10 focus-within:ring-0 focus-within:ring-[#0E4D79] focus-within:ring-offset-0',
            className
        )}
        {...props}
        ref={ref}
    />
));
InputComponent.displayName = 'InputComponent';

type CountryEntry = { label: string; value: RPNInput.Country | undefined };

type CountrySelectProps = {
    disabled?: boolean;
    value: RPNInput.Country;
    options: CountryEntry[];
    onChange: (country: RPNInput.Country) => void;
};

const CountrySelect = ({
    disabled,
    value: selectedCountry,
    options: countryList,
    onChange
}: CountrySelectProps) => {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    type="button"
                    variant="outline"
                    className="border-r-1 flex h-[4.5rem] w-24 gap-1 rounded-none rounded-l-full border-none bg-white px-3"
                    disabled={disabled}
                >
                    <FlagComponent
                        country={selectedCountry}
                        countryName={selectedCountry}
                    />
                    <ChevronsUpDown
                        className={cn(
                            '-mr-2 size-4 opacity-50',
                            disabled ? 'hidden' : 'opacity-100'
                        )}
                    />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[45rem] overflow-hidden rounded-[0.8rem] p-0">
                <Command>
                    <CommandInput
                        placeholder="Search country..."
                        className="h-14 px-4 py-3 text-[1.3rem]"
                    />
                    <CommandList>
                        <ScrollArea className="h-72">
                            <CommandEmpty className="text-[1.3rem]">
                                No country found.
                            </CommandEmpty>
                            <CommandGroup>
                                {countryList.map(({ value, label }) =>
                                    value ? (
                                        <CountrySelectOption
                                            key={value}
                                            country={value}
                                            countryName={label}
                                            selectedCountry={selectedCountry}
                                            onChange={onChange}
                                        />
                                    ) : null
                                )}
                            </CommandGroup>
                        </ScrollArea>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
};

interface CountrySelectOptionProps extends RPNInput.FlagProps {
    selectedCountry: RPNInput.Country;
    onChange: (country: RPNInput.Country) => void;
}

const CountrySelectOption = ({
    country,
    countryName,
    selectedCountry,
    onChange
}: CountrySelectOptionProps) => {
    return (
        <CommandItem
            className="h-14 gap-5 rounded-[0.8rem]"
            onSelect={() => onChange(country)}
        >
            <FlagComponent country={country} countryName={countryName} />
            <span className="flex-1 text-[1.3rem]">{countryName}</span>
            <span className="text-[1.3rem] text-foreground/50">{`+${RPNInput.getCountryCallingCode(
                country
            )}`}</span>
            <CheckIcon
                className={`ml-auto size-5 ${
                    country === selectedCountry ? 'opacity-100' : 'opacity-0'
                }`}
            />
        </CommandItem>
    );
};

const FlagComponent = ({ country, countryName }: RPNInput.FlagProps) => {
    const Flag = flags[country];

    return (
        <span className="flex h-6 w-8 overflow-hidden rounded-sm bg-foreground/20 [&_svg]:size-full">
            {Flag && <Flag title={countryName} />}
        </span>
    );
};

export { PhoneInput };
