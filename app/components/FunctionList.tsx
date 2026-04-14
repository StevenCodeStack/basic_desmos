"use client";

import { X } from "lucide-react";
import { useValue } from "@/hooks/valueContext";
import { EquationValueType } from "@/types";
const FunctionList = () => {
  const { value } = useValue();
  return (
    <div className="w-full flex flex-col">
      {value.map((e, i) => (
        <FunctionItem key={e.id} equationValue={e} index={i} />
      ))}
    </div>
  );
};

const FunctionItem = ({
  equationValue,
  index,
}: {
  equationValue: EquationValueType;
  index: number;
}) => {
  const { value, setValue } = useValue();
  return (
    <div className="flex h-15 w-full border-t border-black/70">
      <div className="aspect-3/4 flex justify-center items-center bg-black/90">
        {index + 1}
      </div>
      <div className="grow flex items-center pl-4 gap-5">
        {equationValue.equation}
        <div
          className={`rounded-4xl h-4 w-4 `}
          style={{ backgroundColor: equationValue.color }}
        />
      </div>
      <div className="aspect-square h-5 m-1">
        <X
          className="text-gray-500"
          onClick={() =>
            setValue(value.filter((e) => e.id !== equationValue.id))
          }
        />
      </div>
    </div>
  );
};

export default FunctionList;
