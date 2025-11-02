"use client"

import React from 'react'
import { Controller, UseFormReturn } from 'react-hook-form';
import { addAdvertisementFormData } from './schemas';
import { Label } from '@/shared/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/components/ui/select';
import InputErrorMessage from '@/shared/components/ui/input-error-message';
import { Input } from '@/shared/components/ui/input';

interface FormProps {
  form: UseFormReturn<addAdvertisementFormData>;
}

function AddAdvertisementForm({form}: Readonly<FormProps>) {
    const { errors } = form.formState;
    return (
        <div className='p-4 space-y-12'>
            
                <div className='flex w-full gap-x-8'>
                    <div className='w-3/5'>
                        <Label htmlFor="nom" isRequired>Nom de l'annonce</Label>
                        <Input id="nom" placeholder="Nom" {...form.register('nom')} />
                        <InputErrorMessage message={errors.nom?.message} />
                    </div>
                    <div className='w-2/5'>
                        <Label htmlFor="propertyId" isRequired>Bien concerné</Label>
                        <Controller
                            name="propertyId"
                            control={form.control}
                            render={({ field }) => (
                                <div>
                                    <Select value={field.value} onValueChange={field.onChange} key={`propertyId-${field.value}`}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Sélectionnez" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="individual">Persone physique</SelectItem>
                                            <SelectItem value="professional">Personne morale</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <InputErrorMessage message={errors.propertyId?.message} />
                                </div>
                            )}
                        />
                    </div>
                </div>
                <div>
                    <Label htmlFor="montant" isRequired>Montant du loyer</Label>
                    <Input id="montant" placeholder="100000" {...form.register('montant', { valueAsNumber: true })} type='number' />
                    <InputErrorMessage message={errors.montant?.message} />
                </div>
                <div className='w-1/2'>
                    <Label htmlFor="availableDate" isRequired>Date de disponibilité du biem</Label>
                    <Input id="availableDate" placeholder="dd/MM/yyyy" {...form.register('availableDate')} type='date' />
                    <InputErrorMessage message={errors.availableDate?.message} />
                </div>
        </div>
    )
}

export default AddAdvertisementForm
