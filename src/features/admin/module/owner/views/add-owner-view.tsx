"use client"

import { Button } from '@/shared/components/ui/button'
import React, { useState } from 'react'
import { ArrowLeftIcon } from '../../../../../../public/assets/icons/arrow-left-icon';
import { ArrowRightIcon } from '../../../../../../public/assets/icons/arrow-right-icon';
import { useForm } from 'react-hook-form';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import StepOneForm from '@/features/admin/module/owner/components/forms/addOwner/StepOneForm';
import { addOwnerFormData, addOwnerFormSchema } from '@/features/admin/module/owner/components/forms/addOwner/schemas';
import StepTwoForm from '@/features/admin/module/owner/components/forms/addOwner/StepTwoForm';
import StepThreeForm from '@/features/admin/module/owner/components/forms/addOwner/StepThreeForm';
import Loading from '@/app/loading';
import { toast } from 'sonner';
import SuccessModal from '@/shared/components/ui/success-modal';

function AddOwnerView() {
  const [currentStep, setCurrentStep] = useState(1);
  const steps = [
    { id: 1, title: "Informations d'identités", active: true },
    { id: 2, title: "Coordonnées", active: false },
    { id: 3, title: "Documents", active: false }
  ];
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
      <div className="flex items-center mb-12">
        <div className="border flex flex-row">
          {steps.map((step, index) => (
            <div
              className={`flex items-center text-white p-6 ${step.id === currentStep ? "bg-[#1EA64A]" : ""
                }`}
              key={step.id}
            >
              <div
                className={`flex items-center justify-center w-12 h-12 rounded-full border-2 font-semibold ${step.id === currentStep
                  ? "border-white text-white"
                  : "border-gray-400 text-gray-400"
                  }`}
              >
                {step.id.toString().padStart(2, "0")}
              </div>
              <div
                className={`ml-4 font-medium ${step.id === currentStep ? "text-white" : "text-gray-500"
                  }`}
              >
                {step.title}
              </div>
            </div>
          ))}
        </div>
        <div className="ml-auto flex space-x-4 rounded-3xl bg-white p-4">
          <Button
            variant={'ghost'}
            className="h-[4.5rem] w-full shadow-[0px_8px_20px_0px_#11928F66] [&_svg]:size-8"
            leftIcon={<ArrowLeftIcon className="mr-2" />}
            onClick={handlePrevious}
            disabled={currentStep === 1}
          >
            Retour
          </Button>
          <Button
            variant={'success'}
            className="h-[4.5rem] w-full shadow-[0px_8px_20px_0px_#11928F66] [&_svg]:size-8"
            rightIcon={<ArrowRightIcon className="mr-2" />}
            onClick={handleNext}
          >
            {currentStep === 3 ? 'Sauvegarder' : 'Suivant'}
          </Button>
        </div>
      </div>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12">
        {renderStep()}
      </form>
    </div>
  )
}

export default AddOwnerView
