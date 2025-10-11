import { Button } from '@/shared/components/ui/button';
import { Label } from '@/shared/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/components/ui/select';
import { Input } from '@/shared/components/ui/input';
import { SectionTitle } from '@/shared/components/ui/section-title';
import React from 'react';
import { Controller, UseFormReturn } from 'react-hook-form';
import { addTenantFormData } from './schemas';
import InputErrorMessage from '@/shared/components/ui/input-error-message';

interface StepOneFormProps {
  form: UseFormReturn<addTenantFormData>;
}

function StepOneForm({ form }: Readonly<StepOneFormProps>) {
  const { errors } = form.formState;

  return (
    <div>
      <section>
        <SectionTitle content="1. Identification" />
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div>
            <Label htmlFor="nom" isRequired>Nom</Label>
            <Input id="nom" placeholder="Nom" {...form.register('nom')} />
            <InputErrorMessage message={errors.nom?.message} />
          </div>

          <div>
            <Label htmlFor="prenom" isRequired>Prénom</Label>
            <Input id="prenom" placeholder="Prénom" {...form.register('prenom')} />
            <InputErrorMessage message={errors.prenom?.message} />
          </div>
          <div>
            <Label htmlFor="email" isRequired>Adresse e-mail</Label>
            <Input id="email" placeholder="example@gmail.com" {...form.register('email')} />
            <InputErrorMessage message={errors.email?.message} />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-4">
          <div>
            <Label htmlFor="dateNaissance" isRequired>Date de naissance</Label>
            <Input
              id="dateNaissance"
              placeholder="dd/MM/yyyy"
              type="date"
              {...form.register('dateNaissance')}
            />
            <InputErrorMessage message={errors.dateNaissance?.message} />
          </div>

          <div>
            <Label htmlFor="lieuNaissance" isRequired>Lieu de naissance</Label>
            <Input
              id="lieuNaissance"
              placeholder="Grand Bassam"
              {...form.register('lieuNaissance')}
            />
            <InputErrorMessage message={errors.lieuNaissance?.message} />
          </div>

          <div>
            <Label htmlFor="situationFamiliale" isRequired>Situation familiale</Label>
            <Controller
              name="situationFamiliale"
              control={form.control}
              rules={{ required: 'Situation familiale requise' }}
              render={({ field, fieldState: { error } }) => (
                <div>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="married">Mariée</SelectItem>
                      <SelectItem value="single">Célibataire</SelectItem>
                      <SelectItem value="divorced">Divorcée</SelectItem>
                      <SelectItem value="widow">Veuve/Veuf</SelectItem>
                    </SelectContent>
                  </Select>
                  <InputErrorMessage message={error?.message} />
                </div>
              )}
            />
          </div>
        </div>
        <div>
          <Label htmlFor="property_id" isRequired>Selectionner le bien</Label>
          <Controller
            name="property_id"
            control={form.control}
            rules={{ required: 'Bien requis' }}
            render={({ field, fieldState: { error } }) => (
              <div>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez le bien du propriétaire" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="appartement1">Appartement 1</SelectItem>
                  </SelectContent>
                </Select>
                <InputErrorMessage message={error?.message} />
              </div>
            )}
          />
        </div>
      </section>

      <section>
        <SectionTitle content="2. Document D&apos;Identification" />
        <div className="grid grid-cols-3 gap-4">
          <div>
            <Label htmlFor="typePiece" isRequired>Type de pièce</Label>
            <Controller
              name="typePiece"
              control={form.control}
              rules={{ required: 'Type de pièce requis' }}
              render={({ field }) => (
                <div>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cni">CNI</SelectItem>
                      <SelectItem value="passport">Passeport</SelectItem>
                      <SelectItem value="consular">Carte de résident</SelectItem>
                      <SelectItem value="diriving_licence">Permis de conduire</SelectItem>
                    </SelectContent>
                  </Select>
                  <InputErrorMessage message={errors.typePiece?.message} />
                </div>
              )}
            />
          </div>

          <div>
            <Label htmlFor="numeroCNI" isRequired>Numéro de la carte CNI</Label>
            <Input
              id="numeroCNI"
              placeholder="Numéro CNI"
              {...form.register('numeroCNI')}
            />
            <InputErrorMessage message={errors.numeroCNI?.message} />
          </div>

          <div>
            <Label htmlFor="dateExpiration" isRequired>Date d&apos;expiration</Label>
            <Input
              id="dateExpiration"
              type="date"
              {...form.register('dateExpiration')}
            />
            <InputErrorMessage message={errors.dateExpiration?.message} />
          </div>
        </div>
      </section>
    </div>
  );
}

export default StepOneForm;