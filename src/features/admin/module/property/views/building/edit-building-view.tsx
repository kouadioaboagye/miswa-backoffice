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
            elevator: false,
            internet: false,
            water: false,
            parking: { available: false, amount: 0 },
            security: { available: false, amount: 0 },
            commonSpaces: { available: false, amount: 0 },
            description: '',
            documents: [],
            media: { coverPicture: undefined, otherMedia: [] },
            longitude: undefined,
            latitude: undefined,
        },
    });

    useEffect(() => {
        if (data) {
            form.reset({
                nomBatiment: data.name,
                typeBatiment: '',
                adresse: data.address || '',
                quartier: data.street || '',
                municipality: data.id_municipality?.toString() || '',
                business: data.id_business?.toString() || '',
                totalUnit: 1,
                buildingYear: '',
                landSurface: 1,
                floorNumber: 1,
                elevator: false,
                internet: false,
                water: false,
                parking: {
                    available: false,
                    amount: 0,
                },
                security: {
                    available: false,
                    amount: 0,
                },
                commonSpaces: {
                    available: false,
                    amount: 0
                },
                description: data.description || '',
                documents: [],
                media: {
                    coverPicture: undefined,
                    otherMedia: [],
                },
                longitude: data.longitude,
                latitude: data.latitude
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
                    'elevator',
                    'internet',
                    'water',
                    'parking.available',
                    'parking.amount',
                    'security.available',
                    'security.amount',
                    'commonSpaces.available',
                    'commonSpaces.amount',
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
                return <StepThreeForm
                    form={form}
                    existingCoverUrl={data?.cover_url}
                    existingPhotos={data?.photos}
                    existingDocuments={[]}
                />
            default:
                return null;
        }
    };

    function mapFormDataToAPI(values: addBuildingFormData): any {
        return {
            name: values.nomBatiment,
            description: values.description,
            cover_url: values.media?.coverPicture,
            photos: values.media?.otherMedia,
            street: values.quartier,
            address: values.adresse,
            id_business: values.business,
            id_municipality: values.municipality,
            longitude: values.longitude,
            latitude: values.latitude,
            totalUnit: values.totalUnit,
            buildingYear: values.buildingYear,
            landSurface: values.landSurface,
            floorNumber: values.floorNumber,
            elevator: values.elevator,
            internet: values.internet,
            water: values.water,
            parking: values.parking,
            security: values.security,
            commonSpaces: values.commonSpaces,
            documents: values.documents,
        };
    }

    async function onSubmit(values: addBuildingFormData) {
        console.log(form.formState.isValid, form.formState.errors)
        if (!form.formState.isValid) {
            return;
        }

        setIsSubmitting(true);

        try {
            const apiData = mapFormDataToAPI(values);
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

    if (isLoading) return <Loading />;
    if (error) {
        toast.error('Erreur lors du chargement des données du bâtiment.');
        return  <Loading />;
    }
    if (!data) return <Loading />;

    return (
        <div className="p-4">
            {isSubmitting && <Loading />}
            <SuccessModal
                isOpen={successModalOpen}
                title={`Bâtiment #${idBuilding} mis à jour avec succès`}
                description={`Votre bien ${data.name} a été mis à jour avec succès.`}
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
