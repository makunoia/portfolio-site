"use server";

import config from "@payload-config";
import { getPayloadHMR } from "@payloadcms/next/utilities";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

const payload = await getPayloadHMR({ config });

export const validatePassword = async (
  formData: FormData
): Promise<boolean> => {
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
  cookies().set("auth", "");

  if (enteredPassword === data.value) {
    cookies().set("auth", "true");
    revalidatePath("/projects/[project]/page", "page");
    return true;
  } else return false;
};

export const getUserUUID = async () => {
  const cookieStore = cookies();
  let userUUID = cookieStore.get("userUUID");
  return userUUID;
};
