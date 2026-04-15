"use client";
import { Menu, X } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import FunctionForm from "./FunctionForm";
import FunctionList from "./FunctionList";

const MobileSidebar = () => {
  const [open, setOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1280); // xl breakpoint is 1280px
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  if (!isMobile) return null;

  return (
    <div className="text-white xl:hidden">
      <div className="absolute top-5 left-5">
        <Menu onClick={() => setOpen(true)} />
      </div>
      <div
        ref={sidebarRef}
        className={`bg-black/95 transition-all text-white w-75 h-full flex-col min-h-0 absolute top-0 ${open ? "left-0" : "-left-[200%]"}`}
      >
        <header className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold m-3">Basic Desmos</h1>
          <X className="h-8 w-8 m-5" onClick={() => setOpen(false)} />
        </header>
        <FunctionForm />
        <FunctionList />
      </div>
    </div>
  );
};

export default MobileSidebar;
