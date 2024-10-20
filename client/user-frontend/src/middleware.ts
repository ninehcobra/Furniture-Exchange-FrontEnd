import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const publicRoutes = ['/sign-in', '/sign-up', '/forgot-password']
const privateRoutes = ['/home', '/profile', '/settings']

export function middleware(request: NextRequest): NextResponse {
  const authToken = request.cookies.get('access-token')

  const isAuthorized = !!authToken
  const path = request.nextUrl.pathname

  if (publicRoutes.some((route) => path.startsWith(route)) && isAuthorized) {
    return NextResponse.redirect(new URL('/home', request.url))
  }

  if (privateRoutes.some((route) => path.startsWith(route)) && !isAuthorized) {
    return NextResponse.redirect(new URL('/sign-in', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/:path*'
}
