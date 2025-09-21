'use client';

import { useAuth } from '@/shared/context/auth.context';
import { paths } from '@/config/app-route.config';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { toast } from 'sonner';

type ProfileGuardProps = {
    children: React.ReactNode;
    allowedProfiles: string[];
    redirectPath?: string;
};

/**
 * Composant de protection qui vérifie si l'utilisateur a le bon type de profil
 * pour accéder à une page.
 */
export function ProfileGuard({
    children,
    allowedProfiles,
    redirectPath
}: ProfileGuardProps) {
    const { isAuthenticated, isLoading, user } = useAuth();
    const router = useRouter();

    console.log('allowedProfiles', allowedProfiles);
    console.log('user', user);
    console.log('isAuthenticated', isAuthenticated);
    console.log('isLoading', isLoading);

    useEffect(() => {
        // Attendre que l'état d'authentification soit chargé
        if (isLoading) return;

        // Si l'utilisateur n'est pas authentifié, on le redirige vers la page d'accueil
        if (!isAuthenticated || !user) {
            toast.error('Vous devez être connecté pour accéder à cette page');
            router.push('/');
            return;
        }

        // Vérifier si l'utilisateur a le bon type de profil
        const accountType = user.account_type;
        if (!allowedProfiles.includes(accountType)) {
            toast.error(
                "Votre profil ne vous permet pas d'accéder à ce espace"
            );

            // Rediriger vers le dashboard approprié pour le type de compte
            if (accountType === 'BUSINESS') {
                router.push(paths.admin.dashboard);
            } else if (accountType === 'PARTICULAR') {
                router.push(paths.admin.dashboard);
            } else {
                // Fallback si le type n'est pas reconnu
                router.push(redirectPath || '/');
            }
        }
    }, [
        isLoading,
        isAuthenticated,
        user,
        allowedProfiles,
        router,
        redirectPath
    ]);

    // Si l'authentification est en cours, on peut afficher un loader
    if (isLoading) {
        return <div>Chargement...</div>;
    }

    // Si l'utilisateur est authentifié et a le bon profil, on affiche le contenu
    if (
        isAuthenticated &&
        user &&
        allowedProfiles.includes(user.account_type)
    ) {
        return <>{children}</>;
    }

    // Dans tous les autres cas, on n'affiche rien pendant la redirection
    return null;
}
