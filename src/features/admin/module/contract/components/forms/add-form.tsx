"use client"

import React, { useEffect } from 'react'
import { Controller, UseFormReturn } from 'react-hook-form';
import { Label } from '@/shared/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/components/ui/select';
import InputErrorMessage from '@/shared/components/ui/input-error-message';
import { Input } from '@/shared/components/ui/input';
import { addContractFormData } from './schemas';
import { UploadGroup } from '../../../../../../../public/assets/icons/upload-group';
import { Button } from '@/shared/components/ui/button';
import { BiFileEarmarkImage } from '../../../../../../../public/assets/icons/bi_file-earmark-image';
import { Trash } from 'lucide-react';

interface FormProps {
    form: UseFormReturn<addContractFormData>;
}

function AddContractForm({ form }: Readonly<FormProps>) {
    const { errors } = form.formState;

    const { setValue, watch } = form;
    const documents = watch('documents') || [];
    const documentUrls = watch('documentUrls') || [];

    useEffect(() => {
        if (!Array.isArray(documents)) {
            setValue('documents', []);
        }
    }, [documents, setValue]);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files) {
            const currentFiles = documents || [];
            const newFiles = Array.from(files);
            setValue('documents', [...currentFiles, ...newFiles]);
            event.target.value = '';
        }
    };

    const handleRemoveFile = (index: number) => {
        const currentFiles = documents || [];
        const updatedFiles = currentFiles.filter((_, i) => i !== index);
        setValue('documents', updatedFiles);
    };

    const handleRemoveExistingDocument = (index: number) => {
        const updatedUrls = documentUrls.filter((_, i) => i !== index);
        setValue('documentUrls', updatedUrls);
    };

    return (
        <div className='p-4 space-y-12'>
            <div className='flex w-full gap-x-8'>
                <div className='w-3/5'>
                    <Label htmlFor="contractType" isRequired>Type de contrat</Label>
                    <Controller
                        name="contractType"
                        control={form.control}
                        render={({ field, fieldState: { error } }) => (
                            <div>
                                <Select value={field.value} onValueChange={field.onChange} key={`contractType-${field.value}`}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Sélectionnez" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="location">Contract de location</SelectItem>
                                        <SelectItem value="bail">Contract de xxxx</SelectItem>
                                    </SelectContent>
                                </Select>
                                <InputErrorMessage message={error?.message} />
                            </div>
                        )}
                    />
                </div>
                <div className='w-2/5'>
                    <Label htmlFor="propertyId" isRequired>Bien concerné</Label>
                    <Controller
                        name="propertyId"
                        control={form.control}
                        render={({ field }) => (
                            <div>
                                <Select value={field.value} onValueChange={field.onChange} key={`propertyId-${field.value}`}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Sélectionnez" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="individual">Persone physique</SelectItem>
                                        <SelectItem value="professional">Personne morale</SelectItem>
                                    </SelectContent>
                                </Select>
                                <InputErrorMessage message={errors.propertyId?.message} />
                            </div>
                        )}
                    />
                </div>
            </div>
            <div>
                <Label htmlFor="ownerId" isRequired>Locataire</Label>
                <Controller
                    name="ownerId"
                    control={form.control}
                    render={({ field }) => (
                        <div>
                            <Select value={field.value} onValueChange={field.onChange} key={`ownerId-${field.value}`}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Sélectionnez" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="1">Locataire 1</SelectItem>
                                    <SelectItem value="2">Locataire 2</SelectItem>
                                </SelectContent>
                            </Select>
                            <InputErrorMessage message={errors.propertyId?.message} />
                        </div>
                    )}
                />
            </div>
            <div className='grid grid-cols-3 gap-4 mb-4'>
                <div>
                    <Label htmlFor="startDate" isRequired>Date de début du contract</Label>
                    <Input id="startDate" placeholder="dd/MM/yyyy" {...form.register('startDate')} type='date' />
                    <InputErrorMessage message={errors.startDate?.message} />
                </div>
                <div>
                    <Label htmlFor="endDate" isRequired>Date de fin du contract</Label>
                    <Input id="endDate" placeholder="dd/MM/yyyy" {...form.register('endDate')} type='date' />
                    <InputErrorMessage message={errors.endDate?.message} />
                </div>
                <div>
                    <Label htmlFor="montant" isRequired>Montant du loyer</Label>
                    <Input id="montant" placeholder="100000" {...form.register('montant', { valueAsNumber: true })} type='number' />
                    <InputErrorMessage message={errors.montant?.message} />
                </div>
            </div>
            <div className="flex justify-between items-center border-dashed border-2 border-gray-300 p-20 h-[170px] rounded-xl mb-4 text-center">
                <UploadGroup className="mr-2" />
                <div className='flex flex-1 ml-[30%] items-center mr-'>
                    <label htmlFor="documentUpload" className="cursor-pointer">
                        <div className='flex flex-col items-start'>
                            <p className="mb-2">Sélectionner les documents</p>
                            <p className="text-lg text-gray-400">CNI, Passport... (JPG, PNG, WebP, PDF)</p>
                        </div>
                        <input
                            id="documentUpload"
                            type="file"
                            accept="image/jpeg,image/png,image/webp,application/pdf"
                            multiple
                            className="hidden"
                            onChange={handleFileChange}
                        />
                    </label>
                    <Button
                        type='button'
                        variant="outline_success"
                        className="mt-4 ml-[20%]"
                        onClick={() => document.getElementById('documentUpload')?.click()}
                    >
                        SÉLECTIONNER
                    </Button>
                </div>
            </div>
            <div className="space-y-2">
                {documentUrls.length > 0 && documentUrls.map((url, index) => (
                    <div key={`existing-doc-${index + 1}`} className="flex items-center text-green-600 my-1">
                        <BiFileEarmarkImage />
                        <span className="text-stone-950 ml-7">{url.split('/').pop()}</span>
                        <Trash
                            className="w-10 h-8 ml-auto text-red-500 cursor-pointer"
                            onClick={() => handleRemoveExistingDocument(index)}
                        />
                    </div>
                ))}
                {documents.length > 0 && documents.map((file, index) => (
                    <div key={`new-doc-${index + 1}`} className="flex items-center text-green-600 my-1">
                        <BiFileEarmarkImage />
                        <span className="text-stone-950 ml-7">{file.name}</span>
                        <span className="ml-auto text-gray-500">
                            {(file.size / 1024 / 1024).toFixed(1)}MB
                        </span>
                        <Trash
                            className="w-10 h-8 ml-4 text-red-500 cursor-pointer"
                            onClick={() => handleRemoveFile(index)}
                        />
                    </div>
                ))}
                {documentUrls.length === 0 && documents.length === 0 && (
                    <p className="text-gray-400 text-center py-8">Aucun document téléchargé</p>
                )}
            </div>
        </div>
    )
}

export default AddContractForm
