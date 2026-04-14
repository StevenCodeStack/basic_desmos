import React from "react";
import FunctionList from "./FunctionList";
import FunctionForm from "./FunctionForm";

const Sidebar = () => {
  return (
    <div className="bg-black/95 text-white w-100 flex h-full flex-col min-h-0">
      <h1 className="text-3xl font-semibold m-5">Basic Desmos</h1>
      <FunctionForm />
      <FunctionList />
    </div>
  );
};

export default Sidebar;
