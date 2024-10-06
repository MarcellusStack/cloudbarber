import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse, NextRequest } from "next/server";
import { UserProps } from "@server/utils/get-user";

const routeMatchers = {
  auth: createRouteMatcher(["/sign-in", "/sign-up"]),
  onboarding: createRouteMatcher([
    "/terms",
    "/user-info",
    "/join-organization",
  ]),
  public: createRouteMatcher(["/", "/api/get-user"]),
  protected: createRouteMatcher(["/dashboard"]),
};

async function fetchUser(userId: string): Promise<UserProps | null> {
  try {
    const response = await fetch(`http://localhost:3000/api/get-user`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, appApiKey: process.env.APP_API_KEY }),
    });
    return await response.json();
  } catch (error) {
    return null;
  }
}

function redirectTo(url: string, req: NextRequest): NextResponse {
  return NextResponse.redirect(new URL(url, req.url));
}

export default clerkMiddleware(async (auth, req: NextRequest) => {
  const { userId } = auth();
  const url = new URL(req.url);

  if (!userId) {
    if (routeMatchers.auth(req) || routeMatchers.public(req)) {
      return NextResponse.next();
    }
    return redirectTo("/sign-in", req);
  }

  if (routeMatchers.auth(req)) {
    return redirectTo("/", req);
  }

  if (!routeMatchers.public(req)) {
    const user = await fetchUser(userId);

    if (!user || !user.dataPolicy) {
      return url.pathname.includes("/terms")
        ? NextResponse.next()
        : redirectTo("/terms", req);
    }

    if (!user.firstName || !user.lastName || !user.gender || !user.birthDate) {
      return url.pathname.includes("/user-info")
        ? NextResponse.next()
        : redirectTo("/user-info", req);
    }

    if (!user.activeOrganizationId) {
      return url.pathname.includes("/join-organization")
        ? NextResponse.next()
        : redirectTo("/join-organization", req);
    }

    if (routeMatchers.onboarding(req)) {
      return redirectTo("/onboarding-completed", req);
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
