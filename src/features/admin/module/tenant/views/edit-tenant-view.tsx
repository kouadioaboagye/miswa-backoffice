"use client";

import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import Loading from '@/app/loading';
import SuccessModal from '@/shared/components/ui/success-modal';
import Stepper from '@/shared/components/ui/stepper';
import StepOneForm from '@/features/admin/module/tenant/components/forms/addTenant/step-one-form';
import StepTwoForm from '@/features/admin/module/tenant/components/forms/addTenant/step-two-form';
import StepThreeForm from '@/features/admin/module/tenant/components/forms/addTenant/step-three-form';
import { addTenantFormData, addTenantFormSchema } from '@/features/admin/module/tenant/components/forms/addTenant/schemas';
import { useGetTenantByIdQuery } from '@/lib/data-service/module/tenant/tenant.queries';
import { fetchWrapper } from '@/lib/http-client/ fetchWrapper';

interface EditTenantViewProps {
  idTenant: string;
}

function EditTenantView({ idTenant }: Readonly<EditTenantViewProps>) {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const router = useRouter();

  const { data, isLoading, error } = useGetTenantByIdQuery(idTenant);

  const form = useForm<addTenantFormData>({
    resolver: zodResolver(addTenantFormSchema),
    defaultValues: {
      nom: '',
      prenom: '',
      email: '',
      dateNaissance: '',
      lieuNaissance: '',
      situationFamiliale: '',
      property_id: '',
      typePiece: '',
      numeroCNI: '',
      dateExpiration: '',
      telephonePrincipal: '',
      adresse: '',
      commune: '',
      quartier: '',
      paysResidence: '',
      employeur: '',
      adresse_employeur: '',
      profession: '',
      contract_type: '',
      contract_start_date: '',
      garant_name: '',
      garant_phonenumber: '',
      documents: [],
    },
  });

  useEffect(() => {
    if (data) {
      form.reset({
        nom: data?.firstname || '',
        prenom: data?.lastname || '',
        email: data?.email || '',
        dateNaissance: data?.birthdate || '',
        lieuNaissance: data?.birth_place || '',
        situationFamiliale: data?.marital_status || '',
        property_id: data.property.id || '',
        typePiece: data?.identity_card_type || '',
        numeroCNI: data?.identity_card_number || '',
        dateExpiration: data?.identity_card_expiry_date || '',
        telephonePrincipal: data?.phonenumber || '',
        adresse: data?.address || '',
        commune: data?.municipality || '',
        quartier: data?.street || '',
        paysResidence: data.country || '',
        employeur: data?.company_name || '',
        adresse_employeur: data?.campany_address || '',
        profession: data?.profession || '',
        contract_type: data?.contract_type || '',
        contract_start_date: data?.contract_start_date || '',
        garant_name: data?.garant_name || '',
        garant_phonenumber: data?.garant_phonenumber || '',
        documents: [],
      });
    }
  }, [data, form]);

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
        return ['documents'];
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
        legal_name: `${values.nom} ${values.prenom}`.trim(),
        email: values.email,
        phonenumber: values.telephonePrincipal,
        birth_date: values.dateNaissance,
        birth_place: values.lieuNaissance,
        marital_status: values.situationFamiliale,
        identity_card_type: values.typePiece,
        identity_card_number: values.numeroCNI,
        identity_card_expiry_date: values.dateExpiration,
        municipality: values.commune,
        address: values.adresse,
        street: values.quartier,
        profession: values.profession,
        company_name: values.employeur,
        adresse_employeur: values.adresse_employeur,
        contract_type: values.contract_type,
        contract_start_date: values.contract_start_date,
        garant_name: values.garant_name,
        garant_phonenumber: values.garant_phonenumber,
        official_documents: values.documents,
      },
      property_id: values.property_id,
    };
  }

  async function onSubmit(values: addTenantFormData) {
    if (!form.formState.isValid) {
      return;
    }

    setIsSubmitting(true);

    try {
      const apiData = mapFormDataToAPI(values);
      await fetchWrapper(`tenants/${idTenant}/`, {
        method: 'PUT',
        body: apiData,
      });
      setSuccessModalOpen(true);
    } catch (error: any) {
      if (error?.detail?.code && error?.detail?.label_fr) {
        toast.error(error.detail.label_fr);
      } else {
        toast.error(error instanceof Error ? error.message : 'Une erreur est survenue lors de la mise à jour.');
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isLoading) return <Loading />;
  if (error) {
    toast.error(error instanceof Error ? error.message : 'Erreur lors du chargement des données du locataire.');
    return <Loading />;
  }
  if (!data) return <Loading />;

  return (
    <div className="p-4">
      {isSubmitting && <Loading />}
      <SuccessModal
        isOpen={successModalOpen}
        title={`Locataire #${idTenant} mis à jour avec succès`}
        description={`Le locataire ${data.firstname} ${data.lastname} a été mis à jour avec succès.`}
        confirmText="Liste des locataires"
        onClose={() => setSuccessModalOpen(false)}
        onConfirm={() => router.push('/admin/module/tenant')}
      />
      <h1 className="text-4xl font-bold text-gray-900 mb-20">Modifier le locataire</h1>
      <Stepper
        steps={[
          { id: 1, title: "Informations d'identités" },
          { id: 2, title: "Coordonnées" },
          { id: 3, title: "Documents" },
        ]}
        currentStep={currentStep}
        onNext={handleNext}
        onPrevious={handlePrevious}
      />
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12">
        {renderStep()}
      </form>
    </div>
  );
}

export default EditTenantView;