"use client";

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import Loading from '@/app/loading';
import SuccessModal from '@/shared/components/ui/success-modal';
import Stepper from '@/shared/components/ui/stepper';
import StepOneForm from '../../components/forms/building/add-building-form/step-one-form';
import StepThreeForm from '../../components/forms/building/add-building-form/step-three-form';
import { addBuildingFormData, addBuildingFormSchema } from '../../components/forms/building/add-building-form/schemas';
import { useGetBuildingByIdQuery } from '@/lib/data-service/property/building.queries';
import StepTwoForm from '../../components/forms/building/add-building-form/step-two-forn';
import { uploadAllFiles, uploadFile } from '@/app/api/files/upload';
import { fetchWrapper } from '@/lib/http-client/ fetchWrapper';

interface EditBuildingViewProps {
    idBuilding: string;
}

function EditBuildingView({ idBuilding }: Readonly<EditBuildingViewProps>) {
    const [currentStep, setCurrentStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [successModalOpen, setSuccessModalOpen] = useState(false);
    const router = useRouter();

    const { data, isLoading, error } = useGetBuildingByIdQuery(idBuilding);
    const batiment = data?.batiment;
    const proprietaire = data?.proprietaire;

    const form = useForm<addBuildingFormData>({
        resolver: zodResolver(addBuildingFormSchema),
        defaultValues: {
            nomBatiment: '',
            typeBatiment: '',
            adresse: '',
            quartier: '',
            municipality: '',
            business: '',
            totalUnit: 1,
            buildingYear: '',
            landSurface: 1,
            floorNumber: 1,
            description: '',
            documents: [],
            media: { coverPicture: undefined, otherMedia: [] },
            coverUrl: '',
            otherMediaUrls: [],
            documentUrls: [],
            longitude: undefined,
            latitude: undefined,
        },
    });

    useEffect(() => {
        if (data) {
            form.reset({
                nomBatiment: batiment?.name || '',
                typeBatiment: batiment?.building_type || '',
                adresse: batiment?.address || '',
                quartier: batiment?.street || '',
                municipality: batiment?.city?.toString() || '',
                business: proprietaire?.id ? String(proprietaire.id) : '',
                totalUnit: 1,
                buildingYear: batiment?.construction_year?.toString() || '',
                landSurface: 1,
                floorNumber: data?.nombre_total_etages || 1,
                description: batiment?.description || '',
                documents: [],
                media: { coverPicture: undefined, otherMedia: [] },
                coverUrl: batiment?.cover_url || '',
                otherMediaUrls: batiment?.photos || [],
                documentUrls: batiment?.documents || [],
                longitude: batiment?.longitude || undefined,
                latitude: batiment?.latitude || undefined,
            });
        }
    }, [data])

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
                    'nomBatiment',
                    'typeBatiment',
                    'adresse',
                    'quartier',
                    'municipality',
                    'business',
                    'longitude',
                    'latitude',
                ];
            case 2:
                return [
                    'totalUnit',
                    'buildingYear',
                    'landSurface',
                    'floorNumber',
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

    function mapFormDataToAPI(values: addBuildingFormData): any {
        return {
            name: values.nomBatiment,
            description: values.description,
            street: values.quartier,
            address: values.adresse,
            id_business: values.business,
            id_municipality: values.municipality,
            city: values.municipality,
            longitude: values.longitude,
            latitude: values.latitude,
            totalUnit: values.totalUnit,
            construction_year: values.buildingYear,
            landSurface: values.landSurface,
            floorNumber: values.floorNumber,
            building_type: values.typeBatiment,
        };
    }

    async function onSubmit(values: addBuildingFormData) {
        if (!form.formState.isValid) {
            return;
        }

        setIsSubmitting(true);

        try {
            let coverUrl = values.coverUrl || '';
            let otherMediaUrls = values.otherMediaUrls || [];
            let documentUrls = values.documentUrls || []

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

            const apiData = {
                ...mapFormDataToAPI(values),
                cover_url: coverUrl,
                photos: otherMediaUrls,
                documents: documentUrls,
            };

            await fetchWrapper(`buildings/${idBuilding}/`, {
                method: 'PUT',
                body: apiData,
            });
            setSuccessModalOpen(true);
        } catch (error) {
            toast.error(error instanceof Error ? error.message : 'Une erreur est survenue lors de la mise à jour.');
        } finally {
            setIsSubmitting(false);
        }
    }

    if (isLoading || !data) return <Loading />;
    if (error) {
        toast.error('Erreur lors du chargement des données du bâtiment.');
        return <Loading />;
    }

    return (
        <div className="p-4">
            {isSubmitting && <Loading />}
            <SuccessModal
                isOpen={successModalOpen}
                title={`Bâtiment #${idBuilding} mis à jour avec succès`}
                description={`Votre bien ${batiment?.name} a été mis à jour avec succès.`}
                confirmText="Liste des bâtiments"
                onClose={() => setSuccessModalOpen(false)}
                onConfirm={() => router.push('/admin/module/property/building')}
            />
            <h1 className="text-4xl font-bold text-gray-900 mb-20">Modifier le bâtiment</h1>
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

export default EditBuildingView;