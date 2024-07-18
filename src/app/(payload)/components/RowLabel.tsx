"use client";
import React from "react";
import { useRowLabel } from "@payloadcms/ui";

export const SectionRowLabel = () => {
  const { data }: { data: { title: string } } = useRowLabel();

  return <div>{data?.title || "New Section"}</div>;
};

export const BlockRowLabel = () => {
  const { data }: { data: { lead: string } } = useRowLabel();

  return <div>{data?.lead || "New Block"}</div>;
};
