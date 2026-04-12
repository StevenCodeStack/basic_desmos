"use client";
import { createContext, useState, useContext } from "react";

const ValueContext = createContext<{
  value: string;
  setValue: (v: string) => void;
} | null>(null);

export function ValueProvider({ children }: { children: React.ReactNode }) {
  const [value, setValue] = useState("asd");
  return (
    <ValueContext.Provider value={{ value, setValue }}>
      {children}
    </ValueContext.Provider>
  );
}

export function useValue() {
  const ctx = useContext(ValueContext);
  if (!ctx) throw new Error("useValue must be used inside ValueProvider");
  return ctx;
}
