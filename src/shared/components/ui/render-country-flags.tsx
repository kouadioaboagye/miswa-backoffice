import type { ReactNode } from 'react';

interface CountryFlagOptions {
    /**
     * Afficher le nom du pays à côté du drapeau
     * @default false
     */
    showName?: boolean;

    /**
     * Nom du pays à afficher (si showName est true)
     * Si non fourni, le code pays sera utilisé
     */
    countryName?: string;

    /**
     * Taille du drapeau
     * @default 'size-6'
     */
    flagSize?: string;

    /**
     * Afficher uniquement le nom complet du pays (sans drapeau)
     * @default false
     */
    nameOnly?: boolean;
}

/**
 * Affiche les drapeaux des pays à partir d'une chaîne de texte contenant des codes pays
 * @param text Texte contenant des codes pays (ex: "Transfert CI → CM")
 * @param options Options d'affichage (showName, countryName, flagSize)
 * @returns Composant React affichant les drapeaux correspondants
 * @example
 * // Affiche le drapeau de la Côte d'Ivoire, une flèche, puis le drapeau du Cameroun
 * renderCountryFlags("Transfert CI → CM")
 *
 * // Affiche le drapeau du Cameroun avec son nom
 * renderCountryFlags("CM", { showName: true, countryName: "Cameroun" })
 */
export function renderCountryFlags(
    text: string | null | undefined,
    options: CountryFlagOptions = {}
): ReactNode {
    if (!text) return null;

    const {
        showName = false,
        countryName,
        flagSize = 'size-6',
        nameOnly = false
    } = options;

    // Si nameOnly est true, on affiche uniquement le nom du pays
    if (nameOnly && countryName) {
        return <span>{countryName}</span>;
    }

    // Cas 1: Transfert entre deux pays (ex: "Transfert CI → CM")
    const transferMatch = text.match(/([A-Z]{2})\s*→\s*([A-Z]{2})/);
    if (transferMatch) {
        const sourceCountry = transferMatch[1];
        const destCountry = transferMatch[2];

        return (
            <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                    <span
                        className={`fi fi-${sourceCountry.toLowerCase()} ${flagSize} rounded-sm`}
                        title={sourceCountry}
                    ></span>
                    {showName && (
                        <span className="ml-1">
                            {countryName?.split(' → ')[0] || sourceCountry}
                        </span>
                    )}
                </div>
                <span className="mx-1">→</span>
                <div className="flex items-center gap-1">
                    <span
                        className={`fi fi-${destCountry.toLowerCase()} ${flagSize} rounded-sm`}
                        title={destCountry}
                    ></span>
                    {showName && (
                        <span className="ml-1">
                            {countryName?.split(' → ')[1] || destCountry}
                        </span>
                    )}
                </div>
            </div>
        );
    }

    // Cas 2: Un seul pays mentionné
    const singleCountryMatch = text.match(/([A-Z]{2})/);
    if (singleCountryMatch) {
        const countryCode = singleCountryMatch[1];

        if (!showName) {
            return (
                <span
                    className={`fi fi-${countryCode.toLowerCase()} ${flagSize} rounded-sm`}
                    title={countryCode}
                ></span>
            );
        }

        return (
            <div className="flex items-center gap-1">
                <span
                    className={`fi fi-${countryCode.toLowerCase()} ${flagSize} rounded-sm`}
                    title={countryCode}
                ></span>
                {showName && (
                    <span className="ml-1">{countryName || countryCode}</span>
                )}
            </div>
        );
    }

    // Si aucun code pays n'est trouvé, afficher le texte original
    return text;
}
