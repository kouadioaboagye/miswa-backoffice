"use client"

import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Loading from '@/app/loading';
import { toast } from 'sonner';
import SuccessModal from '@/shared/components/ui/success-modal';
import Stepper from '@/shared/components/ui/stepper';
import { addAssetFormData, addAssetFormSchema } from '../../components/forms/assets/add-asset-form/schemas';
import StepOneForm from '../../components/forms/assets/add-asset-form/step-one-form';
import StepTwoForm from '../../components/forms/assets/add-asset-form/step-two-forn';
import StepThreeForm from '../../components/forms/assets/add-asset-form/step-three-form';
import { uploadAllFiles, uploadFile } from '@/app/api/files/upload';
import { fetchWrapper } from '@/lib/http-client/ fetchWrapper';

function mapFormDataToAPI(values: addAssetFormData): any {
    return {
        name: values.name,
        description: values.description,
        reference: values.reference,
        rooms_count: values.rooms_count,
        built_year: values.built_year,
        building_steps_level: values.building_steps_level,
        area_m2: values.area_m2,
        monthly_rent_amount: values.monthly_rent_amount,
        is_public: values.is_public,
        is_active: values.is_active,
        id_building: values.building,
        internet: values.internet,
        water: values.water,
        parking: values.parking,
    };
}

function AddAssetView() {
    const [currentStep, setCurrentStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [successModalOpen, setSuccessModalOpen] = useState(false)

    const form = useForm<addAssetFormData>({
        resolver: zodResolver(addAssetFormSchema),
        defaultValues: {
            internet: false,
            parking: false,
            water: false,
            is_public: false,
            is_active: false
        },
    });

    const getStepFields = (step: number): string[] => {
        switch (step) {
            case 1:
                return [
                    'name',
                    'building',
                    'reference',
                    'area_m2',
                    'building_steps_level',
                    'rooms_count',
                    'built_year',
                    'monthly_rent_amount',
                ];
            case 2:
                return [
                    'internet',
                    'water',
                    'parking',
                    'is_public',
                    'is_active',
                    'description',
                ];
            case 3:
                return ['documents', 'media.coverPicture', 'media.otherMedia'];
            default:
                return [];
        }
    };

    const handleNext = async () => {
        const fields = getStepFields(currentStep);
        const isValid = await form.trigger(fields as any);

        if (!isValid) {
            console.log(form.formState.errors, "form.formState.errors");
            toast.warning("Veuillez remplir tous les champs obligatoires de cette étape!");
            return;
        }

        if (currentStep < 3) {
            setCurrentStep(currentStep + 1);
        } else {
            form.handleSubmit(onSubmit)();
        }
    };

    const handlePrevious = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    const renderStep = () => {
        switch (currentStep) {
            case 1:
                return <StepOneForm form={form} />;
            case 2:
                return <StepTwoForm form={form} />;
            case 3:
                return <StepThreeForm form={form} />;
            default:
                return null;
        }
    };

    async function onSubmit(values: addAssetFormData) {
        if (!form.formState.isValid) {
            return;
        }

        setIsSubmitting(true);

        try {
            let coverUrl = values.coverUrl || '';
            let otherMediaUrls = values.otherMediaUrls || [];
            let documentUrls = values.documentUrls || []

            if (values.media.coverPicture instanceof File) {
                coverUrl = await uploadFile(values.media.coverPicture);
            }

            if (values.media.otherMedia && values.media.otherMedia.length > 0) {
                const files = values.media.otherMedia.filter((m): m is File => m instanceof File);
                const newMediaUrls = await uploadAllFiles(files);
                otherMediaUrls = [...otherMediaUrls, ...newMediaUrls];
            }

            if (values.documents && values.documents.length > 0) {
                const files = values.documents.filter((d): d is File => d instanceof File);
                const newDocumentUrls = await uploadAllFiles(files);
                documentUrls = [...documentUrls, ...newDocumentUrls];
            }

            const apiData = {
                ...mapFormDataToAPI(values),
                cover_url: coverUrl,
                photos: otherMediaUrls,
                official_documents: documentUrls,
            };

            await fetchWrapper(`properties/`, {
                method: 'POST',
                body: apiData,
            });
            setSuccessModalOpen(true);
        } catch (error) {
            toast.error(error instanceof Error ? error.message : 'Une erreur est survenue.');
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div className='p-4'>
            {isSubmitting && <Loading />}
            <SuccessModal
                isOpen={successModalOpen}
                title='Bâtiment #id_batiment crée avec succès'
                description='Votre bien #Nom_complet_du_batiment à été crée avec succès, vous pouvez consulter la liste des biens pour apporter des modifications'
                confirmText='Liste des bâtiments'
                onClose={() => setSuccessModalOpen(false)}
                onConfirm={() => console.log("liste")}
            />
            <h1 className="text-4xl font-bold text-gray-900 mb-20">Enregistrement d&apos;un nouveau bien</h1>
            <Stepper
                steps={[
                    { id: 1, title: "Informations d'identités" },
                    { id: 2, title: "Caractéristiques et Com." },
                    { id: 3, title: "Médias" },
                ]}
                currentStep={currentStep}
                onNext={handleNext}
                onPrevious={handlePrevious}
            />
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12">
                {renderStep()}
            </form>
        </div>
    )
}

export default AddAssetView
