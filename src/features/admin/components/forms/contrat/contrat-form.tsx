'use client';

import { cn } from '@/lib/utils';
import { Button } from '@/shared/components/ui/button';
import { Calendar } from '@/shared/components/ui/calendar';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage
} from '@/shared/components/ui/form';
import { Input } from '@/shared/components/ui/input';
import { Label } from '@/shared/components/ui/label';
import {
    Popover,
    PopoverContent,
    PopoverTrigger
} from '@/shared/components/ui/popover';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/shared/components/ui/select';
import { format } from 'date-fns';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { BasilArrowRightOutline } from '../../../../../../public/assets/icons/arrow-right';
import FeatherUploadCloud from '../../../../../../public/assets/icons/feather_upload-cloud';
import FileIcon from '../../../../../../public/assets/icons/file-icon';

const ContratForm = () => {
    const [dragActive, setDragActive] = useState(false);
    const form = useForm({
        defaultValues: {}
    });

    const onSubmit: SubmitHandler<any> = async (credentials) => {
        console.log(credentials);
    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col gap-12 px-4"
            >
                <div className="flex items-center justify-between p-4">
                    <h1>Enregistrement d’un nouveau Contrat</h1>
                    <Button
                        variant={'add'}
                        size={'add'}
                        className="text-white [&_svg]:size-8"
                    >
                        <span className="text-[1.3rem]">VALIDER</span>{' '}
                        <BasilArrowRightOutline />
                    </Button>
                </div>
                <div className="grid grid-cols-6 gap-10">
                    <FormField
                        control={form.control}
                        name=""
                        render={({ field }) => (
                            <FormItem className="col-span-3">
                                <Label>Type de contrat</Label>
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                >
                                    <FormControl>
                                        <SelectTrigger className="border border-gray-300">
                                            <SelectValue placeholder="Type de contrat" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="option1">
                                            Option 1
                                        </SelectItem>
                                        <SelectItem value="option2">
                                            Option 2
                                        </SelectItem>
                                        <SelectItem value="option3">
                                            Option 3
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name=""
                        render={({ field }) => (
                            <FormItem className="col-span-3">
                                <Label>Bien concerné</Label>
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                >
                                    <FormControl>
                                        <SelectTrigger className="border border-gray-300">
                                            <SelectValue placeholder="Sélectionner le bien concerné" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="option1">
                                            Option 1
                                        </SelectItem>
                                        <SelectItem value="option2">
                                            Option 2
                                        </SelectItem>
                                        <SelectItem value="option3">
                                            Option 3
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name=""
                        render={({ field }) => (
                            <FormItem className="col-span-6">
                                <Label>Locataire</Label>
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                >
                                    <FormControl>
                                        <SelectTrigger className="border border-gray-300">
                                            <SelectValue placeholder="Sélectionner le locataire" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="option1">
                                            Option 1
                                        </SelectItem>
                                        <SelectItem value="option2">
                                            Option 2
                                        </SelectItem>
                                        <SelectItem value="option3">
                                            Option 3
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="dob"
                        render={({ field }) => (
                            <FormItem className="flex flex-col gap-1 col-span-2">
                                <Label>Date de debut du contrat</Label>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button
                                                variant={'outline_header'}
                                                className={cn(
                                                    'pl-3 text-left font-normal h-[48px] rounded-xl justify-between border border-gray-300',
                                                    !field.value &&
                                                        'text-muted-foreground'
                                                )}
                                            >
                                                {field.value ? (
                                                    format(field.value, 'PPP')
                                                ) : (
                                                    <span>JJ/MM/AAAA</span>
                                                )}
                                                {/* <CalendarIcon className="ml-auto h-4 w-4 opacity-50" /> */}
                                            </Button>
                                        </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent
                                        className="w-auto p-0"
                                        align="start"
                                    >
                                        <Calendar
                                            mode="single"
                                            selected={field.value}
                                            onSelect={field.onChange}
                                            disabled={(date) =>
                                                date > new Date() ||
                                                date < new Date('1900-01-01')
                                            }
                                            captionLayout="dropdown"
                                        />
                                    </PopoverContent>
                                </Popover>

                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="dob"
                        render={({ field }) => (
                            <FormItem className="flex flex-col gap-1 col-span-2">
                                <Label>Date de fin du contrat</Label>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button
                                                variant={'outline_header'}
                                                className={cn(
                                                    'pl-3 text-left font-normal h-[48px] justify-between rounded-xl border-gray-300',
                                                    !field.value &&
                                                        'text-muted-foreground'
                                                )}
                                            >
                                                {field.value ? (
                                                    format(field.value, 'PPP')
                                                ) : (
                                                    <span>JJ/MM/AAAA</span>
                                                )}
                                                {/* <CalendarIcon className="ml-auto h-4 w-4 opacity-50" /> */}
                                            </Button>
                                        </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent
                                        className="w-auto p-0"
                                        align="start"
                                    >
                                        <Calendar
                                            mode="single"
                                            selected={field.value}
                                            onSelect={field.onChange}
                                            disabled={(date) =>
                                                date > new Date() ||
                                                date < new Date('1900-01-01')
                                            }
                                            captionLayout="dropdown"
                                        />
                                    </PopoverContent>
                                </Popover>

                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name=""
                        render={({ field }) => (
                            <FormItem className="col-span-2 -mt-[0.8rem]">
                                <Label>Montant du Loyer</Label>
                                <FormControl>
                                    <Input
                                        placeholder="250 000 F CFA"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="doc"
                        render={({ field }) => (
                            <FormItem className="col-span-6 mt-9">
                                <div className="flex h-fit w-full flex-col gap-3">
                                    <Label>Documents</Label>
                                    <div
                                        className={cn(
                                            'border border-dashed rounded-[1rem] p-10 cursor-pointer transition',
                                            dragActive
                                                ? 'border-blue-500 bg-blue-50'
                                                : 'border-gray-300'
                                        )}
                                        onDragOver={(e) => {
                                            e.preventDefault();
                                            setDragActive(true);
                                        }}
                                        onDragLeave={() => setDragActive(false)}
                                        onDrop={(e) => {
                                            e.preventDefault();
                                            setDragActive(false);
                                            const files = e.dataTransfer.files;
                                            if (files && files.length > 0) {
                                                field.onChange(files[0]); // Prendre le premier fichier
                                            }
                                        }}
                                    >
                                        <FormControl>
                                            <Input
                                                type="file"
                                                accept=".pdf,.png,.jpeg,.jpg"
                                                className="hidden"
                                                onChange={(e) => {
                                                    const files =
                                                        e.target.files;
                                                    if (
                                                        files &&
                                                        files.length > 0
                                                    ) {
                                                        field.onChange(
                                                            files[0]
                                                        ); // Prendre le premier fichier
                                                    }
                                                }}
                                                id="docs"
                                            />
                                        </FormControl>
                                        <Label
                                            htmlFor="docs"
                                            className="flex items-center cursor-pointer justify-evenly"
                                        >
                                            <FeatherUploadCloud />
                                            <div className="flex flex-col">
                                                <span className="font-medium text-black">
                                                    Sélectionner les documents
                                                </span>
                                                <p className="mt-1 text-[1.2rem] font-normal text-gray-400">
                                                    CNI, Passport......
                                                </p>
                                            </div>
                                            <Button
                                                variant={'outline_green'}
                                                type="button"
                                                size={'add'}
                                                // onClick={handleButtonClick}
                                                className="rounded-[0.9rem] font-normal border border-[#0F91D2B2] px-4 py-2"
                                            >
                                                <span className="text-[1.2rem] ">
                                                    SELECTIONNER UN OU PLUSIEURS
                                                    DOCUMENTS
                                                </span>
                                            </Button>
                                        </Label>
                                    </div>

                                    {field.value && (
                                        <div className="flex w-full items-center justify-between rounded-2xl bg-gray-100 p-4">
                                            <div className="flex items-center gap-5">
                                                <FileIcon className="size-6" />
                                                <div>
                                                    <p className="text-[1.3rem] font-semibold">
                                                        {field.value.name}
                                                    </p>
                                                    <p className="text-[1.2rem] text-gray-500">
                                                        {(
                                                            field.value.size /
                                                            (1024 * 1024)
                                                        ).toFixed(2)}{' '}
                                                        MB
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    <FormMessage className="text-[1.2rem]" />
                                </div>
                            </FormItem>
                        )}
                    />
                </div>
            </form>
        </Form>
    );
};

export default ContratForm;
