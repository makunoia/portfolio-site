import { v4 as uuidv4 } from "uuid";
import { NextRequest, NextResponse } from "next/server";

const response = NextResponse.next();

const assignUUID = async (request: NextRequest) => {
  const cookies = request.cookies;
  let userUUID = cookies.get("userUUID")?.value;
  if (!userUUID) {
    userUUID = uuidv4();
    return response.cookies.set({ name: "userUUID", value: userUUID });
  }
};

export async function middleware(request: NextRequest) {
  const [uuid] = await Promise.all([assignUUID]);
  assignUUID(request);

  //implement a function that checks for an auth header
  // if header is not found or if it's false, redirect to a locked screen page
  // if header is found and user is auth, redirect to the "locked" project page

  return uuid;
}

export const config = {
  matcher: ["/", "/projects", "/projects/:path*", "/journal", "/about-me"],
};
