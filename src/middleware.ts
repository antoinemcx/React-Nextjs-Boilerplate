import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export default withAuth(
    async function middleware(req) {
        const pathname = req.nextUrl.pathname;

        // Route protection
        const token = await getToken({ req });
        const isAuth = !!token;

        const isAuthPage =
            pathname.startsWith('/login') || pathname.startsWith('/register');

        const sensitiveRoutes: string[] = ['/profile', '/admin'];

        if (isAuthPage) {
            if (isAuth) {
                return NextResponse.redirect(new URL('/', req.url));
            }

            return null;
        }

        if (!isAuth && sensitiveRoutes.some((route) => pathname.startsWith(route))) {
            return NextResponse.redirect(new URL('/login', req.url));
        }
    },
    {
        callbacks: {
            async authorized() {
                return true;
            },
        },
    }
);

export const config = {
    matcher: ['/', '/login', '/register', '/profile/:path*'],
};
