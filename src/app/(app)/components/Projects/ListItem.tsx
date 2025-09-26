import {MouseEvent} from "react";
import Link from "next/link";
import {Lock} from "lucide-react";

import {handleMouseEvents} from "@/lib/helpers";
import AccessGateButton from "@/components/AccessGateButton";
import {trackEvent} from "@/app/(app)/lib/mixpanel-browser";
import Text from "../Text";

const LockedProjectContent = ({
  title,
  desc,
  tag,
  codename,
}: {
  title: string;
  desc: string;
  tag: string;
  codename: string;
}) => (
  <div className="flex flex-row gap-24px justify-between items-center w-full cursor-pointer">
    <div className="flex flex-col gap-4px">
      <div className="flex gap-4px">
        <Text size="body">{codename || title}</Text>
        <Lock size={14} className="text-fg-default" />
      </div>
      <Text size="caption" className="text-fg-subtle" multiline>
        {desc}
      </Text>
    </div>
    <div className="flex h-fit items-center rounded-10px bg-bg-subtle/40 px-10px py-8px">
      <Text size="caption" className="text-fg-subtle text-nowrap">
        {tag}
      </Text>
    </div>
  </div>
);

const UnlockedProjectContent = ({
  title,
  desc,
  tag,
}: {
  title: string;
  desc: string;
  tag: string;
}) => (
  <div className="flex flex-row gap-24px justify-between items-center cursor-pointer">
    <div className="flex flex-col gap-4px">
      <Text size="body">{title}</Text>
      <Text size="caption" className="text-fg-subtle" multiline>
        {desc}
      </Text>
    </div>
    <div className="flex h-fit items-center rounded-10px bg-bg-subtle/40 px-10px py-8px">
      <Text size="caption" className="text-fg-subtle text-nowrap">
        {tag}
      </Text>
    </div>
  </div>
);

const ProjectItem = ({
  title,
  desc,
  tag,
  slug,
  locked,
  codename,
}: {
  title: string;
  desc: string;
  tag: string;
  slug: string;
  locked: boolean;
} & (
  | {locked: true; codename: string}
  | {locked: false; codename?: undefined}
)) => {
  const handleTrackClick = (event: MouseEvent) => {
    trackEvent("Project Card Clicked", {
      slug,
      title,
      locked,
    });
  };

  if (locked) {
    return (
      <div
        className="page-list-item transition-opacity duration-300 ease-in-out"
        onMouseEnter={handleMouseEvents}
        onMouseLeave={handleMouseEvents}
      >
        <AccessGateButton
          title={codename || title}
          description="Enter the shared password to view this project."
          redirectPath={`/projects/${slug}`}
          trigger={
            <div
              className="flex flex-row gap-24px justify-between items-center cursor-pointer w-full"
              onClick={handleTrackClick}
            >
              <div className="flex flex-col gap-4px">
                <div className="flex gap-4px">
                  <Text size="body">{codename || title}</Text>
                  <Lock size={14} className="text-fg-default" />
                </div>
                <Text size="caption" className="text-fg-subtle" multiline>
                  {desc}
                </Text>
              </div>
              <div className="flex h-fit items-center rounded-10px bg-bg-subtle/40 px-10px py-8px">
                <Text size="caption" className="text-fg-subtle text-nowrap">
                  {tag}
                </Text>
              </div>
            </div>
          }
        />
      </div>
    );
  }

  return (
    <Link
      prefetch
      href={`projects/${slug}`}
      className="page-list-item transition-opacity duration-300 ease-in-out"
      onMouseEnter={handleMouseEvents}
      onMouseLeave={handleMouseEvents}
      onClick={handleTrackClick}
    >
      <UnlockedProjectContent title={title} desc={desc} tag={tag} />
    </Link>
  );
};

export default ProjectItem;
