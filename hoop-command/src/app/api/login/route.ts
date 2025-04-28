import { NextResponse } from "next/server"
import db from "@/lib/db"
import bcrypt from "bcryptjs"
import { createResponse } from "@/lib/response"
import jwt from "jsonwebtoken"

export async function POST(req: Request) {
    try {
        const body = await req.json()
        const { email, password } = body
        const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'

        if (!email || !password) {
            return NextResponse.json(createResponse(401, "Bad Request", null), { status: 400 })
        }

        const user = await db.user.findUnique({
            where: {
                user_email: email,
            },
        })

        if (!user) {
            return NextResponse.json(createResponse(404, "Invalid", null), { status: 401 })
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password)

        if (!isPasswordCorrect) {
            return NextResponse.json(createResponse(404, "Invalid Login Credentials", null), { status: 401 })
        }

        const token = jwt.sign(
            { userId: user.user_id, email: user.user_email },
            JWT_SECRET as string,
            { expiresIn: '7d' }
        )

        const response = NextResponse.json(createResponse(200, 'Login successful!', null), {status: 200})

        response.cookies.set('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            path: '/',
            maxAge: 7 * 24 * 60 * 60,
        })

        return response
        
    } catch (error) {
        console.error(error)
        return NextResponse.json(createResponse(500, "Internal Server Error", null), { status: 500 })
    }
}
