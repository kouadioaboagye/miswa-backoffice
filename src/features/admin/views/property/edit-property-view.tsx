"use client"

import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter, useParams } from 'next/navigation';

import Loading from '@/app/loading';
import { toast } from 'sonner';
import SuccessModal from '@/shared/components/ui/success-modal';
import { Button } from '@/shared/components/ui/button';
import { EditPropertyForm, editPropertyFormSchema } from '../../components/forms/property/edit-property-form-schema';
import { EditPropertyFormComponent } from '../../components/forms/property/edit-property-form';
import { useGetPropertyQuery, useUpdatePropertyMutation } from '@/lib/data-service/property/property.queries';

function EditPropertyView() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [successModalOpen, setSuccessModalOpen] = useState(false)
  const router = useRouter();
  const params = useParams();
  const propertyId = params.id as string;

  const form = useForm<EditPropertyForm>({
    resolver: zodResolver(editPropertyFormSchema),
    mode: 'onChange',
  });

  // Récupérer les données de la propriété
  const { data: property, isLoading, error } = useGetPropertyQuery(propertyId);
  const updatePropertyMutation = useUpdatePropertyMutation();

  // Pré-remplir le formulaire quand les données sont chargées
  useEffect(() => {
    if (property) {
      // Mapper les données de l'API vers le formulaire
      form.reset({
        name: property.name,
        description: property.description || '',
        reference: property.reference || '',
        street: property.street || '',
        address: property.address || '',
        google_plus_code: property.google_plus_code || '',
        latitude: property.latitude || 0,
        longitude: property.longitude || 0,
        rooms_count: property.rooms_count || 1,
        built_year: property.built_year || new Date().getFullYear(),
        area_m2: property.area_m2 || 0,
        monthly_rent_amount: property.monthly_rent_amount || 0,
        is_busy: property.is_busy || false,
        is_public: property.is_public || false,
        is_active: property.is_active || false,
      });
    }
  }, [property, form]);

  const onSubmit = async (data: EditPropertyForm) => {
    try {
      setIsSubmitting(true);
      
      // Préparer les données pour l'API
      const updateData = {
        name: data.name,
        description: data.description,
        reference: data.reference,
        street: data.street,
        address: data.address,
        google_plus_code: data.google_plus_code,
        latitude: data.latitude,
        longitude: data.longitude,
        rooms_count: data.rooms_count,
        built_year: data.built_year,
        area_m2: data.area_m2,
        monthly_rent_amount: data.monthly_rent_amount,
        is_busy: data.is_busy,
        is_public: data.is_public,
        is_active: data.is_active,
      };

      await updatePropertyMutation.mutateAsync({
        propertyId,
        data: updateData
      });

      toast.success('Le bien a été modifié avec succès');
      setSuccessModalOpen(true);
    } catch (error) {
      console.error('Erreur lors de la modification:', error);
      toast.error('Erreur lors de la modification du bien');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSuccessConfirm = () => {
    setSuccessModalOpen(false);
    router.push('/admin/property');
  };

  const handleSuccessClose = () => {
    setSuccessModalOpen(false);
  };

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="p-4">
        <div className="text-center py-8">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Erreur</h2>
          <p className="text-gray-600 mb-4">Impossible de charger les données du bien</p>
          <Button onClick={() => router.push('/admin/property')}>
            Retour à la liste
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className='p-4'>
      <SuccessModal
        isOpen={successModalOpen}
        title='Le bien a été modifié avec succès'
        description='Vous pouvez consulter la liste des biens pour voir les modifications'
        confirmText='Liste des biens'
        onClose={handleSuccessClose}
        onConfirm={handleSuccessConfirm}
      />
      
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Modification du Bien</h1>
      
      <EditPropertyFormComponent
        form={form}
        onSubmit={onSubmit}
        isSubmitting={isSubmitting}
      />
    </div>
  )
}

export default EditPropertyView;
