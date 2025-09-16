/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from '@/shared/components/ui/button';
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList
} from '@/shared/components/ui/command';
import {
    FormControl,
    FormField,
    FormItem,
    FormMessage
} from '@/shared/components/ui/form';
import { Label } from '@/shared/components/ui/label';
import {
    Popover,
    PopoverContent,
    PopoverTrigger
} from '@/shared/components/ui/popover';
import countries from '@/shared/lib/constant/countries.json';
import { cn } from '@/shared/lib/utils';
import { Check, ChevronDown } from 'lucide-react';
import 'flag-icons/css/flag-icons.min.css';
import React, { useEffect, useMemo, useRef } from 'react';

// Import VariableSizeList de manière à contourner les problèmes de typage
// @ts-expect-error - Nécessaire pour éviter les erreurs de typage avec react-window
const { VariableSizeList } = React.lazy(() => import('react-window'));

type CountrySelectProps = {
    form: any;
    name: string;
    label: string;
    placeholder?: string;
    searchPlacholder?: string;
    nationalityNotFound?: string;
};

// Type pour les données de pays attendues
type Country = {
    code: string;
    name: string;
    flag?: string;
};

// Composant de ligne pour la liste virtualisée
const CountryRow = React.memo(
    ({
        index,
        style,
        data
    }: {
        index: number;
        style: React.CSSProperties;
        data: {
            countries: Country[];
            selectedValue: string;
            onSelect: (value: string) => void;
        };
    }) => {
        const country = data.countries[index];
        const isSelected = data.selectedValue === country.code;

        return (
            <div style={style}>
                <CommandItem
                    value={country.code}
                    onSelect={() => data.onSelect(country.code)}
                    className="flex items-center gap-2"
                >
                    <Check
                        className={cn(
                            'mr-2 h-4 w-4',
                            isSelected ? 'opacity-100' : 'opacity-0'
                        )}
                    />
                    <span
                        className={`fi fi-${country.code.toLowerCase()} mr-2 size-6 rounded-sm`}
                    ></span>
                    {country.name}
                </CommandItem>
            </div>
        );
    }
);

CountryRow.displayName = 'CountryRow';

// Liste virtualisée des pays
const VirtualizedCountryList = ({
    selectedValue,
    onSelect,
    filter
}: {
    selectedValue: string;
    onSelect: (value: string) => void;
    filter: string;
}) => {
    const listRef = useRef<any>(null);
    const itemHeight = 35;

    // Filtrer les pays selon la recherche
    const filteredCountries = useMemo(() => {
        return countries.filter((country) =>
            country.name.toLowerCase().includes(filter.toLowerCase())
        );
    }, [filter]);

    const selectedIndex = useMemo(() => {
        if (!selectedValue) return -1;
        return filteredCountries.findIndex(
            (country) => country.code === selectedValue
        );
    }, [selectedValue, filteredCountries]);

    // Scroll vers l'élément sélectionné
    useEffect(() => {
        if (
            selectedIndex > -1 &&
            listRef.current &&
            listRef.current.scrollToItem
        ) {
            setTimeout(() => {
                listRef.current.scrollToItem(selectedIndex, 'smart');
            }, 50);
        }
    }, [selectedIndex]);

    const itemData = useMemo(
        () => ({
            countries: filteredCountries,
            selectedValue,
            onSelect
        }),
        [filteredCountries, selectedValue, onSelect]
    );

    // Utilisation d'une approche alternative sans virtualisation en cas de problème
    if (typeof VariableSizeList === 'undefined') {
        return (
            <div className="max-h-64 overflow-y-auto">
                {filteredCountries.map((country) => (
                    <CommandItem
                        key={country.code}
                        value={country.code}
                        onSelect={() => onSelect(country.code)}
                        className="flex items-center gap-2 rounded-[2rem] p-2 text-[1.4rem]"
                    >
                        <Check
                            className={cn(
                                'mr-2 h-4 w-4',
                                selectedValue === country.code
                                    ? 'opacity-100'
                                    : 'opacity-0'
                            )}
                        />
                        <span
                            className={`fi fi-${country.code.toLowerCase()} mr-2 size-6 rounded-sm`}
                        ></span>
                        {country.name}
                    </CommandItem>
                ))}
            </div>
        );
    }

    return (
        <React.Suspense
            fallback={<div className="p-2">Chargement des pays...</div>}
        >
            <VariableSizeList
                ref={listRef}
                height={300}
                width="100%"
                itemCount={filteredCountries.length}
                itemSize={() => itemHeight}
                itemData={itemData}
                overscanCount={5}
            >
                {CountryRow}
            </VariableSizeList>
        </React.Suspense>
    );
};

const CountrySelectCombobox: React.FC<CountrySelectProps> = ({
    form,
    name,
    label,
    placeholder = 'Sélectionner un pays',
    nationalityNotFound,
    searchPlacholder
}) => {
    const [open, setOpen] = React.useState(false);
    const [searchQuery, setSearchQuery] = React.useState('');

    // Trouver le pays sélectionné par son code
    const getCountryByCode = (code: string) => {
        return countries.find((country) => country.code === code);
    };

    return (
        <FormField
            control={form.control}
            name={name}
            render={({ field }) => (
                <FormItem className="flex w-1/2 flex-col gap-3">
                    <Label className="text-[1.4rem] font-medium leading-none">
                        {label}
                    </Label>
                    <Popover open={open} onOpenChange={setOpen}>
                        <PopoverTrigger asChild>
                            <FormControl>
                                <Button
                                    variant="outline"
                                    role="combobox"
                                    aria-expanded={open}
                                    className={cn(
                                        'flex w-full h-[4.5rem] justify-between rounded-full border-0 bg-white shadow-none border-none font-normal [&_svg]:size-6',
                                        !field.value && 'text-muted-foreground '
                                    )}
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        width: '100%'
                                    }}
                                >
                                    <div
                                        className="flex items-center"
                                        style={{
                                            maxWidth: '85%',
                                            overflow: 'hidden'
                                        }}
                                    >
                                        {field.value ? (
                                            <div className="flex items-center gap-2">
                                                <span
                                                    className={`fi fi-${field.value.toLowerCase()} size-6 rounded-sm`}
                                                    style={{ flexShrink: 0 }}
                                                ></span>
                                                <span
                                                    style={{
                                                        overflow: 'hidden',
                                                        textOverflow:
                                                            'ellipsis',
                                                        whiteSpace: 'nowrap'
                                                    }}
                                                >
                                                    {getCountryByCode(
                                                        field.value
                                                    )?.name || 'Pays inconnu'}
                                                </span>
                                            </div>
                                        ) : (
                                            <span>{placeholder}</span>
                                        )}
                                    </div>
                                    <div
                                        style={{
                                            flexShrink: 0,
                                            display: 'flex',
                                            alignItems: 'center'
                                        }}
                                    >
                                        <ChevronDown className="size-6 opacity-50" />
                                    </div>
                                </Button>
                            </FormControl>
                        </PopoverTrigger>
                        <PopoverContent
                            className="w-[30rem] overflow-hidden rounded-[2rem] p-0 text-[1.3rem]"
                            align="start"
                        >
                            <Command shouldFilter={false}>
                                <CommandInput
                                    className="p-7 text-[1.4rem]"
                                    placeholder={searchPlacholder}
                                    value={searchQuery}
                                    onValueChange={setSearchQuery}
                                />
                                <CommandList>
                                    <CommandEmpty className="p-2 text-center text-[1.4rem]">
                                        {nationalityNotFound}
                                    </CommandEmpty>
                                    <CommandGroup className="max-h-80 overflow-hidden">
                                        <VirtualizedCountryList
                                            selectedValue={field.value}
                                            onSelect={(value) => {
                                                field.onChange(value);
                                                setOpen(false);
                                            }}
                                            filter={searchQuery}
                                        />
                                    </CommandGroup>
                                </CommandList>
                            </Command>
                        </PopoverContent>
                    </Popover>
                    <FormMessage className="text-[1.3rem]" />
                </FormItem>
            )}
        />
    );
};

export default CountrySelectCombobox;
