import { z } from "zod";

export const addPropertyFormSchema = z.object({
  ville: z.string().optional(),
  adresse: z.string().optional(),
  typebatiment: z.string().optional(),
  proprietaire: z.string().min(1, { message: 'Sélectionnez un type' }),
  quartier: z.string().optional(),
  nom: z.string().min(1, { message: 'Nom requis' }),
  annee: z.string().optional(),
  superficie: z.string().optional(),
  nbetage: z.string().optional(),
  price:z.string().optional(),
  description:z.string().optional(),

  // // Booléens avec valeurs par défaut
  // ascenseur: z.boolean().default(false),
  // parking: z.boolean().default(false),
  // climatisation: z.boolean().default(false),
  // chauffage: z.boolean().default(false),
  // internet: z.boolean().default(false),
  // garde: z.boolean().default(false),
  // piscine: z.boolean().default(false),
  // salleSport: z.boolean().default(false),
  // jardin: z.boolean().default(false),
  // terrasse: z.boolean().default(false),
  // buanderie: z.boolean().default(false),
  // camera: z.boolean().default(false),

   eau: z.enum(['soneb', 'puits', 'forage', 'mixte']).optional(),
  // electricite: z.enum(['cie', 'generateur', 'solaire', 'mixte']).optional(),
  // securite: z.enum(['basique', 'intermediaire', 'avance', 'aucun']).optional(),
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

// ⚡ Utiliser z.output au lieu de z.infer



export type AddPropertyForm = z.infer<typeof addPropertyFormSchema>;
