import React, { ReactNode, Suspense } from "react";

import Text from "@/components/Text";
import EntriesListContainer from "../components/EntriesListContainer";

const Layout = async ({ content }: { content: ReactNode }) => {
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
            random things in life.
          </Text>
        </div>

        <Suspense fallback={<div>Loading</div>}>
          <EntriesListContainer content={content} />
        </Suspense>
      </main>
    </>
  );
};

export default Layout;
