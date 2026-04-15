"use client";

import { useValue } from "@/hooks/valueContext";
import React, { FormEvent, useState } from "react";
import { HexColorPicker } from "react-colorful";
import { toast } from "react-toastify";
import { hasNonMathChars, validateEquation } from "../lib/functions";
const FunctionForm = () => {
  const [color, setColor] = useState("#fff");
  const [equation, setEquation] = useState("");
  const { value, setValue } = useValue();

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (
      !/^#?([a-fA-F0-9]{3}|[a-fA-F0-9]{6}|[a-fA-F0-9]{8})$/.test(color.trim())
    ) {
      return toast.error("Invalid Hex Color");
    }
    if (hasNonMathChars(equation)) {
      return toast.error("Equation contains invalid characters!");
    }
    const response = validateEquation(equation);
    if (!response.success) return toast.error(response.message);

    setValue([{ id: Date.now(), equation, color }, ...value]);
    setEquation("");
  }

  return (
    <div className="mx-5 mb-10">
      <form action="" onSubmit={onSubmit} className="flex flex-col">
        <p>Function</p>
        <input
          value={equation}
          onChange={(e) => setEquation(e.target.value)}
          className="border border-gray-300 w-60 py-1 px-3 rounded"
        />
        <p className="mt-5">Color</p>
        <div className="m-5 colorComponent">
          <HexColorPicker
            color={color}
            onChange={(e) => {
              setColor(e);
              //   console.log(e);
            }}
          />
        </div>
        <input
          value={color}
          onChange={(e) => setColor(e.target.value)}
          placeholder="Enter a hex color"
          className="border border-gray-300 w-60 py-1 px-3 rounded"
        />
        <button className="px-5 py-2 w-fit mt-5 border border-gray-300 rounded-lg">
          Submit
        </button>
      </form>
    </div>
  );
};

export default FunctionForm;
