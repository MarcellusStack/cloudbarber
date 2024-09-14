import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse, NextRequest } from "next/server";
import { UserProps } from "@server/utils/get-user";

const isAuthRoute = createRouteMatcher(["/sign-in", "/sign-up"]);
const isOnboardingRoute = createRouteMatcher(["/terms", "/user-info", "/team"]);
const isPublicRoute = createRouteMatcher(["/", "/api/get-user"]);
const isProtectedRoute = createRouteMatcher(["/dashboard"]);

export default clerkMiddleware(async (auth, req: NextRequest) => {
  const { userId, redirectToSignIn } = auth();
  const url = new URL(req.url);

  if (!userId && (isAuthRoute(req) || isPublicRoute(req))) {
    // Allow access to authentication and public routes without redirecting
    return NextResponse.next();
  }

  if (!userId && !isPublicRoute(req)) {
    // Redirect to sign-in if the user is not authenticated and the route is not public
    const signInUrl = new URL(`/sign-in`, req.url);
    return NextResponse.redirect(signInUrl);
  }

  if (userId && !isPublicRoute(req)) {
    const user: UserProps = await fetch(`http://localhost:3000/api/get-user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: userId,
        appApiKey: process.env.APP_API_KEY,
      }),
    }).then((data) => data.json());

    // Check user properties and redirect accordingly
    if (!user || !user.dataPolicy) {
      if (!url.pathname.includes("/terms")) {
        const termsUrl = new URL("/terms", req.url);
        return NextResponse.redirect(termsUrl);
      }
      return NextResponse.next();
    }

    if (!user.firstName || !user.lastName || !user.gender || !user.birthDate) {
      if (!url.pathname.includes("/user-info")) {
        const userInfoUrl = new URL("/user-info", req.url);
        return NextResponse.redirect(userInfoUrl);
      }
      return NextResponse.next();
    }

    if (!user.organizationId || !user.organization) {
      if (!url.pathname.includes("/team")) {
        const teamUrl = new URL("/team", req.url);
        return NextResponse.redirect(teamUrl);
      }
      return NextResponse.next();
    }

    // If the user is already onboarded, redirect to the dashboard
    if (isOnboardingRoute(req)) {
      const dashboardUrl = new URL("/dashboard", req.url);
      return NextResponse.redirect(dashboardUrl);
    }

    if (isProtectedRoute(req)) {
      const dashboardUrl = new URL("/dashboard", req.url);
      return NextResponse.redirect(dashboardUrl);
    }
  }

  if (userId && isAuthRoute(req)) {
    // Redirect authenticated users away from authentication routes
    const homeUrl = new URL("/", req.url);
    return NextResponse.redirect(homeUrl);
  }

  // Ensure intlMiddleware runs for all other cases
  return NextResponse.next();
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes and tRPC
    "/(api|trpc)(.*)",
  ],
};
