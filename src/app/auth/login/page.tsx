import LoginForm from '@/features/auth/components/forms/login-form';
import Link from 'next/link';

const LoginPage = () => {
    return (
        <div className="flex size-full h-[62rem] w-[50rem] flex-col gap-10 ">
            <h1 className="text-[3.5rem]">Se connecter</h1>
            <p>
                Vous n’avez pas de compte?{' '}
                <Link
                    href={'/auth/inscription'}
                    className="font-semibold text-[#1C4532] underline"
                >
                    Inscrivez-vous ici
                </Link>
            </p>
            <LoginForm />
        </div>
    );
};

export default LoginPage;
