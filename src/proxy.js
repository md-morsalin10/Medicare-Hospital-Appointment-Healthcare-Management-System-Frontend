import { NextResponse } from "next/server"
import { getUserSeason } from "./lib/core/session";

export async function proxy(request) {
    const { pathname } = request.nextUrl

    const user = await getUserSeason()

    if (!user) {
        return NextResponse.redirect(new URL('/login', request.url))
    }

    if (pathname.startsWith('/dashboard')) {
        const role = user?.role;

        if (role === "patient" && !pathname.startsWith('/dashboard/patient')) {
            return NextResponse.redirect(new URL('/dashboard/patient', request.url))
        }

        if (role === "doctor" && !pathname.startsWith('/dashboard/doctor')) {
            return NextResponse.redirect(new URL('/dashboard/doctor', request.url))
        }

        if (role === "admin" && !pathname.startsWith('/dashboard/admin')) {
            return NextResponse.redirect(new URL('/dashboard/admin', request.url))
        }
    }

    return NextResponse.next()
}

export const config = {

    matcher: ['/dashboard/:path*', '/doctors/:id'],
}