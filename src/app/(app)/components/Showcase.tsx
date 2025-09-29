import Image from "next/image";
import React, { lazy } from "react";
import Text from "./Text";
import { Asset, Showcase as ShowcaseType } from "payload-types";
const ImageRevealer = lazy(() => import("./ImageRevealer"));

const Showcase = ({
  image,
  title,
  desc,
  tag,
  isRevealer,
  images,
}: Omit<ShowcaseType, "blockType" | "blockName">) => {
  const showcaseImage: Asset = image as Asset;

  return (
    <div className="bg-bg-subtle/40 flex flex-col gap-4px rounded-12px p-12px">
      <div className="flex flex-col gap-10px">
        {!isRevealer ? (
          <div className="bg-bg-default relative overflow-hidden w-full h-auto aspect-[5/3] md:h-[400px] rounded-8px">
            <Image
              src={showcaseImage.url as string}
              alt={showcaseImage.alt || title}
              sizes="(max-width: 800px) 100vw, 1000px"
              style={{
                objectFit: "cover",
              }}
              width={700}
              height={400}
              quality={85}
              loading="lazy"
              role="presentation"
            />
          </div>
        ) : (
          <ImageRevealer
            beforeImage={images?.beforeImage as Asset}
            afterImage={images?.afterImage as Asset}
            title={title}
          />
        )}

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
            <div className="inline-flex py-4px px-8px bg-bg-default rounded-4px">
              <Text
                as="span"
                type="mono"
                size="caption"
                className="text-fg-default opacity-70 uppercase tracking-wide"
              >
                {tag as string}
              </Text>
            </div>
          ) : null}
        </div>
      </div>
      {desc ? (
        <Text size="caption" className="text-fg-subtle" multiline>
          {desc}
        </Text>
      ) : null}
    </div>
  );
};

export default Showcase;
