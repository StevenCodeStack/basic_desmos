"use client";

import { Copy, X } from "lucide-react";
import { useValue } from "@/hooks/valueContext";
import { EquationValueType } from "@/types";
import { stringToKatex } from "../lib/functions";
import { toast } from "react-toastify";
const FunctionList = () => {
  const { value } = useValue();
  return (
    <div className="w-full flex flex-col overflow-y-auto min-h-0 flex-1 grow x">
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
    <div className="flex justify-between min-h-15 w-full border-t border-black/70">
      <div className="aspect-3/4 flex justify-center items-center bg-black/90">
        {index + 1}
      </div>

      <div className="grow flex items-center pl-4 gap-5">
        {stringToKatex(equationValue.equation)}
      </div>
      <div className="flex gap-3 h-full items-center">
        <div
          className={`rounded-4xl h-4 w-4 `}
          style={{ backgroundColor: equationValue.color }}
        />
        <div
          className="h-full flex items-center pr-2"
          onClick={() => {
            navigator.clipboard.writeText(equationValue.equation);
            toast.success("Copied!");
          }}
        >
          <Copy className="h-4 w-4" />
        </div>
        <div className="aspect-square h-5 m-1 self-start">
          <X
            className="text-gray-500"
            onClick={() =>
              setValue(value.filter((e) => e.id !== equationValue.id))
            }
          />
        </div>
      </div>
    </div>
  );
};

export default FunctionList;
