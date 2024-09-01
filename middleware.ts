import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import createMiddleware from "next-intl/middleware";
import { locales } from "@lib/i18n";
import { NextResponse, NextRequest } from "next/server";
import { UserProps } from "@server/utils/get-user";

const intlMiddleware = createMiddleware({
  locales,
  defaultLocale: "de",
});

const isAuthRoute = createRouteMatcher([
  "/(de|en)/sign-in",
  "/(de|en)/sign-up",
]);
const isOnboardingRoute = createRouteMatcher([
  "/(de|en)/terms",
  "/(de|en)/user-info",
  "/(de|en)/team",
]);
const isPublicRoute = createRouteMatcher(["/(de|en)", "/(de|en)/api/get-user"]);
const isProtectedRoute = createRouteMatcher(["/(de|en)/dashboard"]);

export default clerkMiddleware(async (auth, req: NextRequest) => {
  const { userId, redirectToSignIn } = auth();
  const url = new URL(req.url);
  const locale = url.pathname.split("/")[1]; // Extract the locale from the URL

  if (!userId && (isAuthRoute(req) || isPublicRoute(req))) {
    // Allow access to authentication and public routes without redirecting
    return intlMiddleware(req);
  }

  if (!userId && !isPublicRoute(req)) {
    // Redirect to sign-in if the user is not authenticated and the route is not public
    const signInUrl = new URL(`/${locale}/sign-in`, req.url);
    return NextResponse.redirect(signInUrl);
  }

  if (userId && !isPublicRoute(req)) {
    const user: UserProps = await fetch(
      `http://localhost:3000/${locale}/api/get-user`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userId,
          appApiKey: process.env.APP_API_KEY,
        }),
      }
    ).then((data) => data.json());

    // Check user properties and redirect accordingly
    if (!user || !user.dataPolicy) {
      if (!url.pathname.includes("/terms")) {
        const termsUrl = new URL(`/${locale}/terms`, req.url);
        return NextResponse.redirect(termsUrl);
      }
      return intlMiddleware(req);
    }

    if (!user.firstName || !user.lastName || !user.gender || !user.birthDate) {
      if (!url.pathname.includes("/user-info")) {
        const userInfoUrl = new URL(`/${locale}/user-info`, req.url);
        return NextResponse.redirect(userInfoUrl);
      }
      return intlMiddleware(req);
    }

    if (!user.organizationId || !user.organization) {
      if (!url.pathname.includes("/team")) {
        const teamUrl = new URL(`/${locale}/team`, req.url);
        return NextResponse.redirect(teamUrl);
      }
      return intlMiddleware(req);
    }

    // If the user is already onboarded, redirect to the dashboard
    if (isOnboardingRoute(req)) {
      const dashboardUrl = new URL(`/${locale}/dashboard`, req.url);
      return NextResponse.redirect(dashboardUrl);
    }

    if (isProtectedRoute(req)) {
      const dashboardUrl = new URL(`/${locale}/dashboard`, req.url);
      return NextResponse.redirect(dashboardUrl);
    }
  }

  if (userId && isAuthRoute(req)) {
    // Redirect authenticated users away from authentication routes
    const homeUrl = new URL("/", req.url);
    return NextResponse.redirect(homeUrl);
  }

  // Ensure intlMiddleware runs for all other cases
  return intlMiddleware(req);
});

export const config = {
  matcher: [
    "/",
    "/(de|en)/:path*",
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(de|en)/(api|trpc)(.*)",
    "/(api|trpc)(.*)",
  ],
};
