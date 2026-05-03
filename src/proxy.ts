import {NextResponse} from "next/server";
import type {NextRequest} from "next/server";

type AccessType = "project" | "archive";

type ProtectedPages = {
  locked: string[];
  archived: string[];
};

const getProtectedPages = async (origin: string): Promise<ProtectedPages> => {
  try {
    const res = await fetch(`${origin}/api/protected-slugs`);
    if (!res.ok) return {locked: [], archived: []};
    return res.json();
  } catch {
    return {locked: [], archived: []};
  }
};

const buildRedirectResponse = (
  request: NextRequest,
  redirectTarget: string,
  accessType: AccessType
) => {
  const url = new URL("/authorization", request.url);
  url.searchParams.set("redirect", redirectTarget);
  url.searchParams.set("accessType", accessType);

  const response = NextResponse.redirect(url);
  response.cookies.set("redirectTo", redirectTarget, {
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });

  return response;
};

const normalisePathname = (pathname: string) =>
  pathname === "/" ? pathname : pathname.replace(/\/$/, "");

const getProjectSlugFromPath = (pathname: string): string | undefined => {
  const segments = pathname.split("/").filter(Boolean);

  if (segments[0] !== "projects") {
    return undefined;
  }

  const slug = segments[1];

  if (!slug || slug === "archive") {
    return undefined;
  }

  return slug;
};

export async function proxy(request: NextRequest) {
  const {pathname: rawPathname} = request.nextUrl;
  const pathname = normalisePathname(rawPathname);
  const projectAccessCookie = request.cookies.get("authLockedProjects");
  const archiveAccessCookie = request.cookies.get("authLockedArchives");
  const isPageView = request.headers.get("purpose") !== "prefetch";
  const redirectTarget = `${pathname}${request.nextUrl.search}`;

  if (!isPageView) {
    return NextResponse.next();
  }

  const {locked: lockedProjects, archived: archivedProjects} =
    await getProtectedPages(request.nextUrl.origin);
  const slug = getProjectSlugFromPath(pathname);
  const isLocked = !!slug && lockedProjects.includes(slug);
  const isArchivedPage = pathname === "/projects/archive";
  const isArchivedProject = !!slug && archivedProjects.includes(slug);

  if (isLocked && !projectAccessCookie) {
    return buildRedirectResponse(request, redirectTarget, "project");
  }

  if (isArchivedPage && !archiveAccessCookie) {
    return buildRedirectResponse(request, redirectTarget, "archive");
  }

  if (
    isArchivedProject &&
    !archiveAccessCookie &&
    !projectAccessCookie
  ) {
    return buildRedirectResponse(request, redirectTarget, "archive");
  }

  return NextResponse.next();
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
