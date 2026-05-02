import { NextResponse } from "next/server"
import { signToken } from "@/lib/auth"
import { cookies } from "next/headers"

const COOKIE_NAME = "auth_token"

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      )
    }

    const adminEmail = process.env.ADMIN_EMAIL || "admin@finix.com"
    const adminPassword = process.env.ADMIN_PASSWORD || "password"

    if (email !== adminEmail || password !== adminPassword) {
      return NextResponse.json(
        { error: "Invalid login credentials" },
        { status: 401 }
      )
    }

    const user = { id: "1", name: "Admin", email: adminEmail }

    // Sign the token using the frontend's jose-based signer
    // so getSession() can verify it correctly
    const token = await signToken(user)

    const cookieStore = await cookies()
    cookieStore.set(COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days in seconds
      path: "/",
    })

    return NextResponse.json({ success: true, user })
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    )
  }
}
