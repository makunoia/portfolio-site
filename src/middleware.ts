import {NextResponse} from "next/server";
import type {NextRequest} from "next/server";

type AccessType = "project" | "archive";

type ProtectedPages = {
  locked: string[];
  archived: string[];
};

const getProtectedPages = (): ProtectedPages => {
  // Update these lists whenever new locked or archived project slugs are introduced.
  const sharedArchived = [
    "eventful-ph",
    "new-world-carpets",
    "multistore",
    "dingdong",
  ];

  const allProtected: Record<"staging" | "production", ProtectedPages> = {
    staging: {
      locked: ["project-mark-lviii", "project-red"],
      archived: sharedArchived,
    },
    production: {
      locked: ["project-red"],
      archived: sharedArchived,
    },
  };

  return allProtected[
    process.env.VERCEL_ENV === "production" ? "production" : "staging"
  ];
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

export async function middleware(request: NextRequest) {
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
    getProtectedPages();
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
