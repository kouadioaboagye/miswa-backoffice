'use client';

import { useListContractTypesQuery } from '@/lib/data-service/contract-type/contract.hooks';
import { useListTenantsQuery } from '@/lib/data-service/tenant/tenants.hooks';
import { cn } from '@/lib/utils';
import { Button } from '@/shared/components/ui/button';
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
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/shared/components/ui/select';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { BasilArrowRightOutline } from '../../../../../../public/assets/icons/arrow-right';
import FeatherUploadCloud from '../../../../../../public/assets/icons/feather_upload-cloud';
import FileIcon from '../../../../../../public/assets/icons/file-icon';
import { contractFormSchema } from './contract-schema';

const ContratForm = () => {
    const { data: tenants } = useListTenantsQuery();
    const { data: contractTypes } = useListContractTypesQuery();

    const [dragActive, setDragActive] = useState(false);
    const form = useForm({
        resolver: zodResolver(contractFormSchema),
        defaultValues: {
            contract_document_type: '',
            contract_type: '',
            start_date: '',
            end_date: '',
            document_urls: [],
            property_id: '',
            rent_amount: '',
            tenant_id: ''
        }
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
                    <h2>Enregistrement d’un nouveau Contrat</h2>
                    <Button
                        type="submit"
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
                        name="contract_type"
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
                        name="property_id"
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
                        name="tenant_id"
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
                        name="start_date"
                        render={({ field }) => (
                            <FormItem className="flex flex-col gap-1 col-span-2">
                                <Label>Date de debut du contrat</Label>
                                <FormControl>
                                    <Input
                                        type="date"
                                        placeholder="JJ/MM/AAAA"
                                        {...field}
                                        className="placeholder:text-gray-400"
                                    />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="end_date"
                        render={({ field }) => (
                            <FormItem className="flex flex-col gap-1 col-span-2">
                                <Label>Date de fin du contrat</Label>
                                <FormControl>
                                    <Input
                                        type="date"
                                        placeholder="JJ/MM/AAAA"
                                        {...field}
                                        className="placeholder:text-gray-400"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="rent_amount"
                        render={({ field }) => (
                            <FormItem className="col-span-2 -mt-[0.8rem]">
                                <Label>Montant du Loyer</Label>
                                <FormControl>
                                    <Input
                                        type="text"
                                        inputMode="numeric"
                                        pattern="[0-9]*"
                                        autoComplete="off"
                                        placeholder="Saisir le montant"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="document_urls"
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
