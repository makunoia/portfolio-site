"use client";
import Image from "next/image";
import React, { useState } from "react";
import { Asset } from "payload-types";
import { UnfoldHorizontal } from "lucide-react";

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
    <div className="bg relative overflow-hidden w-fullh-auto aspect-[5/3] md:h-[400px] rounded-8px pointer-events-auto">
      <Image
        className="showcase-before-photo absolute"
        src={beforeImage.url as string}
        alt={beforeImage.alt || title}
        width={700}
        height={400}
        style={{
          objectFit: "cover",
        }}
        loading="lazy"
        role="presentation"
        priority
      />

      <div
        className="absolute w-full h-full overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      >
        <Image
          src={afterImage.url as string}
          alt={afterImage.alt || title}
          width={700}
          height={400}
          style={{
            objectFit: "cover",
          }}
          loading="lazy"
          role="presentation"
          priority
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
