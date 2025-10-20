import { Button } from '@/shared/components/ui/button';
import { Trash } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { addTenantFormData } from './schemas';
import { X } from '../../../../../../../../public/assets/icons/X';
import { UploadGroup } from '../../../../../../../../public/assets/icons/upload-group';
import { BiFileEarmarkImage } from '../../../../../../../../public/assets/icons/bi_file-earmark-image';

interface StepThreeFormProps {
    form: UseFormReturn<addTenantFormData>;
    existingDocuments?: string[];
}

function StepThreeForm({ form, existingDocuments }: Readonly<StepThreeFormProps>) {
    const { setValue, watch } = form;
    const documents = watch('documents') || [];
    const [existingDocs, setExistingDocs] = useState<string[]>(existingDocuments || []);

    useEffect(() => {
        // Ensure the initial value is set as an array
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

    return (
        <div>
            <section>
                <h2 className="text-2xl font-semibold text-blue-900 mb-4">1. Documents Justificatifs</h2>
                <div className='px-[40px] mt-[20px]'>
                    <div className="flex justify-between items-center border-dashed border-2 border-gray-300 p-20 h-[170px] rounded-xl mb-4 text-center">
                        <UploadGroup className="mr-2" />
                        <div className='flex flex-1 ml-[30%] items-center mr-'>
                            <label htmlFor="documentUpload" className="cursor-pointer">
                                <div className='flex flex-col items-start'>
                                    <p className="mb-2">Sélectionner les autres images</p>
                                    <p className="text-lg text-gray-400">JPG, PNG ou WebP, PDF</p>
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
                                IMAGES
                            </Button>
                        </div>
                    </div>
                    <div className="space-y-2">
                        {existingDocs.length > 0 &&
                            existingDocs.map((doc, index) => (
                                <div key={index + 1} className="flex items-center text-green-600 my-1">
                                    <BiFileEarmarkImage />
                                    <span className='text-stone-950 ml-7'>{doc}</span>
                                    <Trash
                                        className="w-10 h-8 ml-auto text-red-500 cursor-pointer"
                                        onClick={() =>
                                            setExistingDocs(existingDocs.filter((_, i) => i !== index))
                                        }
                                    />
                                </div>
                            ))}
                        {documents.length > 0 &&
                            documents.map((file, index) => (
                                <div key={index + 1} className="flex items-center text-green-600 my-1">
                                    <BiFileEarmarkImage />
                                    <span className='text-stone-950 ml-7'>{file.name}</span>
                                    <span className="ml-auto text-gray-500">
                                        {(file.size / 1024 / 1024).toFixed(1)}MB
                                    </span>
                                    <Trash className="w-10 h-8 ml-4 text-red-500" onClick={() => handleRemoveFile(index)} />
                                </div>
                            ))}
                    </div>
                </div>
            </section>
        </div>
    );
}

export default StepThreeForm;