"use server";
import {cookies} from "next/headers";
import {redirect} from "next/navigation";

import {getAccessPasswordsGlobal} from "@/app/(app)/lib/globals";

type AccessType = "project" | "archive";

const ACCESS_COOKIE: Record<AccessType, string> = {
  project: "authLockedProjects",
  archive: "authLockedArchives",
};

const resolveAccessType = (
  formData: FormData,
  cookieStore: Awaited<ReturnType<typeof cookies>>
): AccessType => {
  const rawType = formData.get("accessType");
  if (typeof rawType === "string") {
    return rawType === "archive" ? "archive" : "project";
  }

  const redirectPath = cookieStore.get("redirectTo")?.value ?? "";
  if (redirectPath.startsWith("/projects/archive")) {
    return "archive";
  }

  return "project";
};

export const validateLockedProjectPassword = async (
  formData: FormData
): Promise<boolean> => {
  const cookieStore = await cookies();
  const accessType = resolveAccessType(formData, cookieStore);
  const enteredPassword = formData.get("password");

  if (typeof enteredPassword !== "string" || !enteredPassword.trim()) {
    return false;
  }

  const accessPasswords = await getAccessPasswordsGlobal();
  const expectedPassword =
    accessType === "archive"
      ? accessPasswords.lockedArchivesPassword
      : accessPasswords.lockedProjectPassword;

  if (!expectedPassword) {
    return false;
  }

  if (enteredPassword === expectedPassword) {
    cookieStore.set(ACCESS_COOKIE[accessType], "true", {
      path: "/",
      httpOnly: false,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    });
    return true;
  }

  return false;
};

export const redirectTo = async (forcedPath?: string) => {
  const cookie = await cookies();
  const redirectCookie = cookie.get("redirectTo");

  const url = forcedPath ?? (redirectCookie ? redirectCookie.value : "/");

  if (redirectCookie) {
    cookie.delete("redirectTo");
  }

  redirect(url);
};

export const getUserUUID = async () => {
  const cookieStore = await cookies();
  let userUUID = cookieStore.get("userUUID");
  return userUUID;
};
