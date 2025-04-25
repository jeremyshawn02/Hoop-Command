import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import * as yup from "yup"
import db from "@/lib/db" 
import { createResponse } from "@/lib/response"

const registerSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
})

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

    await db.user.create({
        data: {
            user_name: name,
            user_image: "",
            user_age: 0,
            user_email: email,
            password: hashedPassword,
        },
    })

    return NextResponse.json(createResponse(200, "Login Successful!", null), { status: 200 })

    } catch {
        return NextResponse.json(createResponse(500, "Internal Server Error", null), { status: 500 })
    }
}
