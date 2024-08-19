"use client";
import { ReactNode, Suspense } from "react";
import ProjectPageSkeleton from "@/components/Skeletons/ProjectPage";

const Layout = ({ children }: { children: ReactNode }) => {
  return <Suspense fallback={<ProjectPageSkeleton />}>{children}</Suspense>;
};

export default Layout;
