import configPromise from "@payload-config";
import { getPayload } from "payload";
//This is a demo to demonstrate the new getPayload API
export const GET = async () => {
  const payload = await getPayload({
    config: configPromise,
  });

  const data = await payload.find({
    collection: "projects",
  });

  return Response.json(data);
};
