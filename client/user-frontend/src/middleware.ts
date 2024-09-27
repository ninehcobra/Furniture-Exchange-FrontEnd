import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { checkAuthorization } from './middleware/auth'

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest): NextResponse {
  if (request.nextUrl.pathname.startsWith('/sign-in') && checkAuthorization()) {
    return NextResponse.redirect(new URL('/home', request.url))
  }
  if (request.nextUrl.pathname.startsWith('/home') && checkAuthorization()) {
    return NextResponse.redirect(new URL('/sign-in', request.url))
  }

  return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: '/:path*'
}
