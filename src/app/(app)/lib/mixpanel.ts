"use server";

var Mixpanel = require("mixpanel");
import { headers } from "next/headers";
import { getUserUUID } from "./actions";

const token = process.env.MIXPANEL_TOKEN ? process.env.MIXPANEL_TOKEN : "";
var mixpanel = Mixpanel.init(token);

const tracker = async (
  eventName: string,
  eventProperties?: Record<string, any>
) => {
  const ip = headers().get("X-Forwarded-For");
  const userID = await getUserUUID();

  const additionalProperties = {
    ip,
    $user_id: userID?.value,
    distinct_id: userID?.value,
  };

  const properties = {
    ...additionalProperties,
    ...eventProperties,
  };

  if (process.env.NODE_ENV !== "development") {
    mixpanel.track(eventName, properties);
  }
};

export default tracker;
