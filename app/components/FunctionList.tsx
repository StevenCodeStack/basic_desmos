"use client";

import { X } from "lucide-react";
const FunctionList = () => {
  return (
    <div className="w-full flex flex-col">
      <FunctionItem />
      <FunctionItem />
      <FunctionItem />
      <FunctionItem />
    </div>
  );
};

const FunctionItem = () => {
  return (
    <div className="flex h-15 w-full border-t border-black/70">
      <div className="aspect-3/4 flex justify-center items-center bg-black/90">
        1
      </div>
      <div className="grow flex items-center pl-4"></div>
      <div className="aspect-square h-5 m-1">
        <X className="text-gray-500" />
      </div>
    </div>
  );
};

export default FunctionList;
