"use server";

const token = process.env.MIXPANEL_TOKEN ? process.env.MIXPANEL_TOKEN : "";
var Mixpanel = require("mixpanel");

var mixpanel = Mixpanel.init(token);

const tracker = (eventName: string, eventProperties?: Record<string, any>) => {
  mixpanel.track(eventName, eventProperties);
};

export default tracker;
