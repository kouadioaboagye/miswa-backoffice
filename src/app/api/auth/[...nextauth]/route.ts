import { postLogin } from '@/features/auth/api/post-login';
import jwt from 'jsonwebtoken';
import type { AuthOptions, User } from 'next-auth';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const authOptions: AuthOptions = {
    secret: process.env.AUTH_SECRET,

    pages: {
        signIn: '/auth/login', // Page de connexion personnalisée

        error: '/auth/error' // Page d'erreur personnalisée
    },

    session: { strategy: 'jwt' },

    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: 'Email', type: 'text' },
                password: { label: 'Password', type: 'password' }
            },
            async authorize(credentials) {
                if (!credentials) {
                    throw new Error('Missing credentials');
                }

                const { email, password } = credentials as {
                    email?: string;
                    password?: string;
                };
                try {
                    const response = await postLogin({
                        email: email as string,
                        password: password as string
                    });
                    console.log('data in authorize callback:', response.data);
                    if (
                        response &&
                        response?.data?.data?.accessToken &&
                        response?.data?.data?.refreshToken
                    ) {
                        const decodedToken = jwt.decode(
                            response?.data?.data?.accessToken
                        ) as User;

                        if (!decodedToken) {
                            throw new Error('Failed to decode token');
                        }

                        const user = {
                            ...decodedToken,
                            firstname: decodedToken.firstname,
                            lastname: decodedToken.lastname,
                            profile: decodedToken.profile,
                            accessToken: response?.data?.data?.accessToken,
                            refreshToken: response?.data?.data?.refreshToken
                        };
                        console.log('user in authorize callback:', user);
                        return user;
                    }
                    throw new Error('Invalid credentials');
                } catch (error) {
                    console.error('Error during login:', error);
                    throw new Error('Login failed');
                }
            }
        })
    ],

    callbacks: {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        async jwt({ token, user }: { token: any; user: User }) {
            // Initial login
            console.log('[JWT - user login] User:', user);
            if (user) {
                const decoded = jwt.decode(user?.accessToken) as User;
                return {
                    ...token,
                    id: user.id,
                    sub: user.sub,
                    is_active: user.is_active,
                    firstname: user.firstname,
                    lastname: user.lastname,
                    account_type: user.account_type,
                    email: user.email,
                    profile: user.profile,
                    accessToken: user.accessToken,
                    refreshToken: user.refreshToken,
                    accessTokenExpires: decoded.exp * 1000
                };
            }

            // If token is still valid, return it
            if (Date.now() < (token.accessTokenExpires as number)) {
                return token;
            }

            // Token expired, refresh it
            // return await refreshAccessToken(token);
        },

        async session({ session, token }) {
            session.user = {
                ...session.user,
                id: token.id,
                sub: token.sub,
                firstname: token.firstname,
                lastname: token.lastname,
                account_type: token.account_type,
                email: token.email,
                profile: token.profile,
                accessToken: token.accessToken,
                refreshToken: token.refreshToken
            };
            return session;
        }
    }
};

// async function refreshAccessToken(token: any) {
//     try {
//         const response = await refreshToken(token);
//         console.log('response', response);

//         if (response.statusCode !== 201)
//             throw new Error('Refresh token failed');

//         const decoded = jwt.decode(response?.data?.access_token) as any;

//         return {
//             ...token,
//             accessToken: response?.data?.access_token,
//             refreshToken: response?.data?.refresh_token ?? token.refreshToken,
//             accessTokenExpires: decoded.exp * 1000 // exp en secondes
//         };
//     } catch (error) {
//         console.error('Error refreshing access token:', error);
//         return { ...token, error: 'RefreshAccessTokenError' };
//     }
// }

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
