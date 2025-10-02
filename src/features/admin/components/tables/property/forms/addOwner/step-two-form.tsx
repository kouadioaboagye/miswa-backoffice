import { Button } from '@/shared/components/ui/button';
import { Label } from '@/shared/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/components/ui/select';
import { Input } from '@/shared/components/ui/input';
import { SectionTitle } from '@/shared/components/ui/section-title';
import { Switch } from '@/shared/components/ui/switch';

import React from 'react';
import { Controller, UseFormReturn } from 'react-hook-form';

import InputErrorMessage from '@/shared/components/ui/input-error-message';
import { Checkbox } from '@/shared/components/ui/checkbox';
import { AddPropertyForm } from './schemas';
import { Textarea } from '@/shared/components/ui/textarea';

interface StepTwoFormProps {
  form: UseFormReturn<AddPropertyForm>;
}

function StepTwoForm({ form }: Readonly<StepTwoFormProps>) {
  const { control, formState: { errors } } = form;

  return (
    <div>
      <section>
        <SectionTitle content="1. Identification" />
        <div className="grid grid-cols-4 gap-4 mb-4">
          <div>
            <Label htmlFor="nom" isRequired>Nom du bien</Label>
            <Input
              id="nom"
              placeholder="nom du bien"
              {...form.register('nom')}
            />
            <InputErrorMessage message={errors.nom?.message} />
          </div>

          <div>
            <Label htmlFor="annee" isRequired>Année de construction</Label>
            <Input id="annee" placeholder="Année de création" {...form.register('annee')} />
            <InputErrorMessage message={errors.annee?.message} />
          </div>

          <div>
            <Label htmlFor="superficie" isRequired>Superficie totale</Label>
            <Input id="superficie" placeholder="superfice du bien" {...form.register('superficie')} />
            <InputErrorMessage message={errors.superficie?.message} />
          </div>

          <div>
            <Label htmlFor="nbetage" isRequired>Nombre d’étages</Label>
            <Input id="nbetage" placeholder="nombre  de etage" {...form.register('nbetage')} type="number" />
            <InputErrorMessage message={errors.nbetage?.message} />
          </div>
        </div>

      </section>
      <section>
        <SectionTitle content="2. Équipements et commodités" /> 
        <div className="mb-4">
             <Controller
  name="equipements"
  control={control}
  render={({ field }) => (
    <div className="space-y-4">
      
      {/* Switches pour les équipements */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { value: "ascenseur", label: "Ascenseur" },
          { value: "parking", label: "Parking" },
          { value: "climatisation", label: "Climatisation" },
          { value: "chauffage", label: "Chauffage" },
          { value: "internet", label: "Internet haut débit" },
          { value: "garde", label: "Gardiennage" },
          { value: "piscine", label: "Piscine" },
          { value: "salleSport", label: "Salle de sport" },
          { value: "jardin", label: "Jardin" },
          { value: "terrasse", label: "Terrasse" },
          { value: "buanderie", label: "Buanderie" },
          { value: "camera", label: "Caméra de surveillance" },
        ].map((item) => (
          <div key={item.value} className="flex items-center space-x-2">
            <Switch
              checked={field.value?.includes(item.value) || false}
              onCheckedChange={(checked) => {
                const currentValue = field.value || [];
                if (checked) {
                  field.onChange([...currentValue, item.value]);
                } else {
                  field.onChange(currentValue.filter((v: string) => v !== item.value));
                }
              }}
            />
            <Label htmlFor={item.value}>{item.label}</Label>
          </div>
        ))}
      </div>
    </div>
  )}
/>
         </div>

          <div className="mb-4">
            <Label htmlFor="nbetage" isRequired>description du bien</Label>
            <Textarea id="nbetage" placeholder="description du bien" {...form.register('nbetage')}  />
            <InputErrorMessage message={errors.nbetage?.message} />
          </div>
               
               </section>

      
      {/* <section>
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
      </section> */}
    </div>
  );
}

export default StepTwoForm;
