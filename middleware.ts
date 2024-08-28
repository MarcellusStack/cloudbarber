import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

import createMiddleware from "next-intl/middleware";
import { locales } from "@lib/i18n";

const intlMiddleware = createMiddleware({
  locales,
  defaultLocale: "en",
});

const isPublicRoute = createRouteMatcher(["/", "/sign-in(.*)", "/sign-up(.*)"]);

export default clerkMiddleware((auth, request) => {
  return intlMiddleware(request);
});

export const config = {
  matcher: [
    "/",
    "/(de|en)/:path*",
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
