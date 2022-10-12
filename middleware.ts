import { NextRequest, NextResponse } from "next/server";

export const config = {
    matcher: ["/((?!_next|api/auth).*)(.+)", "/"],
};

const authPages = ["/login"];

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const token = request.cookies.get("access_token");

    if (!authPages.includes(pathname)) {
        if (!token) {
            return NextResponse.redirect(new URL("/login", request.url));
        }
    }

    if (authPages.includes(pathname)) {
        if (token) {
            return NextResponse.redirect(new URL("/", request.url));
        }
    }

    return NextResponse.next();
}
