import { Button } from '@/shared/components/ui/button';
import { Trash } from 'lucide-react';
import React, { useEffect } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { addBuildingFormData } from './schemas';
import { SectionTitle } from '@/shared/components/ui/section-title';
import { UploadGroup } from '../../../../../../../../../public/assets/icons/upload-group';
import { BiFileEarmarkImage } from '../../../../../../../../../public/assets/icons/bi_file-earmark-image';

interface StepThreeFormProps {
    form: UseFormReturn<addBuildingFormData>;
}

function StepThreeForm({ form }: Readonly<StepThreeFormProps>) {
    const { setValue, watch } = form;
    const documents = watch('documents') || [];
    const otherMedia = watch('media.otherMedia') || [];
    const coverPicture = watch('media.coverPicture');
    const documentUrls = watch('documentUrls') || [];
    const coverUrl = watch('coverUrl') || '';
    const otherMediaUrls = watch('otherMediaUrls') || [];

    useEffect(() => {
        if (!Array.isArray(documents)) {
            setValue('documents', []);
        }
        if (!Array.isArray(otherMedia)) {
            setValue('media.otherMedia', []);
        }
    }, [documents, otherMedia, setValue]);

    const handleDocumentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files) {
            const currentFiles = documents || [];
            const newFiles = Array.from(files);
            setValue('documents', [...currentFiles, ...newFiles]);
            event.target.value = '';
        }
    };

    const handleCoverPictureChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setValue('coverUrl', '');
            setValue('media.coverPicture', file);
            event.target.value = '';
        }
    };

    const handleOtherMediaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files) {
            const currentFiles = otherMedia || [];
            const newFiles = Array.from(files);
            setValue('media.otherMedia', [...currentFiles, ...newFiles]);
            event.target.value = '';
        }
    };

    const handleRemoveDocument = (index: number) => {
        const currentFiles = documents || [];
        const updatedFiles = currentFiles.filter((_, i) => i !== index);
        setValue('documents', updatedFiles);
    };

    const handleRemoveCoverPicture = () => {
        setValue('media.coverPicture', undefined);
    };

    const handleRemoveOtherMedia = (index: number) => {
        const currentFiles = otherMedia || [];
        const updatedFiles = currentFiles.filter((_, i) => i !== index);
        setValue('media.otherMedia', updatedFiles);
    };

    const handleRemoveExistingDocument = (index: number) => {
        const updatedUrls = documentUrls.filter((_, i) => i !== index);
        setValue('documentUrls', updatedUrls);
    };

    const handleRemoveExistingCover = () => {
        setValue('coverUrl', '');
    };

    const handleRemoveExistingMedia = (index: number) => {
        const updatedUrls = otherMediaUrls.filter((_, i) => i !== index);
        setValue('otherMediaUrls', updatedUrls);
    };

    return (
        <div className="space-y-12">
            <section>
                <SectionTitle content="1. Documents Justificatifs" />
                <div className="flex items-center gap-8 grid grid-cols-2">
                    <div className="flex-1 border-2 border-dashed border-gray-300 rounded-xl p-8 flex items-center justify-between min-h-[140px]">
                        <div className="flex items-center gap-4">
                            <UploadGroup className="mr-2" />
                            <div className='flex flex-col items-start'>
                                <p className="mb-2">Déposer vos documents ici</p>
                                <p className="text-lg text-gray-400">Titre de propriété, Plan cadastral / plan du bâtiment, Attestation de conformité</p>
                            </div>
                        </div>
                        <Button
                            type='button'
                            variant="outline_success"
                            className="mt-4 ml-[15%]"
                            onClick={() => document.getElementById('documentUpload')?.click()}
                        >
                            SÉLECTIONNER UN DOCUMENT
                        </Button>
                        <input
                            id="documentUpload"
                            type="file"
                            accept="application/pdf,image/jpeg,image/png,image/webp"
                            multiple
                            className="hidden"
                            onChange={handleDocumentChange}
                        />
                    </div>
                    <div className="space-y-3">
                        {documentUrls.length > 0 && documentUrls.map((url, index) => (
                            <div key={`existing-doc-${index}`} className="flex items-center text-green-600 my-1">
                                <BiFileEarmarkImage />
                                <span className="text-stone-950 ml-7">{url.split('/').pop()}</span>
                                <Trash
                                    className="w-10 h-8 ml-4 text-red-500 cursor-pointer"
                                    onClick={() => handleRemoveExistingDocument(index)}
                                />
                            </div>
                        ))}
                        {documents.length > 0 && documents.map((file, index) => (
                            <div key={index + 1} className="flex items-center text-green-600 my-1">
                                <BiFileEarmarkImage />
                                <span className="text-stone-950 ml-7">{file.name}</span>
                                <span className="ml-auto text-gray-500">
                                    {(file.size / 1024 / 1024).toFixed(1)}MB
                                </span>
                                <Trash
                                    className="w-10 h-8 ml-4 text-red-500 cursor-pointer"
                                    onClick={() => handleRemoveDocument(index)}
                                />
                            </div>
                        ))}
                        {documentUrls.length === 0 && documents.length === 0 && (
                            <p className="text-gray-400 text-center py-8">
                                Aucun document téléchargé
                            </p>
                        )}
                    </div>
                </div>
            </section>
            <section>
                <SectionTitle content="2. Média" />
                <div className="flex gap-8">
                    <div className="w-[280px]">
                        <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 flex flex-col items-center justify-center min-h-[400px]">
                            <UploadGroup />
                            <p className="font-medium text-gray-900 mt-4 mb-2">Photo de couverture</p>
                            <p className="text-lg text-gray-500 text-center mb-4">
                                Sélectionner la photo de couverture ici
                            </p>
                            <input
                                id="coverPictureUpload"
                                type="file"
                                accept="image/jpeg,image/png,image/webp"
                                className="hidden"
                                onChange={handleCoverPictureChange}
                            />
                            <Button
                                type='button'
                                variant="outline_success"
                                onClick={() => document.getElementById('coverPictureUpload')?.click()}
                            >
                                Parcourir
                            </Button>
                        </div>
                        {(coverUrl || coverPicture) && (
                            <div className="mt-4 flex items-center bg-gray-50 rounded-lg">
                                <BiFileEarmarkImage />
                                <span className="text-stone-950 ml-7">
                                    {coverPicture ? coverPicture.name : coverUrl.split('/').pop()}
                                </span>
                                {coverPicture && (
                                    <span className="ml-auto text-gray-500">
                                        {(coverPicture.size / 1024 / 1024).toFixed(1)}MB
                                    </span>
                                )}
                                <Trash
                                    className="w-10 h-8 ml-4 text-red-500 cursor-pointer"
                                    onClick={coverPicture ? handleRemoveCoverPicture : handleRemoveExistingCover}
                                />
                            </div>
                        )}
                    </div>
                    <div className="flex-1">
                        <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 mb-6">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <UploadGroup />
                                    <div className='flex flex-col items-start'>
                                        <p className="mb-2">Sélectionner les autres images</p>
                                        <p className="text-lg text-gray-400">JPG, PNG ou Webp</p>
                                    </div>
                                </div>
                                <Button
                                    type='button'
                                    variant="outline_success"
                                    onClick={() => document.getElementById('otherMediaUpload')?.click()}
                                >
                                    IMAGES
                                </Button>
                                <input
                                    id="otherMediaUpload"
                                    type="file"
                                    accept="image/jpeg,image/png,image/webp"
                                    multiple
                                    className="hidden"
                                    onChange={handleOtherMediaChange}
                                />
                            </div>
                        </div>
                        <div className="space-y-3">
                            {otherMediaUrls.length > 0 && otherMediaUrls.map((url, index) => (
                                <div key={`existing-media-${index}`} className="flex items-center text-green-600 my-1">
                                    <BiFileEarmarkImage />
                                    <span className="text-stone-950 ml-7">{url.split('/').pop()}</span>
                                    <Trash
                                        className="w-10 h-8 ml-4 text-red-500 cursor-pointer"
                                        onClick={() => handleRemoveExistingMedia(index)}
                                    />
                                </div>
                            ))}
                            {otherMedia.length > 0 && otherMedia.map((file, index) => (
                                <div key={`new-media-${index}`} className="flex items-center text-green-600 my-1">
                                    <BiFileEarmarkImage />
                                    <span className="text-stone-950 ml-7">{file.name}</span>
                                    <span className="ml-auto text-gray-500">
                                        {(file.size / 1024 / 1024).toFixed(1)}MB
                                    </span>
                                    <Trash
                                        className="w-10 h-8 ml-4 text-red-500 cursor-pointer"
                                        onClick={() => handleRemoveOtherMedia(index)}
                                    />
                                </div>
                            ))}
                            {otherMediaUrls.length === 0 && otherMedia.length === 0 && (
                                <p className="text-gray-400 text-center py-8">Aucune image téléchargée</p>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default StepThreeForm;