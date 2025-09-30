/**
 * Ce fichier de configuration contient toutes les routes de l'application
 * C'est un moyen de tout centraliser pour une meilleur gestion des routes
 */

const ROOTS = {
    AUTH: '/auth',
    ADMIN: '/admin'
};

export const paths = {
    auth: {
        login: '/auth/login',
        inscription: '/auth/inscription',
        forgetPassword: '/auth/forget-password',
        resetPassword: '/auth/reset-password',
        verifyOtp: '/auth/verify-otp',
        chooseProfil: '/choose-profil'
    },
    admin: {
        root: ROOTS.ADMIN,
        dashboard: `${ROOTS.ADMIN}/dashboard`,
        property: `${ROOTS.ADMIN}/property`,
        payments: `${ROOTS.ADMIN}/payments`,
        contracts: `${ROOTS.ADMIN}/contracts`,
        interventions: `${ROOTS.ADMIN}/interventions`,
        config: {
            root: `${ROOTS.ADMIN}/configs`,
            users: `${ROOTS.ADMIN}/configs/users`,
            blog: `${ROOTS.ADMIN}/configs/blog`
        },
        module: {
            root: `${ROOTS.ADMIN}/module`,
            advertisements: `${ROOTS.ADMIN}/module/advertisements`,
            owner: {
                root: `${ROOTS.ADMIN}/module/owner/root`,
                owners: `${ROOTS.ADMIN}/module/owner`,
                payments: `${ROOTS.ADMIN}/module/owner/payment`,
                contracts: `${ROOTS.ADMIN}/module/owner/contracts`
            },
            tenant: `${ROOTS.ADMIN}/module/tenant`,
            property: `${ROOTS.ADMIN}/module/property`
        }
    }
};
