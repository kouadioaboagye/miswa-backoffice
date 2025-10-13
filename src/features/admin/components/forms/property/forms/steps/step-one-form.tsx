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
import { useListMunicipalitiesQuery } from '@/lib/data-service/general/general.queries';
import { useListOwnersQuery } from '@/lib/data-service/module/owner/owner.queries';
import { useListBuildingsQuery } from '@/lib/data-service/property/building.queries';

interface StepOneFormProps {
  form: UseFormReturn<AddPropertyForm>;
}

function StepOneForm({ form }: Readonly<StepOneFormProps>) {
  
  const { control, formState: { errors }, watch, setValue, getValues, trigger } = form;
  
  const { data: municipalitiesResponse, isLoading: isMunicipalitiesLoading } = useListMunicipalitiesQuery();
  const { data: municipalities = [] } = municipalitiesResponse || {};

  const { data: businessesResponse, isLoading: isBusinessesLoading } = useListOwnersQuery();
  const { data: businesses = [] } = businessesResponse || {};

  const { data: buildingResponse, isLoading: isBuildingLoading } = useListBuildingsQuery();
  const { data: buildings = [] } = buildingResponse || {};

  // Surveiller la valeur du bâtiment sélectionné
  const selectedBuildingId = watch('typebatiment');

  // Effet pour mettre à jour automatiquement le propriétaire et la ville quand le bâtiment change
  React.useEffect(() => {
    if (selectedBuildingId) {
      // Trouver le bâtiment sélectionné
      const selectedBuilding = buildings.find(building => building.id.toString() === selectedBuildingId);
      
      if (selectedBuilding) {
        console.log('Bâtiment sélectionné:', selectedBuilding);
        
        // Définir automatiquement le propriétaire correspondant si id_business existe
        if (selectedBuilding.id_business) {
          const ownerId = selectedBuilding.id_business.toString();
          setValue('proprietaire', ownerId, { 
            shouldValidate: true,
            shouldDirty: true,
            shouldTouch: true 
          });
       
          
          // Déclencher la validation après avoir défini la valeur
          setTimeout(() => {
            trigger('proprietaire');
          }, 100);
        } else {
          console.warn('Le bâtiment sélectionné n\'a pas de id_business');
          // Si pas de propriétaire associé, réinitialiser le champ
          setValue('proprietaire', '', { 
            shouldValidate: true,
            shouldDirty: true 
          });
        }
        
        // Définir automatiquement la ville correspondante si id_municipality existe
        if (selectedBuilding.id_municipality) {
          const municipalityId = selectedBuilding.id_municipality.toString();
          setValue('ville', municipalityId, { 
            shouldValidate: true,
            shouldDirty: true,
            shouldTouch: true 
          });
          console.log('Ville définie:', municipalityId);
          
          setTimeout(() => {
            trigger('ville');
          }, 100);
        } else {
          console.warn('Le bâtiment sélectionné n\'a pas de id_municipality');
          setValue('ville', '', { 
            shouldValidate: true,
            shouldDirty: true 
          });
        }

        // Optionnel: Pré-remplir aussi le nom du bien si le bâtiment a un nom
        if (selectedBuilding.name && !getValues('nom')) {
          setValue('nom', selectedBuilding.name, { 
            shouldValidate: true,
            shouldDirty: true 
          });
        }
      } else {
        console.warn('Aucun bâtiment trouvé avec l\'ID:', selectedBuildingId);
        // Réinitialiser les champs si le bâtiment n'est pas trouvé
        setValue('proprietaire', '', { shouldValidate: true });
        setValue('ville', '', { shouldValidate: true });
      }
    } else {
      // Si aucun bâtiment n'est sélectionné, réinitialiser les champs automatiques
      if (getValues('proprietaire') && !getValues('proprietaire').includes('manual-')) {
        setValue('proprietaire', '', { shouldValidate: true });
      }
      if (getValues('ville') && !getValues('ville').includes('manual-')) {
        setValue('ville', '', { shouldValidate: true });
      }
    }
  }, [selectedBuildingId, buildings, setValue, getValues, trigger]);

  // Trouver le bâtiment actuellement sélectionné
  const selectedBuilding = selectedBuildingId 
    ? buildings.find(building => building.id.toString() === selectedBuildingId)
    : null;

  // Trouver le propriétaire correspondant au bâtiment sélectionné
  const correspondingOwner = selectedBuilding && selectedBuilding.id_business
    ? businesses.find(business => business.id.toString() === selectedBuilding.id_business?.toString())
    : null;

  // Trouver la municipalité correspondante au bâtiment sélectionné
  const correspondingMunicipality = selectedBuilding && selectedBuilding.id_municipality
    ? municipalities.find(municipality => municipality.id.toString() === selectedBuilding.id_municipality?.toString())
    : null;

  // Fonction pour gérer la sélection manuelle du propriétaire
  const handleOwnerChange = (value: string) => {
    setValue('proprietaire', value, { 
      shouldValidate: true,
      shouldDirty: true 
    });
  };

  // Fonction pour gérer la sélection manuelle de la ville
  const handleVilleChange = (value: string) => {
    setValue('ville', value, { 
      shouldValidate: true,
      shouldDirty: true 
    });
  };

  return (
    <div>
      <section>
        <SectionTitle content="1. Identification" />
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div>
            <Label htmlFor="typebatiment" isRequired>Selectionnez le batiment</Label>
            <Controller
              name="typebatiment"
              control={control}
              disabled={isBuildingLoading}
              rules={{ required: 'Type de bâtiment requis' }}
              render={({ field, fieldState: { error } }) => (
                <div>
                  <Select 
                    value={field.value} 
                    onValueChange={(value) => {
                      field.onChange(value);
                      // Réinitialiser les autres champs quand le bâtiment change
                      if (!value) {
                        setValue('proprietaire', '', { shouldValidate: true });
                        setValue('ville', '', { shouldValidate: true });
                      }
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={isBuildingLoading ? 'Chargement...' : 'Sélectionnez'} />
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
            <InputErrorMessage message={errors.typebatiment?.message} />
          </div>

          <div>
            <Label htmlFor="nom" isRequired>Nom du bien</Label>
            <Input
              id="nom"
              placeholder="Nom du bien"
              {...form.register('nom')}
              className={errors.nom ? 'border-red-500' : ''}
            />
            <InputErrorMessage message={errors.nom?.message} />
          </div>

          <div>
            <Label htmlFor="price" isRequired>Prix</Label>
            <Input 
              id="price" 
              placeholder="Entrez le prix du bien" 
              {...form.register('price')} 
              type='number'
              className={errors.price ? 'border-red-500' : ''}
            />
            <InputErrorMessage message={errors.price?.message} />
          </div>
        </div>

        <div>
          <Label htmlFor="proprietaire" isRequired>
            Sélectionner le propriétaire
            {correspondingOwner && (
              <span className="text-green-600 text-sm ml-2">
                (Auto: {correspondingOwner.name})
              </span>
            )}
          </Label>
          <div className="relative">
            <Controller
              name="proprietaire"
              control={control}
              disabled={isBusinessesLoading}
              rules={{ required: 'Propriétaire requis' }}
              render={({ field, fieldState: { error } }) => (
                <div>
                  <Select 
                    value={field.value} 
                    onValueChange={handleOwnerChange}
                    disabled={isBusinessesLoading}
                  >
                    <SelectTrigger className={selectedBuildingId && correspondingOwner ? 'bg-gray-100' : ''}>
                      <SelectValue 
                        placeholder={
                          selectedBuildingId && correspondingOwner 
                            ? correspondingOwner.name 
                            : isBusinessesLoading 
                              ? 'Chargement...' 
                              : 'Sélectionnez'
                        } 
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {businesses.length > 0 &&
                        businesses.map((business, index) => (
                          <SelectItem value={business.id.toString()} key={index + 1}>
                            {business.name}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                  {selectedBuildingId && !correspondingOwner && (
                    <p className="text-xs text-yellow-600 mt-1">
                      Aucun propriétaire associé à ce bâtiment. Veuillez en sélectionner un manuellement.
                    </p>
                  )}
                  <InputErrorMessage message={error?.message} />
                </div>
              )}
            />
            <InputErrorMessage message={errors.proprietaire?.message} />
          </div>
        </div>
      </section>

      <section className="mt-6">
        <SectionTitle content="2. Localisation" />
        <div className="grid grid-cols-3 gap-4">
          <div>
            <Label htmlFor="ville" isRequired>
              Ville / Commune
              {correspondingMunicipality && (
                <span className="text-green-600 text-sm ml-2">
                  (Auto: {correspondingMunicipality.name})
                </span>
              )}
            </Label>
            <Controller
              name="ville"
              control={control}
              disabled={isMunicipalitiesLoading}
              rules={{ required: 'Municipalité requise' }}
              render={({ field, fieldState: { error } }) => (
                <div>
                  <Select 
                    value={field.value} 
                    onValueChange={handleVilleChange}
                    disabled={isMunicipalitiesLoading}
                  >
                    <SelectTrigger className={selectedBuildingId && correspondingMunicipality ? 'bg-gray-100' : ''}>
                      <SelectValue 
                        placeholder={
                          selectedBuildingId && correspondingMunicipality 
                            ? correspondingMunicipality.name 
                            : isMunicipalitiesLoading 
                              ? 'Chargement...' 
                              : 'Sélectionnez'
                        } 
                      />
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
                  {selectedBuildingId && !correspondingMunicipality && (
                    <p className="text-xs text-yellow-600 mt-1">
                      Aucune municipalité associée à ce bâtiment. Veuillez en sélectionner une manuellement.
                    </p>
                  )}
                  <InputErrorMessage message={error?.message} />
                </div>
              )}
            />
          </div>

          <div>
            <Label htmlFor="quartier" isRequired>Quartier</Label>
            <Input 
              id="quartier" 
              placeholder="Entrez votre quartier" 
              {...form.register('quartier')} 
            />
            <InputErrorMessage message={errors.quartier?.message}/>
          </div>

          <div>
            <Label htmlFor="adresse" isRequired>Adresse complète</Label>
            <Input 
              id="adresse" 
              placeholder="Adresse complète"
              {...form.register('adresse')} 
            />
            <InputErrorMessage message={errors.adresse?.message} />
          </div>
        </div>
      </section>

    
    </div>
  );
}

export default StepOneForm;