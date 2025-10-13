import { Button } from '@/shared/components/ui/button';
import { Label } from '@/shared/components/ui/label';
import { Upload, Trash2, Trash } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { X } from '../../../../../../../../public/assets/icons/X';
import { UploadGroup } from '../../../../../../../../public/assets/icons/upload-group';
import { BiFileEarmarkImage } from '../../../../../../../../public/assets/icons/bi_file-earmark-image';
import { AddPropertyForm } from './schemas';

interface StepThreeFormProps {
    form: UseFormReturn<AddPropertyForm>;
}

function StepThreeForm({ form }: Readonly<StepThreeFormProps>) {
    const { setValue, watch } = form;
    const documents = watch('documents') || [];
    const media = watch('media') || [];

    // Initialisation des tableaux si nécessaire
    useEffect(() => {
        if (!Array.isArray(documents)) {
            setValue('documents', []);
        }
        if (!Array.isArray(media)) {
            setValue('media', []);
        }
    }, [documents, media, setValue]);

    // Gestion des documents
    const handleDocumentUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files) {
            const currentFiles = documents || [];
            const newFiles = Array.from(files);
            setValue('documents', [...currentFiles, ...newFiles]);
            event.target.value = '';
        }
    };

    const handleRemoveDocument = (index: number) => {
        const currentFiles = documents || [];
        const updatedFiles = currentFiles.filter((_, i) => i !== index);
        setValue('documents', updatedFiles);
    };

    // Gestion des médias
    const handleMediaUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files) {
            const currentFiles = media || [];
            const newFiles = Array.from(files);
            setValue('media', [...currentFiles, ...newFiles]);
            event.target.value = '';
        }
    };

    const handleRemoveMedia = (index: number) => {
        const currentFiles = media || [];
        const updatedFiles = currentFiles.filter((_, i) => i !== index);
        setValue('media', updatedFiles);
    };

    return (
        <div>
            <section className='mt-4'>
                <h2 className="text-2xl font-semibold text-blue-900 mb-4">1. Documents officiels</h2>
                <div className='px-[40px] mt-[20px]'>
                    <div className="flex justify-between items-center border-dashed border-2 border-gray-300 p-20 h-[170px] rounded-xl mb-4 text-center">
                        <UploadGroup className="mr-2" />
                        <div className='flex flex-1 ml-[30%] items-center mr-'>
                            <label htmlFor="documentUpload" className="cursor-pointer">
                                <div className='flex flex-col items-start'>
                                    <p className="mb-2">Déposer vos documents ici</p>
                                </div>
                                <input
                                    id="documentUpload"
                                    type="file"
                                    accept="image/jpeg,image/png,image/webp,application/pdf"
                                    multiple
                                    className="hidden"
                                    onChange={handleDocumentUpload}
                                />
                            </label>
                            <Button
                                type="button"
                                variant="outline_success"
                                className="mt-4 ml-[20%]"
                                onClick={() => document.getElementById('documentUpload')?.click()}
                            >
                                Sélectionner des documents
                            </Button>
                        </div>
                    </div>
                    <p className="text-base text-gray-600 mb-[40px] text-center w-[100%]">
                        <span className="italic">
                            indispensables pour la crédibilité du dossier et la sécurité des paiements
                        </span>{' '}
                        <span className="text-[#14385c]">
                            Titre de propriété, Plan cadastral / plan du bâtiment, Attestation de conformité
                        </span>
                    </p>

                    <div className="space-y-2">
                        {documents.length > 0 && documents.map((file, index) => (
                            <div key={index} className="flex items-center text-green-600 my-1 p-2 border rounded">
                                <BiFileEarmarkImage/>
                                <div className="ml-4 flex-1">
                                    <span className='text-stone-950 block'>{file.name}</span>
                                    <span className="text-gray-500 text-sm">
                                        {(file.size / 1024 / 1024).toFixed(1)}MB
                                    </span>
                                </div>
                                <Trash 
                                    className="w-6 h-6 ml-4 text-red-500 cursor-pointer" 
                                    onClick={() => handleRemoveDocument(index)} 
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className='mt-8'>
                <h2 className="text-2xl font-semibold text-blue-900 mb-4">2. Galerie d'images</h2>
                <div className='px-[40px] mt-[20px]'>
                    <div className="flex justify-between items-center border-dashed border-2 border-gray-300 p-20 h-[170px] rounded-xl mb-4 text-center">
                        <UploadGroup className="mr-2" />
                        <div className='flex flex-1 ml-[30%] items-center mr-'>
                            <label htmlFor="mediaUpload" className="cursor-pointer">
                                <div className='flex flex-col items-start'>
                                    <p className="mb-2">Sélectionner les images du bien</p>
                                </div>
                                <input
                                    id="mediaUpload"
                                    type="file"
                                    accept="image/jpeg,image/png,image/webp"
                                    multiple
                                    className="hidden"
                                    onChange={handleMediaUpload}
                                />
                            </label>
                            <Button
                                type="button"
                                variant="outline_success"
                                className="mt-4 ml-[20%]"
                                onClick={() => document.getElementById('mediaUpload')?.click()}
                            >
                                Sélectionner des images
                            </Button>
                        </div>
                    </div>
                    <p className="text-base text-gray-600 mb-[40px] text-center w-[100%]">
                        <span className="text-[#14385c]">
                            Photos de l'extérieur, intérieur, différentes pièces, et équipements
                        </span>
                    </p>

                    <div className="space-y-2">
                        {media.length > 0 && media.map((file, index) => (
                            <div key={index} className="flex items-center text-green-600 my-1 p-2 border rounded">
                                <BiFileEarmarkImage/>
                                <div className="ml-4 flex-1">
                                    <span className='text-stone-950 block'>{file.name}</span>
                                    <span className="text-gray-500 text-sm">
                                        {(file.size / 1024 / 1024).toFixed(1)}MB
                                    </span>
                                </div>
                                <Trash 
                                    className="w-6 h-6 ml-4 text-red-500 cursor-pointer" 
                                    onClick={() => handleRemoveMedia(index)} 
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Résumé des fichiers */}
            <div className="mt-8 p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold mb-2">Résumé des fichiers sélectionnés:</h3>
                <p>Documents: {documents.length} fichier(s)</p>
                <p>Médias: {media.length} fichier(s)</p>
            </div>
        </div>
    );
}

export default StepThreeForm;