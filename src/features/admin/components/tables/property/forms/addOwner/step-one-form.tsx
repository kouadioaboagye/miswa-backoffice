import { Button } from '@/shared/components/ui/button'
import { Label } from '@/shared/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/components/ui/select';
import { Input } from '@/shared/components/ui/input';
import { Plus } from 'lucide-react';
import { SectionTitle } from '@/shared/components/ui/section-title';
import React from 'react'
import { Controller, UseFormReturn } from 'react-hook-form';
import { AddPropertyForm } from './schemas';
import InputErrorMessage from '@/shared/components/ui/input-error-message';

interface StepOneFormProps {
  form: UseFormReturn<AddPropertyForm>;
}

function StepOneForm({ form }: Readonly<StepOneFormProps>) {
  const { errors } = form.formState;

  return (
    <div>
      <section>
        <SectionTitle content="1. Identification" />
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <Label htmlFor="typePersonne" >Immeuble / batiement</Label>
            <Controller
              name="typebatiment"
              control={form.control}
              rules={{ required: 'Sélectionnez un type' }}
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger>
                   <SelectValue placeholder="Sélectionnez un type de bâtiment" />
                  </SelectTrigger>
                  <SelectContent>
                   <SelectItem value="immeuble-residentiel">Immeuble Résidentiel</SelectItem>
          <SelectItem value="immeuble-commercial">Immeuble Commercial</SelectItem>
          <SelectItem value="immeuble-mixte">Immeuble Mixte (Résidentiel/Commercial)</SelectItem>
          <SelectItem value="maison-individuelle">Maison Individuelle</SelectItem>
          <SelectItem value="villa">Villa</SelectItem>
          <SelectItem value="appartement">Appartement</SelectItem>
          <SelectItem value="studio">Studio</SelectItem>
          <SelectItem value="duplex">Duplex</SelectItem>
          <SelectItem value="triplex">Triplex</SelectItem>
          <SelectItem value="penthouse">Penthouse</SelectItem>
          <SelectItem value="bureau">Bureau/Espace de travail</SelectItem>
          <SelectItem value="entrepot">Entrepôt/Stockage</SelectItem>
          <SelectItem value="usine">Usine/Bâtiment industriel</SelectItem>
          <SelectItem value="commerce">Commerce/Boutique</SelectItem>
          <SelectItem value="restaurant">Restaurant/Café</SelectItem>
          <SelectItem value="hotel">Hôtel/Résidence hôtelière</SelectItem>
          <SelectItem value="batiment-public">Bâtiment Public</SelectItem>
          <SelectItem value="ecole">École/Université</SelectItem>
          <SelectItem value="hopital">Hôpital/Clinique</SelectItem>
          <SelectItem value="centre-commercial">Centre Commercial</SelectItem>
          <SelectItem value="parking">Parking/Garage</SelectItem>
          <SelectItem value="batiment-agricole">Bâtiment Agricole</SelectItem>
          <SelectItem value="autre">Autre type de bâtiment</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            <InputErrorMessage message={errors.typebatiment?.message} />
          </div>

          <div>
            <Label htmlFor="email" isRequired>Référence interne Miswa</Label>
            <Input id="email" placeholder="exemple@gmail.com" {...form.register('nom')} />
            <InputErrorMessage message={errors.nom?.message} />
          </div>

          
        </div>

      

        <div>
  <Label htmlFor="bienProprietaire">Sélectionner le propriétaire</Label>
  <div className="relative">
    <Controller
      name="proprietaire"
      control={form.control}
      rules={{ required: 'Sélectionnez un propriétaire' }}
      render={({ field }) => (
        <Select value={field.value} onValueChange={field.onChange}>
          <SelectTrigger>
            <SelectValue placeholder="Sélectionnez un propriétaire" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="kouame-jean">Kouamé Jean</SelectItem>
            <SelectItem value="traore-fanta">Traoré Fanta</SelectItem>
            <SelectItem value="diallo-ibrahim">Diallo Ibrahim</SelectItem>
            <SelectItem value="koffi-marie">Koffi Marie</SelectItem>
            <SelectItem value="bamba-solange">Bamba Solange</SelectItem>
            <SelectItem value="societe-immocote">Société Immocôte CI</SelectItem>
            <SelectItem value="groupe-axa">Groupe Axa Immobilier</SelectItem>
            <SelectItem value="autre">Autre propriétaire</SelectItem>
          </SelectContent>
        </Select>
      )}
    />
    <InputErrorMessage message={errors.proprietaire?.message} />
  </div>
</div>
      </section>

      <section>
        <SectionTitle content="2. Localisation" />
        <div className="grid grid-cols-3 gap-4">
          <div>
            <Label htmlFor="ville" isRequired>Ville / Commune</Label>
            <Controller
              name="ville"
              control={form.control}
              rules={{ required: 'Sélectionnez un type' }}
              render={({ field, fieldState: { error } }) => (
                <div>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Ville / Commune" />
                    </SelectTrigger>
                     <SelectContent>
            <SelectItem value="abidjan">Abidjan</SelectItem>
            <SelectItem value="yamoussoukro">Yamoussoukro</SelectItem>
            <SelectItem value="bouake">Bouaké</SelectItem>
            <SelectItem value="daloa">Daloa</SelectItem>
            <SelectItem value="san-pedro">San-Pédro</SelectItem>
            <SelectItem value="korhogo">Korhogo</SelectItem>
            <SelectItem value="man">Man</SelectItem>
            <SelectItem value="gagnoa">Gagnoa</SelectItem>
            <SelectItem value="abengourou">Abengourou</SelectItem>
            <SelectItem value="grand-bassam">Grand-Bassam</SelectItem>
            <SelectItem value="agboville">Agboville</SelectItem>
            <SelectItem value="dabou">Dabou</SelectItem>
            <SelectItem value="anyama">Anyama</SelectItem>
          </SelectContent>
                  </Select>
                  <InputErrorMessage message={error?.message} />
                </div>
              )}
            />
          </div>

          <div>
            <Label htmlFor="quartier" isRequired>Quartier </Label>
            <Input id="quartier" placeholder="Entrez votre quartier" {...form.register('quartier')} />
            <InputErrorMessage message={errors.quartier?.message}/>
          </div>

          <div>
            <Label htmlFor="dateExpiration" isRequired>Adresse complète</Label>
            <Input id="adresse" {...form.register('adresse')} />
            <InputErrorMessage message={errors.adresse?.message} />
          </div>
        </div>
      </section>
    </div>
  );
}

export default StepOneForm;
