'use client';
import { Button } from '@/shared/components/ui/button';
import { Calendar } from '@/shared/components/ui/calendar';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage
} from '@/shared/components/ui/form';
import { Input } from '@/shared/components/ui/input';
import { Label } from '@/shared/components/ui/label';
import {
    Popover,
    PopoverContent,
    PopoverTrigger
} from '@/shared/components/ui/popover';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/shared/components/ui/select';
import { format } from 'date-fns';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { cn } from '../../../../../../lib/utils';
import FeatherUploadCloud from '../../../../../../public/assets/icons/feather_upload-cloud';
import FlagIcon from '../../../../../../public/assets/icons/flag';

const UserForm = () => {
    const [dragActive, setDragActive] = useState(false);

    const form = useForm({
        defaultValues: {
            docs: null,
            fullName: '',
            email: '',
            username: '',
            dob: undefined,
            phone: '',
            gender: '',
            status: '',
            role: '',
            modules: ''
        }
    });

    const onSubmit: SubmitHandler<any> = async (credentials) => {
        console.log(credentials);
    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col gap-10 w-[70rem]"
            >
                <div className="size-14 rounded-xl border border-gray-300 flex justify-center items-center">
                    <FlagIcon />
                </div>
                <div>
                    <h3>Créer un nouveau utilisateur</h3>
                    <p>Remplissez le formulaire pour créer l’utilisateur</p>
                </div>

                <div className="flex justify-center items-center">
                    <FormField
                        control={form.control}
                        name="docs"
                        render={({ field }) => (
                            <FormItem>
                                <div
                                    className={cn(
                                        'size-[16rem] border border-dashed rounded-[1rem] flex justify-center items-center p-10 cursor-pointer transition',
                                        dragActive
                                            ? 'border-blue-500 bg-blue-50'
                                            : 'border-gray-300'
                                    )}
                                    onDragOver={(e) => {
                                        e.preventDefault();
                                        setDragActive(true);
                                    }}
                                    onDragLeave={() => setDragActive(false)}
                                    onDrop={(e) => {
                                        e.preventDefault();
                                        setDragActive(false);
                                        const files = e.dataTransfer.files;
                                        if (files && files.length > 0) {
                                            field.onChange(files[0]); // Prendre le premier fichier
                                        }
                                    }}
                                >
                                    <FormControl>
                                        <Input
                                            type="file"
                                            accept=".pdf,.png,.jpeg,.jpg"
                                            className="hidden"
                                            onChange={(e) => {
                                                const files = e.target.files;
                                                if (files && files.length > 0) {
                                                    field.onChange(files[0]); // Prendre le premier fichier
                                                }
                                            }}
                                            id="docs"
                                        />
                                    </FormControl>
                                    <Label
                                        htmlFor="docs"
                                        className="cursor-pointer flex flex-col items-center text-[#000] gap-7"
                                    >
                                        <FeatherUploadCloud />
                                        <span className="text-[1.4rem]">
                                            Photo de profile
                                        </span>
                                    </Label>
                                </div>

                                <FormMessage className="text-[1.2rem]" />
                            </FormItem>
                        )}
                    />
                </div>
                <div className="grid grid-cols-3 gap-5">
                    <FormField
                        control={form.control}
                        name="fullName"
                        render={({ field }) => (
                            <FormItem className="col-span-3 -mt-[0.8rem]">
                                <Label>Nom et prénom</Label>
                                <FormControl>
                                    <Input
                                        placeholder="Entrez le nom et prenom"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem className="-mt-[0.8rem]">
                                <Label>E-mail</Label>
                                <FormControl>
                                    <Input
                                        type="email"
                                        placeholder="Entrez l'email"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem className="col-span-2 -mt-[0.8rem]">
                                <Label>Username</Label>
                                <FormControl>
                                    <Input
                                        placeholder="Entrez username de l'utilisateur"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="dob"
                        render={({ field }) => (
                            <FormItem className="flex flex-col gap-1">
                                <Label>Date de naissance</Label>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button
                                                variant={'outline_header'}
                                                className={cn(
                                                    'pl-3 text-left font-normal h-[48px] justify-between rounded-xl border-gray-300',
                                                    !field.value &&
                                                        'text-muted-foreground'
                                                )}
                                            >
                                                {field.value ? (
                                                    format(field.value, 'PPP')
                                                ) : (
                                                    <span>JJ/MM/AAAA</span>
                                                )}
                                                {/* <CalendarIcon className="ml-auto h-4 w-4 opacity-50" /> */}
                                            </Button>
                                        </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent
                                        className="w-auto p-0"
                                        align="start"
                                    >
                                        <Calendar
                                            mode="single"
                                            selected={field.value}
                                            onSelect={field.onChange}
                                            disabled={(date) =>
                                                date > new Date() ||
                                                date < new Date('1900-01-01')
                                            }
                                            captionLayout="dropdown"
                                        />
                                    </PopoverContent>
                                </Popover>

                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                            <FormItem className="-mt-[0.8rem]">
                                <Label>Numéro de telephone</Label>
                                <FormControl>
                                    <Input
                                        placeholder="+225 xx xx xx xx xx"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div>
                        <FormField
                            control={form.control}
                            name="gender"
                            render={({ field }) => (
                                <FormItem className="col-span-2 -mt-3">
                                    <Label>Sexe</Label>
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger className="border w-fit border-gray-300">
                                                <SelectValue placeholder="Masculin" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="masculin">
                                                Masculin
                                            </SelectItem>
                                            <SelectItem value="feminin">
                                                Féminin
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <FormField
                        control={form.control}
                        name="status"
                        render={({ field }) => (
                            <FormItem className="col-span-3 -mt-3">
                                <Label>Statut du compte</Label>
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                >
                                    <FormControl>
                                        <SelectTrigger className="border border-gray-300">
                                            <SelectValue placeholder="Actif" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="actif">
                                            Actif
                                        </SelectItem>
                                        <SelectItem value="inactif">
                                            Inactif
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="role"
                        render={({ field }) => (
                            <FormItem className="col-span-3 -mt-3">
                                <Label>Selectionner le role</Label>
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                >
                                    <FormControl>
                                        <SelectTrigger className="border border-gray-300">
                                            <SelectValue placeholder="Roles" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="admin">
                                            Admin
                                        </SelectItem>
                                        <SelectItem value="user">
                                            Utilisateur
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="modules"
                        render={({ field }) => (
                            <FormItem className="col-span-3 -mt-3">
                                <Label>Selectionner les modules</Label>
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                >
                                    <FormControl>
                                        <SelectTrigger className="border border-gray-300">
                                            <SelectValue placeholder="Locataire, Biens, Propriétaire" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="locataire">
                                            Locataire
                                        </SelectItem>
                                        <SelectItem value="biens">
                                            Biens
                                        </SelectItem>
                                        <SelectItem value="proprietaire">
                                            Propriétaire
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <div className="flex gap-7">
                    <Button
                        className="w-1/2 h-[48px]"
                        variant={'outline_header'}
                    >
                        Retour
                    </Button>
                    <Button
                        className="w-1/2 h-[48px]"
                        type="submit"
                        variant={'add'}
                    >
                        Valider
                    </Button>
                </div>
            </form>
        </Form>
    );
};

export default UserForm;
