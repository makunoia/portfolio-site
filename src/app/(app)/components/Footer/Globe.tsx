"use client";
import createGlobe from "cobe";
import {useEffect, useMemo, useRef} from "react";
import {useTheme} from "next-themes";

//Montreal
// phi: -0.8,
// theta: 0.2,

const Globe = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const {resolvedTheme} = useTheme();

  const theme = resolvedTheme === "light" ? "light" : "dark";

  const colorScheme = useMemo(() => {
    if (theme === "light") {
      return {
        baseColor: [0.97, 0.97, 0.97] as [number, number, number],
        markerColor: [0.2, 0.2, 0.2] as [number, number, number],
        glowColor: [0.93, 0.93, 0.93] as [number, number, number],
        dark: 0.06,
      };
    }

    return {
      baseColor: [0.3, 0.3, 0.3] as [number, number, number],
      markerColor: [1, 1, 1] as [number, number, number],
      glowColor: [0.65, 0.65, 0.65] as [number, number, number],
      dark: 0.8,
    };
  }, [theme]);

  useEffect(() => {
    if (!canvasRef.current) {
      return undefined;
    }

    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: 400,
      height: 400,
      phi: 2.3,
      theta: -0.3,
      scale: 3,
      diffuse: 4,
      mapSamples: 20000,
      mapBrightness: 6,
      offset: [250, 150],
      markers: [{location: [14.5531994, 121.2189578], size: 0.07}],
      onRender: () => {},
      ...colorScheme,
    });

    return () => {
      globe.destroy();
    };
  }, [colorScheme]);

  return (
    <div className="absolute right-0 top-0 -mr-20px h-full w-[45%] -z-10 opacity-50 sm:w-3/5 sm:opacity-100">
      <div className="relative h-full w-full">
        <canvas
          ref={canvasRef}
          style={{
            width: "100%",
            height: "100%",
            maxWidth: "100%",
            aspectRatio: 1,
          }}
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-bg-default to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 h-full w-32 bg-gradient-to-l from-bg-default to-transparent" />
      </div>
    </div>
  );
};

export default Globe;
