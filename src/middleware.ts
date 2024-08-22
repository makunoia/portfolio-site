import { v4 as uuidv4 } from "uuid";
import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const cookies = request.cookies;
  let userUUID = cookies.get("userUUID")?.value;
  const response = NextResponse.next();

  if (!userUUID) {
    userUUID = uuidv4();
    response.cookies.set({ name: "userUUID", value: userUUID });
  }

  return response;
}

export const config = {
  matcher: ["/", "/projects", "/projects/:path*", "/journal", "/about-me"],
};
