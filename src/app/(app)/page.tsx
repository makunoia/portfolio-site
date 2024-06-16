import Text from "@/components/Text";
import React from "react";

const Page = () => {
  return (
    <>
      <main>
        <div className="max-w-[700px] mx-auto flex flex-col gap-4 mt-6">
          <Text as="h1" size="heading">
            Product Designer with four years of working on enterprise apps.
            Passionate about design systems and loves building just for the fun
            of it
          </Text>
          <span className="badge p-2 w-fit rounded-x font-mono">Badge</span>
        </div>
      </main>
    </>
  );
};

export default Page;
