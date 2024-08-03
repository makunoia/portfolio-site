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
  const imgTransformer =
    "https://marknoya.me/cdn-cgi/image/format=webp,width=1100,fit=contain,quality=85/";

  return (
    <div className="bg-subtle/40 flex flex-col gap-4px rounded-12px p-12px">
      <div className="flex flex-col gap-10px">
        <div className="bg relative overflow-hidden w-full h-[250px] md:h-[400px] rounded-8px">
          <Image
            src={`${imgTransformer}${showcaseImage.url as string}`}
            alt={showcaseImage.alt || title}
            sizes="(max-width: 640px) 100vw, (max-width: 960px) 85vw, 1000px"
            style={{
              objectFit: "cover",
            }}
            priority
            fill
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

          {tag ? (
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
          ) : null}
        </div>
      </div>
      {desc ? (
        <Text size="caption" className="text-subtle" multiline>
          {desc}
        </Text>
      ) : null}
    </div>
  );
};

export default Showcase;
