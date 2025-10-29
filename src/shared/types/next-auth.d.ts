// Types for next-auth
import 'next-auth';
import 'next-auth/jwt';

declare module 'next-auth' {
    interface User {
        access_token: string;
        token_type: string;
        validity_minutes: number;
        expires_at: number;
    }

    export interface Session {
        user: User;
    }
}

declare module 'next-auth/jwt' {
    export interface JWT {
        access_token: string;
        token_type: string;
        validity_minutes: number;
        expires_at: number;
    }
}
