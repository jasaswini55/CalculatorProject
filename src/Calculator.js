import React, { useState } from "react";
import "./index.css";

const Calculator = () => {
  const [input, setInput] = useState("");

  const handleClick = (value) => {
    setInput((prev) => prev + value);
  };

  const deleteLast = () => {
    setInput((prev) => prev.slice(0, -1));
  };

  const clearInput = () => {
    setInput("");
  };

  const calculate = () => {
    setInput(evaluateExpression(input));
  };

  const evaluateExpression = (expression) => {
    let result = 0;
    let currentNumber = "";
    let operator = "+";

    for (let i = 0; i < expression.length; i++) {
      const char = expression[i];

      if (char >= '0' && char <= '9' || char === '.') {
        currentNumber += char;
      } else if (char === '+' || char === '-' || char === '*' || char === '/') {
        if (currentNumber === "") return "Error";// this checks for valid op

        if (operator === "+") result += parseFloat(currentNumber);
        else if (operator === "-") result -= parseFloat(currentNumber);
        else if (operator === "*") result *= parseFloat(currentNumber);
        else if (operator === "/") {
          if (parseFloat(currentNumber) === 0) return "Error";
          result /= parseFloat(currentNumber);
        }

        // reset
        currentNumber = "";
        operator = char;
      }
    }

    if (currentNumber === "") return "Error";
    if (operator === "+") result += parseFloat(currentNumber);
    else if (operator === "-") result -= parseFloat(currentNumber);
    else if (operator === "*") result *= parseFloat(currentNumber);
    else if (operator === "/") {
      if (parseFloat(currentNumber) === 0) return "Error";
      result /= parseFloat(currentNumber);
    }

    return result.toString();
  };

  return (
    <div className="calculator">
      <div className="display">{input || "0"}</div>
      <div className="buttons">
        <button onClick={() => handleClick("/")}>÷</button>
        <button className="special" onClick={deleteLast}>DEL</button>
        <button className="special ac" onClick={clearInput}>AC</button>
        <button onClick={() => handleClick("*")}>*</button>

        <button onClick={() => handleClick("7")}>7</button>
        <button onClick={() => handleClick("8")}>8</button>
        <button onClick={() => handleClick("9")}>9</button>
        <button onClick={() => handleClick("-")}>-</button>

        <button onClick={() => handleClick("4")}>4</button>
        <button onClick={() => handleClick("5")}>5</button>
        <button onClick={() => handleClick("6")}>6</button>
        <button onClick={() => handleClick("+")}>+</button>

        <button onClick={() => handleClick("1")}>1</button>
        <button onClick={() => handleClick("2")}>2</button>
        <button onClick={() => handleClick("3")}>3</button>
        <button onClick={() => handleClick(".")}>.</button>

        <button onClick={() => handleClick("0")}>0</button>
        <button className="equal" onClick={calculate}>=</button>
      </div>
    </div>
  );
};

export default Calculator;
