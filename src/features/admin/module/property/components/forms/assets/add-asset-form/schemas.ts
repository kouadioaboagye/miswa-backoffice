import z from "zod";

export const addAssetFormSchema = z.object({
    name: z.string().min(1, { message: 'Nom requis' }),
    reference: z.string().min(1, { message: 'Référence interne requise' }),
    description: z.string().optional(),
    cover_url: z
        .any()
        .optional()
        .refine((file) => !file || file instanceof File, {
            message: 'Veuillez uploader un fichier valide pour la photo de couverture',
        }),
    photos: z
        .array(z.any())
        .optional()
        .refine((files) => !files || files.every((file: File) => file instanceof File), {
            message: 'Veuillez uploader des fichiers valides pour les autres médias',
        }),
    official_documents: z
        .array(z.any())
        .optional()
        .refine((files) => !files || files.every((file: File) => file instanceof File), {
            message: 'Veuillez uploader des fichiers valides',
        }),
    videos: z.array(z.string()).optional(),
    google_plus_code: z.string().optional(),
    address: z.string().min(1, { message: 'Adresse requise' }),
    latitude: z.number().min(-90).max(90, { message: 'Latitude doit être entre -90 et 90' }),
    longitude: z.number().min(-180).max(180, { message: 'Longitude doit être entre -180 et 180' }),
    street: z.string().optional(),
    is_public: z.boolean(),
    is_busy: z.boolean(),
    busy_until: z.string().nullable().optional(),
    monthly_rent_amount: z.number().positive({ message: 'Le loyer doit être positif' }),
    built_year: z.number().int().min(1800).max(new Date().getFullYear(), {
        message: `L'année de construction doit être entre 1800 et ${new Date().getFullYear()}`,
    }),
    area_m2: z.number().positive({ message: 'La superficie doit être positive' }),
    building_steps_level: z.number().int().min(0, { message: 'L\'étage doit être un nombre positif ou zéro' }),
    id_business: z.number().int().positive({ message: 'ID business doit être positif' }),
    id_building: z.number().int().positive({ message: 'ID building doit être positif' }),
    elevator: z.boolean(),
    internet: z.boolean(),
    water: z.boolean(),
    parking: z.object({
        available: z.boolean(),
        amount: z.number().min(0)
    }),
    security: z.object({
        available: z.boolean(),
        amount: z.number().min(0)
    }),
    commonSpaces: z.object({
        available: z.boolean(),
        amount: z.number().min(0)
    }),
});

export type addAssetFormData = z.infer<typeof addAssetFormSchema>;