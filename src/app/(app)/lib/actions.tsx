"use server";

import config from "@payload-config";
import { getPayloadHMR } from "@payloadcms/next/utilities";
import { cookies } from "next/headers";
import { cache } from "react";
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
    return true;
  } else return false;
};

export const getUserUUID = async () => {
  const cookieStore = cookies();
  let userUUID = cookieStore.get("userUUID");
  return userUUID;
};

export const getProject = cache(async (slug: string) => {
  const req = await payload.find({
    collection: "projects",
    where: {
      slug: {
        equals: slug,
      },
    },
  });

  const project = req.docs[0];

  return project;
});

export const getProjects = cache(async () => {
  const { docs } = await payload.find({
    collection: "projects",
  });

  const projects = docs;
  return projects;
});
