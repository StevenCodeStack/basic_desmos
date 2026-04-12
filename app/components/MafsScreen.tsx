"use client";
import { Coordinates, labelPi, Mafs, Plot } from "mafs";
import React, { useRef, useEffect, useState } from "react";
import "mafs/core.css";

const MafsScreen = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(500);

  useEffect(() => {
    if (containerRef.current) setHeight(containerRef.current.clientHeight);
  }, []);

  return (
    <div ref={containerRef} className="flex-1 h-full">
      <Mafs height={height} viewBox={{ x: [-10, 10], y: [-2, 2] }}>
        <Coordinates.Cartesian
          subdivisions={4}
          xAxis={{ lines: Math.PI, labels: labelPi }}
        />
        <Plot.OfX y={(x) => Math.sin(x)} />
      </Mafs>
    </div>
  );
};

export default MafsScreen;
