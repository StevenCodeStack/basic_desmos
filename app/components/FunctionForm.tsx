"use client";

import { useValue } from "@/hooks/valueContext";
import React, { FormEvent, useState } from "react";
import { HexColorPicker } from "react-colorful";
import { toast } from "react-toastify";
import { validateEquation } from "../lib/functions";
const FunctionForm = () => {
  const [color, setColor] = useState("#fff");
  const [equation, setEquation] = useState("");
  const { value, setValue } = useValue();

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const response = validateEquation(equation);
    if (!response.success) return toast.error(response.message);

    setValue([...value, { id: Date.now(), equation, color }]);
    setEquation("");
  }

  return (
    <div className="mx-5 mb-10">
      <form action="" onSubmit={onSubmit}>
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
        <button className="px-5 py-2 border border-gray-300 rounded-lg">
          Submit
        </button>
      </form>
    </div>
  );
};

export default FunctionForm;
