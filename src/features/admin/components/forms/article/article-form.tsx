'use client';

import { cn } from '@/lib/utils';
import RichTextEditor from '@/shared/components/rich-text-editor/rich-text-editor';
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
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { BasilArrowRightOutline } from '../../../../../../public/assets/icons/arrow-right';
import FeatherUploadCloud from '../../../../../../public/assets/icons/feather_upload-cloud';

const ArticleForm = () => {
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
                    <h1>Enregistrement d’un nouveau article de blog</h1>
                    <Button
                        variant={'add'}
                        size={'add'}
                        className="text-white [&_svg]:size-8"
                    >
                        <span className="text-[1.3rem]">VALIDER</span>{' '}
                        <BasilArrowRightOutline />
                    </Button>
                </div>
                <div className="grid grid-cols-2 gap-10">
                    <FormField
                        control={form.control}
                        name="doc"
                        render={({ field }) => (
                            <FormItem>
                                <div className="flex h-fit w-full flex-col gap-3">
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
                                            className="flex flex-col items-center cursor-pointer gap-2"
                                        >
                                            <FeatherUploadCloud />
                                            <div className="flex flex-col gap-5">
                                                <span className="font-medium text-center text-black">
                                                    Photo de couverture
                                                </span>
                                                <p className="mt-1 text-[1.2rem] text-center font-normal text-gray-400 leading-6 w-96">
                                                    Sélectionner ou déposer la
                                                    photo de couverture ici
                                                </p>
                                            </div>
                                        </Label>
                                    </div>

                                    {/* {field.value && (
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
                                    )} */}

                                    <FormMessage className="text-[1.2rem]" />
                                </div>
                            </FormItem>
                        )}
                    />
                    <div className="flex flex-col justify-between ">
                        <FormField
                            control={form.control}
                            name=""
                            render={({ field }) => (
                                <FormItem>
                                    <Label>Titre de l’article</Label>
                                    <FormControl>
                                        <Input
                                            placeholder="exemple@gmail.com"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name=""
                            render={({ field }) => (
                                <FormItem>
                                    <Label>Catégorie</Label>
                                    <FormControl>
                                        <Input
                                            placeholder="exemple@gmail.com"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <FormField
                        control={form.control}
                        name=""
                        render={({ field }) => (
                            <FormItem className="col-span-2">
                                <Label>Contenu</Label>
                                <FormControl>
                                    <RichTextEditor
                                        onChange={field.onChange}
                                        value={field.value}
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

export default ArticleForm;
