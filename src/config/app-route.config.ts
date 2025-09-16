/**
 * Ce fichier de configuration contient toutes les routes de l'application
 * C'est un moyen de tout centraliser pour une meilleur gestion des routes
 */

export const paths = {
    auth: {
        login: '/auth/login',
        inscription: '/auth/inscription',
        forgetPassword: '/auth/forget-password',
        resetPassword: '/auth/reset-password',
        verifyOtp: '/auth/verify-otp',
        chooseProfil: '/choose-profil'
    }
};
