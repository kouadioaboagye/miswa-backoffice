/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useMemo, useRef } from 'react';
import { Check, ChevronDown } from 'lucide-react';
import {
    FormControl,
    FormField,
    FormItem,
    FormMessage
} from '@/shared/components/ui/form';
import { Label } from '@/shared/components/ui/label';
import { Button } from '@/shared/components/ui/button';
import { cn } from '@/shared/lib/utils';
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList
} from '@/shared/components/ui/command';
import {
    Popover,
    PopoverContent,
    PopoverTrigger
} from '@/shared/components/ui/popover';
import countries from '@/shared/lib/constant/nationalities.json';

// Import VariableSizeList de manière à contourner les problèmes de typage
// @ts-expect-error - Nécessaire pour éviter les erreurs de typage avec react-window
const { VariableSizeList } = React.lazy(() => import('react-window'));

type CountrySelectProps = {
    form: any;
    name: string;
    label: string;
    placeholder?: string;
    searchPlacholder?: string;
    countryNotFound?: string;
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
                    {country.flag && (
                        <span className="mr-1">{country.flag}</span>
                    )}
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
            country.nationality.toLowerCase().includes(filter.toLowerCase())
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
                        className="flex items-center gap-2 p-2 text-[1.4rem]"
                    >
                        <Check
                            className={cn(
                                'mr-2 h-4 w-4',
                                selectedValue === country.code
                                    ? 'opacity-100'
                                    : 'opacity-0'
                            )}
                        />
                        {country.nationality}
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

const NationalitySelectCombobox: React.FC<CountrySelectProps> = ({
    form,
    name,
    label,
    placeholder = 'Sélectionner un pays',
    searchPlacholder,
    countryNotFound
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
                                        'w-full h-[4.5rem] justify-between rounded-[0.8rem] bg-[#F1F2F7] shadow-none border-none font-normal [&_svg]:size-6',
                                        !field.value && 'text-muted-foreground '
                                    )}
                                >
                                    {field.value
                                        ? getCountryByCode(field.value)
                                              ?.nationality || 'Pays inconnu'
                                        : placeholder}
                                    <ChevronDown className="ml-2 size-6 shrink-0 opacity-50" />
                                </Button>
                            </FormControl>
                        </PopoverTrigger>
                        <PopoverContent
                            className="w-[33rem] overflow-hidden rounded-[0.8rem] p-0 "
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
                                        {countryNotFound}
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

export default NationalitySelectCombobox;
