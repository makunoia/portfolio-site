import Image from "next/image";
import React from "react";
import Text from "./Text";
import { Asset, Showcase as ShowcaseType } from "payload-types";

const Showcase = ({
  image,
  title,
  desc,
  tag,
}: Omit<ShowcaseType, "blockType" | "blockName">) => {
  const showcaseImage: Asset = image as Asset;
  return (
    <div className="bg-subtle/60 flex flex-col gap-8px rounded-12px p-18px">
      <div className="flex flex-col gap-10px">
        <div className="relative overflow-hidden w-full h-[200px] md:h-[300px] bg rounded-10px">
          <Image
            src={showcaseImage.url as string}
            alt={showcaseImage.alt || title}
            sizes="500px"
            fill
            style={{
              objectFit: "cover",
            }}
          />
        </div>
        <div className="flex flex-row justify-between items-center">
          <Text
            type="mono"
            weight="medium"
            size="caption"
            className="opacity-80"
          >
            {title}
          </Text>

          <div className="inline-flex py-4px px-8px bg rounded-4px">
            <Text
              as="span"
              type="mono"
              size="caption"
              className="text opacity-70 uppercase tracking-wide"
            >
              {tag as string}
            </Text>
          </div>
        </div>
      </div>
      <Text size="body" className="text-subtle" multiline>
        {desc}
      </Text>
    </div>
  );
};

export default Showcase;
