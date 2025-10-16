"use client"

import { Button } from '@/shared/components/ui/button'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';

import Loading from '@/app/loading';
import { toast } from 'sonner';
import SuccessModal from '@/shared/components/ui/success-modal';
import { ArrowRightIcon } from '../../../../../public/assets/icons/arrow-right-icon';
import { ArrowLeftIcon } from '../../../../../public/assets/icons/arrow-left-icon';
import { AddPropertyForm, addPropertyFormSchema } from '../../components/forms/property/forms/steps/schemas';
import StepOneForm from '../../components/forms/property/forms/steps/step-one-form';
import StepTwoForm from '../../components/forms/property/forms/steps/step-two-form';
import StepThreeForm from '../../components/forms/property/forms/steps/step-three-form';
import { getAuthToken } from '@/lib/auth/utils';

function AddPropertyView() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [successModalOpen, setSuccessModalOpen] = useState(false)
  const router = useRouter();

  const steps = [
    { id: 1, title: "Informations générales", active: true },
    { id: 2, title: "Caractériques et Com.", active: false },
    { id: 3, title: "Médias", active: false }
  ];

  const form = useForm<AddPropertyForm>({
    resolver: zodResolver(addPropertyFormSchema),
    mode: 'onChange',
  });

  const handleNext = async () => {
    const fields = getStepFields(currentStep);
    const isValid = await form.trigger(fields);
    
    console.log('Validation step', currentStep, 'fields:', fields, 'isValid:', isValid);
    
    if (!isValid) {
      toast.warning("Veuillez remplir tous les champs obligatoires de cette étape!");
      return;
    }

    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      await form.handleSubmit(onSubmit)();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const getStepFields = (step: number): (keyof AddPropertyForm)[] => {
    switch (step) {
      case 1:
        return ['typebatiment', 'nom', 'price', 'proprietaire', 'ville', 'quartier', 'adresse'];
      case 2:
        return ['annee', 'superficie', 'rooms_count', 'description'];
      case 3:
        return []; // Aucune validation pour l'étape 3
      default:
        return [];
    }
  };

  // Fonction pour uploader un fichier via l'API
  // Dans AddPropertyView
const uploadFile = async (file: File): Promise<string> => {
  const token = getAuthToken();
  
  if (!token) {
    throw new Error('Token d\'authentification non trouvé');
  }

  const formData = new FormData();
  formData.append('file', file);

  try {
    // Utiliser notre route API locale
    const response = await fetch('/api/files', {
      method: 'POST',
      headers: {
        'Authorization': `${token}`,
        // Ne pas mettre Content-Type pour FormData
      },
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(errorData?.error || `Erreur upload: ${response.status}`);
    }

    const result = await response.json();
    
    if (result.success && result.url) {
      return result.url;
    } else {
      throw new Error('Format de réponse invalide');
    }
  } catch (error) {
    console.error('Erreur lors de l\'upload:', error);
    throw error;
  }
};

  // Fonction pour uploader tous les fichiers
  const uploadAllFiles = async (files: File[]): Promise<string[]> => {
    if (!files || files.length === 0) return [];

    const uploadPromises = files.map(async (file) => {
      try {
        const fileUrl = await uploadFile(file);
        toast.success(`Fichier "${file.name}" uploadé avec succès`);
        return fileUrl;
      } catch (error) {
        console.error(`Échec upload ${file.name}:`, error);
        toast.error(`Échec de l'upload de ${file.name}`);
        throw error; // Propager l'erreur pour arrêter le processus
      }
    });

    return await Promise.all(uploadPromises);
  };

  async function onSubmit(values: AddPropertyForm) {
     console.log('Données du formulaire à la soumission:', values);
  setIsSubmitting(true);
   try {
    // VÉRIFICATION CRITIQUE AVANT SOUMISSION
    console.log('Valeurs du formulaire avant soumission:', values);
    
    if (!values.proprietaire || values.proprietaire.trim() === '') {
      throw new Error('Le propriétaire est obligatoire. Veuillez sélectionner un propriétaire.');
    }

    if (!values.typebatiment || values.typebatiment.trim() === '') {
      throw new Error('Le type de bâtiment est obligatoire.');
    }

    if (!values.ville || values.ville.trim() === '') {
      throw new Error('La ville est obligatoire.');
    }
    

    console.log('Données du formulaire:', values);
    
    // Étape 1: Upload des fichiers
    toast.info('Début de l\'upload des fichiers...');
    
    const documentUrls = await uploadAllFiles(values.documents || []);
    const mediaUrls = await uploadAllFiles(values.media || []);
    
    toast.success('Tous les fichiers ont été uploadés avec succès');

    // Étape 2: Préparer les données pour l'API properties
    const apiData = mapFormDataToAPI(values, documentUrls, mediaUrls);

    console.log('Données pour l\'API:', apiData);

    const token = getAuthToken();
      
    if (!token) {
      throw new Error('Token d\'authentification non trouvé. Veuillez vous reconnecter.');
    }

    // Étape 3: Envoyer les données de la propriété
    const response = await fetch('/api/properties', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${token}`,
      },
      body: JSON.stringify(apiData),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(errorData?.message || `Erreur HTTP! statut: ${response.status}`);
    }

    const result = await response.json();
    setSuccessModalOpen(true);
    
  } catch (error) {
    console.error('Error creating property:', error);
    toast.error(error instanceof Error ? error.message : 'Erreur lors de la création de la propriété');
  } finally {
    setIsSubmitting(false);
  }
}

// Fonction modifiée pour accepter les URLs uploadées
function mapFormDataToAPI(values: AddPropertyForm, documentUrls: string[], mediaUrls: string[]): any {
  console.log("Proprietaire ID:", values.proprietaire);
  console.log("Type batiment ID:", values.typebatiment);

  return {
    name: `${values.nom}`.trim(),
    reference: `miswa-${Date.now()}`,
    description: `${values.description}`,
    cover_url: mediaUrls[0] || "", // Première image comme couverture
    photos: mediaUrls, // Toutes les URLs des médias
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
    rooms_count: Number(values.rooms_count) || 0,
    official_documents: documentUrls, // URLs des documents
    features: values.equipements,
    id_business: values.proprietaire, // S'assurer que cette valeur est définie
    id_building: values.typebatiment, // S'assurer que cette valeur est définie
  };
}

  
  const handleSuccessConfirm = () => {
    setSuccessModalOpen(false);
    router.push('/admin/property');
  };

  const handleSuccessClose = () => {
    setSuccessModalOpen(false);
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

  return (
    <div className='p-4'>
      <SuccessModal
        isOpen={successModalOpen}
        title='Le bien a été ajouté avec succès'
        description='Vous pouvez consulter la liste des biens pour apporter des modifications'
        confirmText='Liste des biens'
        onClose={handleSuccessClose}
        onConfirm={handleSuccessConfirm}
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
            {currentStep === 3 ? (isSubmitting ? 'Upload...' : 'Sauvegarder') : 'Suivant'}
          </Button>
        </div>
      </div>
      
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12">
        {renderStep()}
      </form>
    </div>
  )
}

export default AddPropertyView;