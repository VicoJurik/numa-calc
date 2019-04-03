import React, { useState } from "react";

const PressButton = ({ label, onPress }) => (
  <button
    className={`labelButton ${
      label === 0 ? "zeroButton" : isNaN(parseInt(label)) ? "operatorButton" : "digitButton"
    }`}
    onClick={() => onPress(label)}
  >
    {label}
  </button>
);

const cleanExpression = expression => expression.replace(/[^0-9+\-*/%.()]/g, "");

const Calculator = () => {
  const [expression, setExpression] = useState("12+3*4");
  const [result, setResult] = useState(0);

  const handlePress = label => setExpression(`${expression}${label}`);

  const handleEval = () => {
    try {
      setResult(eval(expression));
    } catch (e) {
      setResult(e.toString());
    }
  };

  const pressButtons = labels => labels.map(label => <PressButton key={label} label={label} onPress={handlePress} />);

  return (
    <div className="calculator">
      <div className="form">
        <input
          className="expressionInput"
          name="expression"
          onChange={event => setExpression(cleanExpression(event.target.value))}
          type="text"
          value={expression}
        />
        <button className="evalButton" onClick={handleEval}>
          Eval
        </button>
      </div>
      <div className="buttons">
        <div className="buttonsRows">{pressButtons([7, 8, 9, "+"])}</div>
        <div className="buttonsRows">{pressButtons([4, 5, 6, "-"])}</div>
        <div className="buttonsRows">{pressButtons([1, 2, 3, "*"])}</div>
        <div className="buttonsRows">{pressButtons([0, "%", "/"])}</div>
        <div className="buttonsRows">{pressButtons(["(", ")", "**", "."])}</div>
      </div>
      <div className="result">{result}</div>
    </div>
  );
};

export default Calculator;
