"use client";
import { EquationValueType } from "@/types";
import { createContext, useState, useContext } from "react";

const ValueContext = createContext<{
  value: EquationValueType[];
  setValue: (v: EquationValueType[]) => void;
} | null>(null);

export function ValueProvider({ children }: { children: React.ReactNode }) {
  const [value, setValue] = useState<EquationValueType[]>([]);
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
