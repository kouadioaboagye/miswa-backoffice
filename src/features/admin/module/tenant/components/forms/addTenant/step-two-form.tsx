import { Button } from '@/shared/components/ui/button';
import { Label } from '@/shared/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/components/ui/select';
import { Input } from '@/shared/components/ui/input';
import { SectionTitle } from '@/shared/components/ui/section-title';
import React from 'react';
import { Controller, UseFormReturn } from 'react-hook-form';
import { addTenantFormData } from './schemas';
import InputErrorMessage from '@/shared/components/ui/input-error-message';
import { useListCountriesQuery, useListMunicipalitiesQuery } from '@/lib/data-service/general/general.queries';

interface StepTwoFormProps {
  form: UseFormReturn<addTenantFormData>;
}

function StepTwoForm({ form }: Readonly<StepTwoFormProps>) {
  const { control, formState: { errors }, watch } = form;
  const { data: countriesResponse, isLoading: isCountriesLoading } = useListCountriesQuery();
  const { data: countries = [], total: countriesTotal = 0 } = countriesResponse || {};

  const selectedCountryId = watch('paysResidence');
  const { data: municipalitiesResponse, isLoading: isMunicipalitiesLoading } = useListMunicipalitiesQuery();
  const { data: municipalities = [], total: municipalitiesTotal = 0 } = municipalitiesResponse || {};

  const typesContrats = [
    {id: 1, name: "CDD"},
    {id: 2, name: "CDI"},
  ]


  return (
    <div>
      <section>
        <SectionTitle content="1. Coordonnées de contact" />
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <Label htmlFor="telephonePrincipal" isRequired>Numéro de téléphone principal</Label>
            <Input
              id="telephonePrincipal"
              placeholder="+1234567890"
              {...form.register('telephonePrincipal')}
            />
            <InputErrorMessage message={errors.telephonePrincipal?.message} />
          </div>
          <div>
            <Label htmlFor="adresse" isRequired>Adresse complète</Label>
            <Input
              id="adresse"
              placeholder="123 Rue Exemple"
              {...form.register('adresse')}
            />
            <InputErrorMessage message={errors.adresse?.message} />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-4">
          <div>
            <Label htmlFor="paysResidence" isRequired>Pays de résidence</Label>
            <Controller
              name="paysResidence"
              control={control}
              disabled={isCountriesLoading}
              rules={{ required: 'Pays de résidence requis' }}
              render={({ field, fieldState: { error } }) => (
                <div>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder={isCountriesLoading ? 'Chargement...' : 'Sélectionnez'} />
                    </SelectTrigger>
                    <SelectContent>
                      {countries.length > 0 &&
                        countries.map((country, index) => (
                          <SelectItem value={country.id.toString()} key={index + 1}>
                            {country.name}
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
            <Label htmlFor="commune" isRequired>Commune</Label>
            <Controller
              name="commune"
              control={control}
              rules={{ required: 'Commune requise' }}
              render={({ field, fieldState: { error } }) => (
                <div>
                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
                    disabled={isMunicipalitiesLoading || !selectedCountryId}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={isMunicipalitiesLoading ? 'Chargement...' : 'Sélectionnez'} />
                    </SelectTrigger>
                    <SelectContent>
                      {municipalities.length > 0 &&
                        municipalities
                          .filter((municipality) => municipality.id_country?.toString() === selectedCountryId)
                          .map((municipality, index) => (
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
            <Input
              id="quartier"
              placeholder="Quartier"
              {...form.register('quartier')}
            />
            <InputErrorMessage message={errors.quartier?.message} />
          </div>
        </div>
      </section>

      <section>
        <SectionTitle content="2. Informations professionnelles" />
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div>
            <Label htmlFor="employeur" isRequired>Nom de l'employeur</Label>
            <Input
              id="employeur"
              placeholder="Nom de l'employeur"
              {...form.register('employeur')}
            />
            <InputErrorMessage message={errors.employeur?.message} />
          </div>
          <div>
            <Label htmlFor="adresse_employeur" isRequired>Adresse de l'entreprise</Label>
            <Input
              id="adresse_employeur"
              placeholder="Adresse de l'entreprise"
              {...form.register('adresse_employeur')}
            />
            <InputErrorMessage message={errors.adresse_employeur?.message} />
          </div>
          <div>
            <Label htmlFor="profession" isRequired>Profession</Label>
            <Input
              id="profession"
              placeholder="Profession"
              {...form.register('profession')}
            />
            <InputErrorMessage message={errors.profession?.message} />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <Label htmlFor="contract_type" isRequired>Type de contrat</Label>
            <Controller
              name="contract_type"
              control={control}
              //disabled={isCountriesLoading}
              rules={{ required: 'Type de contrat requis' }}
              render={({ field, fieldState: { error } }) => (
                <div>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder={isCountriesLoading ? 'Chargement...' : 'Sélectionnez'} />
                    </SelectTrigger>
                    <SelectContent>
                      {typesContrats.length > 0 &&
                        typesContrats.map((tc, index) => (
                          <SelectItem value={tc.id.toString()} key={index + 1}>
                            {tc.name}
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
            <Label htmlFor="contract_start_date" isRequired>Date de début du contrat</Label>
            <Input
              id="contract_start_date"
              type='date'
              {...form.register('contract_start_date')}
            />
            <InputErrorMessage message={errors.contract_start_date?.message} />
          </div>
        </div>
      </section>

      <section>
        <SectionTitle content="3. Garant / Garantie" />
        <div className="grid grid-cols-3 gap-4">
          <div>
            <Label htmlFor="garant_name">Nom et prénoms garant</Label>
            <Input
              id="garant_name"
              placeholder="Nom du garant"
              {...form.register('garant_name')}
            />
            <InputErrorMessage message={errors.garant_name?.message} />
          </div>
          <div>
            <Label htmlFor="garant_phonenumber">Numéro de téléphone</Label>
            <Input
              id="garant_phonenumber"
              placeholder="Téléphone du garant"
              {...form.register('garant_phonenumber')}
            />
            <InputErrorMessage message={errors.garant_phonenumber?.message} />
          </div>
        </div>
      </section>
    </div>
  );
}

export default StepTwoForm;