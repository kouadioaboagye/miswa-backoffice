import z from "zod";

export const addBuildingFormSchema = z.object({
  nomBatiment: z.string().min(1, { message: "Nom requis" }),
  typeBatiment: z.string().min(1, { message: "Type requis" }),
  adresse: z.string().min(1, { message: "Adresse requise" }),
  quartier: z.string().min(1, { message: "Quartier requis" }),
  municipality: z.string().min(1, { message: "Municipalité requise" }),
  business: z.string().min(1, { message: "Propriétaire requis" }),
  totalUnit: z.number().min(1, { message: "Nombre d'unités requis" }),
  buildingYear: z.string().min(1, { message: "Année de construction requise" }),
  landSurface: z.number().min(1, { message: "Superficie requise" }),
  floorNumber: z.number().min(1, { message: "Nombre d'étages requis" }),
  description: z.string().optional(),
  longitude: z.number().optional(),
  latitude: z.number().optional(),
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
});

export type addBuildingFormData = z.infer<typeof addBuildingFormSchema>;