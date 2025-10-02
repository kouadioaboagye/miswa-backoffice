"use client"

import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import StepOneForm from '@/features/admin/module/owner/components/forms/addOwner/step-one-form';
import { addOwnerFormData, addOwnerFormSchema } from '@/features/admin/module/owner/components/forms/addOwner/schemas';
import StepTwoForm from '@/features/admin/module/owner/components/forms/addOwner/step-two-form';
import StepThreeForm from '@/features/admin/module/owner/components/forms/addOwner/step-three-form';
import Loading from '@/app/loading';
import { toast } from 'sonner';
import SuccessModal from '@/shared/components/ui/success-modal';
import Stepper from '@/shared/components/ui/stepper';

function AddOwnerView() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [successModalOpen, setSuccessModalOpen] = useState(false)

  const form = useForm<addOwnerFormData>({
    resolver: zodResolver(addOwnerFormSchema),
  });

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else if (!form.formState.isValid) {
      toast.warning("Assurez vous que tous les champs obligatoires ont été renseignés!")
      form.handleSubmit(onSubmit)();
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

  function onSubmit(values: addOwnerFormData) {
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
        title='Propriétaire #id_propriétaire créé avec succès'
        description='Le propriétaire #Nom_complet_du_propriétaire à été créé avec succès, 
          vous pouvez consulter la liste des propriétaire pour apporter des modifications'
        confirmText='Liste des proprietaire'
        onClose={() => setSuccessModalOpen(false)}
        onConfirm={() => console.log("liste")}
      />
      <h1 className="text-4xl font-bold text-gray-900 mb-20">Enregistrement d&apos;un nouveau propriétaire</h1>
      <Stepper
        steps={[
          { id: 1, title: "Informations d'identités" },
          { id: 2, title: "Coordonnées" },
          { id: 3, title: "Documents" }
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

export default AddOwnerView
