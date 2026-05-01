import { SignJWT, jwtVerify } from "jose"
import { cookies } from "next/headers"
const COOKIE_NAME = "auth_token"

export interface AuthUser {
  id: string
  email: string
  name: string
}

function getSecret() {
  return new TextEncoder().encode(process.env.AUTH_SECRET || "default-secret-change-me-in-production");
}

/**
 * Create a signed JWT token for the given user payload
 */
export async function signToken(user: AuthUser): Promise<string> {
  return new SignJWT({ id: user.id, email: user.email, name: user.name })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(getSecret())
}

/**
 * Verify and decode a JWT token
 */
export async function verifyToken(token: string): Promise<AuthUser | null> {
  try {
    const { payload } = await jwtVerify(token, getSecret())
    return payload as unknown as AuthUser
  } catch (error) {
    console.error("=== JWT VERIFY ERROR ===", error)
    return null
  }
}

/**
 * Get current authenticated user from cookies (for use in Server Components)
 */
export async function getSession(): Promise<AuthUser | null> {
  const cookieStore = await cookies()
  const token = cookieStore.get(COOKIE_NAME)?.value
  console.log("=== GET SESSION DEBUG ===")
  console.log("Token found:", !!token)
  if (!token) return null
  
  const verified = await verifyToken(token)
  console.log("Verified payload:", verified)
  return verified
}



export { COOKIE_NAME }
