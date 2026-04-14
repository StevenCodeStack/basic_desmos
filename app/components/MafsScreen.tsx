"use client";
import { Circle, Coordinates, labelPi, Mafs, Plot } from "mafs";
import React, { useRef, useEffect, useState } from "react";
import "mafs/core.css";
import { stringToGraph } from "../lib/functions";
import { useValue } from "@/hooks/valueContext";

const MafsScreen = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(500);
  const { value } = useValue();

  useEffect(() => {
    if (containerRef.current) setHeight(containerRef.current.clientHeight);
  }, []);

  return (
    <div ref={containerRef} className="flex-1 h-full">
      <Mafs height={height} viewBox={{ x: [-10, 10], y: [-10, 10] }}>
        <Coordinates.Cartesian subdivisions={4} />
        {value.map((e) => stringToGraph(e))}
        {/* {stringToGraph({ equation: "y = (x + 1)/(x-1)", color: "#fff", id: 1 })} */}
        {/* <Plot.OfX y={(x) => Math.pow(x, 5)} /> */}
        {/* <Circle radius={3} center={[0, 0]} /> */}
        {/* <Plot.Parametric
          xy={(t) => [
            -2 + Math.sqrt(20) * Math.cos(t),
            2 + Math.sqrt(20) * Math.sin(t),
          ]}
          t={[0, 2 * Math.PI]}
          color="blue"
        /> */}
      </Mafs>
    </div>
  );
};

export default MafsScreen;
