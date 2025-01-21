"use server";
import config from "@payload-config";
import { getPayload } from "payload";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const payload = await getPayload({ config });

export const validatePassword = async (
  formData: FormData
): Promise<boolean> => {
  const cookie = await cookies();
  const enteredPassword = formData.get("password");
  const response = await payload.find({
    collection: "globals",
    where: {
      name: {
        equals: "lockedProjectPassword",
      },
    },
  });

  const data = response.docs[0];

  if (enteredPassword === data.value) {
    cookie.set("auth", "true");
    return true;
  } else {
    return false;
  }
};

export const redirectTo = async () => {
  const cookie = await cookies();
  const redirectCookie = cookie.get("redirectTo");

  const url = redirectCookie ? redirectCookie.value : "/";
  cookie.delete("redirectTo");
  redirect(url);
};

export const getUserUUID = async () => {
  const cookieStore = await cookies();
  let userUUID = cookieStore.get("userUUID");
  return userUUID;
};
