"use client";
import { Menu, X } from "lucide-react";
import React, { useState } from "react";
import FunctionForm from "./FunctionForm";
import FunctionList from "./FunctionList";

const MobileSidebar = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="text-white xl:hidden">
      <div className="absolute top-5 left-5">
        <Menu onClick={() => setOpen(true)} />
      </div>
      <div
        className={`bg-black/95 text-white w-100 h-full flex-col min-h-0 absolute top-0 ${open ? "left-0" : "-left-[200%]"} transition-all`}
      >
        <header className="flex items-center justify-between">
          <h1 className="text-3xl font-semibold m-5">Basic Desmos</h1>
          <X className="h-8 w-8 m-5" onClick={() => setOpen(false)} />
        </header>
        <FunctionForm />
        <FunctionList />
      </div>
    </div>
  );
};

export default MobileSidebar;
