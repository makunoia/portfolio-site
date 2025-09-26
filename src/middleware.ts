import {NextResponse} from "next/server";
import type {NextRequest} from "next/server";

export const getLockedPages = () => {
  const allLockedPages = {
    staging: ["project-mark-lviii"],
    production: ["project-red"],
  };

  const lockedPages =
    allLockedPages[
      process.env.VERCEL_ENV === "production" ? "production" : "staging"
    ];

  return lockedPages;
};

export async function middleware(request: NextRequest) {
  const {pathname} = request.nextUrl;
  const projectAccessCookie =
    request.cookies.get("authLockedProjects") ?? request.cookies.get("auth");
  const archiveAccessCookie =
    request.cookies.get("authLockedArchives") ?? request.cookies.get("auth");
  const isPageView = request.headers.get("purpose") !== "prefetch";
  const lockedProjects: string[] = getLockedPages();

  // Used for api fetches for lockedPages
  // const protocol = request.headers.get("x-forwarded-proto") || "http";
  // const host = request.headers.get("host") || "localhost";
  // const baseUrl = `${protocol}://${host}`;

  const isLocked = lockedProjects.includes(pathname.split("/").pop() as string);

  if (isPageView) {
    if (!projectAccessCookie && isLocked) {
      const url = new URL("/authorization", request.url);
      const response = NextResponse.redirect(url);
      response.cookies.set("redirectTo", pathname);

      request.cookies.set;
      return response;
    }
    if (!archiveAccessCookie && pathname.startsWith("/projects/archive")) {
      const url = new URL("/authorization", request.url);
      const response = NextResponse.redirect(url);
      response.cookies.set("redirectTo", pathname);
      return response;
    }
  } else {
    return NextResponse.next();
  }
}

export const config = {
  matcher: [
    {
      source: "/projects/:project*",
      has: [
        {
          type: "header",
          key: "accept",
          value: "(?!.*_next).*",
        },
      ],
    },
  ],
};
