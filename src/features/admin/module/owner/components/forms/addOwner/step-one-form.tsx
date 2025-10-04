import { Button } from '@/shared/components/ui/button'
import { Label } from '@/shared/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/components/ui/select';
import { Input } from '@/shared/components/ui/input';
import { Plus } from 'lucide-react';
import { SectionTitle } from '@/shared/components/ui/section-title';
import React from 'react'
import { Controller, UseFormReturn } from 'react-hook-form';
import { addOwnerFormData } from './schemas';
import InputErrorMessage from '@/shared/components/ui/input-error-message';

interface StepOneFormProps {
  form: UseFormReturn<addOwnerFormData>;
}

function StepOneForm({ form }: Readonly<StepOneFormProps>) {
  const { errors } = form.formState;

  return (
    <div>
      <section>
        <SectionTitle content="1. Identification" />
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div>
            <Label htmlFor="typePersonne" isRequired>Type de personne</Label>
            <Controller
              name="typePersonne"
              control={form.control}
              rules={{ required: 'Sélectionnez un type' }}
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Particulier">Particulier</SelectItem>
                    <SelectItem value="Autre">Autre</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            <InputErrorMessage message={errors.typePersonne?.message} />
          </div>

          <div>
            <Label htmlFor="nom" isRequired>Nom</Label>
            <Input id="nom" placeholder="exemple@gmail.com" {...form.register('nom')} />
            <InputErrorMessage message={errors.nom?.message} />
          </div>

          <div>
            <Label htmlFor="prenom">Prénom</Label>
            <Input id="prenom" placeholder="exemple@gmail.com" {...form.register('prenom')} />
            <InputErrorMessage message={errors.prenom?.message} />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-4">
          <div>
            <Label htmlFor="dateNaissance">Date de naissance</Label>
            <Input id="dateNaissance" placeholder="dd/MM/yyyy" {...form.register('dateNaissance')} type="date" />
            <InputErrorMessage message={errors.dateNaissance?.message} />
          </div>

          <div>
            <Label htmlFor="lieuNaissance">Lieu de naissance</Label>
            <Input id="lieuNaissance" placeholder="Grand Bassam" {...form.register('lieuNaissance')} />
            <InputErrorMessage message={errors.lieuNaissance?.message} />
          </div>

          <div>
            <Label htmlFor="situationFamiliale">Situation familiale</Label>
            <Controller
              name="situationFamiliale"
              control={form.control}
              render={({ field, fieldState: { error } }) => (
                <div>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Mariée">Mariée</SelectItem>
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
        <SectionTitle content="2. Document D&apos;Identification" />
        <div className="grid grid-cols-3 gap-4">
          <div>
            <Label htmlFor="typePiece">Type de pièce</Label>
            <Controller
              name="typePiece"
              control={form.control}
              render={({ field, fieldState: { error } }) => (
                <div>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="CNI">CNI</SelectItem>
                    </SelectContent>
                  </Select>
                  <InputErrorMessage message={error?.message} />
                </div>
              )}
            />
          </div>

          <div>
            <Label htmlFor="numeroCNI">Numéro de la carte CNI</Label>
            <Input id="numeroCNI" placeholder="exemple@gmail.com" {...form.register('numeroCNI')} />
            <InputErrorMessage message={errors.numeroCNI?.message}/>
          </div>

          <div>
            <Label htmlFor="dateExpiration">Date d&apos;expiration</Label>
            <Input id="dateExpiration" {...form.register('dateExpiration')} type="date"/>
            <InputErrorMessage message={errors.dateExpiration?.message} />
          </div>
        </div>
      </section>
    </div>
  );
}

export default StepOneForm;
