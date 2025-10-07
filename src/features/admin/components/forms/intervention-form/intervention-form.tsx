'use client';

import { cn } from '@/lib/utils';
import UserPill from '@/shared/components/atoms/user-pill';
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
import { Textarea } from '@/shared/components/ui/textarea';
import { Check } from 'lucide-react';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import FeatherUploadCloud from '../../../../../../public/assets/icons/feather_upload-cloud';
import FileIcon from '../../../../../../public/assets/icons/file-icon';

const InterventionForm = () => {
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
                    <h1>Enregistrement d’une nouvelle intervention</h1>
                    <Button
                        variant={'add'}
                        size={'add'}
                        className="text-white [&_svg]:size-8"
                    >
                        <span className="text-[1.3rem]">ENREGISTRER</span>{' '}
                        <Check />
                    </Button>
                </div>
                <div className="grid grid-cols-6 items-center gap-10">
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
                                            className="grid grid-cols-3 cursor-pointer"
                                        >
                                            <FeatherUploadCloud className="" />
                                            <div className="flex col-span-2 gap-10 items-center">
                                                <div className="flex flex-col">
                                                    <span className="font-medium text-black">
                                                        Sélectionner les
                                                        documents
                                                    </span>
                                                    <p className="mt-1 text-[1.2rem] font-normal text-gray-400">
                                                        JPG, PNG ou Webp,
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
                                                        IMAGES
                                                    </span>
                                                </Button>
                                            </div>
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

                    <FormField
                        control={form.control}
                        name=""
                        render={({ field }) => (
                            <FormItem className="col-span-2">
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
                    <div className="col-span-4 flex items-center gap-20 mt-8">
                        <UserPill
                            fullName="Touré Mack"
                            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
                        />
                        <UserPill
                            fullName="KOUAHO Stephane"
                            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
                        />
                    </div>
                    <FormField
                        control={form.control}
                        name=""
                        render={({ field }) => (
                            <FormItem className="col-span-6">
                                <Label>Description du Bien</Label>
                                <FormControl>
                                    <Textarea
                                        rows={7}
                                        placeholder="Description du bien"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
            </form>
        </Form>
    );
};

export default InterventionForm;
