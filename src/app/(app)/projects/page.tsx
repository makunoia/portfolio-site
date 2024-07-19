export const dynamic = "force-dynamic";
export const revalidate = 0;

import Text from "@/components/Text";
import React, { Suspense } from "react";
import ProjectsList from "@/components/ProjectsList";

const Page = () => {
  return (
    <main className="max-w-[500px] mx-auto flex flex-col gap-40px my-[80px]">
      <div className="flex flex-col gap-4px">
        <Text as="h1" size="heading" weight="normal">
          Projects
        </Text>
        <Text
          as="h3"
          size="body-large"
          weight="normal"
          multiline
          className="text-subtle mr-40px"
        >
          A compilation of my creation through out my career as a designer and
          developer
        </Text>
      </div>

      <Suspense fallback={<div className="text">Loading...</div>}>
        <ProjectsList />
      </Suspense>
    </main>
  );
};

export default Page;
