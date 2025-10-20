import { Button } from '@/shared/components/ui/button';
import { Trash } from 'lucide-react';
import React, { useEffect } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { addOwnerFormData } from './schemas';
import { UploadGroup } from '../../../../../../../../public/assets/icons/upload-group';
import { BiFileEarmarkImage } from '../../../../../../../../public/assets/icons/bi_file-earmark-image';

interface StepThreeFormProps {
    form: UseFormReturn<addOwnerFormData>;
}

function StepThreeForm({ form }: Readonly<StepThreeFormProps>) {
    const { setValue, watch } = form;
    const documents = watch('documents') || [];
    const documentUrls = watch('documentUrls') || [];
    const coverPicture = watch('coverPicture');
    const coverPictureUrl = watch('coverPictureUrl') || '';

    useEffect(() => {
        if (!Array.isArray(documents)) {
            setValue('documents', []);
        }
        if (!Array.isArray(documentUrls)) {
            setValue('documentUrls', []);
        }
    }, [documents, documentUrls, setValue]);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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
            setValue('coverPictureUrl', '');
            setValue('coverPicture', file);
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

    const handleRemoveCoverPicture = () => {
        setValue('coverPicture', undefined);
    };

    const handleRemoveExistingCover = () => {
        setValue('coverPictureUrl', '');
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
                                    <p className="mb-2">Sélectionner les documents</p>
                                    <p className="text-lg text-gray-400">JPG, PNG, WebP, PDF</p>
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
                    <p className="text-base text-gray-600 mb-[40px] text-center w-[100%]">
                        <span className="italic">
                            indispensables pour la crédibilité du dossier et la sécurité des paiements
                        </span>{' '}
                        <span className="text-[#14385c]">
                            (Copie de pièce d’identité valide, Justificatif de domicile (facture eau/électricité,
                            quittance loyer), Relevé bancaire ou attestation RIB (si encaissement via banque).
                            Attestation mobile money (si disponible, sinon capture d’écran de compte actif)
                        </span>
                    </p>

                    <div className="space-y-2">
                        {documentUrls.length > 0 && documentUrls.map((url, index) => (
                            <div key={`existing-doc-${index}`} className="flex items-center text-green-600 my-1">
                                <BiFileEarmarkImage />
                                <span className="text-stone-950 ml-7">{url.split('/').pop()}</span>
                                <Trash
                                    className="w-10 h-8 ml-auto text-red-500 cursor-pointer"
                                    onClick={() => handleRemoveExistingDocument(index)}
                                />
                            </div>
                        ))}
                        {documents.length > 0 && documents.map((file, index) => (
                            <div key={`new-doc-${index}`} className="flex items-center text-green-600 my-1">
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
            </section>
            <section>
                <h2 className="text-2xl font-semibold text-blue-900 mb-4 mt-8">2. Photo de Profil</h2>
                <div className="px-[40px]">
                    <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 flex flex-col items-center justify-center min-h-[200px]">
                        <UploadGroup />
                        <p className="font-medium text-gray-900 mt-4 mb-2">Photo de profil</p>
                        <p className="text-lg text-gray-500 text-center mb-4">
                            Sélectionner la photo de profil ici
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
                    {(coverPictureUrl || coverPicture) && (
                        <div className="mt-4 flex items-center bg-gray-50 rounded-lg">
                            <BiFileEarmarkImage />
                            <span className="text-stone-950 ml-7">
                                {coverPicture ? coverPicture.name : coverPictureUrl.split('/').pop()}
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
            </section>
        </div>
    );
}

export default StepThreeForm;