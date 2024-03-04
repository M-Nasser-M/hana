import { withAuth, type NextRequestWithAuth } from "next-auth/middleware";
import type { NextFetchEvent, NextRequest } from "next/server";
import createMiddleware from "next-intl/middleware";
import { locales } from "./i18n";

const protectedRoutes = ["checkout", "profile"];

const intlMiddleware = createMiddleware({
  locales: locales,

  defaultLocale: "en",

  localePrefix: "always",
});

const authMiddleware = withAuth(
  // Note that this callback is only invoked if
  // the `authorized` callback has returned `true`
  // and not for pages listed in `pages`.
  function onSuccess(request: NextRequest) {
    return intlMiddleware(request);
  },
  {
    callbacks: {
      authorized: ({ token }) => token != null,
    },
    pages: {
      signIn: "/api/auth/signin",
    },
  }
);

export function middleware(request: NextRequest) {
  // Step 1: Use the incoming request
  const defaultLocale = request.headers.get("x-default-locale") || "en";

  // Step 2: Create and call the next-intl middleware

  const response = intlMiddleware(request);

  // Step 3: Alter the response
  response.headers.set("x-default-locale", defaultLocale);

  const routePath = request.nextUrl.pathname.split("/")[2];

  if (protectedRoutes.includes(routePath))
    return authMiddleware(request as NextRequestWithAuth, {} as NextFetchEvent);

  return response;
}

export const config = {
  // Match only internationalized pathnames
  matcher: [
    "/",
    `/(en|ar)/:path*`,
    "/signin",
    "/signout",
    "/paymentsuccess",
    "/paymentfailed",
    "/paymobdataerror",
  ],
};
