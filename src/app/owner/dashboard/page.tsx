"use client"

import { Button } from '@/shared/components/ui/button'
import React, { useState } from 'react'
import { ArrowLeftIcon } from '../../../../public/assets/icons/arrow-left-icon';
import { ArrowRightIcon } from '../../../../public/assets/icons/arrow-right-icon';
import { useForm } from 'react-hook-form';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Label } from '@/shared/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/components/ui/select';
import { Input } from '@/shared/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/components/ui/popover';
import { cn } from '@/lib/utils';
import { Calendar } from '@/shared/components/ui/calendar';
import { format } from 'date-fns';
import { Plus } from 'lucide-react';
import { SectionTitle } from '@/shared/components/ui/section-title';

const formSchema = z.object({
  typePersonne: z.string().min(1, { message: 'Sélectionnez un type' }),
  nom: z.string().min(1, { message: 'Nom requis' }),
  prenom: z.string().min(1, { message: 'Prénom requis' }),
  dateNaissance: z.date().optional(),
  lieuNaissance: z.string().optional(),
  situationFamiliale: z.string().optional(),
  bienProprietaire: z.string().optional(),
  typePiece: z.string().min(1, { message: 'Sélectionnez un type' }),
  numeroCNI: z.string().min(1, { message: 'Numéro requis' }),
  dateExpiration: z.string().min(1, { message: 'Date requise' }),
});

function DashboardPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const steps = [
    { id: 1, title: "Informations d'identités", active: true },
    { id: 2, title: "Coordonnées", active: false },
    { id: 3, title: "Documents", active: false }
  ];
  const [dateNaissance, setDateNaissance] = useState<Date | undefined>(new Date(1995, 5, 12));
  const [dateExpiration, setDateExpiration] = useState<Date | undefined>(undefined);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      typePersonne: 'Particulier',
      nom: '',
      prenom: '',
      dateNaissance: undefined,
      lieuNaissance: 'Grand Bassam',
      situationFamiliale: 'Grand Bassam',
      bienProprietaire: 'Sélectionner le bien du propriétaire',
      typePiece: 'CNI',
      numeroCNI: '',
      dateExpiration: undefined,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <div className='p-4'>
      <h1 className="text-4xl font-bold text-gray-900 mb-20">Enregistrement d&apos;un nouveau propriétaire</h1>
      <div className="flex items-center mb-12">
        <div className="border flex flex-row">
          {steps.map((step, index) => (
            <div
              className={`flex items-center text-white p-6 ${step.id === currentStep ? "bg-[#1EA64A]" : ""
                }`}
              key={step.id}
            >
              <div
                className={`flex items-center justify-center w-12 h-12 rounded-full border-2 font-semibold ${step.id === currentStep
                  ? "border-white text-white"
                  : "border-gray-400 text-gray-400"
                  }`}
              >
                {step.id.toString().padStart(2, "0")}
              </div>
              <div
                className={`ml-4 font-medium ${step.id === currentStep ? "text-white" : "text-gray-500"
                  }`}
              >
                {step.title}
              </div>
            </div>
          ))}
        </div>
        <div className="ml-auto flex space-x-4 rounded-3xl bg-white p-4">
          <Button
            variant={'ghost'}
            className="h-[4.5rem] w-full shadow-[0px_8px_20px_0px_#11928F66] [&_svg]:size-8"
            leftIcon={<ArrowLeftIcon className="mr-2" />}
          >
            Retour
          </Button>
          <Button
            variant={'success'}
            className="h-[4.5rem] w-full shadow-[0px_8px_20px_0px_#11928F66] [&_svg]:size-8"
            rightIcon={<ArrowRightIcon className="mr-2" />}
          >
            Suivant
          </Button>
        </div>
      </div>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12">
        <section>
          <SectionTitle content="1. Identification"/>
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div>
              <Label htmlFor="typePersonne">Type de personne</Label>
              <Select defaultValue="Particulier" {...form.register('typePersonne')}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionnez" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Particulier">Particulier</SelectItem>
                  {/* Add more options as needed */}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="nom">Nom</Label>
              <Input id="nom" placeholder="exemple@gmail.com" {...form.register('nom')} />
            </div>
            <div>
              <Label htmlFor="prenom">Prénom</Label>
              <Input id="prenom" placeholder="exemple@gmail.com" {...form.register('prenom')} />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-4">
            <div>
              <Label htmlFor="dateNaissance">Date de naissance</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="date_picker"
                    size="date_picker"
                    className={cn(
                      'w-full justify-start text-left font-normal',
                      !dateNaissance && 'text-muted-foreground'
                    )}
                  >
                    {dateNaissance ? format(dateNaissance, 'dd/MM/yyyy') : <span>12/06/1995</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={dateNaissance}
                    onSelect={setDateNaissance}
                    {...form.register('dateNaissance')}
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div>
              <Label htmlFor="lieuNaissance">Lieu de naissance</Label>
              <Input id="lieuNaissance" placeholder="Grand Bassam" {...form.register('lieuNaissance')} />
            </div>
            <div>
              <Label htmlFor="situationFamiliale">Situation familiale</Label>
              <Select defaultValue="Grand Bassam" {...form.register('situationFamiliale')}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionnez" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Grand Bassam">Grand Bassam</SelectItem>
                  {/* Add real options, e.g., Célibataire, Marié, etc. */}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="bienProprietaire">Sélectionner le bien du propriétaire</Label>
            <div className="relative">
              <Input
                id="bienProprietaire"
                placeholder="Sélectionner le bien du propriétaire"
                {...form.register("bienProprietaire")}
              />
              <Plus
                className="absolute right-3 top-1/2 -translate-y-1/2 h-10 w-10 bg-green-500 text-white rounded-full p-2"
              />
            </div>
          </div>
        </section>

        <section>
          <SectionTitle content="2. Document D&apos;Identification"/>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label htmlFor="typePiece">Type de pièce</Label>
              <Select defaultValue="CNI" {...form.register('typePiece')}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionnez" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="CNI">CNI</SelectItem>
                  {/* Add more options as needed */}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="numeroCNI">Numéro de la carte CNI</Label>
              <Input id="numeroCNI" placeholder="exemple@gmail.com" {...form.register('numeroCNI')} />
            </div>
            <div>
              <Label htmlFor="dateExpiration">Date d'expiration</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                                        variant="date_picker"
                    size="date_picker"
                    className={cn(
                      'w-full justify-start text-left font-normal'
                    )}
                  >
                    {dateExpiration ? format(dateExpiration, 'dd/MM/yyyy') : <span>Choisir une date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={dateExpiration}
                    onSelect={setDateExpiration}
                    {...form.register('dateExpiration')}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </section>
      </form>
    </div>
  )
}

export default DashboardPage
