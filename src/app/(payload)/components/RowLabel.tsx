"use client";
import { useRowLabel } from "@payloadcms/ui";

export const SectionRowLabel = () => {
  const { data }: { data: { title: string } } = useRowLabel();
  return data?.title || "New Section";
};

export const BlockRowLabel = () => {
  const { data }: { data: { lead: string } } = useRowLabel();
  return data?.lead || "New Block";
};
