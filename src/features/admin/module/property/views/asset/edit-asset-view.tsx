"use client";

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter, useParams } from 'next/navigation';
import { toast } from 'sonner';
import Loading from '@/app/loading';
import SuccessModal from '@/shared/components/ui/success-modal';
import Stepper from '@/shared/components/ui/stepper';
import StepOneForm from '../../components/forms/assets/add-asset-form/step-one-form';
import StepTwoForm from '../../components/forms/assets/add-asset-form/step-two-forn';
import StepThreeForm from '../../components/forms/assets/add-asset-form/step-three-form';
import { addAssetFormData, addAssetFormSchema } from '../../components/forms/assets/add-asset-form/schemas';
import { useGetPropertyQuery, useUpdatePropertyMutation } from '@/lib/data-service/property/property.queries';
import { uploadAllFiles, uploadFile } from '@/app/api/files/upload';

function EditAssetView() {
    const [currentStep, setCurrentStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [successModalOpen, setSuccessModalOpen] = useState(false);
    const router = useRouter();
    const params = useParams();
    const idAsset = params.id as string;
    const { data: property, isLoading, error } = useGetPropertyQuery(idAsset);
    const updatePropertyMutation = useUpdatePropertyMutation();

    const form = useForm<addAssetFormData>({
        resolver: zodResolver(addAssetFormSchema),
        defaultValues: {
            name: '',
            description: '',
            reference: '',
            rooms_count: 1,
            // built_year: new Date().getFullYear(),
            building_steps_level: 0,
            area_m2: 0,
            monthly_rent_amount: 0,
            is_public: false,
            is_active: false,
            building: '',
            documents: [],
            media: { coverPicture: undefined, otherMedia: [] },
            coverUrl: '',
            otherMediaUrls: [],
            documentUrls: [],
            longitude: 0,
            latitude: 0,
            features: [],
        },
    });

    useEffect(() => {
        if (property) {
            form.reset({
                name: property.name || '',
                description: property.description || '',
                reference: property.reference || '',
                rooms_count: property.rooms_count || 1,
                // built_year: property.built_year || new Date().getFullYear(),
                building_steps_level: property.building_steps_level || 0,
                area_m2: property.area_m2 || 0,
                monthly_rent_amount: property.monthly_rent_amount || 0,
                is_public: property.is_public || false,
                is_active: property.is_active || false,
                building: property?.building?.id?.toString() || '',
                features: property.features?.map((feature) => feature.id) || [],
                documents: [],
                media: { coverPicture: undefined, otherMedia: [] },
                coverUrl: property.cover_url || '',
                otherMediaUrls: property.photos || [],
                documentUrls: property.official_documents || [],
                longitude: property.longitude || 0,
                latitude: property.latitude || 0
            });
        }
    }, [property, form]);

    const handleNext = async () => {
        const fields = getStepFields(currentStep);
        const isValid = await form.trigger(fields as any);

        if (!isValid) {
            console.log(form.formState.errors, "form.formState.errors");
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
                    'name',
                    'building',
                    'reference',
                    'area_m2',
                    'building_steps_level',
                    'rooms_count',
                    'built_year',
                    'monthly_rent_amount',
                ];
            case 2:
                return [
                    'internet',
                    'water',
                    'parking',
                    'is_public',
                    'is_active',
                    'description',
                ];
            case 3:
                return ['documents', 'media.coverPicture', 'media.otherMedia'];
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

    function mapFormDataToAPI(values: addAssetFormData): any {
        return {
            name: values.name,
            description: values.description,
            reference: values.reference,
            rooms_count: values.rooms_count,
            // built_year: values.built_year,
            building_steps_level: values.building_steps_level,
            area_m2: values.area_m2,
            monthly_rent_amount: values.monthly_rent_amount,
            is_public: values.is_public,
            is_active: values.is_active,
            id_building: values.building,
            longitude: values.longitude,
            latitude: values.latitude,
            features: values.features,
        };
    }

    async function onSubmit(values: addAssetFormData) {
        if (!form.formState.isValid) {
            return;
        }

        setIsSubmitting(true);

        try {
            let coverUrl = values.coverUrl || '';
            let otherMediaUrls = values.otherMediaUrls || [];
            let documentUrls = values.documentUrls || [];

            if (values.media.coverPicture instanceof File) {
                coverUrl = await uploadFile(values.media.coverPicture);
            }

            if (values.media.otherMedia && values.media.otherMedia.length > 0) {
                const files = values.media.otherMedia.filter((m): m is File => m instanceof File);
                const newMediaUrls = await uploadAllFiles(files);
                otherMediaUrls = [...otherMediaUrls, ...newMediaUrls];
            }

            if (values.documents && values.documents.length > 0) {
                const files = values.documents.filter((d): d is File => d instanceof File);
                const newDocumentUrls = await uploadAllFiles(files);
                documentUrls = [...documentUrls, ...newDocumentUrls];
            }

            const updateData = {
                ...mapFormDataToAPI(values),
                cover_url: coverUrl,
                photos: otherMediaUrls,
                official_documents: documentUrls,
            };

            await updatePropertyMutation.mutateAsync({
                propertyId: idAsset,
                data: updateData,
            });

            setSuccessModalOpen(true);
        } catch (error) {
            toast.error(error instanceof Error ? error.message : 'Une erreur est survenue lors de la mise à jour.');
        } finally {
            setIsSubmitting(false);
        }
    }

    if (isLoading || !property) return <Loading />;
    if (error) {
        toast.error('Erreur lors du chargement des données du bien.');
        return <Loading />;
    }

    return (
        <div className="p-4">
            {isSubmitting && <Loading />}
            <SuccessModal
                isOpen={successModalOpen}
                title={`Bien #${idAsset} mis à jour avec succès`}
                description={`Votre bien ${property?.name} a été mis à jour avec succès.`}
                confirmText="Liste des biens"
                onClose={() => setSuccessModalOpen(false)}
                onConfirm={() => router.push('/admin/module/property/asset')}
            />
            <h1 className="text-4xl font-bold text-gray-900 mb-20">Modifier le bien</h1>
            <Stepper
                steps={[
                    { id: 1, title: "Informations d'identités" },
                    { id: 2, title: "Caractéristiques et Com." },
                    { id: 3, title: "Médias" },
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

export default EditAssetView;