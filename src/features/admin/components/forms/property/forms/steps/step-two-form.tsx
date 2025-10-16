import { Button } from '@/shared/components/ui/button';
import { Label } from '@/shared/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/components/ui/select';
import { Input } from '@/shared/components/ui/input';
import { SectionTitle } from '@/shared/components/ui/section-title';
import { Switch } from '@/shared/components/ui/switch';

import React, { useEffect, useState } from 'react';
import { Controller, UseFormReturn } from 'react-hook-form';

import InputErrorMessage from '@/shared/components/ui/input-error-message';
import { Checkbox } from '@/shared/components/ui/checkbox';
import { AddPropertyForm } from './schemas';
import { Textarea } from '@/shared/components/ui/textarea';
import { getAuthToken } from '@/lib/auth/utils';

interface Commodite {
  id: number;
  name: string;
  description: string | null;
  cover_url: string | null;
}

interface StepTwoFormProps {
  form: UseFormReturn<AddPropertyForm>;
}

function StepTwoForm({ form }: Readonly<StepTwoFormProps>) {
  const [commodites, setCommodites] = useState<Commodite[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCommodites = async () => {
    try {
      setLoading(true);
      setError(null);
      const token = getAuthToken();
      const response = await fetch('/api/property-features', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Erreur HTTP! statut: ${response.status}`);
      }

      const data = await response.json();
      setCommodites(data.data || []);
    } catch (err) {
      console.error('Erreur lors du chargement des commodités:', err);
      setError('Erreur lors du chargement des commodités');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCommodites();
  }, []);

  const { control, formState: { errors }, register } = form;

  return (
    <div>
      <section>
        <SectionTitle content="1. Caractéristiques du bien" />
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div>
            <Label htmlFor="annee" isRequired>Année de construction</Label>
            <Input 
              id="annee" 
              placeholder="Ex: 2020" 
              {...register('annee')}
              className={errors.annee ? 'border-red-500' : ''}
            />
            <InputErrorMessage message={errors.annee?.message} />
          </div>

          <div>
            <Label htmlFor="superficie" isRequired>Superficie totale (m²)</Label>
            <Input 
              id="superficie" 
              placeholder="Ex: 150" 
              {...register('superficie')}
              type="number"
              className={errors.superficie ? 'border-red-500' : ''}
            />
            <InputErrorMessage message={errors.superficie?.message} />
          </div>

          <div>
            <Label htmlFor="rooms_count" isRequired>Nombre de chambres</Label>
            <Input 
              id="rooms_count" 
              placeholder="Ex: 3" 
              {...register('rooms_count')} 
              type="number"
              className={errors.rooms_count ? 'border-red-500' : ''}
            />
            <InputErrorMessage message={errors.rooms_count?.message} />
          </div>
        </div>
      </section>

      <section className="mt-6">
        <SectionTitle content="2. Équipements et commodités" /> 
        
        <div className="mb-6">
          <Label className="text-lg font-semibold mb-4 block">Sélectionnez les équipements disponibles</Label>
          <Controller
            name="equipements"
            control={control}
            render={({ field }) => (
              <div className="space-y-4">
                {loading && (
                  <div className="text-center py-4">
                    <p className="text-gray-600">Chargement des commodités...</p>
                  </div>
                )}
                
                {error && (
                  <div className="text-center py-4 border border-red-200 rounded-lg bg-red-50">
                    <p className="text-red-500 mb-2">{error}</p>
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={fetchCommodites}
                      className="mt-2"
                    >
                      Réessayer le chargement
                    </Button>
                  </div>
                )}

                {!loading && !error && (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 border border-gray-200 rounded-lg">
                    {commodites.length === 0 ? (
                      <div className="col-span-full text-center py-4">
                        <p className="text-gray-500">Aucune commodité disponible</p>
                      </div>
                    ) : (
                      commodites.map((commodite) => (
                        <div 
                          key={commodite.id} 
                          className={`flex items-center space-x-3 p-3 border rounded-lg transition-colors ${
                            field.value?.includes(commodite.id.toString()) 
                              ? 'border-blue-500 bg-blue-50' 
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <Switch
                            checked={field.value?.includes(commodite.id.toString()) || false}
                            onCheckedChange={(checked) => {
                              const currentValue = field.value || [];
                              if (checked) {
                                field.onChange([...currentValue, commodite.id.toString()]);
                              } else {
                                field.onChange(currentValue.filter((v: string) => v !== commodite.id.toString()));
                              }
                            }}
                          />
                          <Label 
                            htmlFor={`commodite-${commodite.id}`}
                            className="flex-1 cursor-pointer"
                          >
                            {commodite.name}
                            {commodite.description && (
                              <span className="block text-xs text-gray-500 mt-1">
                                {commodite.description}
                              </span>
                            )}
                          </Label>
                        </div>
                      ))
                    )}
                  </div>
                )}
              </div>
            )}
          />
        </div>

        <div className="mb-4">
          <Label htmlFor="description" isRequired>Description du bien</Label>
          <Textarea 
            id="description" 
            placeholder="Décrivez le bien en détail (caractéristiques, avantages, environnement...)" 
            {...register('description')}
            className={`min-h-32 ${errors.description ? 'border-red-500' : ''}`}
          />
          <InputErrorMessage message={errors.description?.message} />
          <p className="text-sm text-gray-500 mt-1">
            {form.watch('description')?.length || 0} caractères
          </p>
        </div>
      </section>

      {/* Section pour les champs optionnels restants */}
      <section className="mt-6">
        <SectionTitle content="3. Informations complémentaires" />
        <div className="grid grid-cols-1 gap-4">
          <div>
            <Label htmlFor="reference">Référence du bien (optionnel)</Label>
            <Input 
              id="reference" 
              placeholder="Ex: PROP-2024-001" 
              {...register('reference')}
            />
            <p className="text-sm text-gray-500 mt-1">
              Référence interne pour identifier le bien
            </p>
          </div>
          
         
        </div>
      </section>
    </div>
  );
}

export default StepTwoForm;