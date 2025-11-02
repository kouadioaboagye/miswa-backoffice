"use client";

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import Loading from '@/app/loading';
import SuccessModal from '@/shared/components/ui/success-modal';
import Stepper from '@/shared/components/ui/stepper';
import StepOneForm from '@/features/admin/module/owner/components/forms/addOwner/step-one-form';
import StepTwoForm from '@/features/admin/module/owner/components/forms/addOwner/step-two-form';
import StepThreeForm from '@/features/admin/module/owner/components/forms/addOwner/step-three-form';
import { addOwnerFormData, addOwnerFormSchema } from '@/features/admin/module/owner/components/forms/addOwner/schemas';
import { useGetOwnerByIdQuery } from '@/lib/data-service/module/owner/owner.queries';
import { formatDateForInput } from '@/shared/lib/helpers/iso-format';
import { uploadAllFiles, uploadFile } from '@/app/api/files/upload';
import { fetchWrapper } from '@/lib/http-client/ fetchWrapper';

interface EditOwnerViewProps {
  idOwner: string;
}

function EditOwnerView({ idOwner }: Readonly<EditOwnerViewProps>) {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const router = useRouter();

  const { data, isLoading, error } = useGetOwnerByIdQuery(idOwner);

  const form = useForm<addOwnerFormData>({
    resolver: zodResolver(addOwnerFormSchema),
    defaultValues: {
      typePersonne: '',
      nom: '',
      prenom: '',
      dateNaissance: '',
      lieuNaissance: '',
      situationFamiliale: '',
      bienProprietaire: '',
      typePiece: '',
      identity_card_number: '',
      dateExpiration: '',
      telephonePrincipal: '',
      email: '',
      adresse: '',
      commune: '',
      quartier: '',
      paysResidence: '',
      profession: '',
      employeur: '',
      revenuMensuel: 1,
      modeReception: '',
      banque: '',
      titulaireCompte: '',
      documents: [],
      documentUrls: [],
      coverPicture: undefined,
      coverPictureUrl: '',
    },
  });

  useEffect(() => {
    if (data) {
      const [_, ...prenomParts] = data.owner?.legal_name ? data.owner.legal_name.split(' ') : [''];
      const prenom = prenomParts.join(' ') || '';
      const owner = data.owner;

      form.reset({
        typePersonne: owner?.legal_form || '',
        nom: data?.name || '',
        prenom: prenom || '',
        dateNaissance: formatDateForInput(owner?.birth_date || ''),
        lieuNaissance: owner?.birth_place || '',
        situationFamiliale: owner?.marital_status || '',
        bienProprietaire: '',
        typePiece: owner?.identity_card_type || '',
        identity_card_number: owner?.identity_card_number || '',
        dateExpiration: formatDateForInput(owner?.identity_card_expiry_date || ''),
        telephonePrincipal: owner?.phonenumber || '',
        email: owner?.email || '',
        adresse: owner?.address || '',
        commune: owner?.municipality || '',
        quartier: owner?.street || '',
        paysResidence: '1',
        profession: owner?.profession || '',
        employeur: owner?.company_name || '',
        revenuMensuel: owner?.avg_monthly_income || 1,
        modeReception: owner?.payment_mode || '',
        banque: '',
        titulaireCompte: '',
        documents: [],
        documentUrls: data?.document_urls || [],
        coverPicture: undefined,
        coverPictureUrl: data?.cover_url || '',
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
          'typePersonne',
          'nom',
          'prenom',
          'dateNaissance',
          'lieuNaissance',
          'situationFamiliale',
          'typePiece',
          'identity_card_number',
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
        return ['documents', 'documentUrls', 'bienProprietaire', 'coverPicture', 'coverPictureUrl'];
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
      legal_name: `${values.nom} ${values.prenom}`.trim(),
      legal_form: values.typePersonne,
      email: values.email,
      phonenumber: values.telephonePrincipal,
      birth_date: values.dateNaissance,
      birth_place: values.lieuNaissance,
      marital_status: values.situationFamiliale,
      identity_card_type: values.typePiece,
      identity_card_number: values.identity_card_number,
      identity_card_expiry_date: values.dateExpiration,
      municipality: values.commune,
      address: values.adresse,
      street: values.quartier,
      profession: values.profession,
      company_name: values.employeur,
      avg_monthly_income: values.revenuMensuel,
      payment_mode: values.modeReception,
      official_documents: values.documentUrls,
      profile_picture: values.coverPictureUrl,
    };
  }

  async function onSubmit(values: addOwnerFormData) {
    if (!form.formState.isValid) {
      return;
    }

    setIsSubmitting(true);

    try {
      let documentUrls = values.documentUrls || [];
      let coverPictureUrl = values.coverPictureUrl || '';

      if (values.documents && values.documents.length > 0) {
        const files = values.documents.filter((d): d is File => d instanceof File);
        const newDocumentUrls = await uploadAllFiles(files);
        documentUrls = [...documentUrls, ...newDocumentUrls];
      }

      if (values.coverPicture instanceof File) {
        coverPictureUrl = await uploadFile(values.coverPicture);
      }

      const apiData = {
        ...mapFormDataToAPI(values),
        documents: documentUrls,
        cover_url: coverPictureUrl,
      };

      await fetchWrapper(`business-owners/${idOwner}/`, {
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
    toast.error(error instanceof Error ? error.message : 'Erreur lors du chargement des données du propriétaire.');
    return <Loading />;
  }
  if (!data) return <Loading />;

  return (
    <div className="p-4">
      {isSubmitting && <Loading />}
      <SuccessModal
        isOpen={successModalOpen}
        title={`Propriétaire #${idOwner} mis à jour avec succès`}
        description={`Le propriétaire ${data.owner?.legal_name || data.name} a été mis à jour avec succès.`}
        confirmText="Liste des propriétaires"
        onClose={() => setSuccessModalOpen(false)}
        onConfirm={() => router.push('/admin/module/owner')}
      />
      <h1 className="text-4xl font-bold text-gray-900 mb-20">Modifier le propriétaire</h1>
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

export default EditOwnerView;