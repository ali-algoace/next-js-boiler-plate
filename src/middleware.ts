import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  console.log("request", request);

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/public|_next/image|assets|favicon.ico|sw.js).*)",
  ],
};
