"use client"

import { Button } from '@/shared/components/ui/button'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation'; // ← Import important

import Loading from '@/app/loading';
import { toast } from 'sonner';
import SuccessModal from '@/shared/components/ui/success-modal';
import { ArrowRightIcon } from '../../../../../../public/assets/icons/arrow-right-icon';
import { ArrowLeftIcon } from '../../../../../../public/assets/icons/arrow-left-icon';
import { AddPropertyForm, addPropertyFormSchema } from './forms/addOwner/schemas';
import StepOneForm from './forms/addOwner/step-one-form';
import StepTwoForm from './forms/addOwner/step-two-form';
import StepThreeForm from './forms/addOwner/step-three-form';
import { getAuthToken } from '@/lib/auth/utils';

function AddPropertyView() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [successModalOpen, setSuccessModalOpen] = useState(false)
  const router = useRouter(); // ← Initialisation du router

  const steps = [
    { id: 1, title: "Informations générales", active: true },
    { id: 2, title: "Caractériques et Com.", active: false },
    { id: 3, title: "Médias", active: false }
  ];

  const form = useForm<AddPropertyForm>({
    resolver: zodResolver(addPropertyFormSchema),
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
        return ['proprietaire', 'typePersonne', 'nom', 'prenom', 'nbetage'];
      case 2:
        return ['ville', 'adresse', 'typebatiment', 'quartier'];
      case 3:
        return [];
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

  function mapFormDataToAPI(values: AddPropertyForm): any {
    const featureMapping: { [key: string]: number } = {
      "ascenseur": 1,
      "parking": 2,
    };

    const photosUrls = values.documents ? 
      values.documents.map(doc => 
        doc instanceof File ? URL.createObjectURL(doc) : String(doc)
      ) : [];

    return {
      name: `${values.typebatiment} - ${values.nom}`.trim(),
      reference: `miswa-${Date.now()}`,
      description: `${values.description}`,
      cover_url: photosUrls[0] || "",
      photos: photosUrls,
      videos: [],
      google_plus_code: "",
      address: `${values.adresse}, ${values.ville}`.trim(),
      latitude: 5.3599517,
      longitude: -4.0082563,
      street: values.adresse || "",
      is_public: true,
      is_busy: false,
      busy_until: null,
      monthly_rent_amount: `${values.price} `,
      built_year: values.annee ? parseInt(values.annee) : new Date().getFullYear(),
      area_m2: Number(values.superficie) || 0,
      building_steps_level: Number(values.nbetage) || 0,
      official_documents: [],
      features: values.equipements ? 
        values.equipements
          .map(feature => featureMapping[feature])
          .filter(id => id !== undefined) : [],
      id_business: 1,
      id_building: 2,
    };
  }

  async function onSubmit(values: AddPropertyForm) {
    setIsSubmitting(true);
    try {
      const apiData = mapFormDataToAPI(values);
      const token = getAuthToken();
        
      if (!token) {
        throw new Error('Token d\'authentification non trouvé. Veuillez vous reconnecter.');
      }

      const response = await fetch('/api/properties', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${token}`,
        },
        body: JSON.stringify(apiData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log('Property created:', result);
      setSuccessModalOpen(true);
    } catch (error) {
      console.error('Error creating property:', error);
      toast.error('Erreur lors de la création de la propriété');
    } finally {
      setIsSubmitting(false);
    }
  }

  // Fonction pour gérer la confirmation du modal
  const handleSuccessConfirm = () => {
    setSuccessModalOpen(false);
    router.push('/admin/property'); // ← Redirection vers la liste des biens
  };

  // Fonction pour gérer la fermeture du modal
  const handleSuccessClose = () => {
    setSuccessModalOpen(false);
    // Optionnel: Vous pouvez aussi rediriger ou laisser l'utilisateur rester sur la page
    // router.push('/admin/property');
  };

  return (
    <div className='p-4'>
      <SuccessModal
        isOpen={successModalOpen}
        title='Le bien a été ajouté avec succès'
        description='Vous pouvez consulter la liste des biens pour apporter des modifications'
        confirmText='Liste des biens'
        onClose={handleSuccessClose} // ← Utilisation de la fonction de fermeture
        onConfirm={handleSuccessConfirm} // ← Utilisation de la fonction de confirmation
      />
      
      <h1 className="text-4xl font-bold text-gray-900 mb-20">Enregistrement d&apos;un nouveau Bien</h1>
      
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
            type="button"
            variant={'ghost'}
            className="h-[4.5rem] w-full shadow-[0px_8px_20px_0px_#11928F66] [&_svg]:size-8"
            leftIcon={<ArrowLeftIcon className="mr-2" />}
            onClick={handlePrevious}
            disabled={currentStep === 1}
          >
            Retour
          </Button>
          <Button
            type="button"
            variant={'success'}
            className="h-[4.5rem] w-full shadow-[0px_8px_20px_0px_#11928F66] [&_svg]:size-8"
            rightIcon={<ArrowRightIcon className="mr-2" />}
            onClick={handleNext}
            disabled={isSubmitting}
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

export default AddPropertyView