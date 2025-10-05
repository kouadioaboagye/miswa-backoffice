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
import { fetchWrapper } from '@/lib/http-client/ fetchWrapper';
import { useRouter } from 'next/navigation';

function AddOwnerView() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [successModalOpen, setSuccessModalOpen] = useState(false)
  const router = useRouter()

  const form = useForm<addOwnerFormData>({
    resolver: zodResolver(addOwnerFormSchema),
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
    }else {
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
          'typePersonne',
          'nom',
          'prenom',
          'dateNaissance',
          'lieuNaissance',
          'situationFamiliale',
          'typePiece',
          'numeroCNI',
          'dateExpiration',
        ];
      case 2:
        return [
          'telephonePrincipal',
          'email',
          'adresse',
          'commune',
          'quartier',
          'paysResidence',
          'profession',
          'employeur',
          'revenuMensuel',
          'modeReception',
          'banque',
          'titulaireCompte',
        ];
      case 3:
        return [
          'documents',
          'bienProprietaire',
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

  function mapFormDataToAPI(values: addOwnerFormData): any {
    return {
      name: values.nom,
      id_country: values.paysResidence,
      owner: {
        legal_name: `${values?.nom} ${values?.prenom}`,
        legal_form: values?.typePersonne,
        email: values?.email,
        phonenumber: values?.telephonePrincipal,
        birth_date: values?.dateNaissance,
        birth_place: values?.lieuNaissance,
        marital_status: values?.situationFamiliale,
        identity_card_type: values?.typePiece,
        identity_card_number: values.numeroCNI,
        identity_card_expiry_date: values.dateExpiration,
        municipality: values.commune,
        address: values.adresse,
        street: values.quartier,
        profession: values.profession,
        company_name: values.employeur,
        avg_monthly_income: values.revenuMensuel,
        official_documents: values.documents,
        payment_mode: values.modeReception,
      }
    };
  }

  async function onSubmit(values: addOwnerFormData) {
    if (!form.formState.isValid) {
      return;
    }

    setIsSubmitting(true);

    try {
      const apiData = mapFormDataToAPI(values);
      await fetchWrapper("businesses/", {
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
        title='Propriétaire #id_propriétaire créé avec succès'
        description='Le propriétaire #Nom_complet_du_propriétaire à été créé avec succès, 
          vous pouvez consulter la liste des propriétaire pour apporter des modifications'
        confirmText='Liste des proprietaire'
        onClose={() => setSuccessModalOpen(false)}
        onConfirm={() => router.push("admin/module/owner")}
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
