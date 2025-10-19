import { Label } from '@/shared/components/ui/label';
import { Input } from '@/shared/components/ui/input';
import { SectionTitle } from '@/shared/components/ui/section-title';
import React from 'react'
import { Controller, UseFormReturn } from 'react-hook-form';
import InputErrorMessage from '@/shared/components/ui/input-error-message';
import { Switch } from '@/shared/components/ui/switch';
import { Textarea } from '@/shared/components/ui/textarea';
import { addAssetFormData } from './schemas';

interface StepTwoFormProps {
    form: UseFormReturn<addAssetFormData>;
}

function StepTwoForm({ form }: Readonly<StepTwoFormProps>) {
    const { errors } = form.formState;

    return (
        <div className='space-y-20'>
            <section className="space-y-6">
                <SectionTitle content="2. Équipements et commodités" />
                <div className="space-y-6">
                    <div className="flex items-center space-x-4">
                        <Controller
                            name="parking"
                            control={form.control}
                            render={({ field }) => (
                                <Switch
                                    id="parking"
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                />
                            )}
                        />
                        <Label htmlFor="parking">
                            Parking
                        </Label>
                        <InputErrorMessage message={errors.parking?.message} />
                    </div>
                    <div className="flex items-center space-x-4">
                        <Controller
                            name="internet"
                            control={form.control}
                            render={({ field }) => (
                                <Switch
                                    id="internet"
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                />
                            )}
                        />
                        <Label htmlFor="internet">
                            Accès internet/fibre
                        </Label>
                        <InputErrorMessage message={errors.internet?.message} />
                    </div>
                    <div className="flex items-center space-x-4">
                        <Controller
                            name="water"
                            control={form.control}
                            render={({ field }) => (
                                <Switch
                                    id="water"
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                />
                            )}
                        />
                        <Label htmlFor="water">
                            Système eau/électricité
                        </Label>
                        <InputErrorMessage message={errors.water?.message} />
                    </div>
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
