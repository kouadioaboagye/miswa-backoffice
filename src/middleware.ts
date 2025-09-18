import type { NextRequest } from 'next/server';
// import jwt from 'jsonwebtoken';

// interface JWTPayload {
//     sub?: string;
//     iat?: number;
//     exp?: number;
//     [key: string]: unknown;
// }

export async function middleware(req: NextRequest) {
    console.log('Middleware executed for:', req.nextUrl.pathname);
    // // Obtenir le token JWT depuis next-auth
    // const token = await getToken({ req, secret: process.env.AUTH_SECRET });
    // const url = req.nextUrl.clone();
    // const isAuthPage = url.pathname.startsWith('/auth');
    // const isProtectedPage = url.pathname.startsWith('/admin');
    // const isHomePage = url.pathname === '/';
    // // Contrôles d'accès standards
    // if (!token && isProtectedPage) {
    //     // Si l'utilisateur n'est pas connecté et qu'il accède à une page protégée
    //     return NextResponse.redirect(
    //         new URL('/auth/login', req.nextUrl.origin)
    //     );
    // }
    // if (token && (isAuthPage || isHomePage)) {
    //     // Si l'utilisateur est connecté et accède à une page d'auth ou à la page d'accueil
    //     return NextResponse.redirect(new URL('/admin/dashboard', req.url));
    // }
    // // Sinon, autoriser la requête
    // return NextResponse.next();
}

export const config = {
    matcher: ['/admin/:path*', '/auth/:path*', '/']
};
