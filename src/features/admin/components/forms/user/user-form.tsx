'use client';
import {
    useCreateUserMutation,
    useListCountriesQuery,
    useListRoleQuery,
    useUpdateUserMutation
} from '@/lib/data-service/users/users.hooks';
import { uploadFile } from '@/lib/data-service/users/users.queries';
import { PhoneInput } from '@/shared/components/atoms/rn-input';
import { Button } from '@/shared/components/ui/button';
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
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/shared/components/ui/select';
import { useModalStore } from '@/shared/store/useModalStore';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { cn } from '../../../../../../lib/utils';
import FeatherUploadCloud from '../../../../../../public/assets/icons/feather_upload-cloud';
import FlagIcon from '../../../../../../public/assets/icons/flag';
import { User, UserSchema } from './user-schema';

type UserFormProps = {
    user?: any;
    // onSubmit: SubmitHandler<any>;
};

const UserForm = ({ user }: UserFormProps) => {
    const { data: roles } = useListRoleQuery();
    const { data: countries } = useListCountriesQuery();

    const closeModal = useModalStore((state) => state.closeModal);

    const [dragActive, setDragActive] = useState(false);
    const [filePreview, setFilePreview] = useState<string | null>(null);
    const [fileObject, setFileObject] = useState<File | null>(null);

    const form = useForm({
        resolver: zodResolver(UserSchema),
        defaultValues: {
            avatar: user?.avatar || '',
            email: user?.email || '',
            first_name: user?.first_name || '',
            id_country: user?.id_country || 0,
            id_role: user?.id_role || 0,
            is_active: user?.is_active ?? true,
            last_name: user?.last_name || '',
            username: user?.username || '',
            gender: user?.gender || '',
            phone_number: user?.phone_number || ''
        }
    });

    const { mutate: createUser } = useCreateUserMutation();
    const { mutate: updateUser } = useUpdateUserMutation();

    // Afficher l’avatar du backend en modification
    useEffect(() => {
        if (user?.avatar) {
            setFilePreview(user.avatar);
            form.setValue('avatar', user.avatar); // ✅ Met à jour aussi le champ
        }
    }, [form, user]);

    const handleFileChange = (file: File) => {
        setFileObject(file);

        const previewURL = URL.createObjectURL(file);
        setFilePreview(previewURL);

        // ✅ Met à jour aussi la valeur du champ "avatar" dans le form
        form.setValue('avatar', previewURL);
    };

    const handleRemoveImage = () => {
        setFileObject(null);
        setFilePreview(null);
        form.setValue('avatar', '');
    };

    const onSubmit: SubmitHandler<User> = async (data) => {
        const transformedData = {
            user_obj: {
                ...data,
                auth_provider: 'password',
                password: '00000000'
            },
            business_name: undefined
        };

        if (fileObject) {
            await uploadFile(fileObject, 'file').then((response) => {
                if (response?.url) {
                    toast.success("L'avatar a été chargé avec succès.");
                } else {
                    toast.error("L'avatar n'a pas pu étre chargé.");
                }
            });
        }
        if (!user) {
            createUser(transformedData, {
                onSuccess: () => {
                    closeModal();
                }
            });
        } else {
            updateUser(
                { id: user.id, data: transformedData },
                {
                    onSuccess: () => {
                        closeModal();
                    }
                }
            );
        }
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
                        name="avatar"
                        render={() => (
                            <FormItem className="flex flex-col items-center">
                                <div
                                    className={cn(
                                        'relative size-[16rem] border border-dashed rounded-[1rem] flex flex-col justify-center items-center p-0 cursor-pointer transition overflow-hidden',
                                        dragActive
                                            ? 'border-blue-500 bg-blue-50'
                                            : 'border-gray-300 bg-white'
                                    )}
                                    onDragOver={(e) => {
                                        e.preventDefault();
                                        setDragActive(true);
                                    }}
                                    onDragLeave={() => setDragActive(false)}
                                    onDrop={(e) => {
                                        e.preventDefault();
                                        setDragActive(false);
                                        const files = e.dataTransfer?.files;
                                        if (files && files.length > 0) {
                                            handleFileChange(files[0]);
                                        }
                                    }}
                                >
                                    {/* hidden input */}
                                    <FormControl>
                                        <Input
                                            type="file"
                                            accept=".png,.jpeg,.jpg"
                                            className="hidden"
                                            onChange={(e) => {
                                                const files = e.target.files;
                                                if ((files?.length ?? 0) > 0)
                                                    handleFileChange(files![0]);
                                            }}
                                            id="avatarInput"
                                        />
                                    </FormControl>

                                    {/* preview */}
                                    {filePreview ? (
                                        <img
                                            src={filePreview}
                                            alt="Preview"
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="flex flex-col justify-center items-center gap-7 p-10 text-[#000]">
                                            <FeatherUploadCloud />
                                            <span className="text-[1.4rem]">
                                                Photo de profil
                                            </span>
                                        </div>
                                    )}

                                    {/* Overlay toujours visible */}
                                    <label
                                        htmlFor="avatarInput"
                                        className="absolute inset-0 flex justify-center items-end p-4 bg-transparent hover:bg-black/10 transition"
                                    >
                                        <div className="bg-white/90 backdrop-blur-sm rounded-md px-3 py-1 flex gap-2 items-center">
                                            <span className="text-[1.2rem]">
                                                Changer
                                            </span>
                                        </div>
                                    </label>

                                    {/* bouton supprimer */}
                                    {filePreview && (
                                        <button
                                            type="button"
                                            onClick={handleRemoveImage}
                                            className="absolute top-3 right-3 bg-white/90 rounded-full p-1 hover:bg-red-100 transition"
                                            aria-label="Supprimer la photo"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="16"
                                                height="16"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                className="text-red-600"
                                            >
                                                <polyline points="3 6 5 6 21 6"></polyline>
                                                <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"></path>
                                                <path d="M10 11v6"></path>
                                                <path d="M14 11v6"></path>
                                                <path d="M9 6V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2"></path>
                                            </svg>
                                        </button>
                                    )}
                                </div>
                                <FormMessage className="text-[1.2rem]" />
                            </FormItem>
                        )}
                    />
                </div>
                <div className="grid grid-cols-4 gap-5">
                    <FormField
                        control={form.control}
                        name="last_name"
                        render={({ field }) => (
                            <FormItem className="col-span-2 -mt-[0.8rem]">
                                <Label>Nom</Label>
                                <FormControl>
                                    <Input
                                        placeholder="Entrez le nom"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="first_name"
                        render={({ field }) => (
                            <FormItem className="col-span-2 -mt-[0.8rem]">
                                <Label>Prénom(s)</Label>
                                <FormControl>
                                    <Input
                                        placeholder="Entrez le prenom"
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
                            <FormItem className="col-span-2 -mt-[0.8rem]">
                                <Label>E-mail</Label>
                                <FormControl>
                                    <Input
                                        type="email"
                                        placeholder="Entrez l’email"
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
                                        placeholder="Entrez username"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {/* <FormField
                        control={form.control}
                        name=""
                        render={({ field }) => (
                            <FormItem className="flex flex-col gap-1">
                                <Label>Date de naissance</Label>
                                <Input
                                    type="date"
                                    {...field}
                                    placeholder="Entrez la date de naissance"
                                />

                                <FormMessage />
                            </FormItem>
                        )}
                    /> */}

                    <FormField
                        control={form.control}
                        name="is_active"
                        render={({ field }) => (
                            <FormItem className="col-span-2 -mt-3">
                                <Label>Statut du compte</Label>
                                <Select
                                    onValueChange={(val) =>
                                        field.onChange(val === 'true')
                                    }
                                    defaultValue={
                                        field.value === undefined
                                            ? undefined
                                            : String(field.value)
                                    }
                                >
                                    <FormControl>
                                        <SelectTrigger className="border border-gray-300">
                                            <SelectValue placeholder="Selectionner le statut" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="true">
                                            Actif
                                        </SelectItem>
                                        <SelectItem value="false">
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
                        name="id_country"
                        render={({ field }) => (
                            <FormItem className="col-span-2 -mt-3">
                                <Label>Pays</Label>
                                <Select
                                    onValueChange={(val) =>
                                        field.onChange(Number(val))
                                    }
                                    defaultValue={
                                        field.value === undefined
                                            ? undefined
                                            : String(field.value)
                                    }
                                >
                                    <FormControl>
                                        <SelectTrigger className="border border-gray-300">
                                            <SelectValue placeholder="Selectionner le pays" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {countries?.data?.map(
                                            (country: any) => (
                                                <SelectItem
                                                    key={country.id}
                                                    value={String(country.id)}
                                                >
                                                    {country.name}
                                                </SelectItem>
                                            )
                                        )}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="id_role"
                        render={({ field }) => (
                            <FormItem className="col-span-2 -mt-3">
                                <Label>Role</Label>
                                <Select
                                    onValueChange={(val) =>
                                        field.onChange(Number(val))
                                    }
                                    defaultValue={
                                        field.value === undefined
                                            ? undefined
                                            : String(field.value)
                                    }
                                >
                                    <FormControl>
                                        <SelectTrigger className="border border-gray-300">
                                            <SelectValue placeholder="Selectionner le role" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {roles?.map((role: any) => (
                                            <SelectItem
                                                key={role.id}
                                                value={String(role.id)}
                                            >
                                                {role.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="gender"
                        render={({ field }) => (
                            <FormItem className="col-span-2 -mt-3">
                                <Label>Genre</Label>
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                >
                                    <FormControl>
                                        <SelectTrigger className="border border-gray-300">
                                            <SelectValue placeholder="Selectionner le genre" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="male">
                                            Homme
                                        </SelectItem>
                                        <SelectItem value="female">
                                            Femme
                                        </SelectItem>
                                        <SelectItem value="other">
                                            Autre
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="phone_number"
                        render={({ field }) => (
                            <FormItem className="col-span-4 -mt-[0.8rem]">
                                <Label>Prénom(s)</Label>
                                <FormControl>
                                    <PhoneInput
                                        {...field}
                                        defaultCountry="CI"
                                        className="border border-gray-300"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <div className="flex gap-7">
                    <Button
                        type="button"
                        className="w-1/2 h-[48px]"
                        variant={'outline_header'}
                        onClick={closeModal}
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
