/**
 * Ce fichier de configuration permet de définir les informations générales du site
 * Il contient le titre du site, la description, et d'autre informations de méta-données si vous en avez besoin : voir dans app/layout.tsx dans la partie export metadata pour voir comment ces informations sont utilisées
 */

import type { Metadata } from 'next';

export const siteConfig = {
    meta: {
        title: 'MISWA | Espace Visiteur',
        description: 'Espace Visiteur de MISWA'
    } satisfies Metadata,

    logo: {
        default: '/assets/images/',
        colored: '/assets/images/'
    },
    icon: null
};
