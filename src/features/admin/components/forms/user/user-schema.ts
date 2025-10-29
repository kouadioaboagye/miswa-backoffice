import { z } from 'zod';

export const UserSchema = z.object({
    username: z.string().min(1, { message: 'Le username est requis' }),
    id_country: z.number().min(1, { message: 'Le pays est requis' }),
    email: z.string().email().optional(),
    avatar: z.string().optional(),
    id_role: z.number().min(1, { message: 'Le role est requis' }),
    gender: z.string().min(1, { message: 'Le sexe est requis' }),
    phone_number: z.string().min(1, { message: 'Le telephone est requis' }),
    // auth_provider: z.string().optional(),
    // provider_user_id: z.string().optional(),
    first_name: z.string().min(1, { message: 'Le prenom est requis' }),
    last_name: z.string().min(1, { message: 'Le nom est requis' }),
    is_active: z.coerce.boolean().default(true)
    // is_valid: z.boolean()
});

export type User = z.infer<typeof UserSchema>;
