import Image from "next/image";
import React from "react";
import Text from "./Text";

const Showcase = ({
  src,
  lead,
  content,
  tag,
}: {
  src: string;
  lead: string;
  content: string;
  tag: string;
}) => {
  return (
    <div className="bg-subtle/60 flex flex-col gap-16px rounded-12px p-24px">
      <div className="flex flex-col gap-10px">
        <div className="relative overflow-hidden w-full h-[200px] md:h-[300px] bg rounded-4px">
          <Image src={src} alt={lead} fill objectFit="cover" />
        </div>
        <div className="flex flex-row justify-between items-center">
          <Text
            type="mono"
            weight="medium"
            size="caption"
            className="opacity-80"
          >
            {lead}
          </Text>

          <div className="inline-flex py-4px px-8px bg rounded-4px">
            <Text
              as="span"
              type="mono"
              size="caption"
              className="text opacity-70 uppercase tracking-wide"
            >
              {tag}
            </Text>
          </div>
        </div>
      </div>
      <Text size="body" className="text-subtle" multiline>
        {content}
      </Text>
    </div>
  );
};

export default Showcase;
