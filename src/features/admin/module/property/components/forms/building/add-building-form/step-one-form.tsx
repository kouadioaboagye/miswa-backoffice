import { Label } from '@/shared/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/components/ui/select';
import { Input } from '@/shared/components/ui/input';
import { SectionTitle } from '@/shared/components/ui/section-title';
import React from 'react'
import { Controller, UseFormReturn } from 'react-hook-form';
import InputErrorMessage from '@/shared/components/ui/input-error-message';
import { addBuildingFormData } from './schemas';
import { useListMunicipalitiesQuery } from '@/lib/data-service/general/general.queries';
import { useListOwnersQuery } from '@/lib/data-service/module/owner/owner.queries';

interface StepOneFormProps {
  form: UseFormReturn<addBuildingFormData>;
}

function StepOneForm({ form }: Readonly<StepOneFormProps>) {
  const { control, formState: { errors } } = form;
  const { data: municipalitiesResponse, isLoading: isMunicipalitiesLoading } = useListMunicipalitiesQuery();
  const { data: municipalities = [], total: municipalitiesTotal = 0 } = municipalitiesResponse || {};

  const { data: businessesResponse, isLoading: isBusinessesLoading } = useListOwnersQuery();
  const { data: businesses = [], total: businessesTotal = 0 } = businessesResponse || {};

  return (
    <div className='space-y-20'>
      <section className='space-y-6'>
        <SectionTitle content="1. Identification" />
        <div>
          <Label htmlFor="business" isRequired>Propriétaire</Label>
              <Controller
                name="business"
                control={control}
                disabled={isBusinessesLoading}
                rules={{ required: 'Propriétaire requis' }}
                render={({ field, fieldState: { error } }) => (
                  <div>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue placeholder={isBusinessesLoading ? 'Chargement...' : 'Sélectionnez'} />
                      </SelectTrigger>
                      <SelectContent>
                        {businesses.length > 0 &&
                          businesses.map((businesses, index) => (
                            <SelectItem value={businesses.id.toString()} key={index + 1}>
                              {businesses.name}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                    <InputErrorMessage message={error?.message} />
                  </div>
                )}
              />
        </div>
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
              <Label htmlFor="municipality" isRequired>Ville/Commune</Label>
              <Controller
                name="municipality"
                control={control}
                disabled={isMunicipalitiesLoading}
                rules={{ required: 'Municipalité requise' }}
                render={({ field, fieldState: { error } }) => (
                  <div>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue placeholder={isMunicipalitiesLoading ? 'Chargement...' : 'Sélectionnez'} />
                      </SelectTrigger>
                      <SelectContent>
                        {municipalities.length > 0 &&
                          municipalities.map((municipality, index) => (
                            <SelectItem value={municipality.id.toString()} key={index + 1}>
                              {municipality.name}
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
              <Label htmlFor="quartier" isRequired>Quartier</Label>
              <Input id="quartier" placeholder="Rue xx" {...form.register('quartier')} />
              <InputErrorMessage message={errors.quartier?.message} />
            </div>
          </div>
          <div>
            <Label htmlFor="geoolocation" isRequired>Géolocalisation</Label>
            {/* A revoir: utiliser la map et enregistrer long et lat */}
          </div>
        </div>
      </section>
    </div>
  );
}

export default StepOneForm;
