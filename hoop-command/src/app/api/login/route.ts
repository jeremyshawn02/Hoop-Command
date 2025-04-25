import { NextResponse } from "next/server"
import db from "@/lib/db" // your Prisma client import
import bcrypt from "bcryptjs"
import { createResponse } from "@/lib/response"
import jwt from "jsonwebtoken"

export async function POST(req: Request) {
    try {
        const body = await req.json()
        const { email, password } = body
        const JWT_SECRET = process.env.JWT_SECRET

        if (!email || !password) {
            return NextResponse.json(createResponse(401, "Bad Request", null), { status: 400 })
        }

        const user = await db.user.findUnique({
            where: {
                user_email: email,
            },
        })

        if (!user) {
            return NextResponse.json(createResponse(404, "Login Failed!", null), { status: 401 })
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password)

        if (!isPasswordCorrect) {
            return NextResponse.json(createResponse(404, "Login Failed", null), { status: 401 })
        }

        const token = jwt.sign(
            { userId: user.user_id, email: user.user_email },
            JWT_SECRET as string,
            { expiresIn: '7d' }
        )

        return NextResponse.json({ message: "Login successful", user: {
            user_id: user.user_id,
            user_name: user.user_name,
            user_email: user.user_email,
        }})
        
    } catch (error) {
        console.error(error)
        return NextResponse.json(createResponse(500, "Internal Server Error", null), { status: 500 })
    }
}
