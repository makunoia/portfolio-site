"use server";

const token = process.env.MIXPANEL_TOKEN ? process.env.MIXPANEL_TOKEN : "";
var Mixpanel = require("mixpanel");

var mixpanel = Mixpanel.init(token);
import { headers } from "next/headers";

const tracker = (eventName: string, eventProperties?: Record<string, any>) => {
  const ip = headers().get("x-real-ip");
  console.log(`Your IP address is ${ip}`);
  const additionalProperties = {
    ip,
    $user_id: "UNIQUE_USER",
    distinct_id: "UNIQUE_USER",
    // $browser: navigator.userAgent,
    // $current_url: window.location.href,
    // $device_id: navigator.userAgent,
    // $initial_referrer: document.referrer ? document.referrer : undefined,
    // $initial_referring_domain: document.referrer
    //   ? new URL(document.referrer).hostname
    //   : undefined,
    // $screen_height: window.screen.height,
    // $screen_width: window.screen.width,
  };

  const properties = {
    ...additionalProperties,
    ...eventProperties,
  };

  mixpanel.track(eventName, properties);
};

export default tracker;
