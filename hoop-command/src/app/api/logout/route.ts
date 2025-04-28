import { NextResponse } from "next/server";
import { createResponse } from "@/lib/response";

export async function POST() {
    const response = NextResponse.json(createResponse(200, "Logout Successful", null), { status: 200 });

    response.cookies.set('token', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/',
        maxAge: 0,
    });

    return response;
}
