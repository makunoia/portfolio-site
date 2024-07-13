import Text from "@/components/Text";
import React, { Suspense } from "react";
import ListSection from "@/app/(app)/components/ListSection";

const Page = async () => {
  return (
    <>
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

        <Suspense fallback={<div>Loading...</div>}>
          <ListSection />
        </Suspense>
      </main>
    </>
  );
};

export default Page;
