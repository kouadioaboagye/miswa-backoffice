import { z } from "zod";

export const addPropertyFormSchema = z.object({
  ville: z.string().min(1, { message: 'La ville est requise' }),
  adresse: z.string().min(1, { message: 'L\'adresse est requise' }),
  typebatiment: z.string().min(1, { message: 'Le type de bâtiment est requis' }),
  proprietaire: z.string().min(1, { message: 'Le propriétaire est requis' }),
  quartier: z.string().min(1, { message: 'Le quartier est requis' }),
  nom: z.string().min(1, { message: 'Le nom du bien est requis' }),
  annee: z.string().min(1, { message: 'L\'année de création est requise' }),
  superficie: z.string().min(1, { message: 'La superficie est requise' }),
  rooms_count: z.string().min(1, { message: 'Le nombre de chambres est requis' }),
  price: z.string().min(1, { message: 'Le prix est requis' }),
  description: z.string().min(1, { message: 'La description est requise' }),
  reference: z.string().optional(),

  eau: z.enum(['soneb', 'puits', 'forage', 'mixte']).optional(),
  equipements: z.array(z.string()).default([]).optional(),

  documents: z
    .array(z.any())
    .optional()
    .refine((files) => !files || files.every((file: File) => file instanceof File), {
      message: 'Veuillez uploader des fichiers valides',
    }),

  media: z
    .array(z.any())
    .optional()
    .refine((files) => !files || files.every((file: File) => file instanceof File), {
      message: 'Veuillez uploader des fichiers valides',
    }),
}).refine((data) => {
  // Validation personnalisée pour s'assurer que proprietaire est défini
  if (!data.proprietaire || data.proprietaire.trim() === '') {
    return false;
  }
  return true;
}, {
  message: "Le propriétaire est requis",
  path: ["proprietaire"] // Associer l'erreur au champ proprietaire
});

// Schéma pour l'édition (tous les champs optionnels sauf ceux essentiels)
export const editPropertyFormSchema = z.object({
  ville: z.string().optional(),
  adresse: z.string().optional(),
  typebatiment: z.string().optional(),
  proprietaire: z.string().optional(),
  quartier: z.string().optional(),
  nom: z.string().min(1, { message: 'Le nom du bien est requis' }),
  annee: z.string().optional(),
  superficie: z.string().optional(),
  rooms_count: z.string().optional(),
  price: z.string().optional(),
  description: z.string().optional(),
  reference: z.string().optional(),

  eau: z.enum(['soneb', 'puits', 'forage', 'mixte']).optional(),
  equipements: z.array(z.string()).default([]).optional(),

  documents: z
    .array(z.any())
    .optional()
    .refine((files) => !files || files.every((file: File) => file instanceof File), {
      message: 'Veuillez uploader des fichiers valides',
    }),

  media: z
    .array(z.any())
    .optional()
    .refine((files) => !files || files.every((file: File) => file instanceof File), {
      message: 'Veuillez uploader des fichiers valides',
    }),
});

export type AddPropertyForm = z.infer<typeof addPropertyFormSchema>;
export type EditPropertyForm = z.infer<typeof editPropertyFormSchema>;