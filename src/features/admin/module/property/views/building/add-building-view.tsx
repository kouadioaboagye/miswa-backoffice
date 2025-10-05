"use client"

import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Loading from '@/app/loading';
import { toast } from 'sonner';
import SuccessModal from '@/shared/components/ui/success-modal';
import { addBuildingFormData, addBuildingFormSchema } from '../../components/forms/add-building-form/schemas';
import StepOneForm from '../../components/forms/add-building-form/step-one-form';
import StepTwoForm from '../../components/forms/add-building-form/step-two-forn';
import StepThreeForm from '../../components/forms/add-building-form/step-three-form';
import Stepper from '@/shared/components/ui/stepper';
import { fetchWrapper } from '@/lib/http-client/ fetchWrapper';
import { useRouter } from 'next/navigation';

function AddBuildingView() {
    const [currentStep, setCurrentStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [successModalOpen, setSuccessModalOpen] = useState(false)
    const router = useRouter()

    const form = useForm<addBuildingFormData>({
        resolver: zodResolver(addBuildingFormSchema),
        defaultValues: {
            elevator: false,
            internet: false,
            water: false,
            parking: { available: false, amount: 0 },
            security: { available: false, amount: 0 },
            commonSpaces: { available: false, amount: 0 },
            documents: [],
            media: { coverPicture: undefined, otherMedia: [] },
        },
    });

    const handleNext = async () => {
        const fields = getStepFields(currentStep);
        const isValid = await form.trigger(fields as any);

        if (!isValid) {
            toast.warning("Veuillez remplir tous les champs obligatoires de cette étape!");
            return;
        }

        if (currentStep < 3) {
            setCurrentStep(currentStep + 1);
        } else {
            console.log(form.getValues(), form.formState.isValid)
            form.handleSubmit(onSubmit)();
        }
    };

    const handlePrevious = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };
    const getStepFields = (step: number): string[] => {
        switch (step) {
            case 1:
                return [
                    'nomBatiment',
                    'typeBatiment',
                    'adresse',
                    'quartier',
                    'municipality',
                    'business'
                ];
            case 2:
                return [
                    'totalUnit',
                    'buildingYear',
                    'landSurface',
                    'floorNumber',
                    'elevator',
                    'internet',
                    'water',
                    'parking.available',
                    'parking.amount',
                    'security.available',
                    'security.amount',
                    'commonSpaces.available',
                    'commonSpaces.amount',
                    'description',
                ];
            case 3:
                return [
                    'documents',
                    'media.coverPicture',
                    'media.otherMedia',
                ];
            default:
                return [];
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

    function mapFormDataToAPI(values: addBuildingFormData): any {
        return {
            name: values.nomBatiment,
            description: values.description,
            cover_url: values.media?.coverPicture,
            photos: values.media?.otherMedia,
            is_public: true,
            street: values.quartier,
            address: values.adresse,
            id_business: values.business,
            id_municipality: values.municipality,
        };
    }

    async function onSubmit(values: addBuildingFormData) {
        if (!form.formState.isValid) {
            return;
        }

        setIsSubmitting(true);

        try {
            const apiData = mapFormDataToAPI(values);
            await fetchWrapper("buildings/", {
                method: "POST",
                body: apiData
            })
            setSuccessModalOpen(true);
            form.reset()
        } catch (error) {
            toast.error(error instanceof Error ? error.message : 'Une erreur est survenue lors de la soumission.');
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
                onConfirm={() => router.push("/admin/module/property/building")}
            />
            <h1 className="text-4xl font-bold text-gray-900 mb-20">Enregistrement d&apos;un nouveau bâtiment</h1>
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

export default AddBuildingView
