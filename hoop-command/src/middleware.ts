import { NextRequest, NextResponse } from 'next/server'
import { jwtVerify } from 'jose'

const secret = process.env.JWT_SECRET

if (!secret) {
    throw new Error("JWT_SECRET is not set in environment variables")
}

const JWT_SECRET = new TextEncoder().encode(secret)

export async function middleware(req: NextRequest) {
    const token = req.cookies.get('token')?.value

    if (!token) {
        console.log('No token found, redirecting to login')
        return NextResponse.redirect(new URL('/auth/login', req.url))
    }

    try {
        const { payload } = await jwtVerify(token, JWT_SECRET)
        console.log('JWT payload:', payload)

        return NextResponse.next()
    } catch (error) {
        console.error('JWT verification failed:', error)
        return NextResponse.redirect(new URL('/auth/login', req.url))
    }
}

export const config = {
    matcher: [
        '/dashboard/:path*',
        '/profile/:path*',
        '/team/:path*',
    ],
}
