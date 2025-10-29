import z from 'zod';

const isDateBefore = (date1: string, date2: string) => {
    return new Date(date1) < new Date(date2);
};

export const contractFormSchema = z
    .object({
        contract_type: z
            .string()
            .min(1, { message: 'Le type de contrat est requis' }),
        property_id: z
            .string()
            .min(1, { message: "L'ID de propriété est requis" }),
        tenant_id: z
            .string()
            .min(1, { message: "L'ID du locataire est requis" }),
        start_date: z
            .string()
            .min(1, { message: 'La date de debut est requise' }),
        end_date: z.string().min(1, { message: 'La date de fin est requise' }),
        rent_amount: z
            .string()
            .min(0, { message: 'Le montant du loyer doit être positif' }),
        contract_document_type: z
            .string()
            .min(1, { message: 'Le type de document de contrat est requis' }),
        document_urls: z
            .array(
                z.string().min(1, {
                    message: 'Le lien du document de contrat est requis'
                })
            )
            .min(1, {
                message: 'Au moins un lien de document de contrat est requis'
            })
        // status: z
        //     .string()
        //     .min(1, { message: 'Le statut est requis' })
        //     .refine(
        //         (status) => ['pending', 'active', 'inactive'].includes(status),
        //         {
        //             message:
        //                 'Le statut doit être "pending", "active" ou "inactive"'
        //         }
        //     )
    })
    .refine((data) => isDateBefore(data.start_date, data.end_date), {
        message: 'La date de début doit être antérieure à la date de fin',
        path: ['end_date']
    });

export type ContractFormSchema = z.infer<typeof contractFormSchema>;
