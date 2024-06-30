"use client";
import Text from "@/components/Text";
import SectionDivider from "@/components/SectionDivider";
import React, { ReactNode } from "react";
import Template from "./template";

const Layout = ({
  children,
  entries,
}: {
  children: ReactNode;
  entries: ReactNode;
}) => {
  return (
    <>
      <main className="max-w-[500px] mx-auto flex flex-col gap-40px my-[80px]">
        <div className="flex flex-col gap-4px">
          <Text as="h1" size="heading" weight="normal">
            Journal
          </Text>
          <Text
            as="h3"
            size="body-large"
            weight="normal"
            multiline
            className="text-subtle mr-40px"
          >
            Space to share my thoughts, rants, ephiphanies and comments about
            certain things in life.
          </Text>
        </div>

        <SectionDivider header="2024" />

        <div className="flex flex-col gap-16px">
          <Template>
            {entries}
            {children}
          </Template>
        </div>
      </main>
    </>
  );
};

export default Layout;
