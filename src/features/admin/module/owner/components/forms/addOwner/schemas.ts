import z from "zod";

export const addOwnerFormSchema = z.object({
    typePersonne: z.string().min(1, { message: 'Sélectionnez un type' }),
    nom: z.string().min(1, { message: 'Nom requis' }),
    prenom: z.string().min(1, { message: 'Prénom requis' }),
    dateNaissance: z.string().min(1, { message: 'Date de naissance requise' }),
    lieuNaissance: z.string().min(1, { message: 'Lieu de naissance requis' }),
    situationFamiliale: z.string().min(1, { message: 'Situation familiale requise' }),
    bienProprietaire: z.string().optional(),
    typePiece: z.string().min(1, { message: 'Type de pièce requis' }),
    numeroCNI: z.string().min(1, { message: 'Numéro de CNI requis' }),
    dateExpiration: z.string().min(1, { message: 'Date d\'expiration requise' }),
    telephonePrincipal: z.string().min(1, { message: 'Numéro de téléphone requis' }),
    email: z.string().email({ message: 'Email valide requis' }),
    adresse: z.string().min(1, { message: 'Adresse requise' }),
    commune: z.string().min(1, { message: 'Commune requise' }),
    quartier: z.string().min(1, { message: 'Quartier requis' }),
    paysResidence: z.string().min(1, { message: 'Pays de résidence requis' }),
    profession: z.string().min(1, { message: 'Profession requise' }),
    employeur: z.string().min(1, { message: 'Employeur requis' }),
    revenuMensuel: z.number().min(1, { message: 'Revenu mensuel requis' }),
    modeReception: z.string().min(1, { message: 'Mode de réception requis' }),
    banque: z.string().optional(),
    titulaireCompte: z.string().optional(),
    documents: z
        .array(z.any())
        .optional()
        .refine((files) => !files || files.every((file: File) => file instanceof File), {
            message: 'Veuillez uploader des fichiers valides',
        }),
});

export type addOwnerFormData = z.infer<typeof addOwnerFormSchema>;