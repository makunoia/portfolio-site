import mixpanel from "mixpanel-browser";

const token = process.env.MIXPANEL_TOKEN ? process.env.MIXPANEL_TOKEN : "";

mixpanel.init(token, {
  debug: true,
  track_pageview: true,
  persistence: "localStorage",
  ignore_dnt: true,
});

const env_check: any = process.env.VERCEL_ENV === "production";
console.log(process.env.VERCEL_ENV);

const actions = {
  identify: (id: any) => {
    if (env_check) mixpanel.identify(id);
  },
  alias: (id: any) => {
    if (env_check) mixpanel.alias(id);
  },
  track: (name: any, props: any) => {
    if (env_check) mixpanel.track(name, props);
  },
};

export const Mixpanel = actions;
