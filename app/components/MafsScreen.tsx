"use client";
import { Coordinates, Mafs } from "mafs";
import React, { useRef, useEffect, useState } from "react";
import "mafs/core.css";
import { stringToGraph } from "../lib/functions";
import { useValue } from "@/hooks/valueContext";
import { ErrorBoundary } from "react-error-boundary";
import { toast } from "react-toastify";

function ErrorFallback() {
  return null;
}

const MafsScreen = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(500);
  const [width, setWidth] = useState(500);
  const { value } = useValue();

  useEffect(() => {
    if (!containerRef.current) return;

    const updateSize = () => {
      if (containerRef.current) {
        setHeight(containerRef.current.clientHeight);
        setWidth(containerRef.current.clientWidth);
      }
    };

    updateSize();
    const resizeObserver = new ResizeObserver(updateSize);
    resizeObserver.observe(containerRef.current);

    return () => resizeObserver.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="flex-1 h-full w-full">
      <Mafs
        height={height}
        width={width}
        viewBox={{ x: [-10, 10], y: [-10, 10] }}
      >
        <Coordinates.Cartesian subdivisions={4} />

        {value.map((e) => (
          <ErrorBoundary
            FallbackComponent={ErrorFallback}
            resetKeys={[e.equation]}
            key={e.id}
            onError={() => {
              toast.error("Equation is unrecognizable or unsupported", {
                toastId: "toast-equation-error",
              });
            }}
          >
            {stringToGraph(e)}
          </ErrorBoundary>
        ))}
      </Mafs>
    </div>
  );
};

export default MafsScreen;
