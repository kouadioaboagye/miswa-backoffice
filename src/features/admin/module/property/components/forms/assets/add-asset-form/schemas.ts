import z from "zod";

export const addAssetFormSchema = z.object({
    building: z.string({required_error: 'Veuillez sélectionner un type bâtiment'}),
    reference: z.string().min(1, { message: 'Référence interne requise' }),
    name: z.string().min(1, { message: 'Nom requis' }),
    area_m2: z.number({        
        required_error: 'Le superficie est requise',
        invalid_type_error: 'La superficie doit être positive'
    }).min(0),
    internet: z.boolean(),
    water: z.boolean(),
    parking: z.boolean(),
    description: z.string().optional(),
    building_steps_level: z.number({        
        required_error: 'Le niveau est requis',
        invalid_type_error: 'Le niveau est requis'
    }),
    documents: z
        .array(z.any())
        .optional()
        .refine((files) => !files || files.every((file: File) => file instanceof File), {
            message: "Veuillez uploader des fichiers valides",
        }),
    documentUrls: z.array(z.string()).optional(),
    coverUrl: z.string().optional(),
    otherMediaUrls: z.array(z.string()).optional(),
    media: z.object({
        coverPicture: z
            .any()
            .optional()
            .refine((file) => !file || file instanceof File, {
                message: "Veuillez uploader un fichier valide pour la photo de couverture",
            }),
        otherMedia: z
            .array(z.any())
            .optional()
            .refine((files) => !files || files.every((file: File) => file instanceof File), {
                message: "Veuillez uploader des fichiers valides pour les autres médias",
            }),
    }),
    rooms_count: z.number({        
        required_error: 'Le nombre de pièces est requis',
        invalid_type_error: 'Veuillez entrer un chiffre valide'
    }).min(1),
    built_year: z.number({
        required_error: 'L\'année de construction est requise',
        invalid_type_error: 'L\'année doit être supérieure ou égale à 1900'
    }).min(1900),
    monthly_rent_amount: z.number({        
        required_error: 'Le loyer est requis',
        invalid_type_error: 'Le montant du loyer doit être positif'
    }).min(0,),
    is_public: z.boolean().optional(),
    is_active: z.boolean().optional(),
    longitude: z.number().optional(),
    latitude: z.number().optional(),
    id_business: z.number().optional(),
});

export type addAssetFormData = z.infer<typeof addAssetFormSchema>;