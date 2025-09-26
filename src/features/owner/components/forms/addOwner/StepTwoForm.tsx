import { Button } from '@/shared/components/ui/button';
import { Label } from '@/shared/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/components/ui/select';
import { Input } from '@/shared/components/ui/input';
import { SectionTitle } from '@/shared/components/ui/section-title';
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { addOwnerFormData } from './schemas';

interface StepTwoFormProps {
  form: UseFormReturn<addOwnerFormData>;
}

function StepTwoForm({ form }: Readonly<StepTwoFormProps>) {
  return (
    <div>
      <section>
        <SectionTitle content="1. Coordonnées de contact" />
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div>
            <Label htmlFor="telephonePrincipal">Numéro de téléphone principal</Label>
            <Input id="telephonePrincipal" placeholder="+1234567890" {...form.register('telephonePrincipal')} />
          </div>
          <div>
            <Label htmlFor="email">Adresse email</Label>
            <Input id="email" placeholder="exemple@gmail.com" {...form.register('email')} />
          </div>
          <div>
            <Label htmlFor="adressePostale">Adresse postale complète</Label>
            <Input id="adressePostale" placeholder="123 Rue Exemple" {...form.register('adressePostale')} />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-4">
          <div>
            <Label htmlFor="commune">Commune</Label>
            <Input id="commune" placeholder="Commune" {...form.register('commune')} />
          </div>
          <div>
            <Label htmlFor="quartier">Quartier</Label>
            <Input id="quartier" placeholder="Quartier" {...form.register('quartier')} />
          </div>
          <div>
            <Label htmlFor="paysResidence">Pays de résidence</Label>
            <Select defaultValue="Côte d'Ivoire" {...form.register('paysResidence')}>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionnez" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Côte d'Ivoire">Côte d'Ivoire</SelectItem>
                {/* Add more country options as needed */}
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>

      <section>
        <SectionTitle content="2. Informations professionnelles" />
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div>
            <Label htmlFor="profession">Profession</Label>
            <Select {...form.register('profession')}>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionnez" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Employé">Employé</SelectItem>
                <SelectItem value="Indépendant">Indépendant</SelectItem>
                {/* Add more profession options as needed */}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="employeur">Employeur</Label>
            <Input id="employeur" placeholder="Nom de l'employeur" {...form.register('employeur')} />
          </div>
          <div>
            <Label htmlFor="revenuMensuel">Revenu mensuel moyen</Label>
            <Input id="revenuMensuel" placeholder="500000" {...form.register('revenuMensuel')} />
          </div>
        </div>
      </section>

      <section>
        <SectionTitle content="3. Informations financières" />
        <div className="grid grid-cols-3 gap-4">
          <div>
            <Label htmlFor="modeReception">Mode de réception</Label>
            <Select {...form.register('modeReception')}>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionnez" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Virement bancaire">Virement bancaire</SelectItem>
                <SelectItem value="Chèque">Chèque</SelectItem>
                {/* Add more options as needed */}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="banque">Banque</Label>
            <Select {...form.register('banque')}>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionnez" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Banque Exemple">Banque Exemple</SelectItem>
                {/* Add more bank options as needed */}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="titulaireCompte">Nom du titulaire du compte</Label>
            <Input id="titulaireCompte" placeholder="Nom du titulaire" {...form.register('titulaireCompte')} />
          </div>
        </div>
      </section>
    </div>
  );
}

export default StepTwoForm;