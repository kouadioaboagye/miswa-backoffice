/**
 * Ce fichier de configuration contient toutes les routes de l'application
 * C'est un moyen de tout centraliser pour une meilleur gestion des routes
 */

import { list, root } from "postcss";

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
            advertisements: {
                root: `${ROOTS.ADMIN}/module/advertisement`,
            },
            owner: {
                root: `${ROOTS.ADMIN}/module/owner`,
                list: `${ROOTS.ADMIN}/module/owner/list`,
                payments: `${ROOTS.ADMIN}/module/owner/payment`,
                contracts: `${ROOTS.ADMIN}/module/owner/contracts`
            },
            tenant: {
                root: `${ROOTS.ADMIN}/module/tenant`,
                tenants: `${ROOTS.ADMIN}/module/tenant/list`,
                payments: `${ROOTS.ADMIN}/module/tenant/payments`,
                contracts: `${ROOTS.ADMIN}/module/tenant/contracts`
            },
            property: {
                root: `${ROOTS.ADMIN}/module/property`,
                building: {
                    list: `${ROOTS.ADMIN}/module/property/building`,
                },
                asset: {
                    list: `${ROOTS.ADMIN}/module/property/asset`,
                }
            },
            advertisement: {
                root: `${ROOTS.ADMIN}/module/advertisement`,
                inprogress: `${ROOTS.ADMIN}/module/advertisement/inprogress`,
                archived: `${ROOTS.ADMIN}/module/advertisement/archived`,
                draft: `${ROOTS.ADMIN}/module/advertisement/draft`,
                visit: {
                    list: `${ROOTS.ADMIN}/module/advertisement/visit/list`,
                    terminated: `${ROOTS.ADMIN}/module/advertisement/visit/terminated`,
                }
            },
            contract: {
                root: `${ROOTS.ADMIN}/module/contract`,
                active: `${ROOTS.ADMIN}/module/contract/active`,
                terminated: `${ROOTS.ADMIN}/module/contract/terminated`,
                pending: `${ROOTS.ADMIN}/module/contract/pending`,
            }
        }
    }
};
