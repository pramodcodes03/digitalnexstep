import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;

  // Redirect legacy verification.php?verify_student=1&code=XXX to /verification/XXX
  if (pathname === "/verification.php") {
    const code = searchParams.get("code");
    if (code) {
      return NextResponse.redirect(new URL(`/verification/${code}`, request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/verification.php"],
};
