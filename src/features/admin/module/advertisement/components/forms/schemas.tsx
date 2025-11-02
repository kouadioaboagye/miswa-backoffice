import z from "zod";

export const addAdvertisementFormSchema = z.object({
    nom: z.string().min(1, { message: 'Nom requis' }),
    propertyId: z.string().min(1, { message: 'Bien requis' }),
    montant: z.number().min(1, { message: 'Le montant du loyer doit être supérieur à 0' }),
    availableDate: z.string().min(1, { message: 'Date de disponibilité requise' }),
});

export type addAdvertisementFormData = z.infer<typeof addAdvertisementFormSchema>;