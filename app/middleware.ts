import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(request: NextRequest) {
  // Skip middleware for admin routes, API routes, and maintenance page itself
  if (
    request.nextUrl.pathname.startsWith("/secret-admin") ||
    request.nextUrl.pathname.startsWith("/api/") ||
    request.nextUrl.pathname === "/maintenance"
  ) {
    return NextResponse.next()
  }

  try {
    // Check maintenance mode from settings API
    const baseUrl = request.nextUrl.origin
    const settingsResponse = await fetch(`${baseUrl}/api/settings`, {
      headers: {
        "Cache-Control": "no-cache",
      },
    })

    if (settingsResponse.ok) {
      const settings = await settingsResponse.json()

      if (settings.maintenanceMode === true) {
        // Redirect to maintenance page
        return NextResponse.rewrite(new URL("/maintenance", request.url))
      }
    }
  } catch (error) {
    console.error("Middleware error:", error)
    // Continue normally if settings check fails
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - secret-admin (admin routes)
     * - maintenance (maintenance page itself)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|secret-admin|maintenance).*)",
  ],
}
