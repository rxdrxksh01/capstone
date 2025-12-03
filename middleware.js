import arcjet, { createMiddleware, detectBot, shield } from "@arcjet/next";
import { NextResponse } from "next/server";

const aj = arcjet({
  key: process.env.ARCJET_KEY,
  rules: [
    shield({
      mode: "LIVE",
    }),
    detectBot({
      mode: "LIVE",
      allow: [
        "CATEGORY:SEARCH_ENGINE",
        "GO_HTTP",
      ],
    }),
  ],
});

const authMiddleware = async (req) => {
  const { pathname } = req.nextUrl;
  const isProtectedRoute = [
    "/dashboard",
    "/account",
    "/transaction",
  ].some(route => pathname.startsWith(route));

  if (isProtectedRoute) {
    const token = req.cookies.get("token");
    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }
  return NextResponse.next();
};

export default createMiddleware(aj, authMiddleware);

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
