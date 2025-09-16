'use client';

import { usePathname } from 'next/navigation';
import { useMemo } from 'react';
import { useScopedI18n } from '../../../../../locales/client';

/**
 * Composant qui affiche un titre dynamique basé sur la route actuelle
 */
export const PageTitle = () => {
    const pathname = usePathname();
    const scopedT = useScopedI18n('nav_menu');

    const pageTitle = useMemo(() => {
        // Extraction du dernier segment de l'URL (après le dernier /)
        const segments = pathname.split('/');
        const lastSegment = segments[segments.length - 1];

        // Mapping des routes vers des titres plus lisibles
        const routeTitleMap: Record<string, string> = {
            // Particular
            dashboard: scopedT('dashboard.menu_description'),
            transactions: scopedT('transactions.menu_description'),
            beneficiaires: scopedT('beneficiaries.menu_description'),
            documents: scopedT('documents.menu_description'),
            conversions: scopedT('conversions.menu_description')
        };

        // Retourne le titre correspondant à la route ou un titre par défaut
        return routeTitleMap[lastSegment] || 'Page';
    }, [pathname, scopedT]);

    return (
        <h2 className="text-[2.5rem] font-bold text-[#0E4F8B]">{pageTitle}</h2>
    );
};
