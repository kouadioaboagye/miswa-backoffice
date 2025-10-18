'use client';

import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import { Label } from '@/shared/components/ui/label';
import { Textarea } from '@/shared/components/ui/textarea';
import { Switch } from '@/shared/components/ui/switch';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card';
import { UseFormReturn } from 'react-hook-form';
import InputErrorMessage from '@/shared/components/ui/input-error-message';
import { EditAssetForm } from './edit-asset-form-schema';

interface EditAssetFormComponentProps {
  form: UseFormReturn<EditAssetForm>;
  onSubmit: (data: EditAssetForm) => void;
  isSubmitting: boolean;
}

export const EditAssetFormComponent = ({ 
  form, 
  onSubmit, 
  isSubmitting 
}: EditAssetFormComponentProps) => {
  const { register, handleSubmit, formState: { errors }, watch, setValue } = form;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Informations générales</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name" isRequired>Nom du bien</Label>
              <Input
                id="name"
                placeholder="Nom du bien"
                {...register('name')}
                className={errors.name ? 'border-red-500' : ''}
              />
              <InputErrorMessage message={errors.name?.message} />
            </div>

            <div>
              <Label htmlFor="reference">Référence</Label>
              <Input
                id="reference"
                placeholder="Référence du bien"
                {...register('reference')}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="description" isRequired>Description</Label>
            <Textarea
              id="description"
              placeholder="Description du bien"
              {...register('description')}
              className={`min-h-32 ${errors.description ? 'border-red-500' : ''}`}
            />
            <InputErrorMessage message={errors.description?.message} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Localisation</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="street" isRequired>Rue</Label>
              <Input
                id="street"
                placeholder="Nom de la rue"
                {...register('street')}
                className={errors.street ? 'border-red-500' : ''}
              />
              <InputErrorMessage message={errors.street?.message} />
            </div>

            <div>
              <Label htmlFor="address" isRequired>Adresse complète</Label>
              <Input
                id="address"
                placeholder="Adresse complète"
                {...register('address')}
                className={errors.address ? 'border-red-500' : ''}
              />
              <InputErrorMessage message={errors.address?.message} />
            </div>
          </div>

          <div>
            <Label htmlFor="google_plus_code">Code Google Plus</Label>
            <Input
              id="google_plus_code"
              placeholder="Code Google Plus (optionnel)"
              {...register('google_plus_code')}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="latitude">Latitude</Label>
              <Input
                id="latitude"
                type="number"
                step="any"
                placeholder="Latitude"
                {...register('latitude', { valueAsNumber: true })}
              />
            </div>

            <div>
              <Label htmlFor="longitude">Longitude</Label>
              <Input
                id="longitude"
                type="number"
                step="any"
                placeholder="Longitude"
                {...register('longitude', { valueAsNumber: true })}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Caractéristiques du bien</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="rooms_count" isRequired>Nombre de chambres</Label>
              <Input
                id="rooms_count"
                type="number"
                min="1"
                placeholder="Nombre de chambres"
                {...register('rooms_count', { valueAsNumber: true })}
                className={errors.rooms_count ? 'border-red-500' : ''}
              />
              <InputErrorMessage message={errors.rooms_count?.message} />
            </div>

            <div>
              <Label htmlFor="built_year" isRequired>Année de construction</Label>
              <Input
                id="built_year"
                type="number"
                min="1900"
                max="2030"
                placeholder="Année de construction"
                {...register('built_year', { valueAsNumber: true })}
                className={errors.built_year ? 'border-red-500' : ''}
              />
              <InputErrorMessage message={errors.built_year?.message} />
            </div>

            <div>
              <Label htmlFor="area_m2" isRequired>Superficie (m²)</Label>
              <Input
                id="area_m2"
                type="number"
                min="1"
                placeholder="Superficie en m²"
                {...register('area_m2', { valueAsNumber: true })}
                className={errors.area_m2 ? 'border-red-500' : ''}
              />
              <InputErrorMessage message={errors.area_m2?.message} />
            </div>
          </div>

          <div>
            <Label htmlFor="monthly_rent_amount" isRequired>Montant du loyer mensuel</Label>
            <Input
              id="monthly_rent_amount"
              type="number"
              min="0"
              step="0.01"
              placeholder="Montant du loyer mensuel"
              {...register('monthly_rent_amount', { valueAsNumber: true })}
              className={errors.monthly_rent_amount ? 'border-red-500' : ''}
            />
            <InputErrorMessage message={errors.monthly_rent_amount?.message} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Statut et visibilité</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-2">
            <Switch
              id="is_busy"
              checked={watch('is_busy') || false}
              onCheckedChange={(checked) => setValue('is_busy', checked)}
            />
            <Label htmlFor="is_busy">Bien occupé</Label>
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="is_public"
              checked={watch('is_public') || false}
              onCheckedChange={(checked) => setValue('is_public', checked)}
            />
            <Label htmlFor="is_public">Bien public</Label>
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="is_active"
              checked={watch('is_active') || false}
              onCheckedChange={(checked) => setValue('is_active', checked)}
            />
            <Label htmlFor="is_active">Bien actif</Label>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end space-x-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => window.history.back()}
        >
          Annuler
        </Button>
        <Button
          type="submit"
          disabled={isSubmitting}
          className="bg-[#1EA64A] hover:bg-[#1EA64A]/90"
        >
          {isSubmitting ? 'Modification...' : 'Modifier le bien'}
        </Button>
      </div>
    </form>
  );
};
