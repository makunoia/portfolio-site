"use server";

import config from "@payload-config";
import {getPayload} from "payload";
import type {AccessPassword, Resume} from "payload-types";

let payloadClient: Awaited<ReturnType<typeof getPayload>> | null = null;

const getPayloadClient = async () => {
  if (!payloadClient) {
    payloadClient = await getPayload({config});
  }

  return payloadClient;
};

export const getAccessPasswordsGlobal = async (): Promise<AccessPassword> => {
  const payload = await getPayloadClient();
  return payload.findGlobal({slug: "access-passwords"});
};

export const getResumeGlobal = async (): Promise<Resume> => {
  const payload = await getPayloadClient();
  return payload.findGlobal({
    slug: "resume",
    depth: 1,
  });
};
