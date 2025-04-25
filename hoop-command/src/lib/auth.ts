import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'

export async function getUserFromSession() {
    const cookieStore = await cookies()
    const token = cookieStore.get('token')

    if (!token) return null

    try {
        const decoded = jwt.verify(token.value, JWT_SECRET)
        return decoded
    } catch {
        return null
    }
}
