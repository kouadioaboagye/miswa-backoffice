import z from "zod";

export const paymentFormSchema = z.object({
  proprietor: z.string().min(1, { message: "Sélectionnez un propriétaire" }),
  username: z.string().min(1, { message: "Le username est requis" }),
  paymentType: z.string().min(1, { message: "Type de paiement requis" }),
  property: z.string().min(1, { message: "Sélectionnez un bien" }),
  note: z.string().optional(),
  files: z
    .array(z.any())
    .optional()
    .refine((files) => !files || files.every((file: File) => file instanceof File), {
      message: "Veuillez uploader des fichiers valides",
    }),
});

export type PaymentFormData = z.infer<typeof paymentFormSchema>;