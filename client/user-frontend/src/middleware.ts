import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const publicRoutes = ['/sign-in', '/sign-up', '/forgot-password']
const privateRoutes = ['/profile', '/settings']

export function middleware(request: NextRequest): NextResponse {
  const authToken = request.cookies.get('access-token')

  const isAuthorized = !!authToken
  const path = request.nextUrl.pathname

  // Prevent redirect loop by checking if the user is already on the target page
  if (publicRoutes.some((route) => path.startsWith(route)) && isAuthorized && path !== '/home') {
    return NextResponse.redirect(new URL('/home', request.url))
  }

  if (privateRoutes.some((route) => path.startsWith(route)) && !isAuthorized && path !== '/sign-in') {
    return NextResponse.redirect(new URL('/sign-in', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/:path*'
}
