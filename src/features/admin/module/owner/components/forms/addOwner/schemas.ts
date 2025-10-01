import z from "zod";

export const addOwnerFormSchema = z.object({
    typePersonne: z.string().min(1, { message: 'Sélectionnez un type' }),
    nom: z.string().min(1, { message: 'Nom requis' }),
    prenom: z.string().min(1, { message: 'Prénom requis' }),
    dateNaissance: z.string().optional(),
    lieuNaissance: z.string().optional(),
    situationFamiliale: z.string().optional(),
    bienProprietaire: z.string().optional(),
    typePiece: z.string().min(1, { message: 'Sélectionnez un type' }),
    numeroCNI: z.string().min(1, { message: 'Numéro requis' }),
    dateExpiration: z.string().min(1, { message: 'Date requise' }),
    telephonePrincipal: z.string().min(1, { message: 'Numéro de téléphone requis' }),
    email: z.string().email({ message: 'Adresse email invalide' }).min(1, { message: 'Email requis' }),
    adressePostale: z.string().min(1, { message: 'Adresse postale requise' }),
    commune: z.string().optional(),
    quartier: z.string().optional(),
    paysResidence: z.string().min(1, { message: 'Pays de résidence requis' }),
    profession: z.string().min(1, { message: 'Profession requise' }),
    employeur: z.string().optional(),
    revenuMensuel: z.string().optional(),
    modeReception: z.string().min(1, { message: 'Mode de réception requis' }),
    banque: z.string().min(1, { message: 'Banque requise' }),
    titulaireCompte: z.string().min(1, { message: 'Nom du titulaire requis' }),
    documents: z
        .array(z.any())
        .optional()
        .refine((files) => !files || files.every((file: File) => file instanceof File), {
            message: 'Veuillez uploader des fichiers valides',
        }),
});

export type addOwnerFormData = z.infer<typeof addOwnerFormSchema>;