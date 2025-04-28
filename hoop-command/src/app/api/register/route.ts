import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import * as yup from "yup"
import db from "@/lib/db" 
import { createResponse } from "@/lib/response"
import jwt from "jsonwebtoken"

const registerSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
})

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'

export async function POST(req: Request) {
    try {
        const body = await req.json()
        const { name, email, password } = await registerSchema.validate(body)

        const existingUser = await db.user.findFirst({
            where: { user_email: email },
        })

        if (existingUser) {
            return NextResponse.json({ message: "Email already in use" }, { status: 400 })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const newUser = await db.user.create({
            data: {
                user_name: name,
                user_image: "",
                user_age: 0,
                user_email: email,
                password: hashedPassword,
            },
        })

        const token = jwt.sign(
            { userId: newUser.user_id, email: newUser.user_email },
            JWT_SECRET,
            { expiresIn: "7d" }
        )

        const response = new NextResponse(
            JSON.stringify({
                message: 'Register Successful!',
                user: {
                    user_id: newUser.user_id,
                    user_name: newUser.user_name,
                    user_email: newUser.user_email,
                }
            }),
            { status: 200, headers: { "Content-Type": "application/json" } }
        )

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
