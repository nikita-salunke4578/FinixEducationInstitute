import { NextResponse, type NextRequest } from "next/server"
import { jwtVerify } from "jose"

const COOKIE_NAME = "auth_token"
const SECRET = new TextEncoder().encode(process.env.AUTH_SECRET || "default-secret-change-me-in-production")

export async function proxy(request: NextRequest) {
  // Only protect admin routes (except /admin and /admin/login)
  if (
    request.nextUrl.pathname.startsWith("/admin") &&
    request.nextUrl.pathname !== "/admin" &&
    request.nextUrl.pathname !== "/admin/login"
  ) {
    const token = request.cookies.get(COOKIE_NAME)?.value

    if (!token) {
      const url = request.nextUrl.clone()
      url.pathname = "/admin/login"
      return NextResponse.redirect(url)
    }

    try {
      await jwtVerify(token, SECRET)
    } catch {
      // Invalid or expired token
      const url = request.nextUrl.clone()
      url.pathname = "/admin/login"
      const response = NextResponse.redirect(url)
      // Clear invalid cookie
      response.cookies.set(COOKIE_NAME, "", { maxAge: 0, path: "/" })
      return response
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"],
}
