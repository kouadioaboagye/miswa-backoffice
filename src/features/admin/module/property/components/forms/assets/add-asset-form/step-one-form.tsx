import { Label } from '@/shared/components/ui/label';
import { Input } from '@/shared/components/ui/input';
import { SectionTitle } from '@/shared/components/ui/section-title';
import React from 'react'
import { UseFormReturn } from 'react-hook-form';
import InputErrorMessage from '@/shared/components/ui/input-error-message';
import { addAssetFormData } from './schemas';

interface StepOneFormProps {
  form: UseFormReturn<addAssetFormData>;
}

function StepOneForm({ form }: Readonly<StepOneFormProps>) {
  const { errors } = form.formState;

  return (
    <div className='space-y-20'>
      <section className='space-y-6'>
        <SectionTitle content="1. Identification" />
        <div className="grid grid-cols-2 gap-10 mb-4">
          <div>
            <Label htmlFor="name" isRequired>Nom de l'actif</Label>
            <Input id="name" placeholder="Nom de l'actif" {...form.register('name')} />
            <InputErrorMessage message={errors.name?.message} />
          </div>
          <div>
            <Label htmlFor="reference" isRequired>Référence interne</Label>
            <Input id="reference" placeholder="Référence interne" {...form.register('reference')} />
            <InputErrorMessage message={errors.reference?.message} />
          </div>
        </div>
      </section>

      <section>
        <SectionTitle content="2. Localisation" />
        <div className="grid grid-cols-2 gap-10">
          <div>
            <Label htmlFor="address" isRequired>Adresse complète</Label>
            <Input id="address" placeholder="Adresse complète" {...form.register('address')} />
            <InputErrorMessage message={errors.address?.message} />
          </div>
          <div>
            <Label htmlFor="street">Rue</Label>
            <Input id="street" placeholder="Nom de la rue" {...form.register('street')} />
            <InputErrorMessage message={errors.street?.message} />
          </div>
          <div>
            <Label htmlFor="geoolocation" isRequired>Géolocalisation</Label>
          </div>
        </div>
      </section>
    </div>
  );
}

export default StepOneForm;
