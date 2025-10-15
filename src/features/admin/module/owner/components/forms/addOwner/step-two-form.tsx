import { Button } from '@/shared/components/ui/button';
import { Label } from '@/shared/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/components/ui/select';
import { Input } from '@/shared/components/ui/input';
import { SectionTitle } from '@/shared/components/ui/section-title';
import React from 'react';
import { Controller, UseFormReturn } from 'react-hook-form';
import { addOwnerFormData } from './schemas';
import InputErrorMessage from '@/shared/components/ui/input-error-message';
import { useListCountriesQuery, useListMunicipalitiesQuery } from '@/lib/data-service/general/general.queries';

interface StepTwoFormProps {
  form: UseFormReturn<addOwnerFormData>;
}

function StepTwoForm({ form }: Readonly<StepTwoFormProps>) {
  const { control, formState: { errors }, watch } = form;
  const { data: countriesResponse, isLoading: isCountriesLoading } = useListCountriesQuery();
  const { data: countries = [], total: countriesTotal = 0 } = countriesResponse || {};

  const selectedCountryId = watch('paysResidence');
  const { data: municipalitiesResponse, isLoading: isMunicipalitiesLoading } = useListMunicipalitiesQuery();
  const { data: municipalities = [], total: municipalitiesTotal = 0 } = municipalitiesResponse || {};


  return (
    <div>
      <section>
        <SectionTitle content="1. Coordonnées de contact" />
        <div className="grid grid-cols-3 gap-4 mb-4">
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
            <Label htmlFor="email" isRequired>Adresse email</Label>
            <Input
              id="email"
              placeholder="exemple@gmail.com"
              {...form.register('email')}
            />
            <InputErrorMessage message={errors.email?.message} />
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
                  <Select value={field.value} onValueChange={field.onChange} key={`paysResidence-${field.value}`}>
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
                    key={`commune-${field.value}`}
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
            <Label htmlFor="profession" isRequired>Profession</Label>
            <Controller
              name="profession"
              control={control}
              rules={{ required: 'Profession requise' }}
              render={({ field, fieldState: { error } }) => (
                <div>
                  <Select value={field.value} onValueChange={field.onChange} key={`profession-${field.value}`}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Employé">Employé</SelectItem>
                      <SelectItem value="Indépendant">Indépendant</SelectItem>
                      <SelectItem value="Étudiant">Étudiant</SelectItem>
                    </SelectContent>
                  </Select>
                  <InputErrorMessage message={error?.message} />
                </div>
              )}
            />
          </div>

          <div>
            <Label htmlFor="employeur" isRequired>Employeur</Label>
            <Input
              id="employeur"
              placeholder="Nom de l'employeur"
              {...form.register('employeur')}
            />
            <InputErrorMessage message={errors.employeur?.message} />
          </div>

          <div>
            <Label htmlFor="revenuMensuel" isRequired>Revenu mensuel moyen</Label>
            <Input
              id="revenuMensuel"
              type='number'
              placeholder="500000"
              {...form.register('revenuMensuel', { valueAsNumber: true })}
            />
            <InputErrorMessage message={errors.revenuMensuel?.message} />
          </div>
        </div>
      </section>

      <section>
        <SectionTitle content="3. Informations financières" />
        <div className="grid grid-cols-3 gap-4">
          <div>
            <Label htmlFor="modeReception" isRequired>Mode de réception</Label>
            <Controller
              name="modeReception"
              control={control}
              rules={{ required: 'Mode de réception requis' }}
              render={({ field, fieldState: { error } }) => (
                <div>
                  <Select value={field.value} onValueChange={field.onChange} key={`modeReception-${field.value}`}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bank">Virement bancaire</SelectItem>
                      <SelectItem value="mobile_money">Mobile money</SelectItem>
                      <SelectItem value="cash">Espèces</SelectItem>
                    </SelectContent>
                  </Select>
                  <InputErrorMessage message={error?.message} />
                </div>
              )}
            />
          </div>

          <div>
            <Label htmlFor="banque">Banque</Label>
            <Controller
              name="banque"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <div>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sgci">SGCI</SelectItem>
                      <SelectItem value="bni">BNI</SelectItem>
                      <SelectItem value="ecobank">Ecobank</SelectItem>
                    </SelectContent>
                  </Select>
                  <InputErrorMessage message={error?.message} />
                </div>
              )}
            />
          </div>

          <div>
            <Label htmlFor="titulaireCompte">Nom du titulaire du compte</Label>
            <Input
              id="titulaireCompte"
              placeholder="Nom du titulaire"
              {...form.register('titulaireCompte')}
            />
            <InputErrorMessage message={errors.titulaireCompte?.message} />
          </div>
        </div>
      </section>
    </div>
  );
}

export default StepTwoForm;