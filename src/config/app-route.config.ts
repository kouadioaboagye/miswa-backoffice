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
        property: {
            root: `${ROOTS.ADMIN}/property`,
            propertyForm: `${ROOTS.ADMIN}/property/property-form-page`
        },
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
            owner: `${ROOTS.ADMIN}/module/owner`,
            tenant: `${ROOTS.ADMIN}/module/tenant`,
            property: `${ROOTS.ADMIN}/module/property`
        }
    }
};
