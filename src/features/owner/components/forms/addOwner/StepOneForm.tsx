import { Button } from '@/shared/components/ui/button'
import { Label } from '@/shared/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/components/ui/select';
import { Input } from '@/shared/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/components/ui/popover';
import { cn } from '@/lib/utils';
import { Calendar } from '@/shared/components/ui/calendar';
import { format } from 'date-fns';
import { Plus } from 'lucide-react';
import { SectionTitle } from '@/shared/components/ui/section-title';
import React from 'react'
import { UseFormReturn } from 'react-hook-form';
import { addOwnerFormData } from './schemas';

interface StepOneFormProps {
  form: UseFormReturn<addOwnerFormData>;
  dateNaissance: Date | undefined;
  setDateNaissance: (date?: Date) => void;
  dateExpiration: Date | undefined;
  setDateExpiration: (date?: Date) => void;
}

function StepOneForm({ form, dateNaissance, setDateNaissance, dateExpiration, setDateExpiration }: Readonly<StepOneFormProps>) {
  return (
    <div>
              <section>
          <SectionTitle content="1. Identification" />
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
                    className='min-w-[250px]'
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
          <SectionTitle content="2. Document D&apos;Identification" />
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
                    className='min-w-[250px]'
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </section>
    </div>
  )
}

export default StepOneForm
