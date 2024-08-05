"use client";
import Image from "next/image";
import React, { useState } from "react";
import { Asset } from "payload-types";
import { UnfoldHorizontal } from "lucide-react";

const ImageRevealer = ({
  beforeImage,
  afterImage,
  title,
  transformer,
}: {
  title: string;
  transformer: string;
  beforeImage: Asset;
  afterImage: Asset;
}) => {
  const [position, setPosition] = useState(50);

  const handleRangeChange = (event: any) => {
    setPosition(event.target.value);
  };

  return (
    <div className="bg relative overflow-hidden w-full h-[250px] md:h-[400px] rounded-8px pointer-events-auto">
      <Image
        className="showcase-before-photo absolute"
        src={`${transformer}${beforeImage.url as string}`}
        alt={beforeImage.alt || title}
        sizes="(max-width: 640px) 100vw, (max-width: 960px) 85vw, 1000px"
        style={{
          objectFit: "cover",
        }}
        priority
        fill
      />

      <div
        className="absolute w-full h-full overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      >
        <Image
          src={`${transformer}${afterImage.url as string}`}
          alt={afterImage.alt || title}
          sizes="(max-width: 640px) 100vw, (max-width: 960px) 85vw, 1000px"
          style={{
            objectFit: "cover",
          }}
          priority
          fill
        />
      </div>

      <input
        type="range"
        min="0"
        max="100"
        value={position}
        onChange={handleRangeChange}
        aria-label="Percentage of before photo shown"
        className="absolute inset-0px w-full h-full opacity-0 cursor-pointer"
      />
      <div
        className="absolute w-4px h-full bg-inverse -translate-x-[50%] pointer-events-none drop-shadow-sm"
        style={{ left: `${position}%` }}
      />
      <div
        className="absolute z-10 flex items-center place-items-center p-8px hover:p-12px rounded-full bg-inverse top-[50%] -translate-y-[50%] -translate-x-[50%] pointer-events-none"
        style={{ left: `${position}%` }}
      >
        <UnfoldHorizontal fill="fg-subtle" />
      </div>
    </div>
  );
};

export default ImageRevealer;
