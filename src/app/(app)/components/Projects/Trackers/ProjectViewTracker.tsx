"use client";

import {useEffect} from "react";

import {trackEvent} from "@/app/(app)/lib/mixpanel-browser";
import type {Project, ProjectTag, MyRole} from "payload-types";

type ProjectViewTrackerProps = {
  project: Project;
};

const ProjectViewTracker = ({project}: ProjectViewTrackerProps) => {
  useEffect(() => {
    if (!project) return;

    const tag =
      typeof project.tag === "string"
        ? undefined
        : (project.tag as ProjectTag | undefined | null)?.name;
    const role =
      typeof project.role === "string"
        ? undefined
        : (project.role as MyRole | undefined | null)?.name;

    trackEvent("Project Viewed", {
      id: project.id,
      slug: project.slug,
      title: project.title,
      tag,
      role,
      status: project.status,
      year: project.year,
      archived: project.isArchived,
    });
  }, [project]);

  return null;
};

export default ProjectViewTracker;
