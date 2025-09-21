"use client";
import Image from "next/image";
import React, {useState} from "react";
import {Asset} from "payload-types";
import {UnfoldHorizontal} from "lucide-react";

const ImageRevealer = ({
  beforeImage,
  afterImage,
  title,
}: {
  title: string;
  beforeImage: Asset;
  afterImage: Asset;
}) => {
  const [position, setPosition] = useState(50);

  const handleRangeChange = (event: any) => {
    setPosition(event.target.value);
  };

  return (
    <div className="relative aspect-[5/3] h-auto w-full overflow-hidden rounded-8px bg-bg-default pointer-events-auto md:h-[400px]">
      <Image
        priority
        className="showcase-before-photo absolute"
        src={beforeImage.url as string}
        alt={beforeImage.alt || title}
        width={700}
        height={400}
        style={{
          objectFit: "cover",
        }}
        role="presentation"
      />

      <div
        className="absolute w-full h-full overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      >
        <Image
          priority
          src={afterImage.url as string}
          alt={afterImage.alt || title}
          width={700}
          height={400}
          style={{
            objectFit: "cover",
          }}
          role="presentation"
        />
      </div>

      <input
        type="range"
        min="0"
        max="100"
        value={position}
        onChange={handleRangeChange}
        className="image-revealer absolute inset-0 z-10 h-full w-full cursor-pointer appearance-none bg-transparent"
      />
      <div
        className="pointer-events-none absolute h-full w-[4px] -translate-x-1/2 bg-bg-default"
        style={{left: `${position}%`, boxShadow: "var(--shadow-default)"}}
      />
      <div
        className="absolute top-1/2 flex -translate-y-1/2 -translate-x-1/2 items-center justify-center rounded-full bg-bg-default p-2"
        style={{left: `${position}%`}}
      >
        <UnfoldHorizontal className="text-fg-default" />
      </div>
      <style jsx>{`
        input[type="range"].image-revealer::-webkit-slider-thumb {
          -webkit-appearance: none;
          height: 60px;
          width: 60px;
          border-radius: 9999px;
          background: transparent;
          cursor: ew-resize;
          opacity: 0;
        }
        input[type="range"].image-revealer::-moz-range-thumb {
          height: 60px;
          width: 60px;
          border-radius: 9999px;
          background: transparent;
          cursor: ew-resize;
          opacity: 0;
        }
        input[type="range"].image-revealer::-ms-thumb {
          height: 60px;
          width: 60px;
          border-radius: 9999px;
          background: transparent;
          cursor: ew-resize;
          opacity: 0;
        }
      `}</style>
    </div>
  );
};

export default ImageRevealer;
