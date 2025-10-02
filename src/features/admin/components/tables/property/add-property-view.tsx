"use client"

import { Button } from '@/shared/components/ui/button'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

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
  const steps = [
    { id: 1, title: "Informations générales", active: true },
    { id: 2, title: "Caractériques et Com.", active: false },
    { id: 3, title: "Médias", active: false }
  ];
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [successModalOpen, setSuccessModalOpen] = useState(false)


  const form = useForm<AddPropertyForm>({
    resolver: zodResolver(addPropertyFormSchema),
  //  defaultValues: {
  //   ascenseur: false,
  //   parking: false,
  //   climatisation: false,
  //   chauffage: false,
  //   internet: false,
  //   garde: false,
  //   piscine: false,
  //   salleSport: false,
  //   jardin: false,
  //   terrasse: false,
  //   buanderie: false,
  //   camera: false,
    
  // },
  });
 

  const handleNext = async () => {
    // Valider les champs de l'étape actuelle avant de passer à la suivante
    const fields = getStepFields(currentStep);
    const isValid = await form.trigger(fields as any);
    
    if (!isValid) {
      toast.warning("Veuillez remplir tous les champs obligatoires de cette étape!");
      return;
    }

    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      // Dernière étape - soumettre le formulaire
      form.handleSubmit(onSubmit)();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Fonction pour déterminer quels champs valider à chaque étape
  const getStepFields = (step: number): string[] => {
    switch (step) {
      case 1:
        return ['proprietaire', 'typePersonne', 'nom', 'prenom', 'nbetage'];
      case 2:
        return ['ville', 'adresse', 'typebatiment', 'quartier'];
      case 3:
        return []; // Étape 3 peut ne pas avoir de champs obligatoires
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
  return {
    name: `${values.typebatiment} - ${values.nom}`,
    reference: `miswa-${Date.now()}`,
    description: "",
    cover_url: "",
    photos: [],
    videos: [],
    google_plus_code: "",
    address: `${values.adresse}, ${values.ville}`,
    latitude: 0,
    longitude: 0,
    street: values.adresse,
    is_public: true,
    is_busy: false,
    busy_until: null,
    monthly_rent_amount: 0,
    built_year: new Date().getFullYear(),
    area_m2: Number(values.superficie) || 0,
    building_steps_level: Number(values.nbetage) || 0,
    official_documents: [],
    features: values.equipements ? values.equipements.map(String) : [], // suppose que equipements sont des numbers en string
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

  return (
    <div className='p-4'>
      {/* {isSubmitting && <Loading />} */}
      <SuccessModal
        isOpen={successModalOpen}
        title='Propriétaire #id_propriétaire créé avec succès'
        description='Le propriétaire #Nom_complet_du_propriétaire à été créé avec succès, 
          vous pouvez consulter la liste des propriétaire pour apporter des modifications'
        confirmText='Liste des proprietaire'
        onClose={() => setSuccessModalOpen(false)}
        onConfirm={() => console.log("liste")}
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