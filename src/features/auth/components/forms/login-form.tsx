'use client';
import { Button } from '@/shared/components/ui/button';
import { Checkbox } from '@/shared/components/ui/checkbox';
import { Input } from '@/shared/components/ui/input';
import { Label } from '@/shared/components/ui/label';
import { LockIcon, MailIcon } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
    FlatColorIconsGoogle,
    LogosFacebook
} from '../../../../../public/assets/icons/edite-icon';

const LoginForm = () => {
    const router = useRouter();

    return (
        <form action="" className="flex w-[40rem] flex-col gap-6">
            <div className="flex flex-col gap-4">
                <Label className="text-[1.3rem]" htmlFor="email">
                    Email
                </Label>
                <Input
                    id="email"
                    placeholder="Email"
                    type="email"
                    autoComplete="off"
                    leftIcon={<MailIcon className="size-5 text-gray-500" />}
                />
            </div>
            <div className="flex flex-col gap-4">
                <Label className="text-[1.3rem]" htmlFor="password">
                    Mot de passe
                </Label>
                <Input
                    id="password"
                    placeholder="Mot de passe"
                    type="password"
                    autoComplete="off"
                    leftIcon={<LockIcon className="size-5 text-gray-500" />}
                    showToggle
                />
            </div>
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Checkbox id="remember" className="size-5 rounded-md" />
                    <Label
                        htmlFor="remember"
                        className="text-[1.3rem] font-thin text-[#718096]"
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
                type="button"
                variant="secondary"
                size="default"
                className="mt-6 h-[4.5rem]"
                onClick={() => router.push('/admin/dashboard')}
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
    );
};

export default LoginForm;
