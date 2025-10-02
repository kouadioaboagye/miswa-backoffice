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
      const token = getAuthToken();
      const response = await fetch('/api/property-features', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setCommodites(data.data || []);
    } catch (err) {
      console.error('Error fetching commodites:', err);
      setError('Erreur lors du chargement des commodités');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCommodites();
  }, []);

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
            <Label htmlFor="nbetage" isRequired>Nombre d'étages</Label>
            <Input id="nbetage" placeholder="nombre de etage" {...form.register('nbetage')} type="number" />
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
                {loading && (
                  <div className="text-center py-4">
                    <p>Chargement des commodités...</p>
                  </div>
                )}
                
                {error && (
                  <div className="text-red-500 text-center py-4">
                    <p>{error}</p>
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={fetchCommodites}
                      className="mt-2"
                    >
                      Réessayer
                    </Button>
                  </div>
                )}

                {!loading && !error && (
                  <div className="grid grid-cols-4 gap-4">
                    {commodites.map((commodite) => (
                      <div key={commodite.id} className="flex items-center space-x-2">
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
                        <Label htmlFor={`commodite-${commodite.id}`}>
                          {commodite.name}
                        </Label>
                      </div>
                    ))}
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
            placeholder="Description du bien" 
            {...form.register('description')}  
          />
          <InputErrorMessage message={errors.description?.message} />
        </div>
      </section>
    </div>
  );
}

export default StepTwoForm;