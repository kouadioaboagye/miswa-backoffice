import { Label } from '@/shared/components/ui/label';
import { Input } from '@/shared/components/ui/input';
import { SectionTitle } from '@/shared/components/ui/section-title';
import React from 'react'
import { Controller, UseFormReturn } from 'react-hook-form';
import InputErrorMessage from '@/shared/components/ui/input-error-message';
import { addAssetFormData } from './schemas';
import { useListBuildingsQuery } from '@/lib/data-service/property/building.queries';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/components/ui/select';

interface StepOneFormProps {
  form: UseFormReturn<addAssetFormData>;
}

function StepOneForm({ form }: Readonly<StepOneFormProps>) {
  const { errors } = form.formState;
  const { data: buildingsResponse, isLoading: isBuildingsLoading } = useListBuildingsQuery();
  const { data: buildings = [], total: buildingsTotal = 0 } = buildingsResponse || {};

  return (
    <div className='space-y-20'>
      <section className='space-y-6'>
        <SectionTitle content="1. Identification" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="name" isRequired>Nom du bien</Label>
            <Input
              id="name"
              placeholder="Nom du bien"
              {...form.register('name')}
            />
            <InputErrorMessage message={errors.name?.message} />
          </div>
          <div>
            <Label htmlFor="reference" isRequired>Référence interne</Label>
            <Input id="reference" placeholder="Référence interne" {...form.register('reference')} />
            <InputErrorMessage message={errors.reference?.message} />
          </div>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <div>
            <Label htmlFor="building" isRequired>Immeuble/Bâtiment</Label>
            <Controller
              name="building"
              control={form.control}
              disabled={isBuildingsLoading}
              rules={{ required: 'Bâtiment requis' }}
              render={({ field, fieldState: { error } }) => (
                <div>
                  <Select value={field.value || ''} onValueChange={field.onChange} key={`building-${field.value}`}>
                    <SelectTrigger>
                      <SelectValue placeholder={isBuildingsLoading ? 'Chargement...' : 'Sélectionnez'} />
                    </SelectTrigger>
                    <SelectContent>
                      {buildings.length > 0 &&
                        buildings.map((building, index) => (
                          <SelectItem value={building.id.toString()} key={index + 1}>
                            {building.name}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                  <InputErrorMessage message={error?.message} />
                </div>
              )}
            />
          </div>
          <div>
            <Label htmlFor="building_steps_level" isRequired>Niveau du bien dans le bâtiment</Label>
            <Input id="building_steps_level" placeholder="1" {...form.register('building_steps_level', { valueAsNumber: true })} />
            <InputErrorMessage message={errors.building_steps_level?.message} />
          </div>
        </div>
      </section>
      <section className='space-y-6'>
        <SectionTitle content="2. Caractéristiques" />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <div>
            <Label htmlFor="area_m2" isRequired>Superficie(m²)</Label>
            <Input id="area_m2" placeholder="100" {...form.register('area_m2', { valueAsNumber: true })} />
            <InputErrorMessage message={errors.area_m2?.message} />
          </div>
          <div>
            <Label htmlFor="built_year" isRequired>Année de construction</Label>
            <Input id="built_year" placeholder="2000" {...form.register('built_year', { valueAsNumber: true })} />
            <InputErrorMessage message={errors.built_year?.message} />
          </div>
          <div>
            <Label htmlFor="rooms_count" isRequired>Nombre de pièces</Label>
            <Input id="rooms_count" placeholder="1" {...form.register('rooms_count', { valueAsNumber: true })} />
            <InputErrorMessage message={errors.rooms_count?.message} />
          </div>
          <div>
            <Label htmlFor="monthly_rent_amount" isRequired>Loyer</Label>
            <Input id="monthly_rent_amount" placeholder="1" {...form.register('monthly_rent_amount', { valueAsNumber: true })} />
            <InputErrorMessage message={errors.monthly_rent_amount?.message} />
          </div>
        </div>
      </section>
    </div>
  );
}

export default StepOneForm;
