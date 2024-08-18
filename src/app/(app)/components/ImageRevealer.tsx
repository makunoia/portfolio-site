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
    <div className="bg relative overflow-hidden w-fullh-auto aspect-[5/3] md:h-[400px] rounded-8px pointer-events-auto">
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
        className="image-revealer"
      />
      <div className="img-revealer-line" style={{ left: `${position}%` }} />
      <div className="img-revealer-handle" style={{ left: `${position}%` }}>
        <UnfoldHorizontal className="text" />
      </div>
    </div>
  );
};

export default ImageRevealer;
