import { NextResponse } from 'next/server';
import { getSession, verifyToken } from '@/lib/auth';
import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get('auth_token')?.value;
  const session = await getSession();
  
  let verifyError = null;
  if (token) {
    try {
      const SECRET = new TextEncoder().encode(process.env.AUTH_SECRET || "default-secret-change-me-in-production");
      await jwtVerify(token, SECRET);
    } catch (e: any) {
      verifyError = e.message || String(e);
    }
  }
  
  return NextResponse.json({
    token: !!token,
    session: !!session,
    secret: process.env.AUTH_SECRET,
    verifyError
  });
}
