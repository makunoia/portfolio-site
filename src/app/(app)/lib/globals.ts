"use server";

import config from "@payload-config";
import {unstable_cache} from "next/cache";
import {getPayload} from "payload";
import type {AccessPassword, Resume} from "payload-types";

let payloadClient: Awaited<ReturnType<typeof getPayload>> | null = null;

const getPayloadClient = async () => {
  if (!payloadClient) {
    payloadClient = await getPayload({config});
  }

  return payloadClient;
};

const getAccessPasswordsGlobalCached = unstable_cache(
  async () => {
    const payload = await getPayloadClient();
    return payload.findGlobal({slug: "access-passwords"});
  },
  ["global:access-passwords"],
  {tags: ["global", "global:access-passwords"]}
);

export const getAccessPasswordsGlobal = async (): Promise<AccessPassword> => {
  return getAccessPasswordsGlobalCached();
};

const getResumeGlobalCached = unstable_cache(
  async () => {
    const payload = await getPayloadClient();
    return payload.findGlobal({
      slug: "resume",
      depth: 1,
    });
  },
  ["global:resume"],
  {tags: ["global", "global:resume"]}
);

export const getResumeGlobal = async (): Promise<Resume> => {
  return getResumeGlobalCached();
};
