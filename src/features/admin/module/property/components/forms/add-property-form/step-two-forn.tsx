import { Label } from '@/shared/components/ui/label';
import { Input } from '@/shared/components/ui/input';
import { SectionTitle } from '@/shared/components/ui/section-title';
import React from 'react'
import { Controller, UseFormReturn } from 'react-hook-form';
import InputErrorMessage from '@/shared/components/ui/input-error-message';
import { addPropertyFormData } from './schemas';
import { Switch } from '@/shared/components/ui/switch';
import { Textarea } from '@/shared/components/ui/textarea';

interface StepTwoFormProps {
    form: UseFormReturn<addPropertyFormData>;
}

function StepTwoForm({ form }: Readonly<StepTwoFormProps>) {
    const { errors } = form.formState;

    return (
        <div className='space-y-20'>
            <section className='space-y-6'>
                <SectionTitle content="1. Identification" />
                <div className="grid grid-cols-2 gap-10">
                    <div>
                        <Label htmlFor="totalUnit" isRequired>Nombre total d'unités</Label>
                        <Input id="totalUnit" type='number' placeholder="10" {...form.register('totalUnit', { valueAsNumber: true })} />
                        <InputErrorMessage message={errors.totalUnit?.message} />
                    </div>
                    <div className='grid grid-cols-3 gap-10'>
                        <div>
                            <Label htmlFor="buildingYear" isRequired>Années de construction</Label>
                            <Input id="buildingYear" placeholder="2020" {...form.register('buildingYear')} />
                            <InputErrorMessage message={errors.buildingYear?.message} />
                        </div>
                        <div>
                            <Label htmlFor="landSurface" isRequired>Superficie totale(m2)</Label>
                            <Input id="landSurface" type='number' placeholder="10" {...form.register('landSurface', { valueAsNumber: true })} />
                            <InputErrorMessage message={errors.landSurface?.message} />
                        </div>
                        <div>
                            <Label htmlFor="floorNumber" isRequired>Nombre d'étages</Label>
                            <Input id="floorNumber" type='number' placeholder="10" {...form.register('floorNumber', { valueAsNumber: true })} />
                            <InputErrorMessage message={errors.floorNumber?.message} />
                        </div>
                    </div>
                </div>
            </section>

            <section className="space-y-6">
                <SectionTitle content="2. Équipements et commodités" />
                <div className="space-y-6">
                    <div className="flex w-full">
                        <div className='w-1/4 space-y-10'>
                            <div className="flex items-center space-x-4">
                                <Controller
                                    name="elevator"
                                    control={form.control}
                                    render={({ field }) => (
                                        <Switch
                                            id="elevator"
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    )}
                                />
                                <Label htmlFor="elevator">
                                    Ascenseur
                                </Label>
                                <InputErrorMessage message={errors.elevator?.message} />
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
                            <div></div>
                        </div>
                        <div className='w-3/4 grid grid-cols-3 gap-4'>
                            <div>
                                <div className="flex items-center space-x-4">
                                    <Controller
                                        name="parking.available"
                                        control={form.control}
                                        render={({ field }) => (
                                            <Switch
                                                id="parking.available"
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                            />
                                        )}
                                    />
                                    <Label htmlFor="parking.available">
                                        Parking
                                    </Label>
                                    <InputErrorMessage message={errors.parking?.available?.message} />
                                </div>
                                <div className='mt-4'>
                                    <Input id="parking.amount" type='number' placeholder="10" {...form.register('parking.amount', { valueAsNumber: true })} />
                                </div>
                            </div>
                            <div>
                                <div className="flex items-center space-x-4">
                                    <Controller
                                        name="security.available"
                                        control={form.control}
                                        render={({ field }) => (
                                            <Switch
                                                id="security.available"
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                            />
                                        )}
                                    />
                                    <Label htmlFor="security.available">
                                        Sécurité
                                    </Label>
                                    <InputErrorMessage message={errors.security?.available?.message} />
                                </div>
                                <div className='mt-4'>
                                    <Input id="security.amount" type='number' placeholder="10" {...form.register('security.amount', { valueAsNumber: true })} />
                                </div>
                            </div>
                            <div>
                                <div className="flex items-center space-x-4">
                                    <Controller
                                        name="commonSpaces.available"
                                        control={form.control}
                                        render={({ field }) => (
                                            <Switch
                                                id="commonSpaces.available"
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                            />
                                        )}
                                    />
                                    <Label htmlFor="commonSpaces.available">
                                        Espaces communs
                                    </Label>
                                    <InputErrorMessage message={errors.commonSpaces?.available?.message} />
                                </div>
                                <div className='mt-4'>
                                    <Input id="commonSpaces.amount" type='number' placeholder="10" {...form.register('commonSpaces.amount', { valueAsNumber: true })} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <Label htmlFor="description" isRequired>Description du bien</Label><br />
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
            </section>
        </div>
    );
}

export default StepTwoForm;
