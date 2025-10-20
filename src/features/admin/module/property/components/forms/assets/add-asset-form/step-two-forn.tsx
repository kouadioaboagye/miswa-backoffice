import { Label } from '@/shared/components/ui/label';
import { Input } from '@/shared/components/ui/input';
import { SectionTitle } from '@/shared/components/ui/section-title';
import React, { useState } from 'react'
import { Controller, UseFormReturn } from 'react-hook-form';
import InputErrorMessage from '@/shared/components/ui/input-error-message';
import { Switch } from '@/shared/components/ui/switch';
import { Textarea } from '@/shared/components/ui/textarea';
import { addAssetFormData } from './schemas';
import { useGetFeaturesQuery } from '@/lib/data-service/feature/feature.queries';

interface StepTwoFormProps {
    form: UseFormReturn<addAssetFormData>;
}

function StepTwoForm({ form }: Readonly<StepTwoFormProps>) {
    const { errors } = form.formState;
    const [selectedFeatures, setSelectedFeatures] = useState<number[]>([]);
    const { data: features, isLoading, error } = useGetFeaturesQuery();

    const handleFeatureToggle = (featureId: number) => {
        setSelectedFeatures((prev) =>
            prev.includes(featureId)
                ? prev.filter((id) => id !== featureId)
                : [...prev, featureId]
        );
    };

    return (
        <div className='space-y-20'>
            <section className="space-y-6">
                <SectionTitle content="2. Équipements et commodités" />
                <div className="space-y-6">
                    {features?.data.map((feature) => (
                        <div key={feature.id} className="flex items-center space-x-4">
                            <Controller
                                name="features"
                                control={form.control}
                                render={({ field }) => (
                                    <Switch
                                        id={`feature-${feature.id}`}
                                        checked={selectedFeatures.includes(feature.id)}
                                        onCheckedChange={() => {
                                            handleFeatureToggle(feature.id);
                                            const updatedFeatures = selectedFeatures.includes(feature.id)
                                                ? selectedFeatures.filter((id) => id !== feature.id)
                                                : [...selectedFeatures, feature.id];
                                            field.onChange(updatedFeatures);
                                        }}
                                    />
                                )}
                            />
                            <Label htmlFor={`feature-${feature.id}`}>
                                {feature.name}
                            </Label>
                        </div>
                    ))}
                </div>
            </section>
            <section className="space-y-6">
                <SectionTitle content="2. Statut" />
                <div className='space-y-6'>
                    <div className="flex items-center space-x-4">
                        <Controller
                            name="is_public"
                            control={form.control}
                            render={({ field }) => (
                                <Switch
                                    id="is_public"
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                />
                            )}
                        />
                        <Label htmlFor="is_public">
                            Bien public
                        </Label>
                        <InputErrorMessage message={errors.is_public?.message} />
                    </div>
                    <div className="flex items-center space-x-4">
                        <Controller
                            name="is_active"
                            control={form.control}
                            render={({ field }) => (
                                <Switch
                                    id="is_active"
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                />
                            )}
                        />
                        <Label htmlFor="is_active">
                            Bien actif
                        </Label>
                        <InputErrorMessage message={errors.is_active?.message} />
                    </div>
                </div>
            </section>
            <div>
                <Label htmlFor="description">Description du bien</Label><br />
                <Controller
                    name="description"
                    control={form.control}
                    render={({ field }) => (
                        <Textarea id="description" rows={5} {...field} />
                    )}
                />
                <InputErrorMessage message={errors.description?.message} />
            </div>
        </div>
    );
}

export default StepTwoForm;
