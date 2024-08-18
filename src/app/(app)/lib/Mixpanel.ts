import mixpanel from "mixpanel-browser";

mixpanel.init("686b5f259ba221be1e1575aee7efe58d", {
  debug: true,
  track_pageview: true,
  persistence: "localStorage",
  ignore_dnt: true,
});

const env_check: any = process.env.NEXT_PUBLIC_VERCEL_ENV === "production";

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
  people: {
    set: (props: any) => {
      if (env_check) mixpanel.people.set(props);
    },
  },
};

export const Mixpanel = actions;
