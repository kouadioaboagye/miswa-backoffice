import { Button } from '@/shared/components/ui/button';
import { Label } from '@/shared/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/components/ui/select';
import { Input } from '@/shared/components/ui/input';
import { SectionTitle } from '@/shared/components/ui/section-title';
import React from 'react';
import { Controller, UseFormReturn } from 'react-hook-form';
import { addOwnerFormData } from './schemas';
import InputErrorMessage from '@/shared/components/ui/input-error-message';

interface StepTwoFormProps {
  form: UseFormReturn<addOwnerFormData>;
}

function StepTwoForm({ form }: Readonly<StepTwoFormProps>) {
  const { control, formState: { errors } } = form;

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
            <Input id="email" placeholder="exemple@gmail.com" {...form.register('email')} />
            <InputErrorMessage message={errors.email?.message} />
          </div>

          <div>
            <Label htmlFor="adressePostale" isRequired>Adresse postale complète</Label>
            <Input id="adressePostale" placeholder="123 Rue Exemple" {...form.register('adressePostale')} />
            <InputErrorMessage message={errors.adressePostale?.message} />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-4">
          <div>
            <Label htmlFor="commune">Commune</Label>
            <Input id="commune" placeholder="Commune" {...form.register('commune')} />
            <InputErrorMessage message={errors.commune?.message} />
          </div>

          <div>
            <Label htmlFor="quartier">Quartier</Label>
            <Input id="quartier" placeholder="Quartier" {...form.register('quartier')} />
            <InputErrorMessage message={errors.quartier?.message} />
          </div>

          <div>
            <Label htmlFor="paysResidence" isRequired>Pays de résidence</Label>
            <Controller
              name="paysResidence"
              control={control}
              rules={{ required: 'Pays de résidence requis' }}
              render={({ field, fieldState: { error } }) => (
                <div>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Côte d'Ivoire">Côte d'Ivoire</SelectItem>
                      <SelectItem value="France">France</SelectItem>
                      <SelectItem value="Autre">Autre</SelectItem>
                    </SelectContent>
                  </Select>
                  <InputErrorMessage message={error?.message} />
                </div>
              )}
            />
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
                  <Select value={field.value} onValueChange={field.onChange}>
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
            <Label htmlFor="employeur">Employeur</Label>
            <Input id="employeur" placeholder="Nom de l'employeur" {...form.register('employeur')} />
            <InputErrorMessage message={errors.employeur?.message} />
          </div>

          <div>
            <Label htmlFor="revenuMensuel">Revenu mensuel moyen</Label>
            <Input id="revenuMensuel" placeholder="500000" {...form.register('revenuMensuel')} />
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
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Virement bancaire">Virement bancaire</SelectItem>
                      <SelectItem value="Chèque">Chèque</SelectItem>
                      <SelectItem value="Espèces">Espèces</SelectItem>
                    </SelectContent>
                  </Select>
                  <InputErrorMessage message={error?.message} />
                </div>
              )}
            />
          </div>

          <div>
            <Label htmlFor="banque" isRequired>Banque</Label>
            <Controller
              name="banque"
              control={control}
              rules={{ required: 'Banque requise' }}
              render={({ field, fieldState: { error } }) => (
                <div>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="SGCI">SGCI</SelectItem>
                      <SelectItem value="BNI">BNI</SelectItem>
                      <SelectItem value="Ecobank">Ecobank</SelectItem>
                    </SelectContent>
                  </Select>
                  <InputErrorMessage message={error?.message} />
                </div>
              )}
            />
          </div>

          <div>
            <Label htmlFor="titulaireCompte" isRequired>Nom du titulaire du compte</Label>
            <Input id="titulaireCompte" placeholder="Nom du titulaire" {...form.register('titulaireCompte')} />
            <InputErrorMessage message={errors.titulaireCompte?.message} />
          </div>
        </div>
      </section>
    </div>
  );
}

export default StepTwoForm;
