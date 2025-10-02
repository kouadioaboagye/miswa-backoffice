import { Button } from '@/shared/components/ui/button'
import { Label } from '@/shared/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/components/ui/select';
import { Input } from '@/shared/components/ui/input';
import { Plus } from 'lucide-react';
import { SectionTitle } from '@/shared/components/ui/section-title';
import React from 'react'
import { Controller, UseFormReturn } from 'react-hook-form';
import InputErrorMessage from '@/shared/components/ui/input-error-message';
import { addPropertyFormData } from './schemas';

interface StepOneFormProps {
  form: UseFormReturn<addPropertyFormData>;
}

function StepOneForm({ form }: Readonly<StepOneFormProps>) {
  const { errors } = form.formState;

  return (
    <div className='space-y-20'>
      <section className='space-y-6'>
        <SectionTitle content="1. Identification" />
        <div className="grid grid-cols-2 gap-10 mb-4">
          <div>
            <Label htmlFor="nomBatiment" isRequired>Nom du bâtiment</Label>
            <Input id="nomBatiment" placeholder="Batiment a" {...form.register('nomBatiment')} />
            <InputErrorMessage message={errors.nomBatiment?.message} />
          </div>
          <div>
            <Label htmlFor="typeBatiment" isRequired>Type bâtiment</Label>
            <Controller
              name="typeBatiment"
              control={form.control}
              rules={{ required: 'Sélectionnez un type' }}
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="villa">Villa basse</SelectItem>
                    <SelectItem value="duplex">Duplex</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            <InputErrorMessage message={errors.typeBatiment?.message} />
          </div>
        </div>
      </section>

      <section>
        <SectionTitle content="2. Localisation" />
        <div className="grid grid-cols-2 gap-10">
          <div>
            <Label htmlFor="adresse" isRequired>Adresse complète</Label>
            <Input id="adresse" placeholder="Adresse complète" {...form.register('adresse')} />
            <InputErrorMessage message={errors.adresse?.message} />
          </div>
          <div className='grid grid-cols-2 gap-10'>
            <div>
              <Label htmlFor="city" isRequired>Ville/Commune</Label>
              <Controller
                name="city"
                control={form.control}
                rules={{ required: 'Sélectionnez' }}
                render={({ field, fieldState: { error } }) => (
                  <div>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionnez" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="abidjan">Abidjan</SelectItem>
                      </SelectContent>
                    </Select>
                    <InputErrorMessage message={error?.message} />
                  </div>
                )}
              />
            </div>
            <div>
              <Label htmlFor="quartier" isRequired>Quartier</Label>
              <Controller
                name="quartier"
                control={form.control}
                rules={{ required: 'Sélectionnez un quartier' }}
                render={({ field, fieldState: { error } }) => (
                  <div>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionnez" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="marcory zone 4">Marcory Zone 4</SelectItem>
                      </SelectContent>
                    </Select>
                    <InputErrorMessage message={error?.message} />
                  </div>
                )}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="geoolocation" isRequired>Géolocalisation</Label>
          </div>
        </div>
      </section>
    </div>
  );
}

export default StepOneForm;
