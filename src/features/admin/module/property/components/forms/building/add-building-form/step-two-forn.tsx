import { Label } from '@/shared/components/ui/label';
import { Input } from '@/shared/components/ui/input';
import { SectionTitle } from '@/shared/components/ui/section-title';
import React from 'react'
import { Controller, UseFormReturn } from 'react-hook-form';
import InputErrorMessage from '@/shared/components/ui/input-error-message';
import { addBuildingFormData } from './schemas';
import { Switch } from '@/shared/components/ui/switch';
import { Textarea } from '@/shared/components/ui/textarea';

interface StepTwoFormProps {
    form: UseFormReturn<addBuildingFormData>;
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
            </section>
        </div>
    );
}

export default StepTwoForm;
