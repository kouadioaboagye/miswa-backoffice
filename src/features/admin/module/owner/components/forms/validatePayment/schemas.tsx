import z from "zod";

export const validatePaymentFormSchema = z.object({
  numero: z.string().min(1, { message: "Entrez un numéro valide" }),
  referencePayment: z.string().min(1, { message: "Entrez la référence de paiement" }),
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

export type ValidatePaymentFormData = z.infer<typeof validatePaymentFormSchema>;