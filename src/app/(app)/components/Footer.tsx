"use client";
import React, { useEffect, useRef } from "react";
import Text from "./Text";
import LinkButton from "./LinkButton";
import createGlobe from "cobe";
import { cva } from "class-variance-authority";

const IndicatorCVA = cva("rounded-full w-8px h-8px animate-pulse", {
  variants: {
    status: {
      dnd: "bg-danger",
      available: "bg-success",
    },
  },
});

const Footer = ({ status }: { label: string; status: "dnd" | "available" }) => {
  const IndicatorStyle = IndicatorCVA({ status });

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const globe = createGlobe(canvasRef.current, {
        devicePixelRatio: 2,
        width: 400,
        height: 400,
        phi: -0.8,
        theta: 0.2,
        dark: 0.8,
        scale: 2.5,
        diffuse: 4,
        mapSamples: 16000,
        mapBrightness: 6,
        baseColor: [0.3, 0.3, 0.3],
        markerColor: [0.1, 0.8, 1],
        glowColor: [0.996, 0.996, 1.0],
        offset: [250, 100],
        markers: [{ location: [45.50169, -73.567253], size: 0.15 }],
        onRender: (state) => {},
      });

      return () => {
        globe.destroy();
      };
    }
  }, [canvasRef]);

  return (
    <footer className="relative max-w-[700px] mx-auto h-fit flex flex-col gap-[40px] mt-60px py-40px border-t">
      <div className="flex flex-col">
        <Text>Don't be an alien, say hi</Text>
        <Text size="lead" weight="medium">
          hi@marknoya.me
        </Text>
      </div>

      <div className="flex flex-row gap-12px">
        <LinkButton
          label="LinkedIn"
          href="https://www.linkedin.com/in/mark-noya/"
        />
        <LinkButton
          label="Resume"
          href="https://www.linkedin.com/in/mark-noya/"
        />
      </div>

      <div className="flex flex-col gap-30px md:flex-row md:justify-between">
        <div className="flex flex-col gap-4px">
          <Text>This website, like I am, is a work in progress.</Text>
          <Text className="text-subtle">Last updated May 21, 2024 9:00 PM</Text>
        </div>

        <div className=" flex flex-col items-start md:items-end gap-4px">
          <div className="flex flex-row gap-4px">
            <Text weight="medium">Montreal, Canada</Text>
            <Text>9:00 PM</Text>
          </div>
          <div className="flex flex-row items-center gap-8px">
            <div className={IndicatorStyle}></div>
            <Text>Sleeping</Text>
          </div>
        </div>
      </div>

      <div
        id="footer-globe"
        className="w-3/5 h-full -mr-20px absolute -z-10 top-0px bottom-0px right-0px"
      >
        <canvas
          ref={canvasRef}
          style={{
            width: "100%",
            height: "100%",
            maxWidth: "100%",
            aspectRatio: 1,
          }}
        />
      </div>
    </footer>
  );
};

export default Footer;
