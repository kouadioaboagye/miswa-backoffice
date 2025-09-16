// Types for next-auth
import 'next-auth';
import 'next-auth/jwt';

declare module 'next-auth' {
    interface User {
        sub: string;
        id: string;
        firstname: string;
        lastname: string;
        email: string;
        phone_number: string;
        is_active: boolean;
        is_first_login: boolean;
        account_type: string;
        profile: {
            created_at: string;
            updated_at: string;
            deleted_at: string | null;
            created_by: string | null;
            updated_by: string | null;
            deleted_by: string | null;
            id: string;
            libelle: string;
            code: string;
            description: string;
            is_active: boolean;
            operator_id: string | null;
            profile_fonctionnalites: unknown[];
        };
        wallet: {
            id: string;
            is_active: boolean;
        } | null;
        business: Record<string, unknown> | null;
        iat: number;
        exp: number;
        accessToken: string;
        refreshToken: string;
    }

    export interface Session {
        user: User;
    }
}

declare module 'next-auth/jwt' {
    export interface JWT {
        sub: string;
        id: string;
        firstname: string;
        lastname: string;
        email: string;
        phone_number: string;
        is_active: boolean;
        is_first_login: boolean;
        account_type: string;
        profile: {
            created_at: string;
            updated_at: string;
            deleted_at: string | null;
            created_by: string | null;
            updated_by: string | null;
            deleted_by: string | null;
            id: string;
            libelle: string;
            code: string;
            description: string;
            is_active: boolean;
            operator_id: string | null;
            profile_fonctionnalites: unknown[];
        };
        wallet: {
            id: string;
            is_active: boolean;
        } | null;
        business: Record<string, unknown> | null;
        iat: number;
        exp: number;
        accessToken: string;
        refreshToken: string;
    }
}
