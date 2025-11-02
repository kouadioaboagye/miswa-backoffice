"use client"

import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Loading from '@/app/loading';
import { toast } from 'sonner';
import SuccessModal from '@/shared/components/ui/success-modal';
import Stepper from '@/shared/components/ui/stepper';
import { fetchWrapper } from '@/lib/http-client/ fetchWrapper';
import { useRouter } from 'next/navigation';
import { addTenantFormData, addTenantFormSchema } from '../components/forms/addTenant/schemas';
import StepOneForm from '../components/forms/addTenant/step-one-form';
import StepTwoForm from '../components/forms/addTenant/step-two-form';
import StepThreeForm from '../components/forms/addTenant/step-three-form';

function AddTenantView() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [successModalOpen, setSuccessModalOpen] = useState(false)
  const router = useRouter()

  const form = useForm<addTenantFormData>({
    resolver: zodResolver(addTenantFormSchema),
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
          'nom',
          'prenom',
          'email',
          'dateNaissance',
          'lieuNaissance',
          'situationFamiliale',
          'property_id',
          'typePiece',
          'numeroCNI',
          'dateExpiration',
        ];
      case 2:
        return [
          'telephonePrincipal',
          'adresse',
          'commune',
          'quartier',
          'paysResidence',
          'employeur',
          'adresse_employeur',
          'profession',
          'contract_type',
          'contract_start_date',
          'garant_name',
          'garant_phonenumber'
        ];
      case 3:
        return [
          'documents',
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

  function mapFormDataToAPI(values: addTenantFormData): any {
    return {
      name: values.nom,
      id_country: values.paysResidence,
      tenant: {
        legal_name: `${values?.nom} ${values?.prenom}`,
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
        official_documents: values.documents,
      }
    };
  }

  async function onSubmit(values: addTenantFormData) {
    if (!form.formState.isValid) {
      return;
    }

    setIsSubmitting(true);

    try {
      const apiData = mapFormDataToAPI(values);
      await fetchWrapper("tenants/", {
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
        title='Locataire #id_locataire créé avec succès'
        description='Le locataire #Nom_complet_du_locataire à été créé avec succès, 
          vous pouvez consulter la liste des locataires pour apporter des modifications'
        confirmText='Liste des locataires'
        onClose={() => setSuccessModalOpen(false)}
        onConfirm={() => router.push("/admin/module/tenant")}
      />
      <h1 className="text-4xl font-bold text-gray-900 mb-20">Enregistrement d&apos;un nouveau locataire</h1>
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

export default AddTenantView
