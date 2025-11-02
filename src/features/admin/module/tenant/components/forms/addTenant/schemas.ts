import z from "zod";

export const addTenantFormSchema = z.object({
    nom: z.string().min(1, { message: 'Nom requis' }),
    prenom: z.string().min(1, { message: 'Prénom requis' }),
    email: z.string().email({ message: 'Email valide requis' }),
    dateNaissance: z.string().min(1, { message: 'Date de naissance requise' }),
    lieuNaissance: z.string().min(1, { message: 'Lieu de naissance requis' }),
    situationFamiliale: z.string().min(1, { message: 'Situation familiale requise' }),
    property_id: z.string().min(1, { message: 'Le bien est requis' }),
    typePiece: z.string().min(1, { message: 'Type de pièce requis' }),
    numeroCNI: z.string().min(1, { message: 'Numéro de CNI requis' }),
    dateExpiration: z.string().min(1, { message: 'Date d\'expiration requise' }),
    telephonePrincipal: z
        .string()
        .regex(/^\+?\d{8,15}$/, {
            message: 'Format de numéro invalide. Exemple: +22501234567',
        }),
    adresse: z.string().min(1, { message: 'Adresse requise' }),
    commune: z.string().min(1, { message: 'Commune requise' }),
    quartier: z.string().min(1, { message: 'Quartier requis' }),
    paysResidence: z.string().min(1, { message: 'Pays de résidence requis' }),
    profession: z.string().min(1, { message: 'Profession requise' }),
    employeur: z.string().min(1, { message: 'Employeur requis' }),
    adresse_employeur: z.string().min(1, { message: 'Adresse requise' }),
    contract_type: z.string().min(1, { message: 'Type de contrat requis' }),
    contract_start_date: z.string().min(1, { message: 'Date de début de contrat requis' }),
    garant_name: z.string().min(1, { message: 'Requis' }),
    garant_phonenumber: z.string().min(1, { message: 'Requis' }),
    documents: z
        .array(z.any())
        .optional()
        .refine((files) => !files || files.every((file: File) => file instanceof File), {
            message: 'Veuillez uploader des fichiers valides',
        }),
});

export type addTenantFormData = z.infer<typeof addTenantFormSchema>;