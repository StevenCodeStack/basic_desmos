/**
 * function => y = x, x = y
 * point => (x,y)
 * trig functions
 */
import * as math from "mathjs";

import { Plot, Point } from "mafs";
import { EquationValueType } from "@/types";
import { InlineMath } from "react-katex";

export function stringToGraph(equationData: EquationValueType) {
  const equation = equationData.equation.trim().replace(" ", "");
  if (equation.startsWith("x")) {
    const expr = equation.replace(/^x\s*=\s*/, "").trim();
    const compiled = math.compile(expr);
    return (
      <Plot.OfY
        x={(y: number) => compiled.evaluate({ y })}
        color={equationData.color}
        key={equationData.id}
      />
    );
  }
  if (equation.startsWith("y")) {
    const expr = equation.replace(/^y\s*=\s*/, "").trim();
    const compiled = math.compile(expr);
    return (
      <Plot.OfX
        y={(x: number) => compiled.evaluate({ x })}
        color={equationData.color}
        key={equationData.id}
      />
    );
  }
  if (equation.startsWith("(")) {
    const indexOfOpen = 0;
    const indexOfComma = equation.indexOf(",");
    const indexOfClose = equation.length - 1;

    const x = Number(equation.substring(indexOfOpen + 1, indexOfComma));
    const y = Number(equation.substring(indexOfComma + 1, indexOfClose));

    if (isNaN(x) || isNaN(y)) return null;

    return (
      <Point x={x} y={y} color={equationData.color} key={equationData.id} />
    );
  }
}

export function stringToKatex(equation: string) {
  const expr = equation.replace(/\^\(([^)]+)\)/g, "^{$1}");
  return <InlineMath>{String(expr)}</InlineMath>;
}

export function validateEquation(equation: string) {
  if (equation.trim() === "") {
    return { success: false, message: "Enter an equation!" };
  }

  if (equation.includes("{") || equation.includes("}")) {
    return {
      success: false,
      message: "Cannot use { or }, please use ( ) instead",
    };
  }

  // Check for trig without parentheses (case-insensitive)
  const trigPattern =
    /\b(sin|cos|tan|csc|sec|cot|asin|acos|atan|sinh|cosh|tanh)\s*[^(]/i;

  if (trigPattern.test(equation)) {
    return {
      success: false,
      message: "Please use parentheses after trig functions, e.g., sin(x)",
    };
  }

  return { success: true, message: "" };
}
