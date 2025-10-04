import z from "zod";

export const addOwnerFormSchema = z.object({
    typePersonne: z.string().min(1, { message: 'Sélectionnez un type' }),
    nom: z.string().min(1, { message: 'Nom requis' }),
    prenom: z.string().optional(),
    dateNaissance: z.string().optional(),
    lieuNaissance: z.string().optional(),
    situationFamiliale: z.string().optional(),
    bienProprietaire: z.string().optional(),
    typePiece: z.string().optional(),
    numeroCNI: z.string().optional(),
    dateExpiration: z.string().optional(),
    telephonePrincipal: z.string().min(1, { message: 'Numéro de téléphone requis' }),
    email: z.string().optional(),
    adressePostale: z.string().optional(),
    commune: z.string().optional(),
    quartier: z.string().optional(),
    paysResidence: z.string().min(1, { message: 'Pays de résidence requis' }),
    profession: z.string().optional(),
    employeur: z.string().optional(),
    revenuMensuel: z.string().optional(),
    modeReception: z.string().optional(),
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