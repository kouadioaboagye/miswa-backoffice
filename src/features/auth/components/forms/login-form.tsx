'use client';
import { paths } from '@/config/app-route.config';
import { Button } from '@/shared/components/ui/button';
import { Checkbox } from '@/shared/components/ui/checkbox';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage
} from '@/shared/components/ui/form';
import { Input } from '@/shared/components/ui/input';
import { Label } from '@/shared/components/ui/label';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import z from 'zod';
import {
    FlatColorIconsGoogle,
    LogosFacebook
} from '../../../../../public/assets/icons/edite-icon';

const LoginForm = () => {
    const loginSchema = z.object({
        username: z.string().min(1, { message: 'Le username est requis' }),
        password: z.string().min(4, {
            message: 'Le mot de passe doit contenir au moins 6 caractères'
        })
    });

    const [isLoading, setIsLoading] = React.useState(false);

    const router = useRouter();
    const form = useForm({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            username: '',
            password: ''
        }
    });

    const onSubmit: SubmitHandler<z.infer<typeof loginSchema>> = async (
        credentials
    ) => {
        setIsLoading(true);
        const transformedCredentials = {
            ...credentials,
            login_role: 'admin'
        };

        const result = await signIn('credentials', {
            redirect: false,
            ...transformedCredentials
        });

        if (result?.ok) {
            setIsLoading(false);
            toast.success('Connexion réussie !');
            router.push(paths.admin.root);
        } else {
            setIsLoading(false);
            toast.error(
                'Échec de la connexion. Veuillez vérifier vos identifiants.'
            );
        }
    };
    return (
        <Form {...form}>
            <form
                action=""
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex w-[40rem] flex-col gap-6"
            >
                <div className="flex flex-col gap-4">
                    <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem>
                                <Label
                                    className="text-[1.3rem]"
                                    htmlFor="email"
                                >
                                    Email
                                </Label>
                                <FormControl>
                                    <Input {...field} id="email" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <div className="flex flex-col gap-4">
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <Label
                                    className="text-[1.3rem]"
                                    htmlFor="password"
                                >
                                    Mot de passe
                                </Label>
                                <FormControl>
                                    <Input
                                        {...field}
                                        id="password"
                                        type="password"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Checkbox id="remember" className="size-5 rounded-md" />
                        <Label
                            htmlFor="remember"
                            className="text-[1.3rem] text-[#718096]"
                        >
                            Se rappeler de moi
                        </Label>
                    </div>
                    <Link
                        href={''}
                        className="text-[1.3rem] font-semibold text-[#1C4532] underline"
                    >
                        Mot de passe oublié
                    </Link>
                </div>
                <Button
                    type="submit"
                    variant="secondary"
                    size="default"
                    className="mt-6 h-[4.5rem]"
                    isLoading={isLoading}
                >
                    Sign In
                </Button>
                <hr className="mt-6" />
                <div className="w-full">
                    <Button
                        type="button"
                        variant="outline"
                        size="default"
                        className="mt-4 h-[4.5rem] w-full border border-[#CBD5E0] [&_svg]:size-8"
                    >
                        <FlatColorIconsGoogle /> Continuer avec Google
                    </Button>

                    <Button
                        type="button"
                        variant="outline"
                        size="default"
                        className="mt-6 h-[4.5rem] w-full border border-[#CBD5E0] [&_svg]:size-8"
                    >
                        <LogosFacebook /> Continuer avec Facebook
                    </Button>
                    <div className="flex justify-center mt-6">
                        <Link
                            href={'/'}
                            className="text-[1.3rem] font-semibold text-[#1C4532] underline"
                        >
                            Retour au site
                        </Link>
                    </div>
                </div>
            </form>
        </Form>
    );
};

export default LoginForm;
