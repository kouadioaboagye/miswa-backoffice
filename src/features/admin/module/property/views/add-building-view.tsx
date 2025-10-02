"use client"

import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Loading from '@/app/loading';
import { toast } from 'sonner';
import SuccessModal from '@/shared/components/ui/success-modal';
import { addBuildingFormData, addBuildingFormSchema } from '../components/forms/add-building-form/schemas';
import StepOneForm from '../components/forms/add-building-form/step-one-form';
import StepTwoForm from '../components/forms/add-building-form/step-two-forn';
import StepThreeForm from '../components/forms/add-building-form/step-three-form';
import Stepper from '@/shared/components/ui/stepper';

function AddPropertyView() {
    const [currentStep, setCurrentStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [successModalOpen, setSuccessModalOpen] = useState(false)

    const form = useForm<addBuildingFormData>({
        resolver: zodResolver(addBuildingFormSchema),
    });

    const handleNext = () => {
        if (currentStep < 3) {
            setCurrentStep(currentStep + 1);
        } else if (!form.formState.isValid) {
            toast.warning("Assurez vous que tous les champs obligatoires ont été renseignés!")
            form.handleSubmit(onSubmit)();
            console.log(form.getValues(), form.formState.errors)
        }
        else {
            console.log(form.getValues(), form.formState.isValid)
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

    function onSubmit(values: addBuildingFormData) {
        if (!form.formState.isValid) {
            return;
        } else {
            setIsSubmitting(true)
            setTimeout(() => {
                setIsSubmitting(false)
                setSuccessModalOpen(true)
            }, 3000)
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

export default AddPropertyView
