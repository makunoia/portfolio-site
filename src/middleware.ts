import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import Users from "./app/(payload)/collections/Users";
import { cache } from "react";

export const getLockedPages = cache(async (host: string) => {
  const res = await fetch(`${host}/api/projects?where[isLocked][equals]=true`, {
    headers: {
      Authorization: `${Users.slug} API-Key ${process.env.PAYLOAD_API_KEY}`,
    },
  });
  const response = await res.json();

  const lockedPages = response.docs
    .filter((doc: any) => doc.isLocked === true)
    .map((doc: any) => doc.slug);
  return lockedPages;
});

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const authCookie = request.cookies.get("auth");
  const isPageView = request.headers.get("purpose") !== "prefetch";

  const protocol = request.headers.get("x-forwarded-proto") || "http";
  const host = request.headers.get("host") || "localhost";
  const baseUrl = `${protocol}://${host}`;

  const lockedProjects: string[] = await getLockedPages(baseUrl);
  const isLocked = lockedProjects.includes(pathname.split("/").pop() as string);

  if (isPageView) {
    if (!authCookie && isLocked) {
      const url = new URL("/authenticate", request.url);
      const response = NextResponse.redirect(url);
      response.cookies.set("redirectTo", pathname);

      request.cookies.set;
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
