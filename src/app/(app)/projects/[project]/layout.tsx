"use client";
import { ReactNode, Suspense } from "react";
import ProjectPage from "@/components/Skeletons/ProjectPage";

const Layout = ({ children }: { children: ReactNode }) => {
  return <Suspense fallback={<ProjectPage />}>{children}</Suspense>;
};

export default Layout;
