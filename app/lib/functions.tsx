/**
 * function => y = x, x = y
 * point => (x,y)
 * trig functions
 */
import * as math from "mathjs";

import { Circle, Plot, Point } from "mafs";
import { EquationValueType } from "@/types";
import { InlineMath } from "react-katex";
const circlePattern = /\([xy][^)]+\)\^2\s*\+\s*\([xy][^)]+\)\^2\s*=\s*\d+/;

export function stringToGraph(equationData: EquationValueType) {
  const equation = parseEquation(equationData.equation);
  try {
    if (equation.startsWith("x=")) {
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
    if (equation.startsWith("y=")) {
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
    if (equation.match(circlePattern)) {
      const [left, right] = equation.split("=");
      const radiusSquared = parseFloat(right.trim());

      if (isNaN(radiusSquared) || radiusSquared <= 0) return null;

      const terms = left.split(/\+(?=\()/);
      const xTerm = terms.find((term) => term.includes("x"));
      const yTerm = terms.find((term) => term.includes("y"));

      const xMatch = xTerm?.match(/\(x([^)]+)\)\^2/);
      const yMatch = yTerm?.match(/\(y([^)]+)\)\^2/);

      const x = xMatch ? xMatch[1] : null;
      const y = yMatch ? yMatch[1] : null;

      console.log(x, y);

      if (x === null || y === null) return null;

      function evaluateInside(expr: string) {
        const numbers = expr.match(/[+-]\d+/g);

        if (!numbers) return 0;
        return numbers.reduce((sum, num) => sum + parseInt(num), 0);
      }
      const centerX = evaluateInside(x);
      const centerY = evaluateInside(y);

      const radius = Math.sqrt(radiusSquared);

      return (
        <Plot.Parametric
          xy={(t) => [
            -centerX + radius * Math.cos(t),
            -centerY + radius * Math.sin(t),
          ]}
          t={[0, 2 * Math.PI]}
          color={equationData.color}
          key={equationData.id}
        />
      );
    }
    if (equation.startsWith("(")) {
      const indexOfOpen = 0;
      const indexOfComma = equation.indexOf(",");
      const indexOfClose = equation.indexOf(")");

      const x = Number(equation.substring(indexOfOpen + 1, indexOfComma));
      const y = Number(equation.substring(indexOfComma + 1, indexOfClose));

      if (isNaN(x) || isNaN(y)) return null;

      return (
        <Point x={x} y={y} color={equationData.color} key={equationData.id} />
      );
    }
    if (equation.includes("x^2+y^2=") || equation.includes("y^2+x^2=")) {
      console.log("Circle Detected");
      const radiusSquared = Number(equation.split("=")[1].trim());
      return (
        <Circle
          key={equationData.id}
          color={equationData.color}
          radius={Math.sqrt(radiusSquared)}
          center={[0, 0]}
        />
      );
    }
  } catch (error) {
    console.error("error" + error);
  }
}

export function stringToKatex(equation: string) {
  const expr = equation.replace(/\^\(([^)]+)\)/g, "^{$1}");
  return <InlineMath>{String(expr)}</InlineMath>;
}

function parseEquation(equation: string) {
  const parsed = equation
    .replace(/\s/g, "")
    .replace(/([x|y])([a-z]{2,})/g, "$1*$2")
    .toLowerCase();

  return parsed;
}

export function validateEquation(equation: string) {
  const expr = equation.replace(/\s/g, "");

  if (expr === "") {
    return { success: false, message: "Enter an equation!" };
  }

  if (expr.includes("{") || expr.includes("}")) {
    return {
      success: false,
      message: "Cannot use { or }, please use ( ) instead",
    };
  }

  let openCount = 0;
  for (let i = 0; i < expr.length; i++) {
    const char = expr[i];
    if (char === "(") openCount++;
    else if (char === ")") {
      openCount--;
      if (openCount < 0) {
        return { success: false, message: "Invalid parentheses usage!" };
      }
    }
  }
  if (openCount !== 0) {
    return { success: false, message: "Invalid parentheses usage!" };
  }

  const trigPattern =
    /\b(sin|cos|tan|csc|sec|cot|asin|acos|atan|sinh|cosh|tanh)\s*[^(]/i;
  if (trigPattern.test(expr)) {
    return {
      success: false,
      message: "Please use parentheses after trig functions, e.g., sin(x)",
    };
  }

  // Circle validation
  if (/x\^2\s*\+\s*y\^2\s*=\s*\d+|y\^2\s*\+\s*x\^2\s*=\s*\d+/.test(expr)) {
    const [left, right] = expr.split("=");
    const radius = parseFloat(right);
    if (isNaN(radius) || radius <= 0) {
      return { success: false, message: "Radius must be a positive number!" };
    }
    const terms = left.split("+");
    if (
      (terms[0].includes("x") && terms[0].includes("y")) ||
      (terms[1]?.includes("x") && terms[1]?.includes("y"))
    ) {
      return {
        success: false,
        message: "Complex implicit equation is not supported",
      };
    }
  }

  const varMatch = expr.match(/^([a-z])=/);
  if (varMatch) {
    const variable = varMatch[1];
    const right = expr.split("=")[1];
    if (right.includes(variable)) {
      return {
        success: false,
        message: "Variable cannot appear on both sides of the equation",
      };
    }
  }

  // Unsupported features
  if (expr.includes("|")) {
    return {
      success: false,
      message: "Absolute value is not supported yet",
    };
  }

  if (expr.includes("ln")) {
    return {
      success: false,
      message: "Natural log (ln) is not supported yet",
    };
  }

  if (expr.includes("log_")) {
    return {
      success: false,
      message: "Please use log(x, base) format",
    };
  }

  return { success: true, message: "" };
}

const nonMathSpecialChars = [
  "@",
  "#",
  "$",
  "&",
  "|",
  "\\",
  "`",
  "~",
  '"',
  "'",
  ";",
  ":",
  "?",
  "©",
  "®",
  "™",
  "€",
  "£",
  "¥",
];

export const hasNonMathChars = (str: string): boolean => {
  return nonMathSpecialChars.some((char) => str.includes(char));
};
