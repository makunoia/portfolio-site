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
        glowColor: [0.99, 0.99, 0.99] as [number, number, number],
        dark: 0.06,
      };
    }

    return {
      baseColor: [0.3, 0.3, 0.3] as [number, number, number],
      markerColor: [1, 1, 1] as [number, number, number],
      glowColor: [0.75, 0.75, 0.75] as [number, number, number],
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
    <div
      id="footer-globe"
      className="w-[45%] h-full opacity-50 sm:w-3/5 sm:opacity-100 -mr-20px absolute -z-10 top-0px bottom-0px right-0px"
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
  );
};

export default Globe;
