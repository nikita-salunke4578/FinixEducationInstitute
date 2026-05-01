import { SignJWT, jwtVerify } from "jose"
import { cookies } from "next/headers"
const COOKIE_NAME = "auth_token"
const SECRET = new TextEncoder().encode(process.env.AUTH_SECRET || "default-secret-change-me-in-production")

export interface AuthUser {
  id: string
  email: string
  name: string
}

/**
 * Create a signed JWT token for the given user payload
 */
export async function signToken(user: AuthUser): Promise<string> {
  return new SignJWT({ id: user.id, email: user.email, name: user.name })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(SECRET)
}

/**
 * Verify and decode a JWT token
 */
export async function verifyToken(token: string): Promise<AuthUser | null> {
  try {
    const { payload } = await jwtVerify(token, SECRET)
    return payload as unknown as AuthUser
  } catch {
    return null
  }
}

/**
 * Get current authenticated user from cookies (for use in Server Components)
 */
export async function getSession(): Promise<AuthUser | null> {
  const cookieStore = await cookies()
  const token = cookieStore.get(COOKIE_NAME)?.value
  if (!token) return null
  return verifyToken(token)
}



export { COOKIE_NAME }
