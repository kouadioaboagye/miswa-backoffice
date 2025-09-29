import React from 'react'
import { Controller, useForm } from 'react-hook-form';
import { Label } from '@/shared/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/components/ui/select';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import { Plus, Trash } from 'lucide-react';
import InputErrorMessage from '@/shared/components/ui/input-error-message';
import { UploadGroup } from '../../../../../../../../public/assets/icons/upload-group';
import { BiFileEarmarkImage } from '../../../../../../../../public/assets/icons/bi_file-earmark-image';
import { ValidatePaymentFormData } from './schemas';

type AddPaymentFormProps = {
    onClose: () => void,
}

function ValidatePaymentForm({ onClose }: Readonly<AddPaymentFormProps>) {
    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = useForm<ValidatePaymentFormData>();

    const files = watch('files') || [];

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const docs = event.target.files;
        if (docs) {
            const currentFiles = files || [];
            const newFiles = Array.from(docs);
            setValue('files', [...currentFiles, ...newFiles]);
            event.target.value = '';
        }
    };

    const handleRemoveFile = (index: number) => {
        const currentFiles = files || [];
        const updatedFiles = currentFiles.filter((_, i) => i !== index);
        setValue('files', updatedFiles);
    };

    const onSubmit = (data: ValidatePaymentFormData) => {
        console.log(data)
    };

    return (
        <div className='w-full'>
            <div className='mb-6'>
                <p className='font-bold'>Valider un paiement pour le propriétaire</p>
                <p>Remplissez le formulaire pour initier le paiement</p>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="paymentType">Type de paiement</Label>
                    <Input
                        id="paymentType"
                        {...register("paymentType")}
                        placeholder="Facture"
                        disabled
                    />
                    <InputErrorMessage message={errors.paymentType?.message} />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="property">Biens</Label>
                    <Input
                        id="property"
                        {...register("property")}
                        disabled
                    />
                    <InputErrorMessage message={errors.property?.message} />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="note">Note</Label>
                    <textarea
                        id="note"
                        rows={3}
                        {...register("note")}
                        placeholder="Enter your note"
                        className="w-full  rounded-xl border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-[#0E4D79]"
                    />
                    <InputErrorMessage message={errors.note?.message} />
                </div>
                <div className="flex justify-between items-center border-dashed border-2 border-gray-300 p-20 h-[110px] rounded-xl mb-4 text-center">
                    <UploadGroup className="mr-2" />
                    <div className='flex flex-1 ml-[30%] items-center mr-'>
                        <label htmlFor="documentUpload" className="cursor-pointer">
                            <div className='flex flex-col items-start'>
                                <p className="mb-2">Sélectionner les factures</p>
                                <p className="text-lg text-gray-400">CNI, PASSPORT...</p>
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
                            variant="outline_success"
                            className="mt-4 ml-[15%]"
                            onClick={() => document.getElementById('documentUpload')?.click()}
                        >
                            DOCUMENTS
                        </Button>
                    </div>
                </div>
                <div className="space-y-2 space-y-2 max-h-40 h-40 overflow-y-auto">
                    {files.length > 0 &&
                        files.map((file, index) => (
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
                <div className="flex justify-center gap-4 ">
                    <Button
                        type="button"
                        variant="outline_header"
                        className="w-1/2 rounded-lg h-[45px]"
                        onClick={() => onClose()}
                    >
                        Retour
                    </Button>
                    <Button
                        type="submit"
                        variant="success"
                        className="w-1/2 rounded-lg h-[45px]"
                    >
                        Initier le paiement
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default ValidatePaymentForm