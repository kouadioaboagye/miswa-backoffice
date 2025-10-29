import { paths } from '@/config/app-route.config';
import { Login } from '@/features/admin/api/auth/auth.queries';
import NextAuth, { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const authOptions: AuthOptions = {
    secret: process.env.NEXTAUTH_SECRET,

    pages: {
        signIn: paths.auth.login, // Page de connexion personnalisée
        error: '/auth/error' // Page d'erreur personnalisée
    },

    session: { strategy: 'jwt' },

    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {},
            async authorize(credentials: any) {
                if (!credentials) {
                    throw new Error('Missing credentials');
                }
                try {
                    const response = await Login({
                        username: credentials.username,
                        password: credentials.password,
                        login_role: 'admin'
                    });

                    if (!response?.access_token) return null;

                    const user = {
                        ...response
                    };

                    return user;
                } catch (error: Error | any) {
                    const errorData = {
                        message: error.message || 'Erreur de connexion',
                        status: error.status || 500
                    };
                    console.error('Login Error:', errorData);
                    throw new Error(JSON.stringify(errorData));
                }
            }
        })
    ],

    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.access_token = (user as any).access_token;
                token.token_type = (user as any).token_type;
                token.validity_minutes = (user as any).validity_minutes;
                token.expires_at = (user as any).expires_at;
            }
            return token;
        },
        async session({ session, token }) {
            session.user = {
                ...session.user,
                access_token: token.access_token as string,
                token_type: token.token_type as string,
                validity_minutes: token.validity_minutes as number,
                expires_at: token.expires_at as number
            };
            return session;
        }
    }
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
