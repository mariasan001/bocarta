// src/middleware.ts
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  console.log('🛰 MIDDLEWARE →', req.nextUrl.pathname);
  return NextResponse.next();
}

// Opcional, pero recomendado para no loguear estáticos
export const config = {
  matcher: ['/((?!_next|favicon.ico).*)'],
};
