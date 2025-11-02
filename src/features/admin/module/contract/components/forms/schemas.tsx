import z from "zod";

export const addContractFormSchema = z.object({
    contractType: z.string({ required_error: 'Veuillez sélectionner un type de contrat' }),
    propertyId: z.string({ required_error: 'Veuillez sélectionner un bien' }),
    ownerId: z.string({ required_error: 'Veuillez sélectionner un propriétaire' }),
    startDate: z.string().min(1, { message: 'Date de début requise' }),
    endDate: z.string().min(1, { message: 'Date de fin requise' }),
    montant: z.number({
        required_error: 'Le montant du loyer est requis',
        invalid_type_error: 'Veuillez entrer un montant valide'
    }).min(1),
    documents: z
        .array(z.any())
        .optional()
        .refine((files) => !files || files.every((file: File) => file instanceof File), {
            message: "Veuillez uploader des fichiers valides",
        }),
    documentUrls: z.array(z.string()).optional(),
});

export type addContractFormData = z.infer<typeof addContractFormSchema>;