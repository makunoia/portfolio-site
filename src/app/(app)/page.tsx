import Text from "@/components/Text";
import React from "react";

const Page = () => {
  return (
    <>
      <main>
        <div className="max-w-[700px] w-auto">
          <Text size="heading" className="text-subtle">
            Product Designer with four years of working on enterprise apps.
            Passionate about design systems and loves building just for the fun
            of it
          </Text>
        </div>

        <span className="badge p-2">Badge</span>
      </main>
    </>
  );
};

export default Page;
