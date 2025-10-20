import { z } from "zod";

export const editAssetFormSchema = z.object({
  name: z.string().min(1, { message: 'Le nom du bien est requis' }),
  description: z.string().min(1, { message: 'La description est requise' }),
  reference: z.string().optional(),
  street: z.string().min(1, { message: 'La rue est requise' }),
  address: z.string().min(1, { message: 'L\'adresse est requise' }),
  google_plus_code: z.string().optional(),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
  rooms_count: z.number().min(1, { message: 'Le nombre de chambres est requis' }),
  built_year: z.number().min(1900, { message: 'L\'année de construction doit être valide' }),
  area_m2: z.number().min(1, { message: 'La superficie est requise' }),
  monthly_rent_amount: z.number().min(0, { message: 'Le montant du loyer doit être positif' }),
  is_busy: z.boolean().optional(),
  is_public: z.boolean().optional(),
  is_active: z.boolean().optional(),
});

export type EditAssetForm = z.infer<typeof editAssetFormSchema>;
