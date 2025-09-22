import { Button } from '@/shared/components/ui/button';
import { Checkbox } from '@/shared/components/ui/checkbox';
import { Input } from '@/shared/components/ui/input';
import { Label } from '@/shared/components/ui/label';
import Link from 'next/link';
import {
    FlatColorIconsGoogle,
    LogosFacebook
} from '../../../../public/assets/icons/edite-icon';

const SignPage = () => {
    return (
        <div className="flex size-full h-[62rem] w-[90rem] flex-col gap-10 ">
            <h1 className="text-[3.5rem]">S&#39;inscrire</h1>
            <p>
                Vous avez déjà compte?{' '}
                <Link
                    href={'/auth/login'}
                    className="font-semibold text-[#1C4532] underline"
                >
                    Connectez-vous ici
                </Link>
            </p>
            <form action="" className="grid w-[86rem] grid-cols-2 gap-8">
                <div className="flex w-[42rem] flex-col gap-4">
                    <Label className="text-[1.3rem]" htmlFor="nom">
                        Nom
                    </Label>
                    <Input
                        id="nom"
                        placeholder="Dupont"
                        type="text"
                        autoComplete="off"
                    />
                </div>
                <div className="flex w-[42rem] flex-col gap-4">
                    <Label className="text-[1.3rem]" htmlFor="prenom">
                        Prénom
                    </Label>
                    <Input
                        id="prenom"
                        placeholder="Jean"
                        type="text"
                        autoComplete="off"
                    />
                </div>
                <div className="flex w-[42rem] flex-col gap-4">
                    <Label className="text-[1.3rem]" htmlFor="contact">
                        Contact
                    </Label>
                    <Input
                        id="contact"
                        placeholder="Dupont"
                        type="text"
                        autoComplete="off"
                    />
                </div>
                <div className="flex w-[42rem] flex-col gap-4">
                    <Label className="text-[1.3rem]" htmlFor="email">
                        E-mail
                    </Label>
                    <Input
                        id="email"
                        placeholder="Jean"
                        type="email"
                        autoComplete="off"
                    />
                </div>
                <div className="flex w-[42rem] flex-col gap-4">
                    <Label className="text-[1.3rem]" htmlFor="password">
                        Mot de passe
                    </Label>
                    <Input
                        id="password"
                        placeholder="Mot de passe"
                        type="password"
                        autoComplete="off"
                        showToggle
                    />
                </div>
                <div className="flex w-[42rem] flex-col gap-4">
                    <Label className="text-[1.3rem]" htmlFor="confirm-password">
                        Confirmer le mot de passe
                    </Label>
                    <Input
                        id="confirm-password"
                        placeholder="Confirmer le mot de passe"
                        type="password"
                        autoComplete="off"
                        showToggle
                    />
                </div>
                <div className="flex items-center gap-2">
                    <Checkbox id="remember" className="size-5 rounded-md" />
                    <Label
                        htmlFor="remember"
                        className="text-[1.3rem] font-thin text-[#718096]"
                    >
                        Se rappeler de moi
                    </Label>
                </div>
                <div />
                <Button
                    type="submit"
                    variant="secondary"
                    size="default"
                    className="col-span-2 mt-2 h-[4.5rem] w-full "
                >
                    Sign Up
                </Button>
                <hr className="col-span-2" />
                <Button
                    type="button"
                    variant="outline"
                    size="default"
                    className="mt-2 h-[4.5rem] w-full border border-[#CBD5E0] [&_svg]:size-8"
                >
                    <FlatColorIconsGoogle /> Continuer avec Google
                </Button>

                <Button
                    type="button"
                    variant="outline"
                    size="default"
                    className="mt-2 h-[4.5rem] w-full border border-[#CBD5E0] [&_svg]:size-8"
                >
                    <LogosFacebook /> Continuer avec Facebook
                </Button>
            </form>
        </div>
    );
};

export default SignPage;
