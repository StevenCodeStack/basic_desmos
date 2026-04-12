import React from "react";
import FunctionList from "./FunctionList";

const Sidebar = () => {
  return (
    <div className="bg-black/95 text-white h-full w-100 ">
      <h1 className="text-3xl font-semibold m-5">Basic Desmos</h1>
      <FunctionList />
    </div>
  );
};

export default Sidebar;
