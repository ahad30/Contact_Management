import { NextResponse } from "next/server";

export const middleware = (request) => {
  const authToken = request.cookies.get("authToken")?.value;
  const url = request.nextUrl.clone();

  console.log("Middleware - Path:", url.pathname);
  console.log("Middleware - authToken:", authToken);

  // Exclude OAuth callback routes from middleware
  if (url.pathname.startsWith("/auth/google/callback") || url.pathname.startsWith("/auth/facebook/callback")) {
    console.log("Middleware - Allowing OAuth callback");
    return NextResponse.next(); // Allow OAuth callbacks to proceed
  }

  // Admin route protection
  if (url.pathname.startsWith("/Dashboard")) {
    if (!authToken) {
      console.log("Middleware - Redirecting to Login (no authToken)");
      return NextResponse.redirect(new URL("/Login", request.url));
    }
  }

  console.log("Middleware - Allowing request");
  return NextResponse.next();
};

export const config = {
  matcher: [
    "/Dashboard/:path*",
    "/auth/google/callback",
    "/auth/facebook/callback",
  ],
};